import { mediaApiFetch } from '~/server/utils/mediaApi'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return await mediaApiFetch('/contributions', {
    method: 'POST',
    body,
  })
})
