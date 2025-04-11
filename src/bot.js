import qrcode from 'qrcode-terminal';
import pkg from 'whatsapp-web.js';

const { Client, LocalAuth } = pkg;

const init = () => {
  const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
  });

  client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
  });

  client.on('ready', () => {
    console.log('Thar is ready!!!');
  });

  client.on('message', async (message) => {
    if (message.body === '!ping') {
      await message.reply('pong');
    } else if (message.body === '!hello') {
      await message.reply('Hello there!');
    } else if (message.body === '!bye') {
      await message.reply('Goodbye!');
    }
  });

  client.initialize();
};

export default init;
