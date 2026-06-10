"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AdminCard({
  title,
  description,
  children,
  className,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-slate-200 bg-white p-6 shadow-sm", className)}>
      {title && <h3 className="text-lg font-bold text-slate-900">{title}</h3>}
      {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      <div className={cn(title || description ? "mt-4" : "")}>{children}</div>
    </div>
  );
}

export function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-1.5 text-sm", className)}>
      <span className="font-medium text-slate-700">{label}</span>
      {children}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-100",
        props.className
      )}
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-100",
        props.className
      )}
    />
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-6 w-11 rounded-full transition-colors",
          checked ? "bg-sky-500" : "bg-slate-300"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
            checked ? "translate-x-5" : "translate-x-0.5"
          )}
        />
      </button>
      {label && <span className="text-sm font-medium text-slate-700">{label}</span>}
    </label>
  );
}

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "ghost";
}) {
  const variants: Record<string, string> = {
    primary: "bg-sky-500 text-white hover:bg-sky-600",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
  };

  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-50",
        variants[variant],
        className
      )}
    >
      {children}
    </button>
  );
}

export function Badge({ children, tone = "slate" }: { children: ReactNode; tone?: "slate" | "green" | "red" | "yellow" }) {
  const tones: Record<string, string> = {
    slate: "bg-slate-100 text-slate-600",
    green: "bg-emerald-100 text-emerald-700",
    red: "bg-red-100 text-red-700",
    yellow: "bg-yellow-100 text-yellow-700",
  };
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", tones[tone])}>
      {children}
    </span>
  );
}
