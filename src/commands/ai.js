const endpoint = 'https://api.openai.com/v1/chat/completions';
const apiKey = process.env.OPENAI_API_KEY;

const usageMap = new Map();

const isSameDay = (a, b) => a.toISOString().slice(0, 10) === b.toISOString().slice(0, 10);

export default async function ai(message) {
  const from = message.from;
  const prompt = message.body.replace(/^!ai/i, '').trim();

  if (!prompt) {
    await message.reply(
      '🤖 Escribe algo después de *!ai*, por ejemplo: `!ai ¿Cuál es la capital de Japón?`'
    );
    return;
  }

  if (!apiKey) {
    await message.reply('⚠️ No tengo acceso a mi cerebro en este momento (falta API key).');
    return;
  }

  const today = new Date();
  const usage = usageMap.get(from);

  if (usage && isSameDay(new Date(usage.date), today)) {
    if (usage.count >= 20) {
      await message.reply(
        '🧠 Has alcanzado el límite diario de 20 mensajes con la IA. Intenta mañana 😉'
      );
      return;
    }

    usage.count++;
  } else {
    usageMap.set(from, { date: today.toISOString(), count: 1 });
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `La fecha actual es ${new Date().toLocaleDateString('es-NI', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timeZone: 'America/Managua',
            })}.`,
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

    if (reply) {
      await message.reply(`💬 ${reply}`);
    } else {
      await message.reply('❌ No pude generar una respuesta.');
    }
  } catch (error) {
    console.error('Error con OpenAI:', error);
    await message.reply('❌ Hubo un problema al conectar con la IA.');
  }
}
