import { joke, phrase, horoscope, image, ai, help } from './commands/index.js';

const userMap = new Map();

const hasChattedBefore = (from) => {
  return userMap.has(from);
};

const welcomeMessage = () => {
  return `👋 ¡Hola! Soy *Thar*, el asistente personal de César. César te responderá en breve.

    Puedes probar algunos comandos como:
    - *!ping*
    - *!chiste*
    - *!frase*
    - *!imagen*
    - *!ai [pregunta]*
    - *!ayuda*`;
};

const reply = async (client, message) => {
  if (client) {
    const { from, body, type, author } = message;
    const chat = await message.getChat();

    if ((type !== 'chat' && author !== undefined) || chat.isGroup) return;

    if (!hasChattedBefore(from)) {
      userMap.set(from, true);

      await client.sendMessage(from, welcomeMessage());
    }

    const text = body.toLowerCase();

    if (text === '!ping') {
      await message.reply('pong');
    } else if (text === '!chiste') {
      await joke(message);
    } else if (text === '!frase') {
      await phrase(message);
    } else if (text.startsWith('!horóscopo') || text.startsWith('!horoscopo')) {
      await horoscope(message);
    } else if (text === '!imagen') {
      await image(client, message);
    } else if (text.startsWith('!ai')) {
      await ai(message);
    } else if (text === '!ayuda') {
      await help(message);
    }
  }
};

export default { reply };
