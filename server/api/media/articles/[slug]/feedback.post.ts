import { mediaApiFetch } from '~/server/utils/mediaApi'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug is required' })
  }
  const body = await readBody(event)
  return await mediaApiFetch(`/articles/${encodeURIComponent(slug as string)}/feedback`, {
    method: 'POST',
    body,
  })
})
