// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue';
import Vuex from 'vuex';

import { getBoardData } from '@/utils/api';
import { BOARD_MOVIE_LIST } from '@/store/mutations-type';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    boards: [
      // { key: 'top250' },
      // { key: 'us_box' },
      // { key: 'in_theaters' },
      { key: 'coming_soon' }
    ],
    movies: []
  },
  mutations: {
    [BOARD_MOVIE_LIST]: (state, { boards }) => {
      let data;
      state.boards = state.boards.map((board, i) => {
        data = boards[i];
        board.title = data.title;
        board.movies = data.subjects;
        return board;
      });
      state.movies = state.boards[0].movies;
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
    getBoards: async ({ state, commit }) => {
      const tasks = state.boards.map(board =>
        getBoardData({ board: board.key, page: 1, count: 8 })
      );
      const boards = await Promise.all(tasks);
      commit(BOARD_MOVIE_LIST, { boards });
    }
  }
});

export default store;
