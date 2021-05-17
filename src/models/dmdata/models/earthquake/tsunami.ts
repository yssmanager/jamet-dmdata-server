import { DmdataTelegramType, DmdataClassOptionType } from '../../telegram';
import { EarthquakeEvent } from './earthquake'
import path from 'path'
import fs from 'fs'

export class TsunamiEvent extends EarthquakeEvent {
  constructor(data: DmdataTelegramType, option?: DmdataClassOptionType) {
    super(data, option);
  }

  async init() {
    await super.init();

    // for jamet
    // this.earthquakeInfo.codeOnlyAreaIntList = makeCodeOnlyAreaIntList(
    //   this._body.Intensity?.Observation?.Pref
    // );

    // const codeOnlyCityStationIntList = makeCodeOnlyCityStationIntList(
    //   this._body.Intensity?.Observation?.Pref
    // );
    // this.earthquakeInfo.codeOnlyCityIntList = codeOnlyCityStationIntList?.city;
    // this.earthquakeInfo.codeOnlyStationIntList = codeOnlyCityStationIntList?.station;

    // for sns
    // this.addInfo.quakeNonPrefIntList = makeAreaIntList(
    //   this._body.Intensity?.Observation?.Pref
    // );
    // this.addInfo.quakePrefIntList = makeCityIntList(
    //   this._body.Intensity?.Observation?.Pref
    // );
    // this.addInfo.quakeHypocenter = this._body.Earthquake?.Hypocenter;
    // try {
    //   this.addInfo.quakeMagnitude = this._body.Earthquake[
    //     'jmx_eb:Magnitude'
    //   ]?.$?.description;
    // } catch (e) {}
    this.addInfo.comment = this._body.Comments?.WarningComment?.Text;
    fs.writeFileSync(path.join(__dirname, `../../../../../test/tn_${this._telegram.Report.Head.EventID}_${this._telegram.Report.Head.Serial}.json`), JSON.stringify(this._telegram))
  }
}