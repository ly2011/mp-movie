<template>
  <div class="md-item">
    <image v-if="movie.images" class="md-item__background" :src="movie.images.large" mode="aspectFit" />
    <block v-if="movie.title">
      <view class="md-item__meta">
        <image class="md-item__poster" :src="movie.images.large" mode="aspectFit" />
        <text class="md-item__title">{{movie.title}}({{movie.year}})</text>
        <text class="md-item__info">评分：{{movie.rating.average}}</text>
        <text class="md-item__info">导演：<block v-for="director in movie.directors" :key="director.id">{{director.name}}</block></text>
        <text class="md-item__info">主演：<block v-for="cast in movie.casts" :key="cast.id"> {{cast.name}}</block></text>
      </view>

      <view class="md-item__summary">
        <text class="md-item__label">摘要：</text>
        <text class="md-item__content">{{movie.summary}}</text>
      </view>
    </block>
  </div>
</template>

<script>
// Use Vuex
import wx from '@/utils/wx';
import store from './store';
export default {
  data() {
    return {
      id: null
    };
  },
  computed: {
    movie() {
      return store.state.movie;
    }
  },
  mounted() {
    const { id } = this.$root.$mp.query;
    console.log('id:', id);

    if (!id) {
      return wx.navigateBack();
    }
    this.id = id;
    this.getMovie();
  },
  methods: {
    async getMovie() {
      await store.dispatch('getMovie', {
        id: this.id
      });
      wx.setNavigationBarTitle({
        title: `${this.movie.title}  « 电影 « 豆瓣`
      });
    },
    clearMovie() {
      store.dispatch('clearMovie');
    }
  },
  onUnload() {
    this.clearMovie();
  }
};
</script>

<style lang="scss">
@import 'node_modules/sass-bem/bem';
$bem-component-namespace: 'md';

@include c('item') {
  @include e('background') {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: -1000;
    opacity: 0.1;
  }
  @include e('meta') {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50rpx 40rpx;
  }
  @include e('poster') {
    width: 100%;
    height: 800rpx;
    margin: 20rpx;
  }
  @include e('title') {
    font-style: 42rpx;
    color: #444;
  }
  @include e('info') {
    font-size: 24rpx;
    color: #888;
    margin-top: 20rpx;
    width: 80%;
  }
  @include e('summary') {
    width: 80%;
    margin: 30rpx auto;
  }
  @include e('label') {
    display: block;
    font-size: 30rpx;
    margin-bottom: 30rpx;
  }
  @include e('content') {
    color: #666;
    font-size: 22rpx;
    padding: 2em;
  }
}
</style>
