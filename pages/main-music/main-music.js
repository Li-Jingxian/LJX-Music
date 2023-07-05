// pages/main-music/main-music.js
import { getMusicBanner } from "../../service/music"
import { querySelect } from "../../utils/query-select"
import { throttle } from "../../utils/throttle"

const querySelectThrottle = throttle(querySelect, 100)

Page({
  data: {
    searchValue: "",
    banners: [],
    bannerHeight: 150
  },

  onLoad() {
    this.fetchMusicBanners()
  },

  async fetchMusicBanners() {
    const res = await getMusicBanner()
    this.setData({ banners: res.banners })
  },

  onSearchClick() {
    wx.navigateTo({
      url: '/pages/detail-search/detail-search',
    })
  },

  onBannerLoad(event) {
    //获取Image组件高度
    // const query = wx.createSelectorQuery()
    // query.select(".banner-image").boundingClientRect()
    // query.exec((res) => {
    //   this.setData({ bannerHeight: res[0].height})
    // })
    querySelectThrottle(".banner-image").then((res) => {
      this.setData({ bannerHeight: res[0].height })
    })
  }
})