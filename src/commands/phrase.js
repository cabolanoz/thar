export default async function phrase(message) {
  try {
    const response = await fetch('https://zenquotes.io/api/random');
    const data = await response.json();

    if (data && data[0]) {
      const quote = data[0].q;
      const author = data[0].a;

      await message.reply(`💭 *${quote}* \n— ${author}`);
    } else {
      await message.reply('No encontré ninguna frase en este momento 😢');
    }
  } catch (error) {
    console.error('Error obteniendo la frase:', error);
    await message.reply('❌ Hubo un error obteniendo la frase.');
  }
}
