const initWaline = () => {
    let walineInstance = null
    const WALINE_CONTAINER_ID = 'waline-comment'
    if (!document.getElementById(WALINE_CONTAINER_ID)) {
        if (walineInstance !== null) walineInstance.destroy()
        return
    }
    import('https://unpkg.com/@waline/client@v3/dist/waline.js')
        .then(({ init }) => {
            if (walineInstance !== null) walineInstance.destroy()
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
document.addEventListener('pjax:send', () => { if (walineInstance !== null) walineInstance.destroy() })

// attempt initial mount for already loaded DOM
if (document.readyState === 'complete' || document.readyState === 'interactive') bootstrapWaline()
