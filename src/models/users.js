import * as usersService from '../services/users';

export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
    page: null,
  },
  reducers: {
    save(state,{ payload: { data: list, total, page } }){
      return { ...state, list , total, page };
    },
  },
  effects: {
    *fetch1({ payload: {page = 1 }},{ call, put }){
      const { data, headers } = yield call(usersService.fetch, { page });
      // yield put ({ type: 'save', payload: { data, total: headers['x-total-count'] } });
      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page: page,
        },
      });
    },

    *remove({ payload: id }, { call, put, select }){
      console.info("remove...1,id:"+id);
      yield call(usersService.remove, id);
      console.info("remove...2,id:"+id);
      yield put({ type: 'reload'});
      console.info("remove...3,id:"+id);
    },

    *patch({ payload: { id, values }},{ call, put }){
      yield call(usersService.patch, id, values);
      yield put({ type: 'reload'});
    },
    *create({ payload: values },{ call,put }){
      yield call(usersService.create,values);
      yield put({ type: 'reload'});
    },
    *reload(action,{ put,select }){
      console.info("reload...1,page:"+page);
      const page=yield select(state => state.users.page);
      console.info("reload...2,page:"+page);
      yield put({ type: 'fetch1', payload: { page }});
      console.info("reload...3,page:"+page);
    },

  },
  subscriptions: {
    setup({ dispatch,history}){
      return history.listen(({ pathname, query}) => {
        console.log("subscriptions pathname:"+pathname);
        if (pathname === '/users'){
          dispatch({ type: 'fetch1', payload: query });
          console.log("fetch1 pathname:"+pathname);
        }
      }) ;
    },
  },
};
