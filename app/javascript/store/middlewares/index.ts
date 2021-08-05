import { Middleware } from 'redux';
import { apiFetchSucceeded } from '../actions';
import { State } from '../reducers';
import toParams from './toParams';
import http from 'store/http-common';

const middleware: Middleware<unknown, State> =
  (state) => (next) => (action) => {
    if (action.type !== 'API_FETCH_REQUESTED') return next(action);
    return http.get(
      `/${action.payload.model}.json?${toParams(action.payload.params)}`,
    ).then(async (response) => {
      response.data = response.data.map((c:any)=>{
        if (c.value) {
          c.value = c.value.toFixed(2);
        }
        return c;
      })
      state.dispatch(apiFetchSucceeded(action.payload.model, response.data));
    }).catch(error => console.log(error)
    );
  };



export default middleware;
