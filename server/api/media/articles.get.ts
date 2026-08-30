import { mediaApiFetch } from '~/server/utils/mediaApi'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  // Forward query as-is to Media API
  return await mediaApiFetch('/articles', { query })
})
