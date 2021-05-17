import { fixEscapeText, convTime } from './../../utils';
import { DmdataTelegramType } from '../dmdata/telegram';

export const slackParsePayload = (data: DmdataTelegramType) => {
  if (data.xmlData === undefined)
    return {
      text: `電文: ${data.data.type}`,
    };
  try {
    const payloadStr = `{
      "text": "${data.xmlData.head.title}",
      "blocks": [
        {
          "type": "header",
          "text": {
            "type": "plain_text",
            "text": "${data.xmlData.head.title}",
            "emoji": true
          }
        },
        {
          "type": "section",
          "fields": [
            {
              "type": "mrkdwn",
              "text": "*電文ヘッダ*\\n ${data.data.type}"
            },
            {
              "type": "mrkdwn",
              "text": "*情報名*\\n ${data.xmlData.control.title}"
            },
            {
              "type": "mrkdwn",
              "text": "*運用種別*\\n ${data.xmlData.head.infoKind}"
            },
            {
              "type": "mrkdwn",
              "text": "*発表形態*\\n ${data.xmlData.head.infoType}"
            },
            {
              "type": "mrkdwn",
              "text": "*編集官署名*\\n ${data.xmlData.control.editorialOffice}"
            },
            {
              "type": "mrkdwn",
              "text": "*発表官署名*\\n ${data.xmlData.control.publishingOffice}"
            },
            {
              "type": "mrkdwn",
              "text": "*発表時刻*\\n ${convTime(
                data.xmlData.control.dateTime
              )}"
            },
            {
              "type": "mrkdwn",
              "text": "*EventID*\\n ${data.xmlData.head.eventId || 'なし'}"
            }
          ]
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "${
              fixEscapeText(data.xmlData.head.headline, 'double') ||
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
