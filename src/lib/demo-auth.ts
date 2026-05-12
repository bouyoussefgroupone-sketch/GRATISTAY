export interface DemoAuthUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: string;
}

const USERS_KEY = "gratistay-demo-users";
const SESSION_KEY = "gratistay-demo-session";
export const AUTH_CHANGE_EVENT = "gratistay-auth-change";

function canUseStorage() {
  return typeof window !== "undefined";
}

function readUsers() {
  if (!canUseStorage()) return [];

  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as DemoAuthUser[]) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: DemoAuthUser[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function dispatchAuthChange() {
  if (!canUseStorage()) return;
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function getCurrentDemoUser() {
  if (!canUseStorage()) return null;

  const sessionEmail = window.localStorage.getItem(SESSION_KEY);
  if (!sessionEmail) return null;

  return readUsers().find((user) => user.email === sessionEmail) ?? null;
}

export function registerDemoUser(input: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  const email = input.email.trim().toLowerCase();
  const users = readUsers();

  if (users.some((user) => user.email === email)) {
    return { ok: false, message: "Un compte existe deja avec cet email." };
  }

  const user: DemoAuthUser = {
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    email,
    password: input.password,
    createdAt: new Date().toISOString(),
  };

  writeUsers([...users, user]);
  window.localStorage.setItem(SESSION_KEY, email);
  dispatchAuthChange();

  return { ok: true, user };
}

export function loginDemoUser(input: { email: string; password: string }) {
  const email = input.email.trim().toLowerCase();
  const user = readUsers().find((entry) => entry.email === email);

  if (!user || user.password !== input.password) {
    return { ok: false, message: "Email ou mot de passe incorrect." };
  }

  window.localStorage.setItem(SESSION_KEY, user.email);
  dispatchAuthChange();

  return { ok: true, user };
}

export function logoutDemoUser() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(SESSION_KEY);
  dispatchAuthChange();
}
