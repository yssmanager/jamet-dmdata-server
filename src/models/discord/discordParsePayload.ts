import { convTime, checkNullBlankString } from '../../utils';
import { AddInfoType, DmdataTelegramType } from '../dmdata/telegram';
import { PointListType } from '../dmdata/models/earthquake/earthquake';
import { IntensityLvColor, IntensityLvStr } from '../../types/basic';

const parseNonPrefIntList = (intList: any[]) => {
  const nameOnlyList = intList.map((l1: any[], id) => {
    const str = l1.map((l2) => l2.Name).join('　');
    if (str != '') {
      return {
        name: `＜${IntensityLvStr[id]}＞`,
        value: str,
      };
    } else return undefined;
  });

  return nameOnlyList.filter((el) => el != undefined).reverse();
};

const parsePrefIntList = (intList: any[][]) => {
  const nameOnlyList = intList.map((l1: any, id) => {
    //
    let str = l1
      .map((l2: PointListType) => {
        const str = l2.points
          .map((l3: any) => l3.Name)
          .filter((el: any) => el != undefined)
          .join('　');

        return {
          name: `［${l2.prefName}］`,
          value: str,
        };
      })
      .filter((el: any) => el.value.length > 0);
    // .join('\n');

    return (!str.length ? undefined : {
      head: `＜${IntensityLvStr[id]}＞`,
      body: str,
      color: IntensityLvColor[id]
    });
  });

  return nameOnlyList
    .reverse()
    .flat()
    .filter((el) => el != undefined);
};

// old
// const parsePrefIntList_old = (intList: any[][]) => {
//   const nameOnlyList = intList.map((l1: any, id) => {
//     //
//     let str = l1
//       .map((l2: any[]) => {
//         return l2
//           .map((l3: any) => {
//             if (typeof l3 === 'string') return l3;
//             else return l3.Name;
//           })
//           .filter((el: any) => el.length > 0)
//           .join('　');
//       })
//       .filter((el: any) => el.length > 0)
//       .join('\n');

//       if (str != '') {
//         return {
//           name: `＜${IntensityLvStr[id]}＞`,
//           value: str
//         }
//       }else return undefined
//   });
//   console.log(nameOnlyList);

//   return nameOnlyList
//     .filter((el) => el != undefined)
//     .reverse()
// };

type EmbedOptionType = {
  title?: string,
  color?: string | number
}

const makePayload = async (base: any, data?: DmdataTelegramType, info?: AddInfoType) => {
  let embeds = 1;

  if (info === undefined) return base;

  const pushEmbeds = (options?: EmbedOptionType) => {
    base.embeds.push({
      title: options?.title ?? data?.xmlReport?.head?.title!,
      color: options?.color ?? 16711680,
      fields: [],
    });
    embeds++;
  }

  const pushField = async (name: string, value: string, deps: number) => {
    if (deps >= embeds) {
      pushEmbeds();
      deps = embeds-1;
    }
    base.embeds[deps].fields.push({
      name: name,
      value: value,
    });
  };
  
  const concatField = async (list: any[], deps: number, options?: EmbedOptionType) => {
    if (deps >= embeds) pushEmbeds(options);
    deps = embeds-1;
    base.embeds[deps].fields = base.embeds[deps].fields.concat(list);
  };

  const concatFieldList = async (list: any[], deps: number) => {
    for(let i = 0; i < list.length; i++) {
      concatField(list[i].body, deps+i, {
        'title': list[i].head,
        'color': list[i].color!
      });
    }
  }
  
  if (info.quakeHypocenter || info.quakeMagnitude !== undefined) {
    let txt: string = '';
    if (info.quakeHypocenter !== undefined) {
      txt += `${info.quakeHypocenter.Area?.Name} \n`;
      txt += `${info.quakeHypocenter.Area['jmx_eb:Coordinate']?.$?.description} \n`;
    }
    if (info.quakeMagnitude !== undefined) {
      txt += `${info.quakeMagnitude} \n`;
    }
    
    await pushField('【震源】', txt, 0);
  }
  
  if (info.quakePrefIntList !== undefined) {
    const intList = parsePrefIntList(info.quakePrefIntList);
    await concatFieldList(intList, 1);
  } else if (info.quakeNonPrefIntList !== undefined) {
    const intList = parseNonPrefIntList(info.quakeNonPrefIntList);
    await concatField(intList, 0);
  }
  
  if (info.additionalList !== undefined) {
    const txtBaseList = info.additionalList.map(val => val.split('\n\n')).flat();
    const txtList = txtBaseList.map((val, i) => ({body: {name: `${i+1}/${txtBaseList.length}`, value: val}}));
    await concatFieldList(txtList, 1);

    await pushField('本文', '続く', 0);
  }else {
    await pushField('本文', info.comment ?? 'なし', 0);
  }

  return base;
};

export const discordParsePayload = async (
  data: DmdataTelegramType,
  addInfo?: AddInfoType
) => {
  if (data.xmlReport === undefined)
    return {
      content: `電文: ${data.head?.type}`,
    };
  const basePayload = {
    embeds: [
      {
        title: data.xmlReport?.head?.title!,
        fields: [
          {
            name: '電文ヘッダ',
            value: data.head?.type,
            inline: true,
          },
          {
            name: '情報名',
            value: data.xmlReport?.control?.title,
            inline: true,
          },
          {
            name: '運用種別',
            value: data.xmlReport?.head?.infoKind,
            inline: true,
          },
          {
            name: '発表形態',
            value: data.xmlReport?.head?.infoType,
            inline: true,
          },
          {
            name: '編集官署名',
            value: data.xmlReport?.control?.editorialOffice,
            inline: true,
          },
          {
            name: '発表官署名',
            value: data.xmlReport?.control?.publishingOffice,
            inline: true,
          },
          {
            name: '発表時刻',
            value: convTime(data.xmlReport?.control?.dateTime),
            inline: true,
          },
          {
            name: 'EventID',
            value: checkNullBlankString(data.xmlReport?.head?.eventId, 'なし'),
            inline: true,
          },
          {
            name: 'Serial',
            value: checkNullBlankString(data.xmlReport?.head?.serial, 'なし'),
            inline: true,
          },
          {
            name: '見出し',
            value: checkNullBlankString(data.xmlReport?.head?.headline, '特記事項なし'),
          },
        ],
      },
      
    ],
  };

  const payload = await makePayload(basePayload, data, addInfo);

  return payload;
};
