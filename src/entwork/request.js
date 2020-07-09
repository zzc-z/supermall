import axios from 'axios'

export function request(config) {
    //创建实例
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000/api/w1',
        // baseURL: 'http://106.54.54.237:8000/api/w1',
        timeout: 5000,
        //POST请求
        headers: { 'Content-Type': 'application/x-www-form-urllencoded;' }
    })
    //拦截器
    instance.interceptors.request.use(config => {
        // console.log(config + "+++++")
        return config
    }, err => {
        // console.log(err + "+++++")
    }
    );
    //响应拦截
    instance.interceptors.response.use(res => {  //resulate==res
        // console.log(res)
        return res.data
    }, err => {
        // console.log(err)
    });
    //发送网络请求
    return instance(config)
    //返回promise
}