import axios from 'axios';
import { fixEscapeText } from './../../utils';

export const discordPost = async (path: string, payload: any) => {
  const data = fixEscapeText(JSON.stringify(payload), 'single');
  const param = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (path == '') {
    console.error('discord webhook URL is undefined.')
  }else {
    try {
      const res = await axios.post(path, data, param);
      // console.log(res.data);
    } catch (err) {
      console.error(err);
      try {
        const erm = {
          head: {
            type: `配信エラー ${payload.embeds[0].title!}`
          }
        };
        const res2 = await axios.post(path, erm, param);
        // console.log(res.data);
      } catch (err2) {
        console.error(err2);
      }
    }
  }

};

export default discordPost;
