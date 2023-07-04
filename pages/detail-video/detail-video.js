// pages/detail-video/detail-video.js
import { getMVUrl } from "../../service/video"

Page({
  data: {
    id: 0,
    mvUrl: "",
    damuList: [
      { text: "哈哈哈", color: "#ff0000", time: 3},
      { text: "呵呵呵", color: "#ffff00", time: 6},
      { text: "嘿嘿嘿", color: "#0000ff", time: 9},
    ]
  },
  onLoad(options) {
    const id = options.id
    this.data.id = id

    this.fetchMVUrl(id)
  },

  async fetchMVUrl(id) {
    const res = await getMVUrl(id)
    this.setData({mvUrl: res.data.url})
  }
})