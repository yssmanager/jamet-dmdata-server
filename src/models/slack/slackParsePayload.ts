import { fixEscapeText, convTime } from './../../utils';
import { DmdataTelegramType } from '../dmdata/telegram';

export const slackParsePayload = (data: DmdataTelegramType) => {
  if (data.xmlReport === undefined)
    return {
      text: `電文: ${data.head.type}`,
    };
  try {
    const payloadStr = `{
      "text": "${data.xmlReport.head.title}",
      "blocks": [
        {
          "type": "header",
          "text": {
            "type": "plain_text",
            "text": "${data.xmlReport.head.title}",
            "emoji": true
          }
        },
        {
          "type": "section",
          "fields": [
            {
              "type": "mrkdwn",
              "text": "*電文ヘッダ*\\n ${data.head.type}"
            },
            {
              "type": "mrkdwn",
              "text": "*情報名*\\n ${data.xmlReport.control.title}"
            },
            {
              "type": "mrkdwn",
              "text": "*運用種別*\\n ${data.xmlReport.head.infoKind}"
            },
            {
              "type": "mrkdwn",
              "text": "*発表形態*\\n ${data.xmlReport.head.infoType}"
            },
            {
              "type": "mrkdwn",
              "text": "*編集官署名*\\n ${data.xmlReport.control.editorialOffice}"
            },
            {
              "type": "mrkdwn",
              "text": "*発表官署名*\\n ${data.xmlReport.control.publishingOffice}"
            },
            {
              "type": "mrkdwn",
              "text": "*発表時刻*\\n ${convTime(
                data.xmlReport.control.dateTime
              )}"
            },
            {
              "type": "mrkdwn",
              "text": "*EventID*\\n ${data.xmlReport.head.eventId || 'なし'}"
            }
          ]
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "${
              fixEscapeText(data.xmlReport.head.headline, 'double') ||
              '特記事項なし'
            }"
          }
        },
        {
          "type": "divider"
        }
      ]
    }`;
  
    return JSON.parse(payloadStr);
  }catch (e) {
    return e;
  }
  
};
