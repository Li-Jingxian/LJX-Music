// pages/detail-video/detail-video.js
import { getMVUrl, getMVInfo, getMVRelated, getTopMV } from "../../../service/video"

Page({
  data: {
    id: 0,
    mvUrl: "",
    mvInfo: {},
    relatedVideo: [],
    videoList: [],
    damuList: [
      { text: "哈哈哈", color: "#ff0000", time: 3},
      { text: "呵呵呵", color: "#ffff00", time: 6},
      { text: "嘿嘿嘿", color: "#0000ff", time: 9},
    ]
  },
  onLoad(options) {
    const id = options.id
    this.data.id = id
    this.fetchResources()
  },

  async fetchResources() {
    this.fetchMVUrl()
    this.fetchMVInfo()
    this.fetchMVRelated()
  },

  async fetchMVUrl() {
    const res = await getMVUrl(this.data.id)
    this.setData({mvUrl: res.data.url})
  },

  async fetchMVInfo() {
    const res = await getMVInfo(this.data.id)
    this.setData({mvInfo: res.data})
  },

  async fetchMVRelated() {
    // const res = await getMVRelated(this.data.id)
    // this.setData({relatedVideo: res.data})
    const res = await getTopMV()
    this.setData({ videoList: res.data })
  },

  async onRecommendTap(event) {
    const id = event.currentTarget.dataset.item.id
    this.data.id = id
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    await this.fetchResources()
    setTimeout(() => {
      wx.hideLoading()
    }, 1000)
  }
})