// Canais de contato da Vysionis, num lugar só (home, rodapé e formulário usam daqui)
export const EMAIL = 'contato@vysionis.com.br'
export const TELEFONE = '+55 (11) 96580-4957'
const WHATSAPP = '5511965804957'

/** Link do WhatsApp da Vysionis, já com a mensagem escrita (a pessoa só aperta enviar) */
export const linkWhatsApp = (texto) =>
  `https://wa.me/${WHATSAPP}${texto ? `?text=${encodeURIComponent(texto)}` : ''}`

export const WHATSAPP_DIAGNOSTICO = linkWhatsApp(
  'Olá! Quero agendar o diagnóstico gratuito de 30 minutos.'
)
