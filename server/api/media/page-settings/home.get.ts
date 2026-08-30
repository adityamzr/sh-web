import { mediaApiFetch } from '~/server/utils/mediaApi'

export default defineEventHandler(async () => {
  return await mediaApiFetch('/page-settings/home')
})
