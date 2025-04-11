import qrcode from 'qrcode-terminal';
import pkg from 'whatsapp-web.js';

import responder from './responder.js';

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
    await responder.reply(client, message);
  });

  client.initialize();
};

export default init;
