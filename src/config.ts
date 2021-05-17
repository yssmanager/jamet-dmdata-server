import axios from 'axios';
import { config as dotenv } from 'dotenv';
import NodeCache from 'node-cache';

dotenv();

// type modeType = 'prod' | 'dev' | 'test';
// type modeActionType = {
//   prod?: any;
//   dev?: any;
//   test?: any;
// };

export const globalCache = new NodeCache();

export const getMode = (action?: { [index: string]: any }) => {
  const mode: string = process.env.MODE ?? 'dev'; // 'prod' or 'dev' or 'test'

  if (action === undefined) return mode;
  const res = action[mode] ?? 'undefined';
  return res;
};

const getJsonApiFromDatapool = async (catName: string) => {
  try {
    const resp = await axios.get(
      `https://data.illuminair.jp/jma_code/latest/${catName}.json`
    );
    const data = resp.data.items;
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const paramCatName: { [key: string]: string } = {
  pref: 'AreaInformationPrefectureEarthquake',
  area: 'AreaForecastLocalE',
  city: 'AreaInformationCity',
  istation: 'PointSeismicIntensity',
};

export const fetchParamData = async () => {
  const params: { [key: string]: any } = {};
  await Promise.all(
    Object.keys(paramCatName).map(async (cat) => {
      const catName = paramCatName[cat];
      const resp = await getJsonApiFromDatapool(catName);

      params[cat] = resp;
      return {
        key: cat,
        value: resp,
      };
    })
  );

  Object.keys(params).forEach(async (cat) => {
    const catName = paramCatName[cat];
    const param = params[cat];
    const res = param.map((item: any) => {
      if (item['prefCode'] !== undefined) {
        item['pref'] = params['pref'].find(
          (v: any) => v.code === item['prefCode']
        );
        delete item['prefCode'];
      }
      if (item['areaCode'] !== undefined) {
        item['area'] = params['area'].find(
          (v: any) => v.code === item['areaCode']
        );
        delete item['areaCode'];
      }
      if (item['cityCode'] !== undefined) {
        item['city'] = params['city'].find(
          (v: any) => v.code === item['cityCode']
        );
        delete item['cityCode'];
      }
      if (item['status'] !== undefined) delete item['status'];

      return item;
    });
    const tf = globalCache.set(catName, res);
  });
  console.log('Fetch Param');

  setTimeout(fetchParamData, 86400000);
};
