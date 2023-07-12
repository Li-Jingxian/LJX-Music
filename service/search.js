import { ljxRequest } from "./index";

export function getSearchHot() {
  return ljxRequest.get({
    url: "/search/hot"
  })
}

export function getSearchSuggest(keywords) {
  return ljxRequest.get({
    url: "/search/suggest",
    data: {
      keywords,
      type: "mobile"
    }
  })
}

export function getSearchResult(keywords) {
  return ljxRequest.get({
    url: "/search",
    data: {
      keywords
    }
  })
}
