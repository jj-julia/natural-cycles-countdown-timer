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
    const computedStyle = window.getComputedStyle(element)

    const paddingLeft = parseFloat(computedStyle.paddingLeft)
    const paddingRight = parseFloat(computedStyle.paddingRight) // Get right padding

    const containerWidth = element.offsetWidth - paddingLeft - paddingRight // Subtract both paddings
    const text = element.textContent || ''

    const fontFamily = computedStyle.fontFamily

    const currentSize = parseFloat(computedStyle.fontSize)
    let minSize = this.minFontSize
    let maxSize = Math.max(currentSize * 2, this.maxFontSize)

    while (maxSize - minSize > 0.5) {
      const fontSize = (minSize + maxSize) / 2
      this.ctx.font = `${fontSize}px ${fontFamily}`
      const textWidth = this.ctx.measureText(text).width

      if (textWidth <= containerWidth) {
        minSize = fontSize
      } else {
        maxSize = fontSize
      }
    }

    this.renderer.setStyle(element, 'font-size', `${minSize}px`)
  }
}
