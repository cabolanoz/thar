export default async function help(message) {
  await message.reply(`
    Puedes probar algunos comandos como:
    - *!ping*
    - *!chiste*
    - *!frase*
    - *!imagen*
    - *!ai [pregunta]*
    - *!ayuda*
    `);
}
