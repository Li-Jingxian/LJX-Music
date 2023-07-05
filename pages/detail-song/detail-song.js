// pages/detail-song/detail-song.js
import recommentStore from "../../store/recommendStore"
import recommendStore from "../../store/recommendStore"

Page({
  data: {
    songs: []
  },
  onLoad() {
    recommentStore.onState("recommendSongs", (value) => {
      this.setData({ songs: value })
    })
  },
  onUnload() {
    recommentStore.offState("recommendSongs", (value) => {
      this.setData({ songs: value })
    })
  }
})