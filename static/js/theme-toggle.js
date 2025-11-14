const STORAGE_KEY = 'terminimal:color-scheme';
const TOGGLE_SELECTOR = '[data-theme-toggle]';
const root = document.documentElement;
const mediaQuery = typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : null;
let toggleEl = null;
const handleKeyToggle = event => {
    if (!toggleEl) {
        return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleToggle();
    }
};

const safeGet = () => {
    try {
        return localStorage.getItem(STORAGE_KEY);
    } catch (error) {
        return null;
    }
};

const safeSet = value => {
    try {
        localStorage.setItem(STORAGE_KEY, value);
    } catch (error) {
        /* noop */
    }
};

const systemPreference = () => (mediaQuery && mediaQuery.matches ? 'dark' : 'light');

const reflect = theme => {
    if (!toggleEl) {
        return;
    }
    toggleEl.dataset.themeState = theme;
    toggleEl.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
    toggleEl.setAttribute('aria-label', label);
    toggleEl.setAttribute('title', label);
};

const applyTheme = (theme, options = {}) => {
    if (theme !== 'dark' && theme !== 'light') {
        return;
    }
    root.dataset.theme = theme;
    if (options.persist !== false) {
        safeSet(theme);
    }
    reflect(theme);
};

const handleToggle = () => {
    const current = root.dataset.theme || systemPreference();
    const nextTheme = current === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
};

const initThemeToggle = () => {
    if (toggleEl) {
        toggleEl.removeEventListener('click', handleToggle);
        toggleEl.removeEventListener('keydown', handleKeyToggle);
    }
    toggleEl = document.querySelector(TOGGLE_SELECTOR);
    if (!toggleEl) {
        return;
    }
    toggleEl.addEventListener('click', handleToggle);
    toggleEl.addEventListener('keydown', handleKeyToggle);
    const stored = safeGet();
    if (stored === 'dark' || stored === 'light') {
        applyTheme(stored, { persist: false });
    } else {
        reflect(root.dataset.theme || systemPreference());
    }
};

const handleSystemChange = event => {
    const stored = safeGet();
    if (stored === 'dark' || stored === 'light') {
        return;
    }
    if (!root.dataset.theme) {
        reflect(event.matches ? 'dark' : 'light');
    }
};

const primeThemePreference = () => {
    const stored = safeGet();
    if (stored === 'dark' || stored === 'light') {
        root.dataset.theme = stored;
    }
};

primeThemePreference();

if (mediaQuery) {
    if (typeof mediaQuery.addEventListener === 'function') {
        mediaQuery.addEventListener('change', handleSystemChange);
    } else if (typeof mediaQuery.addListener === 'function') {
        mediaQuery.addListener(handleSystemChange);
    }
}

export { initThemeToggle };
