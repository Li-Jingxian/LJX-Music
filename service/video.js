import { ljxRequest } from "./index.js"

export function getTopMV(offset = 0, limit = 20) {
  return ljxRequest.get({
    url: "/top/mv",
    data: {
      limit,
      offset
    }
  })
}

export function getMVUrl(id) {
  return ljxRequest.get({
    url: "/mv/url",
    data: {
      id
    }
  })
}

export function getMVInfo(mvid) {
  return ljxRequest.get({
    url: "/mv/detail",
    data: {
      mvid
    }
  })
}

export function getMVRelated(id) {
  return ljxRequest.get({
    url: "/related/allvideo",
    data: {
      id
    }
  })
}