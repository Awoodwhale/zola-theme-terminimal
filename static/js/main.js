tocbot.init({
    tocSelector: '.toc',
    contentSelector: '.post-content',
    headingSelector: 'h1, h2, h3, h4, h5',
    positionFixedSelector: ".toc",
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