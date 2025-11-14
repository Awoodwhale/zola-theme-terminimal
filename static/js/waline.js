const WALINE_CDN = 'https://unpkg.com/@waline/client@v3/dist/waline.js'
const WALINE_CONTAINER_ID = 'waline-comment'
let walineLoader
let walineInstance

const loadWaline = () => {
    if (!walineLoader) walineLoader = import(WALINE_CDN)
    return walineLoader
}

const destroyWaline = () => {
    if (walineInstance && typeof walineInstance.destroy === 'function') walineInstance.destroy()
    walineInstance = null
}

const initWaline = () => {
    if (!document.getElementById(WALINE_CONTAINER_ID)) {
        destroyWaline()
        return
    }
    loadWaline()
        .then(({ init }) => {
            destroyWaline()
            walineInstance = init({
                el: `#${WALINE_CONTAINER_ID}`,
                path: window.location.pathname.replace(/\/$/, ''),
                serverURL: 'https://waline-comment.woodwhale.cn',
                lang: 'zh-CN',
                locale: {
                    placeholder: '让我们说中文!',
                    sofa: '暂无评论',
                },
                search: false,
                reaction: false,
                noCopyright: true,
                emoji: [
                    'https://unpkg.com/@waline/emojis@1.2.0/tieba',
                ],
                dark: 'html[data-theme="dark"]',
            })
        })
        .catch((error) => {
            console.error('[terminimal] Waline init failed', error)
        })
}

const bootstrapWaline = () => {
    requestAnimationFrame(initWaline)
}

document.addEventListener('DOMContentLoaded', bootstrapWaline)
document.addEventListener('pjax:complete', bootstrapWaline)
document.addEventListener('pjax:send', destroyWaline)

// attempt initial mount for already loaded DOM
if (document.readyState === 'complete' || document.readyState === 'interactive') bootstrapWaline()
