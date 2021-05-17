import { DmdataTelegramData, DmdataTelegramType, DmdataClassOptionType } from '../../telegram';
import { IntensityLvNum, IntensityLvStr } from '../../../../types/basic';
import { config as dotenv } from 'dotenv';
import { getMode } from '../../../../config';
import { quakeEventMutation } from '../../../jametGQL/models/earthquake/earthquake';

dotenv();

const slackHookUrl =
  getMode({
    prod: process.env.SLACK_HOOKURL_QUAKE,
    dev: process.env.SLACK_HOOKURL_DEV,
  }) ?? '';
const discordHookUrl =
  getMode({
    prod: process.env.DISCORD_HOOKURL_QUAKE,
    dev: process.env.DISCORD_HOOKURL_DEV,
  }) ?? '';

export type PrefInfoType = {
  id: number;
  str: string;
};
export type PointListType = {
  prefName?: string;
  points: any[];
};

const makeAreaIntList = (prefList: any | any[]) => {
  if (prefList == undefined) return undefined;

  const intList = new Array();
  for (let i = 0; i < 20; i++) {
    intList[i] = new Array();
  }

  const pushArea = (ar: any) => {
    try {
      intList[IntensityLvNum[ar.MaxInt]].push(ar);
    } catch (e) {
      console.error(e);
    }
  };

  const pushPref = (pf: any) => {
    if (Array.isArray(pf.Area)) {
      pf.Area.forEach((ar: any) => {
        pushArea(ar);
      });
    } else {
      pushArea(pf.Area);
    }
  };

  if (Array.isArray(prefList)) {
    prefList.forEach((pf: any) => {
      pushPref(pf);
    });
  } else {
    pushPref(prefList);
  }

  return intList;
};

const makeCityIntList = (prefList: any | any[]) => {
  if (prefList == undefined) return undefined;

  const intList = new Array();
  for (let i = 0; i < 20; i++) {
    intList[i] = new Array();
    for (let j = 0; j < 50; j++) {
      intList[i][j] = { points: [] } as PointListType;
    }
  }

  let ok: boolean = false;

  const pushCity = (ct: any, pref: PrefInfoType) => {
    try {
      let int: number;
      if (ct.Condition === '震度５弱以上未入電') int = 12;
      else int = IntensityLvNum[ct.MaxInt];
      if (intList[int][pref.id].prefName === undefined)
        intList[int][pref.id].prefName = pref.str;
      intList[int][pref.id].points.push(ct);
      ok = true;
    } catch (e) {
      console.error(e);
      console.log(ct)
    }
  };

  const pushArea = (ar: any, pref: PrefInfoType) => {
    if (ar.City === undefined) return;
    if (Array.isArray(ar.City)) {
      ar.City.forEach((ct: any) => {
        pushCity(ct, pref);
      });
    } else {
      pushCity(ar.City, pref);
    }
  };

  const pushPref = (pf: any) => {
    const prefInfo: PrefInfoType = {
      id: Number(pf.Code),
      str: pf.Name,
    };
    if (Array.isArray(pf.Area)) {
      pf.Area.forEach((ar: any) => {
        pushArea(ar, prefInfo);
      });
    } else {
      pushArea(pf.Area, prefInfo);
    }
  };

  if (Array.isArray(prefList)) {
    prefList.forEach((pf: any) => {
      pushPref(pf);
    });
  } else {
    pushPref(prefList);
  }

  intList.forEach((l1: any[]) => {
    l1.forEach((l2: PointListType) => {
      l2.points.sort((a, b) => {
        if (a.Code < b.Code) return -1;
        if (a.Code > b.Code) return 1;
        return 0;
      })
    })
  })

  return ok ? intList : undefined;
};

const makeCodeOnlyAreaIntList = (prefList: any | any[]) => {
  if (prefList == undefined) return undefined;

  let ok: boolean = false;

  const intList = new Array() as string[][];
  for (let i = 0; i < 20; i++) {
    intList[i] = new Array() as string[];
  }

  const pushArea = (ar: any) => {
    try {
      if (ar.MaxInt === undefined) intList[12].push(ar.Code)
      else intList[IntensityLvNum[ar.MaxInt]].push(ar.Code);
      ok = true;
    } catch (e) {
      console.error(e);
    }
  };

  const pushPref = (pf: any) => {
    if (Array.isArray(pf.Area)) {
      pf.Area.forEach((ar: any) => {
        pushArea(ar);
      });
    } else {
      pushArea(pf.Area);
    }
  };

  if (Array.isArray(prefList)) {
    prefList.forEach((pf: any) => {
      pushPref(pf);
    });
  } else {
    pushPref(prefList);
  }

  return ok ? intList : undefined;
};

