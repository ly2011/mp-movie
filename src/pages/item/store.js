// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue';
import Vuex from 'vuex';

import { getMovieData } from '@/utils/api';
import { ITEM_MOVIE_DETAIL, ITEM_CLEAR_MOVIE } from '@/store/mutations-type';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    movie: {},
    movieDetails: [] // 缓存电影详情数据
  },
  mutations: {
    [ITEM_CLEAR_MOVIE]: (state) => {
      state.movie = {};
    },
    [ITEM_MOVIE_DETAIL]: (state, { data, match }) => {
      if (!match) {
        state.movieDetails.unshift(data);
      }
      state.movie = data;
    }
  },
  actions: {
    getMovie: async ({ state, commit }, { id }) => {
      const movieDetails = state.movieDetails;
      console.log('store - id : ', id);

      const matchMovies = movieDetails.find(v => v.id === id);
      if (matchMovies) {
        return commit(ITEM_MOVIE_DETAIL, {
          data: movieDetails,
          match: true
        });
      }
      const movie = await getMovieData(id);
      if (!movie) return '';
      return commit(ITEM_MOVIE_DETAIL, {
        data: movie,
        match: false
      });
    },
    clearMovie: ({ commit }) => {
      commit(ITEM_CLEAR_MOVIE);
    }
  }
});

export default store;
