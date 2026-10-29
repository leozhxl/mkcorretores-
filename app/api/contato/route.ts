import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

type Lead = {
  nome: string
  whatsapp: string
  email: string
  mensagem?: string
  origem?: string
}

function valido(lead: Partial<Lead>): lead is Lead {
  const email = lead.email?.trim() ?? ''
  const telefone = (lead.whatsapp ?? '').replace(/\D/g, '')
  return Boolean(lead.nome?.trim() && telefone.length >= 10 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
}

export async function POST(request: Request) {
  let lead: Partial<Lead>

  try {
    lead = await request.json()
  } catch {
    return NextResponse.json({ erro: 'Requisição inválida.' }, { status: 400 })
  }

  if (!valido(lead)) {
    return NextResponse.json({ erro: 'Confira nome, WhatsApp (com DDD) e e-mail.' }, { status: 400 })
  }

  const recebidoEm = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
  const corpo = [
    `Nome: ${lead.nome}`,
    `WhatsApp: ${lead.whatsapp}`,
    `E-mail: ${lead.email}`,
    lead.mensagem ? `Mensagem: ${lead.mensagem}` : null,
    `Origem: ${lead.origem || 'site'}`,
    `Recebido em: ${recebidoEm}`,
  ]
    .filter(Boolean)
    .join('\n')

  // Registro no log do servidor: garante que o lead nunca se perde,
  // mesmo que o envio por e-mail não esteja configurado.
  console.log(`[LEAD]\n${corpo}`)

  const apiKey = process.env.RESEND_API_KEY
  const destino = process.env.LEAD_EMAIL_TO
  const remetente = process.env.LEAD_EMAIL_FROM

  if (!apiKey || !destino || !remetente) {
    return NextResponse.json({
      ok: true,
      entregue: false,
      aviso: 'Lead registrado, mas o envio por e-mail ainda não está configurado.',
    })
  }

  try {
    const resposta = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: remetente,
        to: [destino],
        reply_to: lead.email,
        subject: `Novo contato pelo site — ${lead.nome}`,
        text: corpo,
      }),
    })

    if (!resposta.ok) {
      console.error('[LEAD] Falha no envio:', resposta.status, await resposta.text())
      return NextResponse.json({ ok: true, entregue: false })
    }
  } catch (erro) {
    console.error('[LEAD] Erro no envio:', erro)
    return NextResponse.json({ ok: true, entregue: false })
  }

  return NextResponse.json({ ok: true, entregue: true })
}
