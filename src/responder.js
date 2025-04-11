import { joke, phrase, horoscope, image } from './commands/index.js';

const userMap = new Map();

const isSameDay = (a, b) => {
  return a.toISOString().slice(0, 10) === b.toISOString().slice(0, 10);
};

const hasHistory = (from) => {
  const today = new Date();
  const lastSeen = userMap.get(from);

  if (!lastSeen || !isSameDay(new Date(lastSeen), today)) {
    userMap.set(from, today.toISOString());
    return false;
  }

  return true;
};

const welcomeMessage = () => {
  return `👋 ¡Hola! Soy *Thar*, el asistente personal de César. César te responderá en breve.

    Puedes probar algunos comandos como:
    - *!ping*
    - *!chiste*
    - *!frase*
    - *!imagen*`;
};

const reply = async (client, message) => {
  if (client) {
    const { from, body, type, author } = message;
    const chat = await message.getChat();

    if ((type !== 'chat' && author !== undefined) || chat.isGroup) return;

    if (!hasHistory(from)) await client.sendMessage(from, welcomeMessage());

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
    }
  }
};

export default { reply };
