// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue';
import Vuex from 'vuex';

import { getBoardData } from '@/utils/api';
import { LIST_MOVIE_LIST, LIST_CLEAR_STATE } from '@/store/mutations-type';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    page: 1,
    hasMore: true,
    movies: [],
    type: ''
  },
  mutations: {
    [LIST_CLEAR_STATE]: (state) => {
      state.page = 1;
      state.hasMore = true;
      state.movies = [];
    },
    [LIST_MOVIE_LIST]: (state, { data, type }) => {
      state.type = type;
      if (data.subjects.length) {
        // eslint-disable-next-line
        state.movies.push.apply(state.movies, data.subjects);

        if (type === 'us_box') {
          state.hasMore = false;
        }
      } else {
        state.hasMore = false;
      }
    }
    // increment: (state) => {
    //   const obj = state;
    //   obj.count += 1;
    // },
    // decrement: (state) => {
    //   const obj = state;
    //   obj.count -= 1;
    // }
  },
  actions: {
    getMovies: async ({ state, commit }, { type, search }) => {
      if (!state.hasMore) {
        return;
      }
      const data = await getBoardData({
        board: type,
        page: state.page++, // eslint-disable-line
        search
      });
      commit(LIST_MOVIE_LIST, { data, type });
    },
    clearState: ({ commit }) => {
      commit(LIST_CLEAR_STATE);
    }
  }
});

export default store;
