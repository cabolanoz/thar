import pkg from 'whatsapp-web.js';
const { MessageMedia } = pkg;

export default async function image(client, message) {
  try {
    const response = await fetch('https://picsum.photos/400/300', { redirect: 'follow' });

    const image = await response.arrayBuffer();

    const media = new MessageMedia(
      'image/jpeg',
      Buffer.from(image).toString('base64'),
      'random-image.jpg'
    );

    await client.sendMessage(message.from, media, {
      caption: '🖼️ Aquí tienes una imagen aleatoria.',
    });
  } catch (error) {
    console.error('Error enviando imagen aleatoria:', error);
    await message.reply('❌ Hubo un error obteniendo la imagen.');
  }
}
