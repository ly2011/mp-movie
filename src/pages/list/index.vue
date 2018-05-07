<template>
  <div class="md-list">
    <movie-list :movies="movies" :has-more="hasMore" :type="type"></movie-list>
  </div>
</template>

<script>
// Use Vuex
import wx from '@/utils/wx';
import MovieList from '@/components/movie-list';
import store from './store';
export default {
  components: {
    'movie-list': MovieList
  },
  data() {
    return {
      type: ''
    };
  },
  computed: {
    hasMore() {
      return store.state.hasMore;
    },
    type() {
      return store.state.type;
    },
    movies() {
      return store.state.movies;
    }
  },
  mounted() {
    const { title, type } = this.$root.$mp.query;
    wx.setNavigationBarTitle({ title: `${title} « 电影 « 豆瓣` });
    this.type = type;
    this.getMovieList();
  },
  methods: {
    clearState() {
      store.dispatch('clearState');
    },
    async getMovieList() {
      await store.dispatch('getMovies', {
        type: this.type
      });
    }
  },
  async onPullDownRefresh() {
    // 下拉刷新
    this.clearState();
    await this.getMovieList();
    wx.stopPullDownRefresh();
  },
  onReachBottom() {
    // 上拉加载
    this.getMovieList();
  },
  onUnload() {
    // 清空状态
    this.clearState();
  }
};
</script>

<style>

</style>
