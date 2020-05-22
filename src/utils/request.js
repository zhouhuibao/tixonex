import axios from 'axios'
import { Message } from 'element-ui'
import { getToken,isEmpty } from '@/utils/auth'
import Qs from 'qs'
import store from '@/store'
import errMessage from './errMessage'


const getMsg=(code)=>{
  let msgStr = ''
  for(let i=0;i<errMessage.length;i+=1){
    if(errMessage[i].code === code){
      msgStr = errMessage[i].msg
      break;
    }
  }
  return msgStr
}

// 创建axios实例
const service = axios.create({
 baseURL: '', // api 的 base_url
 // baseURL: process.env.BASE_API, // api 的 base_url
//  timeout: Config.timeout // 请求超时时间
  method:'post' , // 默认是post
  traditional:true,

})
 
// request拦截器
service.interceptors.request.use(config => {
  const {method,url,data,requestType} = config
  if(method === 'get' || method === 'GET'){
    if(isEmpty(data)){
      config.url = `${url}?${Qs.stringify(data)}`
    }
  }


  if(requestType !== 'JSON'){
    config.transformRequest= [function (data, headers) { // 利用formData的方式传参
      return Qs.stringify(data);
    }]
  }

  if(url !== 'admin/user/login'){
    config.headers.token = getToken()
  }

  
  return config
 },
 error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
 }
)
 
// response 拦截器
service.interceptors.response.use(response => {
  const code = response.status
  if (code < 200 || code > 300) {
  //  Notification.error({
  //   title: response.message
  //  })

   return Promise.reject('error')
  } else {
    const {data:{statusCode,errorMessage},config:{ exportsExcel }} = response
    
    
    if(statusCode === 100001 || statusCode === 100002){  // token失效
      store.dispatch('user/resetToken').then(() => {
        location.reload()
      })

      return response.data
    }

    if(statusCode !== 0 && !exportsExcel){
      Message({
        message: isEmpty(errorMessage) ? errorMessage : getMsg(statusCode) ,
        type: 'error'
      });
    }

   return response.data
  }
 },
 error => {
    Message({
      message: '服务器异常,请联系管理员',
      type: 'error'
    });
  return Promise.reject(error)
 }
)
export default service