const makeCodeOnlyCityStationIntList = (prefList: any | any[]) => {
  if (prefList == undefined) return undefined;

  let stationOk: boolean = false;
  let cityOk: boolean = false;

  const cityIntList = new Array() as string[][];
  const stationIntList = new Array() as string[][];
  for (let i = 0; i < 20; i++) {
    cityIntList[i] = new Array() as string[];
    stationIntList[i] = new Array() as string[];
  }

  const pushStation = (st: any) => {
    try {
      stationIntList[IntensityLvNum[st.Int]].push(st.Code);
      stationOk = true;
    } catch (e) {
      console.error(e);
    }
  };

  const pushCity = (ct: any) => {
    if (ct === undefined) return undefined;
    if (Array.isArray(ct.IntensityStation)) {
      ct.IntensityStation.forEach((st: any) => {
        pushStation(st);
      });
    } else {
      pushStation(ct.IntensityStation);
    }

    try {
      if (ct.Condition === '震度５弱以上未入電') cityIntList[12].push(ct.Code);
      else cityIntList[IntensityLvNum[ct.MaxInt]].push(ct.Code);
      cityOk = true;
    } catch (e) {
      console.error(e);
    }
  };

  const pushArea = (ar: any) => {
    if (Array.isArray(ar.City)) {
      ar.City.forEach((ct: any) => {
        pushCity(ct);
      });
    } else {
      pushCity(ar.City);
    }
  };

  const pushPref = (pf: any) => {
    if (Array.isArray(pf.Area)) {
      pf.Area.forEach((ar: any) => {
        pushArea(ar);
      });
    } else {
      pushArea(pf.Area);
    }
  };

  if (Array.isArray(prefList)) {
    prefList.forEach((pf: any) => {
      pushPref(pf);
    });
  } else {
    pushPref(prefList);
  }

  if (cityOk || stationOk) {
    return {
      city: cityOk ? cityIntList : undefined,
      station: stationOk ? stationIntList : undefined
    }
  }else return undefined
  // return ok ? stationIntList : undefined;
};


export type EarthquakeInfoType = {
  codeOnlyAreaIntList?: string[][]
  codeOnlyCityIntList?: string[][]
  codeOnlyStationIntList?: string[][]
};


export class EarthquakeEvent extends DmdataTelegramData {
  public earthquakeInfo: EarthquakeInfoType = {};

  constructor(data: DmdataTelegramType, option?: DmdataClassOptionType) {
    super(data, option);
    this._slackHookUrl = slackHookUrl;
    this._discordHookUrl = discordHookUrl;
  }

  jamet() {}

  async send() {
    await super.send();
    this.jamet();
  }
}

export class EarthquakeObservationEvent extends EarthquakeEvent {
  constructor(data: DmdataTelegramType, option?: DmdataClassOptionType) {
    super(data, option);
  }

  async init() {
    await super.init();

    // for jamet
    this.earthquakeInfo.codeOnlyAreaIntList = makeCodeOnlyAreaIntList(
      this._body.Intensity?.Observation?.Pref
    );

    const codeOnlyCityStationIntList = makeCodeOnlyCityStationIntList(
      this._body.Intensity?.Observation?.Pref
    );
    this.earthquakeInfo.codeOnlyCityIntList = codeOnlyCityStationIntList?.city;
    this.earthquakeInfo.codeOnlyStationIntList = codeOnlyCityStationIntList?.station;

    // for sns
    this.addInfo.quakeNonPrefIntList = makeAreaIntList(
      this._body.Intensity?.Observation?.Pref
    );
    this.addInfo.quakePrefIntList = makeCityIntList(
      this._body.Intensity?.Observation?.Pref
    );
    this.addInfo.quakeHypocenter = this._body.Earthquake?.Hypocenter;
    try {
      this.addInfo.quakeMagnitude = this._body.Earthquake[
        'jmx_eb:Magnitude'
      ]?.$?.description;
    } catch (e) {}
    this.addInfo.comment = this._body.Comments?.ForecastComment?.Text;
  }

  jamet() {
    quakeEventMutation(this._telegram, this.earthquakeInfo)
  }
}

export class EarthquakeAnnounceEvent extends EarthquakeEvent {
  constructor(data: DmdataTelegramType, option?: DmdataClassOptionType) {
    super(data, option);
    this.addInfo.comment = `${this._body.Text}\n 
      ${this._body.Comments?.FreeFormComment?.Text ?? ''}`;
  }
}


// test Code
// makeAreaIntList([
//   {
//     Name: 'mm',
//     Code: '04',
//     MaxInt: '4',
//     Area: [
//       {
//         Name: 'mm',
//         Code: '041',
//         MaxInt: '4',
//       },
//       {
//         Name: 'mm',
//         Code: '042',
//         MaxInt: '3',
//       },
//     ],
//   },
//   {
//     Name: 'mm',
//     Code: '05',
//     MaxInt: '4',
//     Area: [
//       {
//         Name: 'mm',
//         Code: '051',
//         MaxInt: '3',
//       },
//       {
//         Name: 'mm',
//         Code: '052',
//         MaxInt: '2',
//       },
//     ],
//   },
//   {
//     Name: 'mm',
//     Code: '06',
//     MaxInt: '4',
//     Area: {
//       Name: 'mm',
//       Code: '061',
//       MaxInt: '震度５弱以上未入電',
//     },
//   },
// ]);
