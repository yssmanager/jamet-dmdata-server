import { EarthquakeInfoType } from 'models/dmdata/models/earthquake/earthquake';
import {
  convGeoPosition,
  convGeoPositionToJGD,
  convTime,
} from '../../../../utils';
import { globalCache, paramCatName } from '../../../../config';
import {
  CommentTypeInput,
  CreateEventInput,
  EarthquakeTypeInput,
  HypocenterTypeInput,
} from 'models/jametGQL/graphql/API';
import { EventMutation } from '../../mutate';

const makeIntList = (type: string, codeOnlyList?: string[][]) => {
  const paramList: any = globalCache.get(paramCatName[type]);
  if (paramList == undefined) {
    console.error('Not Found ParamList');
    return undefined;
  }
  return codeOnlyList?.map((l1) => {
    return l1.map((code) => {
      return paramList.find((v: any) => v.code === code);
    });
  });
};

export const quakeEventMutation = (
  data: any,
  codeOnlyIntListObj?: EarthquakeInfoType
) => {
  const head = data.Report.Head;
  const body = data.Report.Body;

  const eventId = head.EventID;
  const originTime: string = body.Earthquake?.OriginTime ?? head.TargetDateTime;
  const arrivalTime: string = body.Earthquake?.ArrivalTime ?? head.TargetDateTime;
  const hypocenter = body.Earthquake?.Hypocenter;
  const magnitudeBase = !hypocenter
    ? undefined
    : body.Earthquake['jmx_eb:Magnitude'];
  let magnitude = magnitudeBase?._;
  if (magnitude === 'NaN') magnitude = magnitudeBase?.$?.condition;
  
  const makeHypocenter = () => {
    if (hypocenter === undefined) return undefined;
    const coordinateBase = hypocenter.Area['jmx_eb:Coordinate'];

    const coreFunc = (coordinate: any) => {
      if (coordinate?.$?.datum === '日本測地系') {
        hypocenterTokyo = makeHypocenterTokyoCore(coordinate)
      }else {
        hypocenterJGD = makeHypocenterJGDCore(coordinate)
      }
    }

    let hypocenterTokyo;
    let hypocenterJGD;

    if (Array.isArray(coordinateBase)) {
      coordinateBase.forEach((coordinate: any) => {
        coreFunc(coordinate);
      })
    }else {
      coreFunc(coordinateBase);
    }

    return {
      hypocenterTokyo,
      hypocenterJGD
    }
  }

  const makeHypocenterTokyoCore = (coordinate: any) => {
    const hypocenterPosition = (convGeoPosition(coordinate?._) as string[]);
    const hypocenterTokyo2JGDPosition = !hypocenterPosition
      ? undefined
      : convGeoPositionToJGD(hypocenterPosition);
    const depth = calcDepth(hypocenterPosition);
    const description = coordinate?.$?.description;

    return {
      ...hypocenterOutBase,
      description,
      depth,
      locationTokyo: hypocenterPosition?.slice(0, 2),
      locationJGD: hypocenterTokyo2JGDPosition,
    }
  };

  const makeHypocenterJGDCore = (coordinate: any) => {
    const hypocenterPosition = (convGeoPosition(coordinate?._) as string[]);
    const depth = calcDepth(hypocenterPosition);
    const description = coordinate?.$?.description;

    return {
      ...hypocenterOutBase,
      description,
      depth,
      locationJGD: hypocenterPosition?.slice(0, 2),
    }
  };

  const calcDepth = (position?: string[]) => {
    if (position === undefined) return undefined;
    if (position.length < 3) return undefined;
    const depthNum = Number(position[2]) / -1000;
    switch (depthNum) {
      case 0:
        return 'ごく浅い';
      case 700:
        return '700km以上';
      default:
        return `${depthNum}km`;
    }
  };

  const hypocenterOutBase: HypocenterTypeInput | undefined = !hypocenter
    ? undefined
    : {
        areaCode: hypocenter.Area.Code._,
        areaName: hypocenter.Area.Name,
        magnitude,
      };

  const earthquakeObservation:
    | EarthquakeTypeInput
    | undefined = !body.Earthquake
    ? undefined
    : {
        ...makeHypocenter()
      };

  const makeComment = (commentObj: any): CommentTypeInput | undefined  => {
    if (commentObj === undefined) return undefined;
    const code = !commentObj?.Code ? undefined : commentObj?.Code.split(' ');
    return {
      code,
      text: commentObj?.Text,
      codeType: commentObj?.$?.codeType,
    }
  }

  const out: CreateEventInput = {
    id: `SE_${eventId}`,
    type: 'seis',
    targetTimestamp: convTime(originTime, 'unix') as number ?? 0,
    kind: 'earthquake',

    eventId,
    status: data.Report.Control.Status,
    originTime,
    arrivalTime,

    earthquakeObservation,

    intensityObservationMaxInt: body.Intensity?.Observation?.MaxInt,
    intensityObservationAreaIntList: codeOnlyIntListObj?.codeOnlyAreaIntList,
    intensityObservationCityIntList: codeOnlyIntListObj?.codeOnlyCityIntList,
    intensityObservationStationIntList:
      codeOnlyIntListObj?.codeOnlyStationIntList,

    warningComment: makeComment(body.Comments?.WarningComment),
    forecastComment: makeComment(body.Comments?.ForecastComment),
    observationComment: makeComment(body.Comments?.ObservationComment),
    varComment: makeComment(body.Comments?.VarComment),
    freeFormComment: body.Comments?.FreeFormComment
  };
  // console.log(out);
  EventMutation(out);
};
