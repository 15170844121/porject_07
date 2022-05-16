// 文章相关的 接口 API 都放在这个模块下面

import request from '@/utils/request.js'
// 向外按需导出 一个 API 函数
export const getArticleListAPI = function (_page, _limit) {
  return request.get('/articles', {
    params: {
      _page,
      _limit
    }
  })
}
