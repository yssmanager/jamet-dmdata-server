import { Parser } from 'xml2js'
import zlib from 'zlib';
import { DmdataTelegramType } from './telegram'

const xmlParser = new Parser({explicitArray: false});

export type DmdataDataOption = {
  classification?: string
  key?: string
  url?: string
  type: string
  author?: string
  time?: string
  bbb?: null
  test?: boolean
  xml?: boolean
  compression?: string | null
  createTime?: string
  sendNumber?: number
}

export const createDmdataTelegram = async (xml: string, option?: DmdataDataOption) => {
  const parseObj = await xmlParser.parseStringPromise(xml);
  const binary = zlib.gzipSync(xml).toString('base64');

  const dmdata: DmdataTelegramType = {
    type: 'data',
    classification: option?.classification ?? 'test',
    key: option?.key ?? 'test',
    url: option?.url ?? 'test',
    body: binary,
    data: {
      type: option?.type ?? 'VAAA99',
      author: option?.author ?? 'TEST', 
      time: option?.time ?? parseObj.Report.Head.ReportDateTime,
      test: option?.test ?? true,
      xml: option?.xml ?? true,
      compression: option?.compression ?? 'gzip',
      createTime: option?.createTime ?? parseObj.Report.Head.ReportDateTime,
      sendNumber: option?.sendNumber ?? 0
    },
    xmlData: {
      control: {
        title: parseObj.Report.Control.Title,
        dateTime: parseObj.Report.Control.DateTime,
        status: parseObj.Report.Control.Status,
        editorialOffice: parseObj.Report.Control.EditorialOffice,
        publishingOffice: parseObj.Report.Control.PublishingOffice,
      },
      head: {
        title: parseObj.Report.Head.Title,
        reportDateTime: parseObj.Report.Head.ReportDateTime,
        targetDateTime: parseObj.Report.Head.TargetDateTime,
        targetDateTimeDubious: parseObj.Report.Head.TargetDateTimeDubious,
        targetDuration: parseObj.Report.Head.TargetDuration,
        validDateTime: parseObj.Report.Head.ValidDateTime,
        eventId: parseObj.Report.Head.EventID,
        serial: parseObj.Report.Head.Serial === '' ? undefined : parseObj.Report.Head.Serial,
        infoType: parseObj.Report.Head.InfoType,
        infoKind: parseObj.Report.Head.InfoKind,
        infoKindVersion: parseObj.Report.Head.InfoKindVersion,
        headline: parseObj.Report.Head.Headline.Text,
      }
    }
  }

  return dmdata;
}