import axios from 'axios';
import WebSocket from 'ws';
import ip from 'ip';
import { stringifyUrl as qsStringify } from 'query-string';
import { config as dotenv } from 'dotenv';

import { createDmdataTelegram, DmdataDataOption } from './models/dmdata/fromXml'

import telegram from './models/dmdata/front';
import { gqlConnect, gqlTest } from './models/jametGQL';
import ioEmitter from './models/redis/emitter';
import { slackPost } from './models/slack';
import { discordPost } from './models/discord';
import { fixEscapeText, convTime } from './utils';
import { fetchParamData, getMode } from './config';

dotenv();

const mode = getMode();
// const baseUrl = process.env.DMDATA_TELEGRAMLIST_URI || '';
const baseUrl = 'https://api.dmdata.jp/telegram/v1/list';
const apiKey = process.env.DMDATA_API_KEY || '';
const getCategotyList = ['telegram.earthquake', 'telegram.weather'];

const slackDev = process.env.SLACK_HOOKURL_DEV ?? '';
const discordDev = process.env.DISCORD_HOOKURL_DEV ?? '';

const initUrl = qsStringify({
  url: baseUrl,
  query: {
    key: apiKey,
    type: 'VXSE',
    limit: 15,
    // get: getCategotyList.join(','),
    // memo: getMode(),
  },
});

const main = async () => {
  await gqlConnect();
  const data = await (await axios.get(initUrl)).data;
  const items: any[] = data.items;
  items.reverse();
  for (let item of items) {
    const nextUrl = qsStringify({
      url: item.url,
      query: {
        key: apiKey,
      },
    });
    const xml = await (await axios.get(nextUrl)).data;
    const pOption: DmdataDataOption = {
      ...item.data,
      key: item.key,
      url: item.url,
      classification: item.classification
    }
    const pData = await createDmdataTelegram(xml, pOption);
    console.log(pData);
    await telegram(pData, {nosns: true});
    sleep(1000)
  }

}

main();

function sleep(waitSec: number, callbackFunc?: any) {

  // 経過時間（秒）
  var spanedSec = 0;

  // 1秒間隔で無名関数を実行
  var id = setInterval(function () {

      spanedSec++;

      // 経過時間 >= 待機時間の場合、待機終了。
      if (spanedSec >= waitSec) {

          // タイマー停止
          clearInterval(id);

          // 完了時、コールバック関数を実行
          if (callbackFunc) callbackFunc();
      }
  }, 1000);

}