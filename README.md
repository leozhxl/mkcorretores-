# MK Corretores — Riko Imobiliária

Site institucional e vitrine de imóveis da **Riko Imobiliária · MK Corretores**, em Balneário Gaivota e Sombrio (SC).

## Rodando o projeto

```bash
npm install
npm run dev
```

O site sobe em http://localhost:3000.

## Onde mexer

| O que você quer mudar | Arquivo |
|---|---|
| Nome, slogan, e-mail, WhatsApp, redes sociais | `lib/site.ts` |
| Cadastro dos imóveis (preço, fotos, descrição) | `lib/imoveis.ts` |
| Fotos dos imóveis | `public/imoveis/<id-do-imovel>/` |
| Cores e estilo do site | `app/globals.css` |

### Cadastrando um imóvel

1. Crie a pasta `public/imoveis/<id>/` e coloque as fotos numeradas: `1.jpg`, `2.jpg`, …
2. Acrescente um item na lista `imoveis` em `lib/imoveis.ts`, usando o mesmo `id`.
3. `destaque: true` faz o imóvel aparecer no carrossel de oportunidades da home.

## Envio dos leads por e-mail (opcional)

O formulário de contato funciona pelo WhatsApp sem nenhuma configuração.
Para receber os leads também por e-mail, copie `.env.example` para `.env.local`
e preencha as variáveis do Resend.

## Tecnologia

Next.js 16 (App Router), React 19 e TypeScript.
