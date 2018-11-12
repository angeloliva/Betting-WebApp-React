// Build a query string to call GET endpoints
export const URLPathWithParams = (
  path: string,
  params: object = {},
): string => {
  let query: string = ""
  if (params) {
    const searchParams = new URLSearchParams()
    for (const key of Object.keys(params)) {
      searchParams.append(key, params[key])
    }
    query = "?" + searchParams.toString()
  }
  return path + query
}
