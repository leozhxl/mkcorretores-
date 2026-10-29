import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Bath, BedDouble, Building2, Car, Check, Hash, MapPin, Maximize, MessageCircle, Ruler, Tag } from 'lucide-react'
import { BotaoFavorito } from '@/components/botao-favorito'
import { GaleriaImovel } from '@/components/galeria-imovel'
import { formatarArea, formatarPreco, getImovel, imoveis, localizacao } from '@/lib/imoveis'
import { linkWhatsApp, site } from '@/lib/site'
import { BotaoVoltar } from '@/components/botao-voltar'

export function generateStaticParams() {
  return imoveis.map((imovel) => ({ id: imovel.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const imovel = getImovel(id)
  if (!imovel) return {}

  const titulo = `${imovel.tipo} ${imovel.finalidade === 'Alugar' ? 'para alugar' : 'à venda'} em ${imovel.cidade} - ${imovel.estado}`
  const descricao = `${formatarPreco(imovel.preco, imovel.finalidade)} · ${localizacao(imovel)} · Cód. ${imovel.codigo}. ${imovel.descricao.slice(0, 130)}…`

  return { title: titulo, description: descricao, openGraph: { title: titulo, description: descricao, images: [imovel.fotos[0]] } }
}

export default async function ImovelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const imovel = getImovel(id)

  if (!imovel) notFound()

  const mensagem = `Olá, tenho interesse no imóvel cód. ${imovel.codigo} (${imovel.titulo} — ${localizacao(imovel)}) que vi no site.`
  const canal = imovel.finalidade === 'Alugar' ? 'locacao' : 'vendas'

  const specs = [
    imovel.areaTotal !== null && { icone: <Ruler size={18} />, rotulo: 'Área total', valor: formatarArea(imovel.areaTotal) },
    imovel.areaConstruida !== null && { icone: <Maximize size={18} />, rotulo: 'Área construída', valor: formatarArea(imovel.areaConstruida) },
    imovel.dormitorios !== null && { icone: <BedDouble size={18} />, rotulo: 'Dormitórios', valor: `${imovel.dormitorios}${imovel.suites ? ` (${imovel.suites} suíte${imovel.suites > 1 ? 's' : ''})` : ''}` },
    imovel.banheiros !== null && { icone: <Bath size={18} />, rotulo: 'Banheiros', valor: String(imovel.banheiros) },
    imovel.vagas !== null && { icone: <Car size={18} />, rotulo: 'Vagas', valor: String(imovel.vagas) },
    { icone: <Tag size={18} />, rotulo: 'Tipo', valor: imovel.tipo },
    { icone: <Building2 size={18} />, rotulo: 'Finalidade', valor: imovel.finalidade === 'Comprar' ? 'Venda' : 'Locação' },
    { icone: <MapPin size={18} />, rotulo: 'Cidade', valor: `${imovel.cidade} - ${imovel.estado}` },
    { icone: <Hash size={18} />, rotulo: 'Código', valor: imovel.codigo },
  ].filter(Boolean) as { icone: React.ReactNode; rotulo: string; valor: string }[]

  return <>
    <section className="pagina-topo">
      <div className="container">
        <BotaoVoltar />
        <nav className="migalhas" aria-label="Você está em">
          <Link href="/">Início</Link> <span>/</span>
          <Link href={`/imoveis?finalidade=${imovel.finalidade}`}>{imovel.finalidade === 'Alugar' ? 'Alugar' : 'Comprar'}</Link> <span>/</span>
          <Link href={`/imoveis?cidade=${encodeURIComponent(imovel.cidade)}`}>{imovel.cidade}</Link> <span>/</span>
          <span>Cód. {imovel.codigo}</span>
        </nav>
        <h1>{imovel.titulo}</h1>
        <p><MapPin size={14} /> {localizacao(imovel)}</p>
      </div>
    </section>

    <div className="container">
      <div className="ficha">
        <div>
          <GaleriaImovel fotos={imovel.fotos} titulo={imovel.titulo} />

          <div className="ficha-bloco">
            <h2>Sobre o imóvel</h2>
            <p>{imovel.descricao}</p>
          </div>

          <div className="ficha-bloco">
            <h2>Características do imóvel</h2>
            <div className="ficha-specs">
              {specs.map((spec) => <div key={spec.rotulo}>{spec.icone}<span>{spec.rotulo}</span><strong>{spec.valor}</strong></div>)}
            </div>
          </div>

          {imovel.caracteristicas.length > 0 && (
            <div className="ficha-bloco">
              <h2>Diferenciais</h2>
              <ul className="ficha-caracteristicas">
                {imovel.caracteristicas.map((item) => <li key={item}><Check size={15} /> {item}</li>)}
              </ul>
            </div>
          )}

          <div className="ficha-bloco ficha-mapa">
            <h2>Localização</h2>
            <p style={{ marginBottom: 14 }}>{localizacao(imovel)}</p>
            <iframe
              title={`Mapa — ${imovel.titulo}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(imovel.mapa)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {imovel.fotos.length > 1 && (
            <div className="ficha-bloco">
              <h2>Todas as fotos <small>({imovel.fotos.length})</small></h2>
              <GaleriaImovel fotos={imovel.fotos} titulo={imovel.titulo} variante="grade" />
            </div>
          )}
        </div>

        <aside className="ficha-lateral">
          <span className="selo selo-finalidade" style={{ alignSelf: 'flex-start' }}>{imovel.finalidade === 'Comprar' ? 'VENDA' : 'LOCAÇÃO'}</span>
          <span className="preco">
            {formatarPreco(imovel.preco, imovel.finalidade)}
            {imovel.preco === null && <small>Entre em contato para receber o valor</small>}
          </span>

          {(imovel.condominio !== null || imovel.iptu !== null) && (
            <div className="custos">
              {imovel.condominio !== null && <div><span>Condomínio</span><span>{formatarPreco(imovel.condominio)}</span></div>}
              {imovel.iptu !== null && <div><span>IPTU</span><span>{formatarPreco(imovel.iptu)}</span></div>}
            </div>
          )}

          <div className="corretor">
            <img className="corretor-marca" src="/logo.png" alt="" width={44} height={44} />
            <span><strong>{site.nome}</strong><span>Atendimento direto</span></span>
          </div>

          <a className="botao botao-whatsapp" href={linkWhatsApp(mensagem, canal)} target="_blank" rel="noreferrer">
            <MessageCircle size={17} /> Falar no WhatsApp
          </a>
          <a className="botao botao-contorno" href={`mailto:${site.email}?subject=${encodeURIComponent(`Interesse no imóvel ${imovel.codigo}`)}`}>Enviar e-mail</a>
          <BotaoFavorito id={imovel.id} />
          <span className="codigo">Código do imóvel: {imovel.codigo}</span>
        </aside>
      </div>
    </div>
  </>
}
