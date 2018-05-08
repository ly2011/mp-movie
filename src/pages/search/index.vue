<template>
  <div class="md-search">
    <view class="md-search__header">
      <input class="md-search__input" v-model="q" :placeholder="subtitle" placeholder-class="md-search__placeholder" auto-focus @change="handleSearch">
    </view>

    <movie-list v-if="movies.length" :movies="movies" :has-more="hasMore"></movie-list>
  </div>
</template>

<script>
import MovieList from '@/components/movie-list';
import store from '../list/store';
export default {
  components: {
    'movie-list': MovieList
  },
  data() {
    return {
      q: '',
      subtitle: '请在此输入搜索内容'
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
  methods: {
    clearState() {
      store.dispatch('clearState');
    },
    async getSearchData() {
      await store.dispatch('getMovies', {
        type: 'search',
        search: this.q
      });
    },
    resetData() {
      this.clearState();
    },
    handleSearch() {
      this.resetData();
      this.getSearchData();
    }
  },
  onReachBottom() {
    // 上拉加载
    this.getSearchData();
  },
  onHide() {
    // 清空状态
    this.resetData();
  }
};
</script>

<style lang="scss">
@import 'node_modules/sass-bem/bem';
$bem-component-namespace: 'md';

@include c('search') {
  @include e('header') {
    display: flex;
    justify-content: center;
    border-bottom: 1rpx solid #eee;
  }
  @include e('input') {
    width: 100%;
    padding: 20rpx 40rpx;
    color: #666;
    font-size: 38rpx;
    text-align: center;
  }
  @include e('placeholder') {
    color: #ccc;
    font-size: 38rpx;
    text-align: center;
  }
}
</style>
