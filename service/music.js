import { ljxRequest } from "./index.js"

export function getMusicBanner(type = 0) {
  return ljxRequest.get({
    url: "/banner",
    data: {
      type
    }
  })
}