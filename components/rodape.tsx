import Link from 'next/link'
import { AtSign, Globe, Mail, MapPin, Phone } from 'lucide-react'
import { cidadesComTotal } from '@/lib/imoveis'
import { linkWhatsApp, site } from '@/lib/site'

export function Rodape() {
  const cidades = cidadesComTotal()

  return (
    <footer className="rodape">
      <div className="container">
        <div className="rodape-grade">
          <div className="rodape-marca">
            <div className="logo"><img className="logo-marca" src="/logo.png" alt="" width={68} height={68} /><span><strong>{site.nome}</strong><small>{site.slogan}</small></span></div>
            <p>Imóveis visitados e documentados pela nossa equipe, com atendimento direto do primeiro contato à assinatura do contrato.</p>
            <div className="rodape-redes">
              {site.instagram && <a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><AtSign size={17} /></a>}
              {site.facebook && <a href={site.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Globe size={17} /></a>}
              <a href={`mailto:${site.email}`} aria-label="E-mail"><Mail size={17} /></a>
            </div>
          </div>

          <div className="rodape-col">
            <h3>{site.nome}</h3>
            <Link href="/sobre">Quem somos</Link>
            <Link href="/contato">Fale conosco</Link>
            <Link href="/anuncie">Anuncie seu imóvel</Link>
            <Link href="/favoritos">Favoritos</Link>
          </div>

          <div className="rodape-col">
            <h3>Imóveis</h3>
            <Link href="/imoveis?finalidade=Comprar">Imóveis para comprar</Link>
            <Link href="/imoveis?finalidade=Alugar">Imóveis para alugar</Link>
            <Link href="/imoveis">Todos os imóveis</Link>
            {cidades.map((item) => <Link key={item.cidade} href={`/imoveis?cidade=${encodeURIComponent(item.cidade)}`}>Imóveis em {item.cidade}</Link>)}
          </div>

          <div className="rodape-col">
            <h3>Contato</h3>
            <a href={`mailto:${site.email}`}><Mail size={14} /> {site.email}</a>
            {site.telefone && <a href={`tel:${site.telefone.replace(/\D/g, '')}`}><Phone size={14} /> {site.telefone}</a>}
            <a href={linkWhatsApp('Olá, vim pelo site e gostaria de atendimento.')} target="_blank" rel="noreferrer">WhatsApp Vendas · {site.whatsappVendas.exibicao}</a>
            {site.whatsappLocacao.numero && <a href={linkWhatsApp('Olá, gostaria de falar sobre locação.', 'locacao')} target="_blank" rel="noreferrer">WhatsApp Locação · {site.whatsappLocacao.exibicao}</a>}
            {site.endereco && <span><MapPin size={14} /> {site.endereco}</span>}
          </div>
        </div>

        <div className="rodape-base">
          <span>© {new Date().getFullYear()} {site.nome}</span>
          {site.creci && <span className="creci">CRECI {site.creci}</span>}
          <Link href="/contato">Política de privacidade</Link>
        </div>
      </div>
    </footer>
  )
}
