"use client";

import { useState, useTransition } from "react";
import { getCurrentDemoUser } from "@/lib/demo-auth";

const defaultTopic = "demande_information";

export function SupportForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState(() => ({
    email: getCurrentDemoUser()?.email ?? "",
    subject: "",
    topic: defaultTopic,
    bookingReference: "",
    message: "",
  }));

  const submitTicket = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    startTransition(async () => {
      const response = await fetch("/api/support/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as { message?: string; reference?: string; error?: string };

      if (!response.ok) {
        setError("Le ticket n'a pas pu etre envoye. Verifiez les champs.");
        return;
      }

      setSuccess(`Ticket ${payload.reference} cree avec succes.`);
      setForm((current) => ({
        ...current,
        subject: "",
        bookingReference: "",
        message: "",
        topic: defaultTopic,
      }));
    });
  };

  return (
    <form onSubmit={submitTicket} className="mt-5 grid gap-4">
      <input
        value={form.email}
        onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
        className="rounded-2xl border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3 outline-none"
        placeholder="Email"
        type="email"
      />
      <input
        value={form.subject}
        onChange={(event) => setForm((current) => ({ ...current, subject: event.target.value }))}
        className="rounded-2xl border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3 outline-none"
        placeholder="Sujet"
      />
      <select
        value={form.topic}
        onChange={(event) => setForm((current) => ({ ...current, topic: event.target.value }))}
        className="rounded-2xl border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3 outline-none"
      >
        <option value="probleme_paiement">Probleme de paiement</option>
        <option value="modification_reservation">Modification reservation</option>
        <option value="annulation">Annulation</option>
        <option value="probleme_activite">Probleme activite</option>
        <option value="probleme_hotel">Probleme hotel</option>
        <option value="demande_information">Demande d&apos;information</option>
        <option value="autre">Autre</option>
      </select>
      <input
        value={form.bookingReference}
        onChange={(event) =>
          setForm((current) => ({ ...current, bookingReference: event.target.value }))
        }
        className="rounded-2xl border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3 outline-none"
        placeholder="Reference de reservation (optionnel)"
      />
      <textarea
        value={form.message}
        onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
        className="min-h-40 rounded-2xl border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3 outline-none"
        placeholder="Expliquez votre demande"
      />
      <button
        disabled={isPending}
        className="rounded-2xl bg-[var(--brand-800)] px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? "Envoi..." : "Envoyer au support"}
      </button>
      {error ? <div className="text-sm font-medium text-[var(--danger-500)]">{error}</div> : null}
      {success ? <div className="text-sm font-medium text-[var(--success-500)]">{success}</div> : null}
    </form>
  );
}
