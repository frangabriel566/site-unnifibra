import { MapPin, Mail, Phone } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

const QUICK_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Promoção", href: "#promocao" },
  { label: "Planos", href: "#planos" },
  { label: "Benefícios", href: "#beneficios" },
  { label: "Cobertura", href: "#cobertura" },
  { label: "Fidelidade", href: "#fidelidade" },
  { label: "Dúvidas", href: "#duvidas" },
];

export default function Footer() {
  const { general } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer id="contato" className="relative border-t border-white/5 bg-[#03070f] py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-4">
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
              <li className="flex items-start justify-center gap-2 sm:justify-start">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-400" />
                <span>
                  <strong className="text-white">Luzilândia:</strong> Rua José de Melo, Nº 911,
                  Centro, Luzilândia - PI
                </span>
              </li>
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <Phone className="h-4 w-4 flex-shrink-0 text-sky-400" />
                Luzilândia: 86 98160-8566
              </li>
              <li className="flex items-start justify-center gap-2 sm:justify-start">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-400" />
                <span>
                  <strong className="text-white">Esperantina:</strong> Avenida Petrônio Portela,
                  Nº 1874, ao lado do Orra Açaí, Esperantina - PI
                </span>
              </li>
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <Phone className="h-4 w-4 flex-shrink-0 text-sky-400" />
                Esperantina: 86 99936-4046
              </li>
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <Mail className="h-4 w-4 flex-shrink-0 text-sky-400" />
                {general.email}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white">Informações</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li className="font-semibold text-slate-300">{general.legalName}</li>
              <li>CNPJ: {general.cnpj}</li>
              <li className="mt-3 font-semibold text-slate-300">Horário de Funcionamento</li>
              <li>{general.attendanceHours}</li>
            </ul>
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/Anatel.png"
              alt="Selo de autorização ANATEL"
              className="h-24 w-auto lg:h-32"
            />
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-6 text-center text-sm text-slate-500">
          © {year} {general.companyName}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
