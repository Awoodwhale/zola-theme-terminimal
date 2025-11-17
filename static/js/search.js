if (!window.loadPagefindJs) window.loadPagefindJs = (callback) => {
    const container = document.getElementById("search-container")
    if (!container) return
    const script = document.createElement("script")
    script.src = "/pagefind/pagefind-ui.js"
    script.type = "text/javascript"
    script.onload = () => callback(container)
    document.head.appendChild(script)
}

if (!window.initPagefind) window.initPagefind = (container) => {
    container.innerHTML = ""
    container.classList.remove("search-container--loading")
    new PagefindUI({ 
        element: "#search-container", 
        showSubResults: true,
        showEmptyFilters: false,
        resetStyles: true,
        pageSize: 5,
        autofocus: false,
        showImages: false,
        openFilters: ['tags'],
        translations: {
            placeholder: "要搜点什么呢？",
            clear_search: "清空",
            load_more: "查找更多内容",
            search_label: "站内检索",
            filters_label: "文件分类",
            zero_results: "没有找到关于 [SEARCH_TERM] 的内容，可能伍德忘记写了...",
            many_results: "成功找到了 [COUNT] 个关于 [SEARCH_TERM] 的内容！",
            one_result: "成功找到了 [COUNT] 个关于 [SEARCH_TERM] 的内容！",
            alt_search: "找不到关于 [SEARCH_TERM] 的内容。但是伍德推荐你看看关于 [DIFFERENT_TERM] 的内容！",
            search_suggestion: "没能找到关于 [SEARCH_TERM] 的内容。再试试？",
            searching: "正在请求搜索 [SEARCH_TERM] 的相关内容..."
        }
    })
}

if (!window.initSearch) window.initSearch = () => window.loadPagefindJs(window.initPagefind)
document.addEventListener("DOMContentLoaded", window.initSearch)
document.addEventListener("pjax:complete", window.initSearch)
document.getElementById('search-container').addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        e.preventDefault()
        pjax.loadUrl(e.target.getAttribute('href'))
    }
})
