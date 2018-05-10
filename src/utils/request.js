// ajax请求
import wx from 'wx';
import Fly from 'flyio';

const request = new Fly();

request.config.timeout = 10 * 1000;

console.log('METHOD: ', process.env); // 不知为何cross-env METHOD=proxy1 不生效
const TARGET = process.env.npm_lifecycle_event;
console.log('TARGET: ', TARGET);

if (process.env.METHOD === 'proxy1') {
  request.config.baseURL = 'http://localhost:3001/douban'; // 本地代理1(100次/小时)
} else if (process.env.METHOD === 'proxy2') {
  request.config.baseURL = 'http://localhost:3002'; // 本地代理2(100次/小时)
} else if (process.env.METHOD === 'nginx') {
  request.config.baseURL = 'https://movie.douban.gusaifei.com/v2/movie'; // nginx 代理(100次/小时)
} else {
  request.config.baseURL = 'https://movie.douban.gusaifei.com/v2/movie'; // 本地代理1(100次/小时)
}

// eslint-disable-next-line
request.interceptors.request.use(request => {
  wx.showLoading({ title: '拼命加载中...' });
  return request;
});

request.interceptors.response.use(
  (response, promise) => {
    wx.hideLoading();
    return promise.resolve(response.data);
  },
  (err, promise) => {
    wx.hideLoading();
    wx.showToast({
      title: err.message,
      icon: 'none'
    });
    return promise.resolve();
  }
);

export default request;
