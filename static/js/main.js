const root = document.documentElement
const defaultTopbarColors = {
    '0': 'rgba(27, 192, 128, 0.75)',
    '1.0': 'rgba(27, 192, 128, 1)'
}

const getCssVar = (name) => {
    if (!root) return ''
    return window.getComputedStyle(root).getPropertyValue(name).trim()
}

const buildTopbarColors = () => {
    const accent = getCssVar('--accent')
    const accentSoft = getCssVar('--accent-alpha-70')
    if (!accent) return defaultTopbarColors
    return {
        '0': accentSoft || accent,
        '1.0': accent
    }
}

const syncTopbarColors = () => {
    if (typeof topbar === 'undefined' || typeof topbar.config !== 'function') return
    topbar.config({
        barColors: buildTopbarColors()
    })
}

syncTopbarColors()

document.addEventListener('terminimal:theme-change', syncTopbarColors)

const themeToggleReady = import('./theme-toggle.js')

const bootThemeToggle = () => {
    themeToggleReady.then(({ initThemeToggle }) => {
        if (typeof initThemeToggle === 'function') {
            initThemeToggle()
        }
    })
}

let cleanupBackToTop = null

const initBackToTop = () => {
    if (typeof cleanupBackToTop === 'function') {
        cleanupBackToTop()
        cleanupBackToTop = null
    }

    const button = document.querySelector('.back-to-top')
    if (!button) return

    const threshold = 200
    const toggleVisibility = () => {
        const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0
        if (scrollPosition > threshold) {
            button.classList.add('is-visible')
        } else {
            button.classList.remove('is-visible')
        }
    }

    const handleClick = (event) => {
        event.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    button.addEventListener('click', handleClick)
    toggleVisibility()

    cleanupBackToTop = () => {
        window.removeEventListener('scroll', toggleVisibility)
        button.removeEventListener('click', handleClick)
    }
}

const complete = () => {
    if (!window.initTocAndViewer || !window.toggleSummary) {
        import('./article.js').then(({ initTocAndViewer, toggleAISummary }) => {
            window.initTocAndViewer = initTocAndViewer
            window.toggleSummary = toggleAISummary
            initTocAndViewer()
        })
    }
    if (!window.decryptContent) {
        import('./crypto.js').then(({ decryptContent }) => {
            window.decryptContent = decryptContent
        })
    }
    if (!window.initCodeBlock) {
        import('./codeblock.js').then(({ initCodeBlock }) => {
            if (!window.initCodeBlock) window.initCodeBlock = initCodeBlock
            initCodeBlock()
        })
    }
    if (!window.MetingJSElementHooked) {
        import('./player.js').then(({ MetingJSElementHooked }) => {
            if (window.customElements && !window.customElements.get('meting-js-hooked')) {
                window.MetingJSElementHooked = MetingJSElementHooked
                window.customElements.define('meting-js-hooked', MetingJSElementHooked)
            }
        })
    }
    window.initTocAndViewer && window.initTocAndViewer()
    window.initCodeBlock && window.initCodeBlock()
    topbar.hide()
    bootThemeToggle()
    initBackToTop()
}
const send = () => {
    tocbot.destroy()
    syncTopbarColors()
    topbar.show()
}
document.addEventListener('DOMContentLoaded', complete)
document.addEventListener('pjax:complete', complete)
document.addEventListener('pjax:send', send)
