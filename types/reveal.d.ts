declare module 'reveal.js' {
  interface RevealOptions {
    hash?: boolean
    history?: boolean
    controls?: boolean
    controlsLayout?: 'bottom-right' | 'edges'
    controlsTutorial?: boolean
    progress?: boolean
    center?: boolean
    navigationMode?: 'default' | 'linear' | 'grid'
    mouseWheel?: boolean
    transition?: 'none' | 'fade' | 'slide' | 'convex' | 'concave' | 'zoom'
    transitionSpeed?: 'default' | 'fast' | 'slow'
    backgroundTransition?: 'none' | 'fade' | 'slide' | 'convex' | 'concave' | 'zoom'
    width?: number | string
    height?: number | string
    margin?: number
    minScale?: number
    maxScale?: number
    keyboard?: boolean
    touch?: boolean
    embedded?: boolean
    disableLayout?: boolean
  }

  interface SlideChangedEvent {
    indexh: number
    indexv?: number
    previousSlide?: HTMLElement
    currentSlide?: HTMLElement
  }

  class Reveal {
    constructor(element: HTMLElement, options?: RevealOptions)
    initialize(): Promise<void>
    slide(indexh: number, indexv?: number, f?: number, origin?: string): void
    next(): void
    prev(): void
    up(): void
    down(): void
    left(): void
    right(): void
    toggleOverview(override?: boolean): void
    destroy(): void
    on(event: 'slidechanged', callback: (event: SlideChangedEvent) => void): void
    on(event: string, callback: (event: any) => void): void
    getState(): any
    setState(state: any): void
    getIndices(): { h: number; v: number; f?: number }
    getTotalSlides(): number
    isReady(): boolean
  }

  export default Reveal
}
