// pages/main-video/main-video.js
import { getTopMV } from "../../service/video"

Page({
  data: {
    videoList: [],
    offset: 0,
    hasMore: true
  },

  onLoad() {
    //发送网络请求
    this.fetchTopMV()
  },

  //发送网络请求的方法
  async fetchTopMV() {
    const res = await getTopMV(this.data.offset)
    const newVideoList = [...this.data.videoList, ...res.data]
    this.setData({ videoList: newVideoList })
    this.data.offset = this.data.videoList.length
    this.data.hasMore = res.hasMore
  },

  //监听上拉和下拉功能
  onReachBottom() {
    if (!this.data.hasMore) return
    this.fetchTopMV()
  },

  //下拉刷新的监听
  async onPullDownRefresh() {
    //清空之前的数据
    this.setData({ videoList: [] })
    this.data.offset = 0
    this.data.hasMore = true

    //重新请求新的数据
    await this.fetchTopMV()

    //停止下拉刷新
    wx.stopPullDownRefresh()
  },

  //界面事件监听的方法
  onVideoItemTap(event) {
    const item = event.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/detail-video/detail-video?id=${item.id}`,
    })
  }
})