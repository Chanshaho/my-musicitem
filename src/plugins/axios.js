import axios from 'axios'
import Vue from 'vue'
const _axios = axios.create({
  // baseURL: 'http://localhost:3000'
  baseURL: 'http://47.115.51.185:8081/'
  // baseURL:"http://music.eleuu.com/" //axios.get('/recommend/songs')
})
//请求之前的拦截器,在请求之前可以传递一些额外的统一比如: token
_axios.interceptors.request.use(
  function(config) {
    //请求之前拦截请求数据做一些事情
    // console.log("axios请求之前",config);
    // config.params.token='abcdddddddddddd';
    return config
  },
  function(error) {
    //请求失败做一些事情
    return Promise.reject(error)
  }
)
//响应拦截器
_axios.interceptors.response.use(
  function(response) {
    //可以给响应数据做一些处理.
    if (response.data) {
      if (response.data.result) {
        return response.data.result
      }
      return response.data
    }
    if (response.result) {
      return response.result
    }
    return response
  },
  function(err) {
    //如果响应失败 创建一个失败Promise对象 并添加错误信息
    return Promise.reject(err)
  }
)

const AxiosPlugin = {}
AxiosPlugin.install = function(Vue) {
  // Vue.prototype.axios=_axios; //this.axios
  // Vue.prototype.$axios=_axios;//this.$axios
  //给Vue的原型对象上面添加一个属性.并设置一个getter返回_axios对象
  // Object.defineProperty(Vue.prototype,'axios',{
  //     get(){
  //         return _axios;
  //     }
  // });
  // Object.defineProperty(Vue.prototype,'$aixos',{
  //     get:function(){
  //         return _axios;
  //     }
  // })
  //Object.definedProperties是defineProperty的复数 可以同时定义多个属性
  //在Vue构造函数的原型对象上面添加了axios属性和$axios属性
  Object.defineProperties(Vue.prototype, {
    axios: {
      //添加axios属性 并配置
      get() {
        return _axios
      }
    },
    $axios: {
      get() {
        return _axios
      }
    }
  })
}
Vue.use(AxiosPlugin)

export default _axios
