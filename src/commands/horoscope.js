const signs = {
  aries: 'aries',
  tauro: 'taurus',
  geminis: 'gemini',
  cáncer: 'cancer',
  cancer: 'cancer',
  leo: 'leo',
  virgo: 'virgo',
  libra: 'libra',
  escorpio: 'scorpio',
  sagitario: 'sagittarius',
  capricornio: 'capricorn',
  acuario: 'aquarius',
  piscis: 'pisces',
};

const normalizeSign = (sign) => {
  return sign
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};

export default async function horoscope(message) {
  const args = message.body.split(' ');

  if (args.length < 2) {
    await message.reply(`⚠️ Por favor, proporciona un signo zodiacal. Ejemplo: *!horóscopo aries*`);
    return;
  }

  const input = normalizeSign(args[1]);
  const sign = signs[input];

  if (!sign) {
    await message.reply(
      `⚠️ Por favor, proporciona un signo zodiacal válido. Ejemplo: *${Object.keys(signs).join(', ')}*`
    );
    return;
  }

  try {
    const response = await fetch(`https://aztro.sameerkumar.website/?sign=${sign}&day=today`, {
      method: 'POST',
      headers: {
        'User-Agent': 'TharBot/1.0',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const data = await response.json();

    await message.reply(
      `🔮 *Horóscopo para ${input.charAt(0).toUpperCase() + input.slice(1)} (hoy)*:\n${data.description}`
    );
  } catch (error) {
    console.error('Error obteniendo el horóscopo:', error);
    await message.reply('❌ Hubo un error obteniendo el horóscopo.');
  }
}
