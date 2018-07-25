/*
ajax请求函数模块
返回promise对象
 */
import axios from 'axios'
export default function ajax (url, data={}, type="GET") {
  return new Promise (function (resolve, reject) {
    //发送ajax请求
    let promise;
    if (type == "GET") {
      //拼接get请求路径的数据
      let dataStr = "";
      Object.keys(data).forEach(key => {
        dataStr += "&" + key + "=" + data[key];
      })
      if (dataStr !== "") {
        url = url + "?" + dataStr.substr(1);
      }
      promise = axios.get(url);
    } else {
      promise = axios.post(url, data);
    }
    promise.then(response =>  {
      //成功则返回resolve
      resolve(response.data);
    }).catch(error => {
      //失败则返回reject
      reject(error);
    })
  })
}
