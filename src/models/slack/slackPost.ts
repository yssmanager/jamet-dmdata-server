import axios from 'axios';
import { fixEscapeText } from './../../utils';

export const slackPost = async (path: string, payload: any) => {
  const data = fixEscapeText(JSON.stringify(payload), 'single');
  const param = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(path, data, param);
    // console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};

export default slackPost;
