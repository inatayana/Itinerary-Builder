export async function handleWhatsAppWebhook(input: Record<string, unknown>) {
  return { success: true };
}

export async function sendWhatsAppMessage(input: Record<string, unknown>) {
  return { success: true, messageId: 'mock-' + Date.now() };
}
