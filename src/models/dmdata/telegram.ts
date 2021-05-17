import { Parser } from 'xml2js'
import { unzipBase64 } from '../../utils';

import { slackPost, slackParsePayload } from '../slack';
import { discordPost, discordParsePayload } from '../discord';
import { config as dotenv } from 'dotenv';
import { TSeisBody } from '../../types/jmx_seis';
import { getMode } from '../../config';

dotenv();
const xmlParser = new Parser({explicitArray: false});

const slackHookUrl = getMode({prod: process.env.SLACK_HOOKURL_OTHER, dev: process.env.SLACK_HOOKURL_DEV}) ?? '';
const discordHookUrl = getMode({prod: process.env.DISCORD_HOOKURL_OTHER, dev: process.env.DISCORD_HOOKURL_DEV}) ?? '';

export type DmdataTelegramPassingItemType = {
  name: string;
  time: string;
}

export type DmdataTelegramHeadType = {
  type: string;
  author: string;
  target?: string;
  time: string;
  designation?: string | null;
  test: boolean;
  xml?: boolean;
}

export type DmdataTelegramXmlReportControlType = {
  title: string;
  dateTime: string;
  status: string;
  editorialOffice: string;
  publishingOffice: string;
}

export type DmdataTelegramXmlReportHeadType = {
  title: string;
  reportDateTime: string;
  targetDateTime: string;
  targetDateTimeDubious?: string;
  targetDuration?: string;
  validDateTime?: string;
  eventId: string | null;
  serial: string | null;
  infoType: string;
  infoKind: string;
  infoKindVersion: string;
  headline: string | null;
}

export type DmdataTelegramXmlReportType = {
  control: DmdataTelegramXmlReportControlType;
  head: DmdataTelegramXmlReportHeadType;
}

export type DmdataTelegramType = {
  type: string;
  version: string;
  id: string;
  classification: string;
  passing: DmdataTelegramPassingItemType[];
  head: DmdataTelegramHeadType;
  xmlReport?: DmdataTelegramXmlReportType;
  format: string | null;
  compression: string | null;
  encoding: string | null;
  body: string;
};

export type AddInfoType = {
  comment?: string;
  quakeHypocenter?: any;
  quakeMagnitude?: string;
  quakeNonPrefIntList?: any;
  quakePrefIntList?: any;

  additionalList?: any[];
};

export type DmdataClassOptionType = {
  nosns?: boolean
}

export class DmdataTelegramData {
  protected _slackHookUrl = slackHookUrl;
  protected _discordHookUrl = discordHookUrl;
  // _slackHookUrl = process.env.SLACK_HOOKURL_DEV || ''

  protected readonly _data: DmdataTelegramType;
  protected _option: DmdataClassOptionType;
  protected _telegram: any;
  protected _body: TSeisBody | any;

  protected alreadyInit = false;

  public addInfo: AddInfoType = {};

  constructor(data: DmdataTelegramType, option?: DmdataClassOptionType) {
    this._data = data;
    this._option = option ?? {};
  }

  async checkInit() {
    if (this.alreadyInit) return;
    await this.init();
    return;
  }

  async init() {
    if (this._data.head.xml) {
      if (this._data.body != undefined)
      this.parseTelegram()
    }
    else {
      this._telegram = unzipBase64(this._data.body, 'plain');
    }
    this.alreadyInit = true;
  }
  
  async parseTelegram() {
    this._telegram = await xmlParser.parseStringPromise(unzipBase64(this._data.body, 'gzip'));
    if (this._telegram != undefined) this._body = this._telegram.Report.Body;
    // console.log(this._body)
  }

  getSlackHookUrl() {
    return this._slackHookUrl;
  }
  setSlackHookUrl(url: string) {
    this._slackHookUrl = url;
  }

  async send() {
    await this.checkInit();
    if (!this._option?.nosns) {
      this.slack(this._data);
      this.discord(this._data, this.addInfo);
    }
  }

  slack(data: DmdataTelegramType, path: string = this.getSlackHookUrl()) {
    const payload = slackParsePayload(data);
    slackPost(path, payload);
  }

  async discord(
    data: DmdataTelegramType,
    addInfo?: AddInfoType,
    path: string = this._discordHookUrl || ''
  ) {
    const payload = await discordParsePayload(data, addInfo);
    discordPost(path, payload);
  }
}
