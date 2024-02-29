tocbot.init({
    tocSelector: '.toc',
    contentSelector: '.post-content',
    headingSelector: 'h1, h2, h3, h4, h5',
    positionFixedSelector: ".toc",
}) && new Viewer(document.getElementById('uniq-post-content'), {
    navbar: false,
    loop: false,
    title: false,
})