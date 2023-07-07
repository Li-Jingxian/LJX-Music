// pages/main-music/main-music.js
import { getMusicBanner, getSongMenuList } from "../../service/music"
import { querySelect } from "../../utils/query-select"
import { throttle } from "../../utils/throttle"
import recommendStore from "../../store/recommendStore"
import rankingStore from "../../store/rankingStore"

const querySelectThrottle = throttle(querySelect, 100)

Page({
  data: {
    searchValue: "",
    banners: [],
    bannerHeight: 150,
    recommendSongs: [],
    // 歌单数据
    hotMenuList: [],
    recMenuList: [],
    // 巅峰榜数据
    isRankingData: false,
    rankingInfos: {}
  },

  onLoad() {
    this.fetchMusicBanners()
    // this.fetchRecommendSongs()
    this.fetchSongMenuList()

    recommendStore.onState("recommendSongInfo", this.handleRecommendSongs)
    recommendStore.dispatch("fetchRecommendSongsAction")
    rankingStore.onState("newRanking", this.handleNewRanking)
    rankingStore.onState("originRanking", this.handleOriginRanking)
    rankingStore.onState("upRanking", this.handleUpRanking)
    rankingStore.dispatch("fetchRankingDataAction")
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

  async fetchSongMenuList() {
    getSongMenuList().then(res => {
      this.setData({ hotMenuList: res.playlists })
    })
    getSongMenuList("华语").then(res => {
      this.setData({ recMenuList: res.playlists })
    })
  },


  handleRecommendSongs(value) {
    // console.log(value);
    this.setData({ recommendSongs: value.slice(0, 6) })
  },
  handleNewRanking(value) {
    // console.log("新歌榜:", value);
    if (!value.name) return
    this.setData({ isRankingData: true })
    const newRankingInfos = { ...this.data.rankingInfos, newRanking: value }
    this.setData({ rankingInfos: newRankingInfos })
  },
  handleOriginRanking(value) {
    // console.log("原创榜:", value);
    if (!value.name) return
    this.setData({ isRankingData: true })
    const newRankingInfos = { ...this.data.rankingInfos, originRanking: value }
    this.setData({ rankingInfos: newRankingInfos })
  },
  handleUpRanking(value) {
    // console.log("飙升榜:", value);
    if (!value.name) return
    this.setData({ isRankingData: true })
    const newRankingInfos = { ...this.data.rankingInfos, upRanking: value }
    this.setData({ rankingInfos: newRankingInfos })
  },

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
  },

  onUnload() {
    recommendStore.offState("recommendSongInfo", this.handleRecommendSongs)
    rankingStore.offState("newRanking", this.handleNewRanking)
    rankingStore.offState("originRanking", this.handleOriginRanking)
    rankingStore.offState("upRanking", this.handleUpRanking)
  }
})