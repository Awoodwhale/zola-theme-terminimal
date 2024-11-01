export class MetingJSElementHooked extends window.MetingJSElement {
    disconnectedCallback() {
        !this.meta.lock && this.aplayer && this.aplayer.destroy()
    }
}