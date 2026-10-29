import Link from 'next/link'
import type { Metadata } from 'next'
import { Award, MapPinned, Users } from 'lucide-react'
import { cidadesComTotal } from '@/lib/imoveis'
import { site } from '@/lib/site'
import { BotaoVoltar } from '@/components/botao-voltar'

export const metadata: Metadata = {
  title: 'Quem somos',
  description: 'Como trabalhamos e onde atuamos.',
}

export default function SobrePage() {
  const cidades = cidadesComTotal()
  const regiao = cidades.map((item) => `${item.cidade}/${item.estado}`).join(', ') || 'Santa Catarina'

  return <>
    <section className="pagina-topo">
      <div className="container">
        <BotaoVoltar />
        <nav className="migalhas"><Link href="/">Início</Link> <span>/</span> <span>Quem somos</span></nav>
        <h1>Quem somos</h1>
        <p>{site.slogan}</p>
      </div>
    </section>

    <section className="secao">
      <div className="container">
        <div className="sobre-apresentacao">
          <div className="bloco-branco">
            <div className="secao-titulo">
              <h2>Como trabalhamos</h2>
              <span className="linha" />
            </div>
            <p>
              A {site.nome} trabalha com um portfólio enxuto e selecionado, para conhecer cada imóvel a fundo. Antes de publicar,
              visitamos o imóvel, fazemos as fotos e conferimos a documentação. Isso significa que o que está no site está
              efetivamente disponível, pelo valor anunciado.
            </p>
            <p style={{ marginTop: 14 }}>
              Do primeiro contato à assinatura do contrato, você fala com a mesma pessoa. Acompanhamos a visita, a proposta,
              a análise de documentos e o fechamento, seja na compra, na venda ou na locação.
            </p>
            {site.anosDeMercado && <p style={{ marginTop: 14 }}>São {site.anosDeMercado} anos atuando na região.</p>}
          </div>

          <figure className="sobre-foto">
            <img src="/casal-casa-nobre.png" alt={`Clientes da ${site.nome} em frente ao imóvel que compraram`} />
          </figure>
        </div>

        <div className="diferenciais" style={{ marginTop: 26 }}>
          <article className="diferencial">
            <span className="diferencial-icone"><MapPinned size={24} /></span>
            <h3>Onde atuamos</h3>
            <p>{regiao}, com conhecimento de bairro, valor de mercado e documentação local.</p>
          </article>
          <article className="diferencial">
            <span className="diferencial-icone"><Award size={24} /></span>
            <h3>O que publicamos</h3>
            <p>Somente imóveis visitados, fotografados por nós e com documentação verificada.</p>
          </article>
          <article className="diferencial">
            <span className="diferencial-icone"><Users size={24} /></span>
            <h3>Como atendemos</h3>
            <p>{site.corretores ? `Time de ${site.corretores} corretores à disposição.` : 'Atendimento direto, com o mesmo corretor do início ao fim.'}</p>
          </article>
        </div>

        <p style={{ marginTop: 26 }}>
          <Link className="botao botao-primario" href="/contato">Falar com a equipe</Link>{' '}
          <Link className="botao botao-contorno" href="/imoveis">Ver imóveis disponíveis</Link>
        </p>
      </div>
    </section>
  </>
}
