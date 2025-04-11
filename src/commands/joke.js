export default async function joke(message) {
  try {
    const response = await fetch('https://v2.jokeapi.dev/joke/Any?lang=es&type=single');
    const data = await response.json();

    if (data?.joke) {
      await message.reply(`🤣 ${data.joke}`);
    } else {
      await message.reply('😅 No encontré un chiste ahora mismo. Intenta más tarde.');
    }
  } catch (error) {
    console.error('Error obteniendo el chiste:', error);
    await message.reply('❌ Hubo un error obteniendo el chiste.');
  }
}
