import request from '@/utils/request'

// 获取文章列表
export function getArticleByLocale(data) {
  return request({
    url: 'admin/article/articles',
    method: 'post',
    data
  })
}

// 禁用/启用文章
export function disableArticles(data,type) {
  console.log(type)
  return request({
    url: type === 'SHOW' ? 'admin/article/disable' : 'admin/article/enable',
    method: 'post',
    data
  })
}

// 删除文章
export function deleteArticles(data) {
  return request({
    url: 'admin/article/delete',
    method: 'post',
    data
  })
}

// 获取文章详情
export function detailArticles(data) {
  return request({
    url: 'admin/article/detail',
    method: 'get',
    data
  })
}

// 创建/修改文章
export function addArticles(data,type) {
  return request({
    url: `admin/${type === 'add' ? 'article' : 'article/updateArticle'}`,
    method: 'post',
    data,
    // headers:{
    //   'Content-Type':'application/json'
    // }
  })
}

