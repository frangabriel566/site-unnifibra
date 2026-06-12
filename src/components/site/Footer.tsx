import { Instagram, Facebook, Youtube, Linkedin } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import Logo from "./Logo";

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
        <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
          <div className="flex flex-col items-center lg:items-start">
            <div className="flex items-center rounded-xl bg-white/95 px-3 py-2 w-fit">
              <Logo height={36} />
            </div>
            <p className="mt-4 max-w-sm text-sm text-slate-400">{general.description}</p>
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

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/Anatel.png"
            alt="Selo de autorização ANATEL"
            className="h-24 w-auto lg:h-28"
          />
        </div>

        <div className="mt-12 border-t border-white/5 pt-6 text-center text-sm text-slate-500">
          © {year} {general.companyName}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
