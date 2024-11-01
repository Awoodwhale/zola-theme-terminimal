topbar.config({
    barColors: {
        '0': 'rgba(27, 192, 128, 0.75)',
        '1.0': 'rgba(27, 192, 128, 1)'
    }
})
import('./player.js').then(({ MetingJSElementHooked }) => {
    if (window.customElements && !window.customElements.get('meting-js-hooked')) {
        window.customElements.define('meting-js-hooked', MetingJSElementHooked)
    }
})
import('./crypto.js').then(({ aesDecrypt, decryptContent }) => {
    if (!window.aesDecrypt) window.aesDecrypt = aesDecrypt
    if (!window.decryptContent) window.decryptContent = decryptContent
})
const complete = () => {
    import('./article.js').then(({ initTocAndViewer, toggleAISummary }) => {
        initTocAndViewer()
        if (!window.toggleSummary) window.toggleSummary = toggleAISummary
    })
    import('./codeblock.js').then(({ initCodeBlock }) => initCodeBlock())
    topbar.hide()
}
const send = () => {
    tocbot.destroy()
    topbar.show()
}
document.addEventListener('DOMContentLoaded', complete)
document.addEventListener('pjax:complete', complete)
document.addEventListener('pjax:send', send)
