import { TCoordinate, TMagnitude, TProbabilityOfAfterShock, TTsunamiHeight } from './jmx_eb';

export type TSeisBody = {
  Naming?: TNaming;
  Tsumani?: TTsunami;
  Earthquake?: TEarthquake[];
  Intensity?: TIntensity;
  Tokai?: TTokai;
  EarthquakeInfo?: TEarthquakeInfo;
  EarthquakeCount?: TEarthquakeCount;
  Aftershocks?: TAftershocks;
  Text?: string;
  NextAdvisory?: string;
  Comments?: TComment;
};

export type TEarthquake = {
  OriginTime?; //
  ArrivalTime; //
  Condition?: string;
  Hypocenter?: THypocenter;
  'jmx_eb:Magnitude': TMagnitude[];
};

type THypocenter = {
  Area: THypoArea;
  Source?: string;
  Accuracy?: TAccuracy;
};

type THypoArea = {
  Name: string;
  Code: THypoAreaCode;
  'jmx_eb:Coordinate': TCoordinate[]; //
  ReduceName?: string;
  ReduceCode?: THypoAreaReduceCode;
  DetailedName?: string;
  DetailedCode?: THypoAreaDetailedCode;
  NameFromMark?: string;
  MarkCode?: THypoAreaMarkCode;
  Direction?: string;
  Distance?: THypoAreaDistance;
  LandOrSea?: ELandOrSea;
};

type THypoAreaCode = {
  type: string;
  $t: string;
};

type THypoAreaReduceCode = {
  type: string;
  $t: string;
};

type THypoAreaDetailedCode = {
  type: string;
  $t: string;
};

type THypoAreaMarkCode = {
  type: string;
  $t: string;
};

type THypoAreaDistance = {
  unit: string;
  $t: string;
};

type TAccuracy = {
  Epicenter: TAccuracyEpicenter;
  Depth: TAccuracyDepth;
  MagnitudeCalculation: TAccuracyMagnitude;
  NumberOfMagnitudeCalculation: string;
};

type TAccuracyEpicenter = {
  rank: string;
  rank2: string;
  $t: string;
};

type TAccuracyDepth = {
  rank: string;
  $t: string;
};

type TAccuracyMagnitude = {
  rank: string;
  $t: string;
};

type TTsunami = {
  Release?: string;
  Observation?: TTsunamiDetail;
  Estimation?: TTsunamiDetail;
  Forecast?: TTsunamiDetail;
};

type TTsunamiDetail = {
  CodeDefine?: TCodeDefine;
  Item: TTsunamiItem[];
};

type TTsunamiItem = {
  Area: TForecastArea;
  Category?: TCategory;
  FirstHeight?: TFirstHeight;
  MaxHeight?: TMaxHeight;
  Duration?; //
  Station: TTsunamiStation[];
};

type TForecastArea = {
  Name: string;
  Code: string;
  City?: TForecastCity[];
};

type TForecastCity = {
  Name: string;
  Code: string;
};

type TCategory = {
  Kind: TKind;
  LastKind?: TKind;
};

type TKind = {
  Name: string;
  Code: string;
};

type TFirstHeight = {
  ArrivalTimeFrom; //
  ArrivalTimeTo; //
  ArrivalTime; //
  Condition?: string;
  Initial?: string;
  'jmx_eb:TsunamiHeight'?: TTsunamiHeight;
  Revise?: string;
  Period?: float;
};

type TMaxHeight = {
  DateTime?; //
  Condition?: string;
  TsunamiHeightFrom?: TTsunamiHeight; //
  TsunamiHeightTo?: TTsunamiHeight; //
  'jmx_eb:TsunamiHeight'?: TTsunamiHeight; //
  Revise?: string;
  Period?: string;
};

type TCurrentHeight = {
  StartTime?; //
  EndTime?; //
  Condition?: string;
  'jmx_eb:TsunamiHeight'?: TTsunamiHeight;
};

type TTsunamiStation = {
  Name: string;
  Code: string;
  Sensor?: string;
  HighTideDateTime?; //
  FirstHeight?: TFirstHeight;
  MaxHeight?: TMaxHeight;
  CurrentHeight?: TCurrentHeight;
};

type TIntensity = {
  Forcast?: TIntensityDetail;
  Observation?: TIntensityDetail;
};

type TIntensityDetail = {
  CodeDefine?: TCodeDefine;
  MaxInt?: string;
  ForcastInt?: TForecastInt;
  Appendix?: TIntensityAppendix;
  Pref?: TIntensityPref[];
};

type TForecastInt = {
  From?: string;
  To?: string;
  bound?: string;
};

type TIntensityAppendix = {
  MaxIntChange: string;
  MaxIntChangeReason: string;
};

type TIntensityPref = {
  Name: string;
  Code: string;
  Category?: TCategory;
  MaxInt?: string;
  ForecastInt?: TForecastInt;
  ArrivalTime?; //
  Condition?: string;
  Revise?: string;
  Area?: TIntensityArea[];
};

type TIntensityArea = {
  Name: string;
  Code: string;
  Category?: TCategory;
  MaxInt?: string;
  ForecastInt?: TForecastInt;
  ArrivalTime?; //
  Condition?: string;
  Revise?: string;
  City?: TIntensityCity[];
};

type TIntensityCity = {
  Name: string;
  Code: string;
  Category?: TCategory;
  MaxInt?: string;
  ForecastInt?: TForecastInt;
  ArrivalTime?: date;
  Condition?: string;
  Revise?: string;
  Station?: TIntensityStation[];
};

type TIntensityStation = {
  Name: string;
  Code: string;
  Int: string;
  K?: string;
  Revise?: string;
};

type TEarthquakeCount = {
  Item: TCountData[];
};

type TCountData = {
  StartTime; //
  EndTime; //
  Number: string;
  FeltNumber: string;
  Condition?: string;
  type: string;
};

type TTokai = {
  InfoKind: string;
  InfoSerial?: TInfoSerial;
  Text: string;
};

type TInfoSerial = {
  Name: string;
  Code: string;
  codeType: string;
};

type TEarthquakeInfo = {
  InfoKind: string;
  InfoSerial?: TInfoSerial;
  Text: string;
  Appendix?: string;
  type: string;
};

type TNaming = {
  english?: string;
  $t: string;
};

type TAftershocks = {
  Item: TAftershockItem[];
  Text?: string;
};

type TAftershockItem = {
  StartTime; //
  EndTime; //
  'jmx_eb:ProbabilityOfAftershock': TProbabilityOfAfterShock;
  TargetMagnitude: TMagnitude;
  Text?: string;
};

type TComment = {
  WarningComment?: TCommentForm;
  ForecastComment?: TCommentForm;
  ObservationComment?: TCommentForm;
  VarComment?: TCommentForm;
  FreeFormComment?: string;
};

type TCommentForm = {
  Text: string;
  Code: string;
  codeType: string;
};

type TCodeDefine = {
  Type: TCodeDefineType[];
};

type TCodeDefineType = {
  xpath: string;
  $t: string;
};

// enum ELandOrSea {
//   '内陸',
//   '海域',
// }
