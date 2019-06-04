import vueAxios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// vueAxios.defaults.withCredentials = true
// 创建axios实例
const axios = vueAxios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 30000, // 请求超时时间,
  headers: {
    'Access-Control-Allow-Origin': process.env.BASE_API,
    'Content-Type': process.env.Content_Type,
    'ccess-Control-Allow-Credentials': true
  }
})

// request拦截器
axios.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers[ 'msToken' ] = getToken()
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
axios.interceptors.response.use(
  response => {
    const res = response.data
//  if (res.code === 1) {
    	var msg = ""
    	switch(res.msg){
    		case 0:
    			msg = "图片加载失败，请重新拍照注册"
    			break;
    		case 30231:
    			msg = "手机号不能为空"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
    			break;
    		case 30251:
    			msg = "请填写姓名"
    			break;
    		case 30261:
    			msg = "请填写手机号"
    			break;
    		case 30237:
    			msg = "发送验证码失败，请稍后尝试"
    			break;
				case 30271:
    			msg = "图片异常，请重新拍照"
    			break;
    		case 30381:
    			msg = "验证码为空"
    			break;
    		case 30382:
    			msg = "验证码不正确"
    			break;
    		case 30386:
    			msg = "请获取手机验证码"
    			break;
    		case 4001:
    			msg = "参数保存异常"
    			break;
    		case 40012:
    			msg = "未有效删除自定义字段"
    			break;
    		case 40022:
    			msg = "图片异常，请重新拍照"
    			break;
    		case 40023:
    			msg = "未有图片处理结果"
    			break;
    		case 40033:
    			msg = "关联信息不存在"
    			break;
    		case 1001:
    			msg = "图片模糊"
    			break;
    		case 1002:
    			msg = "多张人脸"
    			break;
    		case 1003:
    			msg = "图片太小"
    			break;
    		case 1004:
    			msg = "图片太大"
    			break;
    		case 1005:
    			msg = "图片为空"
    			break;
    		case 1006:
    			msg = "没有人脸"
    			break;
    		case 1007:
    			msg = "保存图片失败"
    			break;
    		case 1008:
    			msg = "save feature failed"
    			break;
    		case 1009:
    			msg = "图片太暗"
    			break;
    		case 1010:
    			msg = "光照不平衡"
    			break;
    		case 1011:
    			msg = "Image is side face/侧脸"
    			break;
    		case 1012:
    			msg = "Face is noisy"
    			break;
    		case 2001:
    			msg = "参数错误"
    			break;
    		case 2002:
    			msg = "上传错误"
    			break;
    		case 2003:
    			msg = "文件错误，请重新上传图片"
    			break;
    		case 2004:
    			msg = "文件不存在"
    			break;
    		case 2005:
    			msg = "文件格式不对"
    			break;
    		case 4000:
    			msg = "服务器执行异常"
    			break;
				case 1000:
					return response.data
				break;
				case 1:
					return response.data
				break;
    	}
    	return Promise.reject(msg)
//  } else {
//    return Promise.reject("请求失败")
//  }
  },
  error => {
    console.log('err' + error)// for debug
//  Message({
//    message: '' + error,
//    type: 'error',
//    duration: 10 * 1000
//  })
    return Promise.reject(error)
  }
)

export default axios
