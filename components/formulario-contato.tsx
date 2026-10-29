'use client'

import { useState } from 'react'
import { MessageCircle, Send } from 'lucide-react'
import { TIPOS } from '@/lib/imoveis'
import { linkWhatsApp } from '@/lib/site'

type Props = {
  origem: string
  /** Mostra os campos específicos de quem quer anunciar um imóvel. */
  anuncio?: boolean
  tipoInicial?: string
  textoBotao?: string
}

export function FormularioContato({ origem, anuncio, tipoInicial = '', textoBotao = 'Enviar mensagem' }: Props) {
  const [status, setStatus] = useState<'idle' | 'enviando' | 'ok' | 'erro'>('idle')
  /** Mensagem já montada para o WhatsApp — usada como caminho alternativo garantido. */
  const [resumo, setResumo] = useState('')

  const enviar = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const dados = Object.fromEntries(new FormData(form)) as Record<string, string>
    setStatus('enviando')

    const texto = [
      anuncio ? 'Olá, quero anunciar um imóvel.' : 'Olá, vim pelo site.',
      `Nome: ${dados.nome}`,
      `WhatsApp: ${dados.whatsapp}`,
      `E-mail: ${dados.email}`,
      dados.tipo ? `Tipo: ${dados.tipo}` : '',
      dados.local ? `Local: ${dados.local}` : '',
      dados.finalidade ? `Finalidade: ${dados.finalidade}` : '',
      dados.mensagem ? `Mensagem: ${dados.mensagem}` : '',
    ].filter(Boolean).join('\n')
    setResumo(texto)

    try {
      const resposta = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...dados, origem }),
      })
      if (!resposta.ok) throw new Error('falha')
      setStatus('ok')
      form.reset()
    } catch {
      setStatus('erro')
    }
  }

  return (
    <form className="formulario" onSubmit={enviar}>
      <div className="duas">
        <label>Nome completo<input name="nome" required placeholder="Seu nome" /></label>
        <label>WhatsApp<input name="whatsapp" required placeholder="(48) 9 0000-0000" /></label>
      </div>
      <label>E-mail<input name="email" type="email" required placeholder="voce@email.com" /></label>

      {anuncio && <>
        <div className="duas">
          <label>Tipo do imóvel
            <select name="tipo" defaultValue={tipoInicial}>
              <option value="">Selecione</option>
              {TIPOS.map((tipo) => <option key={tipo} value={tipo}>{tipo}</option>)}
            </select>
          </label>
          <label>Cidade e bairro<input name="local" placeholder="Ex.: São José, Campinas" /></label>
        </div>
        <label>Finalidade
          <select name="finalidade" defaultValue="Venda">
            <option value="Venda">Quero vender</option>
            <option value="Locação">Quero alugar</option>
            <option value="Ambos">Vender ou alugar</option>
          </select>
        </label>
      </>}

      <label>{anuncio ? 'Conte sobre o imóvel' : 'Mensagem'}
        <textarea name="mensagem" placeholder={anuncio ? 'Metragem, número de quartos, estado de conservação, valor pretendido…' : 'O que você procura?'} />
      </label>

      <button className="botao botao-primario" type="submit" disabled={status === 'enviando'}>
        <Send size={16} /> {status === 'enviando' ? 'Enviando…' : textoBotao}
      </button>

      {status === 'ok' && <>
        <p className="aviso aviso-ok">Recebemos seus dados. Clique abaixo para concluir o envio pelo WhatsApp — a mensagem já vai pronta.</p>
        <a className="botao botao-whatsapp" href={linkWhatsApp(resumo)} target="_blank" rel="noreferrer">
          <MessageCircle size={17} /> Concluir pelo WhatsApp
        </a>
      </>}
      {status === 'erro' && (
        <p className="aviso aviso-erro">
          Não foi possível enviar agora.{' '}
          <a href={linkWhatsApp(resumo || 'Olá, tentei enviar o formulário do site e não consegui.')} target="_blank" rel="noreferrer">
            Enviar esta mensagem pelo WhatsApp
          </a>.
        </p>
      )}
      <span className="nota">Seus dados são usados apenas para o atendimento e não são compartilhados com terceiros.</span>
    </form>
  )
}
