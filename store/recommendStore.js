import { HYEventStore } from "hy-event-store"
import { getPlaylistDetail } from "../service/music"

const recommentStore = new HYEventStore({
  state: {
    recommendSongInfo: []
  },
  actions: {
    fetchRecommendSongsAction(ctx) {
      getPlaylistDetail(3778678).then((res) => {
        ctx.recommendSongInfo = res.playlist.tracks
      })
    }
  }
})

export default recommentStore