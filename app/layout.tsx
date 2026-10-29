import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { MessageCircle } from 'lucide-react'
import { Cabecalho } from '@/components/cabecalho'
import { Rodape } from '@/components/rodape'
import { linkWhatsApp, site } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: `${site.nome} | ${site.slogan}`,
    template: `%s | ${site.nome}`,
  },
  description: 'Imóveis à venda e para alugar com atendimento direto, fotos próprias e documentação conferida.',
  openGraph: { siteName: site.nome, locale: 'pt_BR', type: 'website' },
}

export const viewport: Viewport = {
  themeColor: '#91375f',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <Cabecalho />
        <main>{children}</main>
        <Rodape />
        <div className="whatsapp-flutuante">
          {site.whatsappLocacao.numero && (
            <a href={linkWhatsApp('Olá, gostaria de falar sobre locação.', 'locacao')} target="_blank" rel="noreferrer">
              <MessageCircle size={19} /> <span>Locação</span>
            </a>
          )}
          <a href={linkWhatsApp('Olá, vim pelo site e gostaria de atendimento.')} target="_blank" rel="noreferrer">
            <MessageCircle size={19} /> <span>{site.whatsappLocacao.numero ? 'Vendas' : 'Fale conosco'}</span>
          </a>
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
