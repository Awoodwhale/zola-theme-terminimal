export const initTocAndViewer = () => {
    const content = document.getElementById('uniq-post-content')
    if (!content) return
    initToc(content)
    initViewer(content)
}
const initToc = (content) => {
    tocbot.init({
        tocSelector: '.toc',
        contentElement: content,
        headingSelector: 'h1, h2, h3, h4, h5',
        hasInnerContainers: true,
        positionFixedSelector: ".toc",
        scrollEndCallback: () => {
            const active = document.querySelector('.is-active-link')
            active && active.scrollIntoView({ behavior: 'auto', block: 'nearest' })
        }
    })
}
const initViewer = (content) => {
    if (!content) return
    new Viewer(content, {
        navbar: false,
        loop: false,
        title: false,
    })
}

export const toggleAISummary = () => {
    const content = document.getElementById('uniq-summary-content')
    const chevron = document.querySelector('.summary-chevron')
    if (!content || !chevron) return
    chevron.classList.contains('rotated') ? collapseSummary(content, chevron) : expandSummary(content, chevron)
}
const expandSummary = (content, chevron) => {
    content.style.height = `${content.scrollHeight}px`
    chevron.classList.add('rotated')
}
const collapseSummary = (content, chevron) => {
    content.style.height = '0'
    chevron.classList.remove('rotated')
}