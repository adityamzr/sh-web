export type ArticleImagePresentation = { displaySize?: 'small'|'medium'|'wide'|'full'; aspectRatio?: 'auto'|'16:9'|'4:5'|'1:1' }
export function articleImageFigureStyle(block: ArticleImagePresentation) { return { maxWidth: ({ small:'480px', medium:'680px', wide:'900px', full:'100%' } as const)[block.displaySize ?? 'full'] } }
export function articleImageRatioStyle(block: ArticleImagePresentation) {
  const aspectRatio = ({ auto:undefined, '16:9':'16 / 9', '4:5':'4 / 5', '1:1':'1 / 1' } as const)[block.aspectRatio ?? 'auto']
  return aspectRatio ? { aspectRatio } : undefined
}
export function articleImageObjectStyle(block: ArticleImagePresentation) { return (block.aspectRatio ?? 'auto') === 'auto' ? { height:'auto' } : { height:'100%', objectFit:'cover' as const } }
