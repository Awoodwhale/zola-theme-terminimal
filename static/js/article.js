export const initTocAndViewer = (name = 'uniq-post-content') => {
    initToc()
    initViewer(name)
}
const initToc = () => {
    tocbot.init({
        tocSelector: '.toc',
        contentSelector: '#uniq-post-content',
        headingSelector: 'h1, h2, h3, h4, h5',
        hasInnerContainers: true,
        positionFixedSelector: ".toc",
        scrollEndCallback: () => {
            const active = document.querySelector('.is-active-link')
            active && active.scrollIntoView({ behavior: 'auto', block: 'nearest' })
        }
    })
}
const initViewer = (name) => {
    const content = document.getElementById(name)
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
    const currentState = content.dataset.state
    const isExpanded = currentState
        ? currentState === 'expanded'
        : window.getComputedStyle(content).height !== '0px'
    isExpanded ? collapseSummary(content, chevron) : expandSummary(content, chevron)
}
const expandSummary = (content, chevron) => {
    content.style.height = `${content.scrollHeight}px`
    content.dataset.state = 'expanded'
    chevron.classList.remove('rotated')
}
const collapseSummary = (content, chevron) => {
    const currentHeight = content.scrollHeight
    content.style.height = `${currentHeight}px`
    requestAnimationFrame(() => {
        content.style.height = '0'
    })
    content.dataset.state = 'collapsed'
    chevron.classList.add('rotated')
}
