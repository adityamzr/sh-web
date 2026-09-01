import { mediaApiFetch } from '~/server/utils/mediaApi'

export default defineEventHandler(async (event) => {
  return await mediaApiFetch('/page-settings/home', { query: getQuery(event) })
})
