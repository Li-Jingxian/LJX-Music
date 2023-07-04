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