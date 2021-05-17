import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { CreateEventInput } from './graphql/API';
import { createEvent, updateEvent } from './graphql/mutations';
import { getEvent } from './graphql/queries';




export const EventMutation = async (input: CreateEventInput) => {
  try {
    const eventRsl: any = await API.graphql(
      graphqlOperation(getEvent, { id: input.id })
    );

    
    const eventMutation = eventRsl.data?.getEvent == null ? 
      {name: 'createEvent', action: createEvent} : 
      {name: 'updateEvent', action: updateEvent};

    const res: any = await API.graphql(
      graphqlOperation(eventMutation.action, { input })
    );
    // console.log(res.data);
  } catch (e) {
    console.error(e);
  }
};
