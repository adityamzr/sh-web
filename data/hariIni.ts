/**
 * Legacy type compatibility for consumers that still import Hari Ini types.
 * Runtime article data now comes from useMediaArticles() and the public API.
 */
export type { MediaArticle as HariIniArticle } from '~/composables/useMediaArticles'
export type HariIniCategory = string
