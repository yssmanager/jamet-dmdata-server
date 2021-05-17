import { DmdataTelegramData, DmdataTelegramType, DmdataClassOptionType } from '../../telegram';
import { config as dotenv } from 'dotenv';
import { getMode } from '../../../../config';

dotenv();

const slackHookUrl =
  getMode({
    prod: process.env.SLACK_HOOKURL_WEATHER,
    dev: process.env.SLACK_HOOKURL_DEV,
  }) ?? '';
const discordHookUrl =
  getMode({
    prod: process.env.DISCORD_HOOKURL_WEATHER,
    dev: process.env.DISCORD_HOOKURL_DEV,
  }) ?? '';

export class WeatherEvent extends DmdataTelegramData {
  constructor(data: DmdataTelegramType, option?: DmdataClassOptionType) {
    super(data, option);
    this._slackHookUrl = slackHookUrl;
    this._discordHookUrl = discordHookUrl;
  }
}