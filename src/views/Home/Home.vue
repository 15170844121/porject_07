<template>
  <div class="home-container">
    <!-- 头部区域  -->
    <van-nav-bar title="黑马头条" fixed/>
    <!-- 导入 注册 并使用 ArticleInfo -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :disabled="finished">
    <!-- 在使用组件的时候 如果某个属性名是“小驼峰”形式 则绑定属性的时候 建议改写成“连字符”格式 如cmtCount 建议写成 cmt-count -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    <ArticleInfo v-for="item in artlist" :key="item.id"
    :title="item.title"
    :author="item.aut_name"
    :cmt-count="item.comm_count"
    :time="item.pubdate"
    :cover="item.cover"
    ></ArticleInfo>
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 导入 request.js  文件
import { getArticleListAPI } from '@/api/articleAPI.js'
import ArticleInfo from '@/components/article/ArticleInfo.vue'
export default {
  name: 'Home',
  data () {
    return {
      // 页码值
      page: 1,
      // 每一页显示多少条数据
      limit: 10,
      artlist: [],
      // 是否正在加载下一页数据 如果 loading 为 true 则不会反复加载下一页事件
      // 每当下一页数据请求回来之后 千万要记得把 loading 改为 false
      loading: true,
      // 所有数据是否加载完毕了 如果没有更多数据了 就把 finished 改为 true
      finished: false,
      // 是否正在下拉刷新
      isLoading: false
    }
  },
  created () {
    this.initArticleList()
  },
  methods: {
    // 封装获取文章列表数据的方法
    async initArticleList (isRefresh) {
      // 发起 get 请求 来获取文章的列表数据
      const { data: res } = await getArticleListAPI(this.page, this.limit)
      console.log(res)
      // 如果是上拉加载更多 那么应该是
      // thi.artlist = [旧数据在前，新数据在后]
      //   ...表示拼接数组 为 arr1 = [1,2,3] arr2=[4,5,6]  newArr=[...arr1,...arr2] newArr = [1,2,3,4,5,6]
      if (isRefresh) {
        // 证明是下拉刷新  新数据在前 旧数据在后面
        this.artlist = [...res, ...this.artlist]
        this.isLoading = false
      } else {
        // 证明是上拉加载更多  旧数据在前 新数据在后
        this.artlist = [...this.artlist, ...res]
        this.loading = false
      }
      if (res.length === 0) {
        // 证明没有下一页数据了 要把 finished 改为 true 表示数据加载完了
        this.finished = true
      }
    },
    // 只要 onload 被调用 就要加载下一页数据
    onLoad () {
      console.log('触发事件了')
      // 让页码值加 1
      this.page++
      // 重新请求接口获取数据
      this.initArticleList()
    },
    // 下拉刷新的处理函数
    onRefresh () {
      // console.log('触发了下拉刷新')
      // 让页码值 加1
      this.page++
      // 重新请求接口获取数据
      this.initArticleList(true)
    }
  },
  components: {
    ArticleInfo
  }
}
</script>

<style lang="less" scoped>
// .home-container{
//   padding: 46px 0 50px 0;
//   .van-nav-bar {
//     background-color: #007bff;
//   }

  /deep/.van-nav-bar__title{
    font-weight: 200;
    color: white;
  }
// }
</style>
