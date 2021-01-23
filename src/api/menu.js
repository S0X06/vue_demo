import request from '@/utils/request'
 
//添加菜单
export function addOrCompileMenu(data) {
  return request({
    url: '/try/ajax/json_demo.json',
    method: 'post',
    applicationType: 'JSON',  //这一段表示，是post 请求，就将 请求参数转换成 JSON 格式
    data
  })
}