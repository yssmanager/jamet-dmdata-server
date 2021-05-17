import { DmdataTelegramType, DmdataClassOptionType } from '../../telegram';
import { WeatherEvent } from './index'

export class WeatherGeneralEvent extends WeatherEvent {
  constructor(data: DmdataTelegramType, option?: DmdataClassOptionType) {
    super(data, option);
  }

  async init() {
    await super.init();
    const text = (this._body.Comment?.Text.$.type === undefined ? this._body.Comment?.Text : this._body.Comment?.Text._)
    this.addInfo.additionalList = [text];
  }
}