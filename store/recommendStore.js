import { HYEventStore } from "hy-event-store"
import { getPlaylistDetail } from "../service/music"

const recommentStore = new HYEventStore({
  state: {
    recommendSongs: []
  },
  actions: {
    fetchRecommendSongsAction(ctx) {
      getPlaylistDetail(3778678).then((res) => {
        ctx.recommendSongs = res.playlist.tracks
      })
    }
  }
})

export default recommentStore