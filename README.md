# UNNIFIBRA — Site institucional + Painel administrativo

Site comercial em Next.js (App Router) + TypeScript + Tailwind CSS + Framer
Motion + Lucide React, com painel administrativo (`/admin`) para editar todo
o conteúdo do site.

## 1. Rodar localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) para o site, e
[http://localhost:3000/admin/login](http://localhost:3000/admin/login) para o
painel administrativo (qualquer e-mail/senha funciona — autenticação
simulada).

Build de produção:

```bash
npm run build
npm run start
```

## 2. Subir para o GitHub

```bash
git init   # se ainda não houver repositório
git add .
git commit -m "Site UNNIFIBRA"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/unnifibra.git
git push -u origin main
```

## 3. Publicar na Vercel

1. Acesse [vercel.com](https://vercel.com) e clique em **New Project**.
2. Importe o repositório do GitHub.
3. Mantenha as configurações padrão (Next.js é detectado automaticamente).
4. Clique em **Deploy**.
5. Configure variáveis de ambiente, se necessário, em
   **Project Settings → Environment Variables**.

## 4. Onde editar cada coisa

Todo o conteúdo do site está centralizado em
[`src/config/siteConfig.ts`](src/config/siteConfig.ts). O painel
administrativo (`/admin`) edita os mesmos dados em tempo real (salvos em
`localStorage` por enquanto).

| O que alterar | Onde |
| --- | --- |
| Nome da empresa, slogan, descrição | `siteConfig.general` ou Admin → Configurações gerais |
| Logo | Substitua `public/logo.png` e, se mudar o caminho, atualize `siteConfig.general.logo` |
| WhatsApp | `siteConfig.general.whatsappNumber` ou Admin → Configurações gerais |
| Planos e preços | `siteConfig.plans` ou Admin → Planos |
| Promoção | `siteConfig.promotion` ou Admin → Promoção |
| Fidelidade | `siteConfig.loyalty` ou Admin → Fidelidade |
| Benefícios / diferenciais | `siteConfig.benefits` / `siteConfig.differentials` ou Admin → Benefícios |
| Depoimentos | `siteConfig.testimonials` ou Admin → Depoimentos |
| FAQ | `siteConfig.faq` ou Admin → FAQ |
| Redes sociais | `siteConfig.social` ou Admin → Redes sociais |
| Cores da marca | `siteConfig.appearance` ou Admin → Aparência (também ajuste as variáveis CSS em `src/app/globals.css`) |
| SEO (title, description, OG, robots) | `siteConfig.seo` ou Admin → SEO |
| Google Ads | `siteConfig.googleAds` ou Admin → Google Ads |
| Google Analytics (GA4) | `siteConfig.analytics` ou Admin → Analytics |
| Meta Pixel / TikTok Pixel | `siteConfig.metaPixel` / `siteConfig.tiktokPixel` ou Admin → Integrações |
| GitHub / Vercel | `siteConfig.github` ou Admin → GitHub e Deploy |

## 5. Logo

A logo oficial da UNNIFIBRA é usada em todo o site através do componente
[`src/components/site/Logo.tsx`](src/components/site/Logo.tsx), que renderiza
`siteConfig.general.logo` (`public/logo.png`) com `next/image`. Ela aparece
no Header, no card visual da Hero, no Footer e na tela de login do painel
administrativo, sempre dentro de um cartão claro para manter o contraste com
o fundo escuro.

Para trocar a logo:

1. Salve o novo arquivo em `public/logo.png` (recomendado: PNG com fundo
   transparente).
2. Se o caminho/nome do arquivo mudar, atualize `siteConfig.general.logo`.
3. O componente `<Logo height={...} />` ajusta a largura automaticamente
   mantendo a proporção — não é necessário editar Header, Hero, Footer ou
   login novamente.
4. Para o favicon, o mesmo arquivo `public/logo.png` já é referenciado em
   `src/app/layout.tsx` (`icons.icon` e `icons.apple`); para um favicon
   `.ico` tradicional, substitua também `src/app/favicon.ico`.

## 6. Google Ads, Analytics, Meta Pixel e TikTok Pixel

Os scripts de tracking só são carregados quando ativados e com IDs
preenchidos (`siteConfig.googleAds.enabled`, `siteConfig.analytics.enabled`,
etc). Configure pelo Admin → Google Ads / Analytics / Integrações, ou
diretamente em `siteConfig.ts`. Os scripts são injetados em
[`src/app/layout.tsx`](src/app/layout.tsx) e os eventos são disparados via
[`src/lib/analytics.ts`](src/lib/analytics.ts) → `trackEvent(...)`.

Eventos disparados automaticamente pelos botões: `whatsapp_click`,
`plan_whatsapp_click`, `coverage_whatsapp_click`, `promotion_whatsapp_click`,
`loyalty_whatsapp_click`.

## 7. Preparar integração futura com Supabase / banco de dados

A estrutura já está pronta para isso:

- [`src/types/index.ts`](src/types/index.ts) define os tipos de todas as
  entidades (`Plan`, `Benefit`, `Testimonial`, `FAQItem`, etc).
- [`src/config/siteConfig.ts`](src/config/siteConfig.ts) tem o mesmo formato
  que futuramente viria do banco — basta substituir o `import siteConfig` por
  uma chamada a uma API/server action que retorna os mesmos tipos.
- [`src/components/admin/AdminConfigContext.tsx`](src/components/admin/AdminConfigContext.tsx)
  centraliza toda leitura/escrita de configuração do painel. Para conectar a
  um banco real (Supabase, PostgreSQL + Prisma), basta trocar a leitura do
  `localStorage` e a função `updateConfig` por chamadas a uma API.

## 8. Proteger o painel administrativo no futuro

Hoje o `/admin` usa uma autenticação simulada (`localStorage`). Para produção,
recomenda-se:

- **NextAuth** ou **Supabase Auth** para login real (e-mail/senha, magic link
  ou OAuth).
- Proteger as rotas `/admin/**` com um `middleware.ts` que verifica a sessão
  no servidor.
- Mover os tokens de API (GitHub, Vercel) para variáveis de ambiente no
  servidor — nunca no frontend (já há um aviso disso em Admin → GitHub e
  Deploy).

## 9. Evitar erros de build na Vercel

- Rode `npm run build` localmente antes de cada push — o projeto já está
  configurado para passar em `next build` e `npm run lint` sem erros.
- Não remova os tipos em `src/types/index.ts` sem atualizar
  `src/config/siteConfig.ts` (eles são fortemente tipados).
- Variáveis de ambiente sensíveis (tokens) devem ser configuradas em
  **Vercel → Project Settings → Environment Variables**, nunca commitadas.
- O ESLint do projeto está configurado com as regras do `eslint-config-next`;
  rode `npm run lint` antes de subir alterações.

## 10. Estrutura do projeto

```
src/
  app/
    page.tsx            # Página inicial
    layout.tsx          # Layout raiz + scripts de tracking
    globals.css
    robots.ts
    sitemap.ts
    admin/
      page.tsx          # Painel administrativo (protegido)
      login/page.tsx    # Tela de login (simulada)
  components/
    site/               # Header, Hero, Promotion, Plans, etc.
    admin/              # Sidebar, Layout, Dashboard, formulários de gestão
  config/
    siteConfig.ts       # Todos os dados editáveis do site
  lib/
    whatsapp.ts         # generateWhatsAppLink()
    analytics.ts        # trackEvent()
    utils.ts
  types/
    index.ts            # Tipos compartilhados
```

## Dados fictícios a substituir

Os seguintes dados são **fictícios** e devem ser substituídos pelos dados
reais da UNNIFIBRA assim que disponíveis (em `siteConfig.ts`):

- `general.whatsappNumber`, `general.email`, `general.phone`,
  `general.address`, `general.cnpj`
- `social.*` (Instagram, Facebook, TikTok, YouTube, LinkedIn)
- Logo (`public/logo.svg` / `general.logo`)
- Cores em `appearance` e em `src/app/globals.css`
