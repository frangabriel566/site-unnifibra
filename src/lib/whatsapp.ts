/**
 * Gera um link do WhatsApp (wa.me) a partir de um número de telefone e mensagem.
 *
 * @param phoneNumber - Número de telefone (com ou sem máscara). Apenas dígitos
 *                       são considerados, ex: "(11) 99999-9999" ou "5511999999999".
 * @param message - Mensagem que será pré-preenchida no WhatsApp.
 * @returns URL no formato https://wa.me/NUMERO?text=MENSAGEM
 */
export function generateWhatsAppLink(phoneNumber: string, message: string): string {
  const sanitizedNumber = phoneNumber.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${sanitizedNumber}?text=${encodedMessage}`;
}
