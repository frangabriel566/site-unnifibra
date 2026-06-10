"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Wifi, Lock, Mail, Info } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Preencha e-mail e senha para continuar.");
      return;
    }

    // Autenticação simulada/local. Futuramente substituir por
    // Supabase Auth, Firebase Auth ou NextAuth.
    localStorage.setItem("unnifibra_admin_auth", "true");
    router.push("/admin");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050b18] px-4">
      <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-blue-700/20 blur-3xl" />

      <div className="glass relative w-full max-w-md rounded-3xl p-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-brand-primary shadow-lg shadow-sky-500/30">
            <Wifi className="h-7 w-7 text-white" />
          </div>
          <h1 className="mt-4 text-2xl font-extrabold text-white">
            {siteConfig.general.companyName}
          </h1>
          <p className="text-sm text-slate-400">Painel administrativo</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-200">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@unnifibra.com.br"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 outline-none focus:border-sky-400"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-200">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 outline-none focus:border-sky-400"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-sky-400 to-brand-primary py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/30 transition-all hover:brightness-110"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 flex items-start gap-2 rounded-xl border border-sky-400/20 bg-sky-400/5 p-3 text-xs text-sky-200">
          <Info className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <p>
            Esta é uma autenticação simulada para fins de demonstração. A
            integração com autenticação real (Supabase, Firebase ou NextAuth)
            poderá ser feita futuramente.
          </p>
        </div>
      </div>
    </div>
  );
}
