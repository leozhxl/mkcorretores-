import Link from 'next/link'
import type { Metadata } from 'next'
import { Camera, FileCheck, Handshake, Megaphone } from 'lucide-react'
import { FormularioContato } from '@/components/formulario-contato'
import { site } from '@/lib/site'
import { BotaoVoltar } from '@/components/botao-voltar'

export const metadata: Metadata = {
  title: 'Anuncie seu imóvel',
  description: 'Avaliação sem compromisso, fotos próprias e divulgação para quem realmente procura.',
}

const etapas = [
  { icone: <Handshake size={24} />, titulo: 'Avaliação sem compromisso', texto: 'Visitamos o imóvel e apresentamos um valor de mercado baseado no que está sendo negociado na região.' },
  { icone: <Camera size={24} />, titulo: 'Fotos e anúncio', texto: 'Fotografamos o imóvel e montamos o anúncio completo, com metragem, características e localização.' },
  { icone: <FileCheck size={24} />, titulo: 'Documentação conferida', texto: 'Revisamos matrícula, certidões e pendências antes de colocar o imóvel à venda, evitando surpresas na negociação.' },
  { icone: <Megaphone size={24} />, titulo: 'Divulgação e visitas', texto: 'Apresentamos o imóvel aos interessados, acompanhamos cada visita e levamos as propostas até você.' },
]

export default async function AnunciePage({ searchParams }: { searchParams: Promise<{ tipo?: string }> }) {
  const { tipo } = await searchParams

  return <>
    <section className="pagina-topo">
      <div className="container">
        <BotaoVoltar />
        <nav className="migalhas"><Link href="/">Início</Link> <span>/</span> <span>Anuncie seu imóvel</span></nav>
        <h1>Anuncie seu imóvel com a {site.nome}</h1>
        <p>Seu imóvel fotografado, documentado e apresentado a quem realmente procura.</p>
      </div>
    </section>

    <section className="secao">
      <div className="container colunas-contato">
        <div>
          <div className="secao-titulo">
            <h2>Como funciona</h2>
            <span className="linha" />
          </div>
          <div className="lista-contato">
            {etapas.map((etapa) => (
              <div key={etapa.titulo}>
                {etapa.icone}
                <span><strong>{etapa.titulo}</strong>{etapa.texto}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bloco-branco">
          <div className="secao-titulo">
            <h2>Fale com a gente</h2>
            <p>Preencha os dados e retornamos em horário comercial.</p>
            <span className="linha" />
          </div>
          <FormularioContato origem="site · anuncie seu imóvel" anuncio tipoInicial={tipo ?? ''} textoBotao="Quero anunciar" />
        </div>
      </div>
    </section>
  </>
}
