<script lang="ts">
import { defineComponent, h, resolveComponent, type PropType, type VNodeChild } from 'vue'
import type { RichTextDocument, RichTextNode } from '~/shared/rich-text'
import { normalizeRichTextDocument, sanitizeRichTextLink } from '~/shared/rich-text'

export default defineComponent({
  name: 'MediaRichTextRenderer',
  props: {
    document: { type: Object as PropType<RichTextDocument>, required: true },
    variant: { type: String as PropType<'article' | 'guide'>, default: 'article' },
  },
  setup(props) {
    const width = () => props.variant === 'article' ? ' max-w-[760px]' : ''
    function applyMarks(node: RichTextNode, child: VNodeChild): VNodeChild {
      return (node.marks ?? []).reduce<VNodeChild>((current, mark) => {
        if (mark.type === 'bold') return h('strong', {}, [current] as any)
        if (mark.type === 'italic') return h('em', {}, [current] as any)
        if (mark.type === 'link') {
          const href = sanitizeRichTextLink(mark.attrs?.href)
          if (!href) return current
          const internal = href.startsWith('/') || href.startsWith('#')
          const tag = internal && href.startsWith('/') ? resolveComponent('NuxtLink') : 'a'
          const attrs = tag === 'a'
            ? { href, rel: internal ? undefined : 'noopener noreferrer', target: internal ? undefined : '_blank' }
            : { to: href }
          return h(tag as any, { ...attrs, class: 'font-medium text-sht-olive underline underline-offset-2' }, [current] as any)
        }
        return current
      }, child)
    }
    function renderNode(node: RichTextNode, key: string): VNodeChild {
      if (node.type === 'text') return applyMarks(node, node.text ?? '')
      if (node.type === 'hardBreak') return h('br', { key })
      const children = (node.content ?? []).map((child, index) => renderNode(child, `${key}-${index}`))
      if (node.type === 'paragraph') return h('p', { key, class: `mb-6 text-base leading-[1.85] text-sht-charcoal/80${width()}` }, children)
      if (node.type === 'heading') {
        const h3 = node.attrs?.level === 3
        return h(h3 ? 'h3' : 'h2', { key, class: `${h3 ? 'mb-3 mt-8 text-2xl' : 'mb-4 mt-12 text-3xl'} font-hero font-bold text-sht-olive-dark${width()}` }, children)
      }
      if (node.type === 'bulletList') return h('ul', { key, class: `mb-6 list-disc space-y-2 pl-6 text-base leading-relaxed text-sht-charcoal/80${width()}` }, children)
      if (node.type === 'orderedList') return h('ol', { key, class: `mb-6 list-decimal space-y-2 pl-6 text-base leading-relaxed text-sht-charcoal/80${width()}` }, children)
      if (node.type === 'listItem') return h('li', { key }, children)
      if (node.type === 'blockquote') return h('blockquote', { key, class: `mb-8 border-l-2 border-sht-gold pl-5 font-hero text-2xl leading-relaxed text-sht-olive-dark${width()}` }, children)
      return children
    }
    return () => h('div', { class: 'media-rich-text-renderer' }, normalizeRichTextDocument(props.document).content.map((node, index) => renderNode(node, String(index))))
  },
})
</script>
