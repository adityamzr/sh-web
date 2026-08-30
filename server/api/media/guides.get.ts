import { mediaApiFetch } from '~/server/utils/mediaApi'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  return await mediaApiFetch('/guides', { query })
})
