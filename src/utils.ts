import zlib from 'zlib';
import moment, { Moment } from 'moment-timezone';

// unzip base64
export const unzipBase64 = (data: string, type?: string): string => {
  if (type === undefined) return data;
  let binary: Buffer;
  const buf = Buffer.from(data, 'base64');
  switch (type) {
    case 'zip':
      binary = zlib.unzipSync(buf);
      break;
    case 'gzip':
      binary = zlib.gunzipSync(buf);
      break;
    case 'plain':
      binary = buf;
      break;
    default:
      console.error('Undefined Type: Cannot unzip');
      return data;
  }
  const str: string = binary.toString('utf-8');
  return str;
};

// convert time or Date to string
export const convTime = (timeStr = 'now', format = 'YYYY/MM/DD HH:mm:ss') => {
  let timeData: Moment;

  if (timeStr === 'now') timeData = moment().tz('Asia/Tokyo');
  else timeData = moment(timeStr).tz('Asia/Tokyo');

  if (format === 'Date') return timeData.toDate();
  else if (format === 'unix') return timeData.unix();
  else return timeData.format(format);
};

// fix "\" text (ex. \n => \\n or \\n => \n)
export const fixEscapeText = (
  baseStr: string | null,
  toEscapeType: string = 'single'
): string => {
  if (baseStr === null) return '';
  switch (toEscapeType) {
    case 'single':
      // const str1 = baseStr.replace(/\\\\n/g, `\\n`);
      // const str2 = str1.replace(/\\\\t/g, `\\t`);
      return baseStr.replace(/\\\\n/g, `\\n`).replace(/\\\\t/g, `\\t`);
    case 'double':
      // const str1 = baseStr.replace(/\n/g, `\\\\n`);
      // const str2 = str1.replace(/\t/g, `\\\\t`);
      return baseStr.replace(/\n/g, `\\\\n`).replace(/\t/g, `\\\\t`);
    default:
      console.warn(
        `Warnning: fixText cannot understand escapeType "${toEscapeType}"`
      );
      return baseStr;
  }
};

// convert ISO6709 (Lat-Lon-Dep)
export const convGeoPosition = (str: string) => {
  const posi = str.match(/[+-][\d\.]+/g);
  if (!posi) return posi;

  if (!!posi[0]) {
    const intPart = posi[0].split(/[+\.]+/);

    if (intPart[1].length == 4) {
      const d = Number(intPart[1].substr(0, 2));
      const m = Number(`${intPart[1].substr(2, 2)}.${intPart[2]}`);
      const rsl = d + m / 60;
      posi[0] = `${rsl}`;
    }
  }

  if (!!posi[1]) {
    const intPart = posi[1].split(/[+\.]+/);

    if (intPart[1].length == 5) {
      const d = Number(intPart[1].substr(0, 3));
      const m = Number(`${intPart[1].substr(3, 2)}.${intPart[2]}`);
      const rsl = d + m / 60;
      posi[1] = `${rsl}`;
    }
  }
  return posi;
};

export const convGeoPositionToJGD = (posiTokyo: string[]) => {
  const posiTokyoNum = posiTokyo.map((v) => Number(v));
  const posiJGDNum = [
    posiTokyoNum[0] -
      0.00010695 * posiTokyoNum[0] +
      0.000017464 * posiTokyoNum[1] +
      0.0046017,
    posiTokyoNum[1] -
      0.000046038 * posiTokyoNum[0] -
      0.000083043 * posiTokyoNum[1] +
      0.01004,
  ];
  const posiJGD = posiJGDNum.map((v) => `${v}`);
  return posiJGD;
};

export const makeArray = (input: any) => {
  if (Array.isArray(input)) return input;
  else return [input];
}