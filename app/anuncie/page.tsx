import Link from 'next/link'
import type { Metadata } from 'next'
import { BadgeCheck, Camera, FileCheck, Handshake, Megaphone, Search, Smartphone } from 'lucide-react'
import { FormularioContato } from '@/components/formulario-contato'
import { cidadesAtendidas } from '@/lib/imoveis'
import { site } from '@/lib/site'
import { BotaoVoltar } from '@/components/botao-voltar'

export const metadata: Metadata = {
  title: 'Anuncie seu imóvel',
  description: 'Avaliação sem compromisso, fotos próprias e divulgação para quem realmente procura.',
}

const etapas = [
  { icone: <Handshake size={24} />, titulo: 'Avaliamos sem compromisso', texto: 'A gente vai até o imóvel, olha o estado e diz quanto ele vale hoje, com base no que está sendo vendido na mesma quadra. Se você não quiser seguir, tudo bem.' },
  { icone: <Camera size={24} />, titulo: 'As fotos são nossas', texto: 'Nós mesmos fotografamos e montamos o anúncio, com metragem, cômodos e localização no mapa. Você não precisa mandar foto nenhuma.' },
  { icone: <FileCheck size={24} />, titulo: 'Conferimos a papelada antes', texto: 'Olhamos matrícula, certidões e pendências antes de colocar à venda. É o que evita o negócio travar na reta final.' },
  { icone: <Megaphone size={24} />, titulo: 'Acompanhamos cada visita', texto: 'Levamos os interessados, estamos junto na visita e trazemos as propostas para você decidir.' },
]

const vantagens = [
  {
    cor: 'vantagem-marca',
    icone: <Search size={30} />,
    titulo: 'A gente conhece a região',
    texto: `Trabalhamos em ${cidadesAtendidas.join(' e ')}. Sabemos o que a rua vale, o que o vizinho vendeu e o que o comprador procura em cada bairro.`,
  },
  {
    cor: 'vantagem-areia',
    icone: <BadgeCheck size={30} />,
    titulo: 'Você fala sempre com a mesma pessoa',
    texto: 'Do primeiro contato até a assinatura é o mesmo corretor. Nada de ser passado de mão em mão ou repetir sua história toda vez.',
  },
  {
    cor: 'vantagem-escura',
    icone: <Smartphone size={30} />,
    titulo: 'Seu imóvel bem apresentado',
    texto: 'Anúncio com fotos nossas, metragem, cômodos e mapa — do jeito que o comprador precisa ver para marcar a visita.',
  },
]

const passos = [
  { titulo: 'Você nos conta do imóvel', texto: 'Preencha o formulário com o básico: onde fica, quantos quartos e quanto espera receber.' },
  { titulo: 'Chamamos você no WhatsApp', texto: 'Um corretor nosso responde para entender melhor o imóvel e combinar o melhor horário.' },
  { titulo: 'Marcamos a visita', texto: 'Vamos até lá, avaliamos o imóvel e conferimos a documentação junto com você.' },
  { titulo: 'O anúncio entra no ar', texto: 'Fotografamos, publicamos no site e levamos cada proposta até você.' },
]

export default async function AnunciePage({ searchParams }: { searchParams: Promise<{ tipo?: string }> }) {
  const { tipo } = await searchParams

  return <>
    <div className="anuncie-capa">
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
    </div>

    <section className="secao secao-vantagens">
      <div className="container">
        <div className="secao-titulo" style={{ textAlign: 'center' }}>
          <h2>Por que anunciar com a gente</h2>
          <span className="linha" style={{ marginInline: 'auto' }} />
        </div>

        <div className="vantagens">
          {vantagens.map((vantagem) => (
            <article key={vantagem.titulo} className={`vantagem ${vantagem.cor}`}>
              {vantagem.icone}
              <h3>{vantagem.titulo}</h3>
              <p>{vantagem.texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="faixa-passos">
      <div className="container">
        <h2>Como vai ser, do começo ao fim</h2>
        <span className="linha" />
        <ol className="passos">
          {passos.map((passo, indice) => (
            <li key={passo.titulo}>
              <span className="passo-numero">{String(indice + 1).padStart(2, '0')}</span>
              <h3>{passo.titulo}</h3>
              <p>{passo.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  </>
}
