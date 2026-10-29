import Link from 'next/link'
import type { Metadata } from 'next'
import { BuscaImoveis } from '@/components/busca-imoveis'
import { CardImovel } from '@/components/card-imovel'
import { cidadesComTotal, filtrarImoveis, imoveis, tiposDisponiveis, type Finalidade } from '@/lib/imoveis'
import { BotaoVoltar } from '@/components/botao-voltar'

type Params = { searchParams: Promise<{ finalidade?: string; tipo?: string; cidade?: string; busca?: string }> }

function normalizar(valor?: string): Finalidade | undefined {
  return valor === 'Comprar' || valor === 'Alugar' ? valor : undefined
}

export async function generateMetadata({ searchParams }: Params): Promise<Metadata> {
  const { finalidade, tipo, cidade } = await searchParams
  const partes = [tipo || 'Imóveis', finalidade === 'Alugar' ? 'para alugar' : 'à venda', cidade ? `em ${cidade}` : null]
  return { title: partes.filter(Boolean).join(' ') }
}

export default async function ListagemPage({ searchParams }: Params) {
  const { finalidade: finalidadeBruta, tipo, cidade, busca } = await searchParams
  const finalidade = normalizar(finalidadeBruta)
  const resultados = filtrarImoveis({ finalidade, tipo, cidade, busca })

  const titulo = [tipo || 'Imóveis', finalidade === 'Alugar' ? 'para alugar' : finalidade === 'Comprar' ? 'à venda' : null, cidade ? `em ${cidade}` : null]
    .filter(Boolean)
    .join(' ')

  const filtrosAtivos = Boolean(tipo || cidade || busca)

  // Quando a busca não retorna nada, mostramos o que de fato existe no portfólio
  // em vez de deixar a pessoa sem saída.
  const soPorTermo = busca ? filtrarImoveis({ busca }) : []
  const cidades = cidadesComTotal()
  const tipos = tiposDisponiveis(finalidade)

  return <>
    <section className="pagina-topo">
      <div className="container">
        <BotaoVoltar />
        <nav className="migalhas" aria-label="Você está em">
          <Link href="/">Início</Link> <span>/</span> <span>Imóveis</span>
          {cidade && <><span>/</span><span>{cidade}</span></>}
        </nav>
        <h1>{titulo}</h1>
        <p>{resultados.length} {resultados.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}{busca ? ` para “${busca}”` : ''}.</p>
      </div>
    </section>

    <section className="secao">
      <div className="container">
        <BuscaImoveis finalidadeInicial={finalidade ?? 'Comprar'} tipoInicial={tipo ?? ''} cidadeInicial={cidade ?? ''} buscaInicial={busca ?? ''} compacta />

        <div className="barra-resultados">
          <span>Mostrando {resultados.length} {resultados.length === 1 ? 'imóvel' : 'imóveis'}</span>
          {filtrosAtivos && <Link href={finalidade ? `/imoveis?finalidade=${finalidade}` : '/imoveis'}>Limpar filtros</Link>}
        </div>

        {resultados.length > 0 ? (
          <div className="grade-imoveis">{resultados.map((imovel) => <CardImovel key={imovel.id} imovel={imovel} />)}</div>
        ) : (
          <div className="vazio-estado">
            <strong>
              {busca ? <>Não encontramos nada para “{busca}”.</> : 'Nenhum imóvel encontrado com esses filtros.'}
            </strong>

            {soPorTermo.length > 0 ? (
              <p>
                Mas há {soPorTermo.length} {soPorTermo.length === 1 ? 'imóvel' : 'imóveis'} com esse termo em outra
                categoria. <Link href={`/imoveis?busca=${encodeURIComponent(busca!)}`}>Ver sem os filtros</Link>.
              </p>
            ) : (
              <p>
                Nosso portfólio é enxuto e muda com frequência — o imóvel que você procura pode entrar em breve.
                Conte o que precisa e buscamos para você.
              </p>
            )}

            {(cidades.length > 0 || tipos.length > 0) && (
              <div className="vazio-sugestoes">
                {cidades.length > 0 && (
                  <div>
                    <span>Cidades onde temos imóveis</span>
                    {cidades.map((item) => (
                      <Link key={item.cidade} href={`/imoveis?cidade=${encodeURIComponent(item.cidade)}`}>
                        {item.cidade} ({item.total})
                      </Link>
                    ))}
                  </div>
                )}
                {tipos.length > 0 && (
                  <div>
                    <span>Tipos disponíveis</span>
                    {tipos.map((item) => (
                      <Link key={item} href={`/imoveis?tipo=${encodeURIComponent(item)}`}>{item}</Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            <p className="vazio-acoes">
              <Link className="botao botao-primario" href="/contato">Dizer o que procuro</Link>{' '}
              <Link className="botao botao-contorno" href="/imoveis">Ver todos os {imoveis.length} imóveis</Link>
            </p>
          </div>
        )}
      </div>
    </section>
  </>
}
