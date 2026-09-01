export type ArticleImagePresentation = { displaySize?: 'small'|'medium'|'wide'|'full'; aspectRatio?: 'auto'|'16:9'|'4:5'|'1:1' }
export function articleImageFigureClass(block: ArticleImagePresentation) { return ({ small:'max-w-[480px]', medium:'max-w-[680px]', wide:'max-w-[900px]', full:'max-w-none' } as const)[block.displaySize ?? 'full'] }
export function articleImageRatioClass(block: ArticleImagePresentation) { return ({ auto:'', '16:9':'aspect-video', '4:5':'aspect-[4/5]', '1:1':'aspect-square' } as const)[block.aspectRatio ?? 'auto'] }
export function articleImageObjectClass(block: ArticleImagePresentation) { return (block.aspectRatio ?? 'auto') === 'auto' ? 'h-auto' : 'h-full object-cover' }
