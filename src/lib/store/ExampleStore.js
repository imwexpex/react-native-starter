import {apiCall, Endpoints, Methods} from '@api';
import asyncAction from '@lib/store/helpers/asyncAction';
import {types} from 'mobx-state-tree';

export const ExampleState = {
  data: null,
};

function getData({someData}) {
  return async function getDataFlow(store, _, root) {
    try {
      const {data} = await apiCall({
        endpoint: `${Endpoints.TEST}/${someData}`,
        method: Methods.GET,
      });

      store.setData(data);
    } catch (e) {
      console.error(e);
    }
  };
}

const Place = types.model(
  {
    data: types.maybe(types.frozen()),
    getData: asyncAction(getData),
  }.actions((store) => ({
    setData(data) {
      store.data = data;
    },
  })),
);

export default Place;
