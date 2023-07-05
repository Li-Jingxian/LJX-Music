// pages/main-music/main-music.js
import { getMusicBanner, getPlaylistDetail } from "../../service/music"
import { querySelect } from "../../utils/query-select"
import { throttle } from "../../utils/throttle"
import recommendStore from "../../store/recommendStore"
import recommentStore from "../../store/recommendStore"

const querySelectThrottle = throttle(querySelect, 100)

Page({
  data: {
    searchValue: "",
    banners: [],
    bannerHeight: 150,
    recommendSongs: [],

  },

  onLoad() {
    this.fetchMusicBanners()
    // this.fetchRecommendSongs()

    recommendStore.onState("recommendSongs", (value) => {
      this.setData({ recommendSongs: value.slice(0, 6) })
    })
    recommentStore.dispatch("fetchRecommendSongsAction")
  },

  async fetchMusicBanners() {
    const res = await getMusicBanner()
    this.setData({ banners: res.banners })
  },

  // async fetchRecommendSongs() {
  //   const res = await getPlaylistDetail(3778678)
  //   const playlist = res.playlist
  //   const recommendSongs = playlist.tracks.slice(0, 6)
  //   this.setData({ recommendSongs })
  // },

  onSearchClick() {
    wx.navigateTo({
      url: '/pages/detail-search/detail-search',
    })
  },

  onRecommendMoreClick() {
    wx.navigateTo({
      url: '/pages/detail-song/detail-song?type=recommend',
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