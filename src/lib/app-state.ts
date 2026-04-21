export type AppUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  credits: number;
  createdAt: string;
};

export type AppOrder = {
  id: string;
  userId: string;
  plan: string;
  amount: number;
  currency: string;
  creditsAdded: number;
  paymentId: string;
  status: "paid";
  createdAt: string;
};

export type ProcessedImage = {
  id: string;
  userId: string;
  url: string;
  createdAt: string;
  downloads: number;
};

type AppDB = {
  users: AppUser[];
  sessionUserId: string | null;
  orders: AppOrder[];
  images: ProcessedImage[];
};

const APP_STORAGE_KEY = "clearcut:db:v1";
const APP_EVENT = "clearcut:state-changed";
const DEFAULT_SIGNUP_CREDITS = 2;

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const getEmptyDB = (): AppDB => ({
  users: [],
  sessionUserId: null,
  orders: [],
  images: [],
});

const isBrowser = () => typeof window !== "undefined";

const readDB = (): AppDB => {
  if (!isBrowser()) return getEmptyDB();
  try {
    const raw = localStorage.getItem(APP_STORAGE_KEY);
    if (!raw) return getEmptyDB();
    const parsed = JSON.parse(raw) as Partial<AppDB>;
    return {
      users: Array.isArray(parsed.users) ? parsed.users : [],
      sessionUserId: typeof parsed.sessionUserId === "string" ? parsed.sessionUserId : null,
      orders: Array.isArray(parsed.orders) ? parsed.orders : [],
      images: Array.isArray(parsed.images) ? parsed.images : [],
    };
  } catch {
    return getEmptyDB();
  }
};

const emitStateChanged = () => {
  if (!isBrowser()) return;
  window.dispatchEvent(new CustomEvent(APP_EVENT));
};

const writeDB = (next: AppDB) => {
  if (!isBrowser()) return;
  localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(next));
  emitStateChanged();
};

export const subscribeToAppState = (onChange: () => void) => {
  if (!isBrowser()) return () => {};
  const handle = () => onChange();
  window.addEventListener(APP_EVENT, handle);
  window.addEventListener("storage", handle);
  return () => {
    window.removeEventListener(APP_EVENT, handle);
    window.removeEventListener("storage", handle);
  };
};

export const getCurrentUser = (): AppUser | null => {
  const db = readDB();
  if (!db.sessionUserId) return null;
  return db.users.find((user) => user.id === db.sessionUserId) ?? null;
};

export const signUp = (name: string, email: string, password: string) => {
  const db = readDB();
  const normalizedEmail = email.trim().toLowerCase();
  if (db.users.some((user) => user.email.toLowerCase() === normalizedEmail)) {
    return { ok: false as const, error: "An account with this email already exists." };
  }
  const user: AppUser = {
    id: createId(),
    name: name.trim(),
    email: normalizedEmail,
    password,
    credits: DEFAULT_SIGNUP_CREDITS,
    createdAt: new Date().toISOString(),
  };
  db.users.push(user);
  db.sessionUserId = user.id;
  writeDB(db);
  return { ok: true as const, user };
};

export const signIn = (email: string, password: string) => {
  const db = readDB();
  const normalizedEmail = email.trim().toLowerCase();
  const user = db.users.find((u) => u.email.toLowerCase() === normalizedEmail && u.password === password);
  if (!user) return { ok: false as const, error: "Invalid email or password." };
  db.sessionUserId = user.id;
  writeDB(db);
  return { ok: true as const, user };
};

export const signOut = () => {
  const db = readDB();
  db.sessionUserId = null;
  writeDB(db);
};

export const addCredits = (userId: string, credits: number) => {
  const db = readDB();
  const user = db.users.find((u) => u.id === userId);
  if (!user) return null;
  user.credits += credits;
  writeDB(db);
  return user.credits;
};

export const consumeCredit = (userId: string, credits = 1) => {
  const db = readDB();
  const user = db.users.find((u) => u.id === userId);
  if (!user) return { ok: false as const, reason: "NOT_FOUND" };
  if (user.credits < credits) return { ok: false as const, reason: "INSUFFICIENT" };
  user.credits -= credits;
  writeDB(db);
  return { ok: true as const, remaining: user.credits };
};

export const refundCredit = (userId: string, credits = 1) => addCredits(userId, credits);

export const recordOrder = (payload: Omit<AppOrder, "id" | "createdAt" | "status">) => {
  const db = readDB();
  const order: AppOrder = {
    id: createId(),
    createdAt: new Date().toISOString(),
    status: "paid",
    ...payload,
  };
  db.orders.unshift(order);
  writeDB(db);
  return order;
};

export const listOrdersForUser = (userId: string) => {
  const db = readDB();
  return db.orders.filter((order) => order.userId === userId);
};

export const addProcessedImage = (userId: string, url: string) => {
  const db = readDB();
  const image: ProcessedImage = {
    id: createId(),
    userId,
    url,
    createdAt: new Date().toISOString(),
    downloads: 0,
  };
  db.images.unshift(image);
  db.images = db.images.slice(0, 100);
  writeDB(db);
  return image;
};

export const listProcessedImages = (userId: string) => {
  const db = readDB();
  return db.images.filter((image) => image.userId === userId);
};

export const incrementDownloadCount = (imageId: string) => {
  const db = readDB();
  const image = db.images.find((item) => item.id === imageId);
  if (!image) return;
  image.downloads += 1;
  writeDB(db);
};
