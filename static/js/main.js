tocbot.init({
    tocSelector: '.toc',
    contentSelector: '.post-content',
    headingSelector: 'h1, h2, h3, h4, h5',
    positionFixedSelector: ".toc",
    scrollEndCallback: (_) => {
        const active = document.querySelector('.is-active-link')
        active && active.scrollIntoView({ behavior: 'auto', block: 'nearest' })
    }
})
new Viewer(document.getElementById('uniq-post-content'), {
    navbar: false,
    loop: false,
    title: false,
})
const content = document.getElementById('uniq-summary-content')
const chevron = document.querySelector('.summary-chevron')
function toggleSummary() {
    chevron.classList.contains('rotated') ? collapseSummary() : expandSummary()
}
function expandSummary() {
    content.style.height = `${content.scrollHeight}px`
    chevron.classList.add('rotated')
}
function collapseSummary() {
    content.style.height = '0'
    chevron.classList.remove('rotated')
}

document.addEventListener('DOMContentLoaded', () => {
    const codeBlocks = document.querySelectorAll('pre[class^="language-"][data-lang]')
    codeBlocks.forEach(codeBlock => {
        codeBlock.addEventListener('click', (_) => {
            navigator.clipboard.writeText(codeBlock.innerText)
                .then(() => alertify.success('复制成功'))
                .catch(err => alertify.error(`复制失败: ${err}`))
        })
    })
})