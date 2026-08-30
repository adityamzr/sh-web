import { mediaApiFetch } from '~/server/utils/mediaApi'

export default defineEventHandler(async (event) => {
  const page = getRouterParam(event, 'page')
  if (!page) {
    throw createError({ statusCode: 400, statusMessage: 'Page key is required' })
  }
  return await mediaApiFetch(`/page-settings/${encodeURIComponent(page)}`)
})
