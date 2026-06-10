import { Instagram, Facebook, Youtube, Linkedin, MapPin, Mail, Phone } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import Logo from "./Logo";

const QUICK_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Promoção", href: "#promocao" },
  { label: "Planos", href: "#planos" },
  { label: "Benefícios", href: "#beneficios" },
  { label: "Cobertura", href: "#cobertura" },
  { label: "Fidelidade", href: "#fidelidade" },
  { label: "Dúvidas", href: "#duvidas" },
];

// Ícone simples do TikTok (não disponível na lucide-react)
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.6 5.82c-.94-.66-1.58-1.66-1.78-2.82h-3.04v13.07c0 1.36-1.1 2.46-2.46 2.46a2.46 2.46 0 0 1-2.46-2.46c0-1.36 1.1-2.46 2.46-2.46.27 0 .53.04.78.12v-3.13a5.6 5.6 0 0 0-.78-.06A5.6 5.6 0 0 0 3.5 16c0 3.09 2.51 5.6 5.6 5.6s5.6-2.51 5.6-5.6V8.78a8.5 8.5 0 0 0 4.96 1.59V7.33c-.99 0-1.95-.32-2.74-.92-.13-.1-.5-.41-.32-.59z" />
    </svg>
  );
}

export default function Footer() {
  const { general, social } = siteConfig;
  const year = new Date().getFullYear();

  const socialLinks = [
    { href: social.instagram, icon: Instagram, label: "Instagram" },
    { href: social.facebook, icon: Facebook, label: "Facebook" },
    { href: social.tiktok, icon: TikTokIcon, label: "TikTok" },
    { href: social.youtube, icon: Youtube, label: "YouTube" },
    { href: social.linkedin, icon: Linkedin, label: "LinkedIn" },
  ];

  return (
    <footer id="contato" className="relative border-t border-white/5 bg-[#03070f] py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-brand-primary shadow-lg shadow-sky-500/30">
                <Wifi className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                {general.companyName.slice(0, 4)}
                <span className="text-gradient">{general.companyName.slice(4)}</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-slate-400">{general.description}</p>
            <div className="mt-5 flex gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-300 transition-colors hover:bg-sky-400/20 hover:text-sky-400"
                >
                  <item.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white">Links rápidos</h3>
            <ul className="mt-4 space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-sky-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white">Contato</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-400" />
                {general.address}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-sky-400" />
                {general.phone}
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-sky-400" />
                {general.email}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white">Informações</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li>{general.attendanceHours}</li>
              <li>CNPJ: {general.cnpj}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-6 text-center text-sm text-slate-500">
          © {year} {general.companyName}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
