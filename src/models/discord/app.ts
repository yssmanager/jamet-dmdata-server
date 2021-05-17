import Discord, { Client } from 'discord.js'
import { config as dotenv } from 'dotenv';

dotenv();

const token = process.env.DISCORD_TOKEN

export const discordServer = () => {
  const client = new Client()

  client.on('ready', () => {
    console.log(`Logged in as ${(client.user !== null ? client.user.tag : '???')}!`);
  });
  
  client.on('message', msg => {
    if (msg.content === 'ping') {
      msg.reply('Pong!');
    }
  });
  
  client.login(token);
}

export default discordServer