import { ljxRequest } from "./index"

export function getSongDetail(ids) {
  return ljxRequest.get({
    url: "/song/detail",
    data: {
      ids
    }
  })
}

export function getSongLyric(id) {
  return ljxRequest.get({
    url: "/lyric",
    data: {
      id
    }
  })
}
