import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import awsmobile from './aws-exports';
import { config as dotenv } from 'dotenv';

import { getEvent } from './graphql/queries';
import { convTime } from '../../utils'
import { globalCache, getMode } from '../../config'

dotenv();
const awsconfig = getMode({
  prod: awsmobile.prod,
  dev: awsmobile.dev,
}) ?? '';
Amplify.configure(awsconfig);

const username = process.env.JAMETGQL_USERNAME ?? '';
const password = process.env.JAMETGQL_PASSWORD ?? '';

const signIn = async () => {
  try {
    const user = await Auth.signIn(username, password);
    return user;
  } catch (error) {
    console.log('error signing in', error);
  }
};

export const gqlConnect = async (callback?: any) => {
  const user = await signIn();
  console.log(`Cognito: ${user.username}`);

  setInterval(() => Auth.currentSession(), 60000);

  if (callback !== undefined) callback();
};

export const gqlTest = async () => {
  const input = {
    id: 'TES2',
  };
  const res = await API.graphql(graphqlOperation(getEvent, { ...input }));
  const resAny: any = res;
  console.log(`${convTime()}: ${!!resAny.data?.getEvent}`);
};

export * from './mutate';

