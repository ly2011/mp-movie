<template>
  <div class="md-profile">
    <view class="md-profile__user" @click="getUserInfo">
      <image class="md-profile__user-avatar" :src="userInfo.avatarUrl" mode="aspectFit" />
      <text class="md-profile__user-nickname">{{userInfo.nickName}}</text>
      <text :hidden="!userInfo.city">{{userInfo.city}}, {{userInfo.province}}</text>
      <text :hidden="!userInfo.city">Thanks~</text>
    </view>
  </div>
</template>

<script>
import { login, getUserInfo } from '@/utils/wechat';
export default {
  data() {
    return {
      title: '关于',
      userInfo: {
        wechat: 'ly2011',
        nickName: 'https://github.com/ly2011/mp-movie',
        avatarUrl: '/static/images/qrcode-ly2011.png'
      }
    };
  },
  mounted() {
    // eslint-disable-next-line
    login().then(res => {
      console.log('登录成功：', res);
    });
  },
  methods: {
    async getUserInfo() {
      const data = await getUserInfo();
      this.userInfo = data.userInfo;
      console.log('userInfo: ', data.userInfo);
    }
  }
};
</script>

<style lang="scss">
@import 'node_modules/sass-bem/bem';
$bem-component-namespace: 'md';

@include c('profile') {
  @include e('header') {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #ccc;
  }
  @include e('title') {
    padding: 40rpx;
    color: #999;
    font-size: 148rpx;
    text-align: center;
  }
  @include e('user') {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @include e('user-avatar') {
    width: 100%;
    height: 620rpx;
    margin: 40rpx;
  }
  @include e('user-nickname') {
    color: #aaa;
    font-size: 30rpx;
    margin-bottom: 30rpx;
  }
}
</style>
