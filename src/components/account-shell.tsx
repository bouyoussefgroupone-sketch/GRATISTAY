"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Download, LogOut, UserRound } from "lucide-react";
import { bookingRecords } from "@/data/demo-data";
import {
  AUTH_CHANGE_EVENT,
  getCurrentDemoUser,
  loginDemoUser,
  logoutDemoUser,
  registerDemoUser,
} from "@/lib/demo-auth";
import { formatCurrency, formatDateRange, paymentTone } from "@/lib/format";

type AuthMode = "login" | "register";

export function AccountShell({
  nextPath,
  paymentState,
  intent,
}: {
  nextPath: string | null;
  paymentState: string | null;
  intent: string | null;
}) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("login");
  const [currentUser, setCurrentUser] = useState<ReturnType<typeof getCurrentDemoUser>>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const syncUser = () => setCurrentUser(getCurrentDemoUser());

    syncUser();
    window.addEventListener(AUTH_CHANGE_EVENT, syncUser);
    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener(AUTH_CHANGE_EVENT, syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  const submitLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    startTransition(() => {
      const result = loginDemoUser(loginForm);

      if (!result.ok) {
        setError(result.message ?? "Connexion impossible.");
        return;
      }

      setCurrentUser(result.user ?? null);
      setSuccess("Connexion reussie.");

      if (nextPath) {
        router.push(nextPath);
      }
    });
  };

  const submitRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (
      !registerForm.firstName.trim() ||
      !registerForm.lastName.trim() ||
      !registerForm.email.trim() ||
      registerForm.password.length < 6
    ) {
      setError("Remplissez tous les champs et utilisez un mot de passe de 6 caracteres minimum.");
      return;
    }

    startTransition(() => {
      const result = registerDemoUser(registerForm);

      if (!result.ok) {
        setError(result.message ?? "Creation du compte impossible.");
        return;
      }

      setCurrentUser(result.user ?? null);
      setSuccess("Compte demo cree avec succes.");

      if (nextPath) {
        router.push(nextPath);
      }
    });
  };

  const signOut = () => {
    logoutDemoUser();
    setCurrentUser(null);
    setSuccess("Vous etes deconnecte.");
    setError("");
  };

  if (!currentUser) {
    return (
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm">
          <div className="inline-flex rounded-full bg-[var(--brand-50)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--brand-800)]">
            Compte demo
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[var(--ink-950)]">
            Connectez-vous ou creez un compte.
          </h1>
          <p className="mt-3 text-sm leading-6 text-[var(--ink-700)]">
            Ce parcours vous permet de tester l&apos;espace client, le panier et la finalisation demo.
          </p>

          <div className="mt-6 grid gap-3">
            {[
              "Creation de compte testable",
              "Connexion persistante dans le navigateur",
              "Retour automatique vers le parcours en cours",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--ink-800)]"
              >
                {item}
              </div>
            ))}
          </div>

          {intent === "checkout" ? (
            <div className="mt-6 rounded-2xl bg-[var(--brand-50)] px-4 py-4 text-sm font-medium text-[var(--brand-800)]">
              Connectez-vous pour continuer vers le paiement demo.
            </div>
          ) : null}
        </aside>

        <section className="rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setMode("login")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                mode === "login"
                  ? "bg-[var(--brand-800)] text-white"
                  : "border border-[var(--line)] bg-[var(--surface-muted)] text-[var(--ink-700)]"
              }`}
            >
              Connexion
            </button>
            <button
              onClick={() => setMode("register")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                mode === "register"
                  ? "bg-[var(--brand-800)] text-white"
                  : "border border-[var(--line)] bg-[var(--surface-muted)] text-[var(--ink-700)]"
              }`}
            >
              Creer un compte
            </button>
          </div>

          {mode === "login" ? (
            <form onSubmit={submitLogin} className="mt-6 grid gap-4">
              <input
                value={loginForm.email}
                onChange={(event) =>
                  setLoginForm((current) => ({ ...current, email: event.target.value }))
                }
                className="rounded-2xl border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3 outline-none"
                placeholder="Email"
                type="email"
              />
              <input
                value={loginForm.password}
                onChange={(event) =>
                  setLoginForm((current) => ({ ...current, password: event.target.value }))
                }
                className="rounded-2xl border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3 outline-none"
                placeholder="Mot de passe"
                type="password"
              />
              <button
                disabled={isPending}
                className="rounded-2xl bg-[var(--brand-800)] px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isPending ? "Connexion..." : "Se connecter"}
              </button>
            </form>
          ) : (
            <form onSubmit={submitRegister} className="mt-6 grid gap-4 md:grid-cols-2">
              <input
                value={registerForm.firstName}
                onChange={(event) =>
                  setRegisterForm((current) => ({ ...current, firstName: event.target.value }))
                }
                className="rounded-2xl border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3 outline-none"
                placeholder="Prenom"
              />
              <input
                value={registerForm.lastName}
                onChange={(event) =>
                  setRegisterForm((current) => ({ ...current, lastName: event.target.value }))
                }
                className="rounded-2xl border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3 outline-none"
                placeholder="Nom"
              />
              <input
                value={registerForm.email}
                onChange={(event) =>
                  setRegisterForm((current) => ({ ...current, email: event.target.value }))
                }
                className="rounded-2xl border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3 outline-none md:col-span-2"
                placeholder="Email"
                type="email"
              />
              <input
                value={registerForm.password}
                onChange={(event) =>
                  setRegisterForm((current) => ({ ...current, password: event.target.value }))
                }
                className="rounded-2xl border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3 outline-none md:col-span-2"
                placeholder="Mot de passe"
                type="password"
              />
              <button
                disabled={isPending}
                className="rounded-2xl bg-[var(--brand-800)] px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70 md:col-span-2"
              >
                {isPending ? "Creation..." : "Creer mon compte"}
              </button>
            </form>
          )}

          {error ? <div className="mt-4 text-sm font-medium text-[var(--danger-500)]">{error}</div> : null}
          {success ? <div className="mt-4 text-sm font-medium text-[var(--success-500)]">{success}</div> : null}
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-50)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--brand-800)]">
            <UserRound className="h-3.5 w-3.5" />
            Connecte
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[var(--ink-950)]">
            Bonjour {currentUser.firstName}
          </h1>
          <div className="mt-2 text-sm text-[var(--ink-700)]">{currentUser.email}</div>
        </div>

        <div className="flex flex-wrap gap-3">
          {nextPath ? (
            <button
              onClick={() => router.push(nextPath)}
              className="rounded-2xl border border-[var(--line)] px-4 py-3 text-sm font-semibold text-[var(--ink-900)]"
            >
              Reprendre mon parcours
            </button>
          ) : null}
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-2xl bg-[var(--ink-950)] px-4 py-3 text-sm font-semibold text-white"
          >
            <LogOut className="h-4 w-4" />
            Deconnexion
          </button>
        </div>
      </div>

      {paymentState === "success" ? (
        <div className="rounded-[24px] bg-[var(--brand-50)] px-5 py-4 text-sm font-medium text-[var(--brand-800)]">
          Paiement demo valide. Le parcours client est maintenant testable de bout en bout.
        </div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-3">
        {bookingRecords.map((booking) => (
          <article
            key={booking.reference}
            className="rounded-[24px] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-500)]">
              {booking.reference}
            </div>
            <div className="mt-2 text-xl font-semibold text-[var(--ink-950)]">
              {booking.destinationLabel}
            </div>
            <div className="mt-2 text-sm text-[var(--ink-700)]">{booking.hotelName}</div>
            <div className="mt-4 text-sm text-[var(--ink-700)]">
              {formatDateRange(booking.startDate, booking.endDate)}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${paymentTone(booking.paymentStatus)}`}
              >
                {booking.paymentStatus}
              </span>
              <span className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-semibold text-[var(--ink-800)]">
                Bonus {booking.bonusProgress}%
              </span>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="text-lg font-semibold text-[var(--ink-950)]">
                {formatCurrency(booking.totalPaid)}
              </div>
              <button className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-800)] px-4 py-2 text-sm font-semibold text-white">
                <Download className="h-4 w-4" />
                PDF
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
