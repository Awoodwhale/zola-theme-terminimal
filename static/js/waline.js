if (!window.initWaline) window.initWaline = () => {
    if (!document.getElementById('waline-comment')) {
        if (window.walineInstance !== null) {
            window.walineInstance.destroy()
            window.walineInstance = null
        }
        return
    }
    import('https://unpkg.com/@waline/client@v3/dist/waline.js')
        .then(({ init }) => {
            window.walineInstance = init({
                el: '#waline-comment',
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
                imageUploader: false,
            })
        })
        .catch((error) => {
            console.error('[terminimal] Waline init failed', error)
        })
}

document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(window.initWaline))
document.addEventListener('pjax:complete', () => requestAnimationFrame(window.initWaline))
if (document.readyState === 'complete' || document.readyState === 'interactive') requestAnimationFrame(window.initWaline)