import axios from 'axios';
import WebSocket from 'ws';
import ip from 'ip';
import { stringifyUrl as qsStringify } from 'query-string';
import { config as dotenv } from 'dotenv';

import telegram from './models/dmdata/front';
import { gqlConnect, gqlTest } from './models/jametGQL';
import ioEmitter from './models/redis/emitter';
import { slackPost } from './models/slack';
import { discordPost } from './models/discord';
import { fixEscapeText, convTime } from './utils';
import { fetchParamData, getMode } from './config';

dotenv();

const mode = getMode();
// const baseUrl = process.env.DMDATA_SOCKET_URI || '';
const baseUrl = 'https://api.dmdata.jp/v2/socket';
const apiKey = process.env.DMDATA_API_KEY || '';
const getCategotyList = ['telegram.earthquake', 'telegram.weather'];

const slackDev = process.env.SLACK_HOOKURL_DEV ?? '';
const discordDev = process.env.DISCORD_HOOKURL_DEV ?? '';

const initUrl = qsStringify({
  url: baseUrl,
  query: {
    key: apiKey,
    // get: getCategotyList.join(','),
    // memo: getMode(),
  },
});

const initReqBody = {
  classifications: getCategotyList,
  test: getMode({
    prod: 'no',
    dev: 'including',
  }),
  appName: `JaMet-${getMode()}`,
};

const sendMessageExternal = (msg: string) => {
  slackPost(slackDev, { text: msg });
  discordPost(discordDev, { content: msg });
  // ioEmitter('message', [msg]);
};

const connect = async () => {
  axios
    .post(initUrl, initReqBody)
    .then((respSocketStart) => {
      // handle success
      const ws = new WebSocket(respSocketStart.data.websocket.url);

      ws.on('open', () => {
        console.log('\u001b[33m' + 'Connection OPEN' + '\u001b[0m');
      });

      ws.on('close', (code) => {
        console.log(`close: ${code}`);
        sendMessageExternal(`DMDATA Socket: Close Connection [${code}]`);
        setTimeout(() => connect(), 2000);
      });

      ws.on('error', (error) => {
        sendMessageExternal(`DMDATA Socket: Connection Error \n ${error}`);
        console.log(`error: ${error}`);
      });

      ws.on('message', (response: string) => {
        try {
          const data = JSON.parse(fixEscapeText(response, 'double'));
          
          switch (data.type) {
            case 'start':
              sendMessageExternal(
                `DMDATA Socket: Start Connection (mode: '${mode}', ip: '${ip.address()}')`
              );
              // recieveTestTelegram(response)
              // quakeEventMutation({id: 'devtest',targetTimestamp: convTime('now', 'unix')})
              // console.log(response);
              break;
            case 'data':
              let testPath = 'dev';
              if (data.data.test) testPath = 'test';
              // recieveTestTelegram(response, testPath);
              telegram(data);

              break;
            case 'ping':
              ws.send(
                JSON.stringify({
                  type: 'pong',
                  pingId: data.pingId,
                })
              );
              break;
            default:
              console.log(response);
          }
        } catch (e) {
          console.log(response);
        }
      });
    })
    .catch((error) => {
      // handle error
      console.error(error);
      sendMessageExternal(
        `DMDATA API: Cannot Start Socket Connection Error \n ${error}`
      );
      setTimeout(() => connect(), 2000);
    });
};

const main = async () => {
  await fetchParamData();
  await gqlConnect();
  await connect();
  // await testConnect(testData)
  // await testConnect()
};

main();

// // Dev Test
const testConnect = async () => {
  const fp = '../test/sampleXmls/38-39_02_05_191025_VTSE51.xml';
  const filepath = path.join(__dirname, fp);
  const filename = path.basename(filepath, path.extname(filepath));
  const dtype = filepath.substr(-10, 6);
  const str = fs.readFileSync(filepath, { encoding: 'utf8' });
  const testData = await createDmdataTelegram(str, { type: dtype });

  console.log(testData);
  await telegram(testData);
};

// import testData from '../test/samplejsons/32-35_06_04_100915_VXSE53.json'
// testConnect(testData);

import fs from 'fs';
import path from 'path';
import { createDmdataTelegram } from './models/dmdata/fromXml';

// import { convTime } from './utils'
// function recieveTestTelegram(res: string, optionPath: string = 'dev') {
//   const now = convTime('now', 'YYYYMMDDHHmmss')
//   fs.writeFileSync(path.join('test', optionPath, `${now}.json`), res);
//   console.log(res);
// }
