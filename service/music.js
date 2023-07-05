import { ljxRequest } from "./index.js"

export function getMusicBanner(type = 0) {
  return ljxRequest.get({
    url: "/banner",
    data: {
      type
    }
  })
}

export function getPlaylistDetail(id) {
  return ljxRequest.get({
    url: "/playlist/detail",
    data: {
      id
    }
  })
}