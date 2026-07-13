"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import TextReveal from "@/app/components/ui/TextReveal";
import MagneticButton from "@/app/components/ui/MagneticButton";
import { useDict } from "@/app/lib/i18n/LocaleContext";

type FormState = { name: string; email: string; message: string };
type SubmitStatus = "idle" | "loading" | "success" | "error";

const INITIAL_FORM: FormState = { name: "", email: "", message: "" };

const SOCIALS = [
  { label: "GitHub",   href: "https://github.com/AlexTrish" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/alextrish/" },
];

type RippleItem = { id: number; x: number; y: number };

function CursorLightButton({ loading, label }: { loading: boolean; label: string }): React.JSX.Element {
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });
  const [ripples, setRipples] = useState<RippleItem[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setLightPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
  };

  return (
    <button
      type="submit"
      disabled={loading}
      data-cursor="send"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      className="relative overflow-hidden rounded-2xl"
      style={{
        marginTop: "0.5rem", padding: "1.25rem",
        background: "#111", border: "1px solid rgba(255,255,255,0.08)",
        color: "#fff", fontSize: "0.875rem", fontWeight: 500,
        letterSpacing: "0.04em", fontFamily: '"Space Grotesk", sans-serif',
        opacity: loading ? 0.6 : 1, transition: "opacity 0.2s", width: "100%",
      }}
      aria-label="Send message"
    >
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        animate={{ background: `radial-gradient(circle at ${lightPos.x}% ${lightPos.y}%, rgba(184,255,59,0.18) 0%, rgba(0,0,0,0) 55%)` }}
        transition={{ duration: 0.08 }}
      />
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          className="absolute rounded-full pointer-events-none"
          style={{ left: r.x, top: r.y, translateX: "-50%", translateY: "-50%", background: "rgba(184,255,59,0.25)" }}
          initial={{ width: 0, height: 0, opacity: 0.8 }}
          animate={{ width: 300, height: 300, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
      <span className="relative z-10 flex items-center justify-center" style={{ gap: "0.5rem" }}>
        {loading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              style={{ width: "14px", height: "14px", border: "1px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%" }}
            />
            {label}
          </>
        ) : label}
      </span>
    </button>
  );
}

export default function Contact(): React.JSX.Element {
  const { dict } = useDict();
  const t = dict.contact;

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-8%" });
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = t.fields.nameErr;
    if (!form.email.trim()) e.email = t.fields.emailErr;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t.fields.emailInvalid;
    if (!form.message.trim()) e.message = t.fields.messageErr;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || status === "loading") return;
    setStatus("loading");
    try {
      await new Promise((r) => setTimeout(r, 1500));
      setStatus("success");
      setForm(INITIAL_FORM);
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof FormState]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "transparent", border: "none",
    borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "1rem 0",
    fontSize: "0.875rem", color: "rgba(255,255,255,0.8)",
    fontFamily: '"Space Grotesk", sans-serif', outline: "none", transition: "border-color 0.25s",
  };

  const FIELDS = [
    { key: "name"    as const, label: t.fields.name,    ph: t.fields.namePh    },
    { key: "email"   as const, label: t.fields.email,   ph: t.fields.emailPh   },
    { key: "message" as const, label: t.fields.message, ph: t.fields.messagePh },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden"
      style={{ padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 4rem)" }}
      aria-label="Contact"
    >
      <div
        className="absolute pointer-events-none"
        style={{ bottom: 0, left: "50%", transform: "translateX(-50%)", width: "600px", height: "350px", background: "radial-gradient(ellipse at center, rgba(184,255,59,0.04) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="flex flex-col md:grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem, 8vw, 6rem)" }}>
        {/* Left */}
        <div className="flex flex-col justify-between" style={{ gap: "3rem" }}>
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="font-caption"
              style={{ marginBottom: "1.5rem" }}
            >
              {t.label}
            </motion.p>
            <TextReveal>
              <h2
                className="font-display"
                style={{ fontSize: "clamp(2.8rem, 6.5vw, 7.5rem)", letterSpacing: "-0.04em", lineHeight: 0.9, color: "#f5f5f5" }}
              >
                {t.title1}
                <br />
                <span style={{ color: "rgba(255,255,255,0.18)" }}>{t.title2}</span>
                {t.title3 && <><br />{t.title3}</>}
              </h2>
            </TextReveal>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex flex-col"
            style={{ gap: "2rem" }}
          >
            <p className="font-editorial" style={{ fontSize: "0.85rem", lineHeight: 1.75, color: "rgba(255,255,255,0.38)", maxWidth: "22rem" }}>
              {t.subtitle}
            </p>

            <MagneticButton href="mailto:alextrishwork@gmail.com" aria-label="Send email" className="inline-flex items-center" style={{ gap: "1rem" }}>
              <span className="font-display" style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.35rem)", letterSpacing: "-0.02em", color: "#f5f5f5" }}>
                alextrishwork@gmail.com
              </span>
              <div className="flex items-center justify-center rounded-full" style={{ width: "2.25rem", height: "2.25rem", border: "1px solid rgba(255,255,255,0.15)", flexShrink: 0 }}>
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </MagneticButton>

            <div className="flex" style={{ gap: "1.5rem" }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-caption"
                  style={{ color: "rgba(255,255,255,0.28)", transition: "color 0.2s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#f5f5f5")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.28)")}
                  aria-label={`Visit ${s.label}`}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center"
              style={{ height: "100%", gap: "1.5rem", padding: "4rem 0" }}
            >
              <div className="flex items-center justify-center rounded-full" style={{ width: "4rem", height: "4rem", background: "rgba(184,255,59,0.08)", border: "1px solid rgba(184,255,59,0.3)" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="font-display" style={{ fontSize: "1.75rem", letterSpacing: "-0.03em", color: "#f5f5f5" }}>{t.successTitle}</p>
              <p className="font-caption" style={{ textAlign: "center" }}>{t.successSub}</p>
              <button
                onClick={() => setStatus("idle")}
                className="font-caption"
                style={{ color: "rgba(255,255,255,0.35)", marginTop: "1rem", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#f5f5f5")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)")}
              >
                {t.sendAnother}
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col" style={{ gap: "2rem" }} aria-label="Contact form">
              {FIELDS.map(({ key, label, ph }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.35 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col"
                  style={{ gap: "0.5rem" }}
                >
                  <label htmlFor={key} className="font-caption" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {label}
                  </label>
                  {key === "message" ? (
                    <textarea id={key} name={key} value={form[key]} onChange={handleChange} placeholder={ph} rows={5} style={{ ...inputStyle, resize: "none" }} aria-invalid={!!errors[key]} />
                  ) : (
                    <input id={key} name={key} type={key === "email" ? "email" : "text"} value={form[key]} onChange={handleChange} placeholder={ph} style={inputStyle} aria-invalid={!!errors[key]} autoComplete={key} />
                  )}
                  {errors[key] && <span className="font-caption" style={{ color: "rgba(248,113,113,0.8)" }}>{errors[key]}</span>}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                <CursorLightButton loading={status === "loading"} label={status === "loading" ? t.sending : t.send} />
              </motion.div>

              {status === "error" && (
                <p className="font-caption" style={{ color: "rgba(248,113,113,0.8)", textAlign: "center" }}>
                  {t.errorMsg}
                </p>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
