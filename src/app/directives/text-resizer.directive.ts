import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  OnInit,
  Input,
  OnDestroy,
} from '@angular/core'

@Directive({
  selector: '[appTextResizer]',
  standalone: true,
})
export class TextResizerDirective implements OnInit, OnDestroy {
  @Input() minFontSize: number = 1
  @Input() maxFontSize: number = 200
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D | null
  private resizeTimeout: any
  private observer: MutationObserver

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.observer = new MutationObserver(() => this.resizeText())
  }

  ngOnInit() {
    document.fonts.ready.then(() => {
      this.resizeText()
    })

    this.observer.observe(this.el.nativeElement, {
      childList: true,
      subtree: true,
      characterData: true,
    })
  }

  ngOnDestroy() {
    this.observer.disconnect()
  }

  @HostListener('window:resize')
  onResize() {
    clearTimeout(this.resizeTimeout)
    this.resizeTimeout = setTimeout(() => {
      this.resizeText()
    }, 100)
  }

  private resizeText() {
    if (!this.ctx) return

    const element = this.el.nativeElement
    const text = element.textContent || ''

    const computedStyle = window.getComputedStyle(element)

    const fontFamily = computedStyle.fontFamily
    const letterSpacing = computedStyle.letterSpacing
    const paddingLeft = parseFloat(computedStyle.paddingLeft)
    const paddingRight = parseFloat(computedStyle.paddingRight)

    const containerWidth = element.offsetWidth - paddingLeft - paddingRight

    const currentSize = parseFloat(computedStyle.fontSize)
    let minSize = this.minFontSize
    let maxSize = Math.max(currentSize * 2, this.maxFontSize)
    const tolerance = 0.2
    let cachedWidth: number | undefined = undefined
    let cachedFontSize: number | undefined = undefined

    while (maxSize - minSize > tolerance) {
      const fontSize = (minSize + maxSize) / 2

      if (fontSize !== cachedFontSize) {
        this.ctx.font = `${fontSize}px ${fontFamily}`
        this.ctx.letterSpacing = letterSpacing
        cachedWidth = this.ctx.measureText(text).width
        cachedFontSize = fontSize
      }
      const textWidth = cachedWidth!

      if (textWidth <= containerWidth) {
        minSize = fontSize
      } else {
        maxSize = fontSize
      }
    }

    const finalSize = Math.round(minSize)
    this.renderer.setStyle(element, 'font-size', `${finalSize}px`)
  }
}
