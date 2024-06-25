function aesDecrypt(data, key) {
    if (key.length > 32) key = key.slice(0, 32)
    const cypherKey = CryptoJS.enc.Utf8.parse(key)
    CryptoJS.pad.ZeroPadding.pad(cypherKey, 4)
    const iv = CryptoJS.SHA256(key).toString()
    const cfg = { iv: CryptoJS.enc.Utf8.parse(iv) }
    const decrypted = CryptoJS.AES.decrypt(data, cypherKey, cfg)
    return decrypted.toString(CryptoJS.enc.Utf8)
}

function decryptContent(hash) {
    const pwd = document.getElementById(`pwd-${hash}`).value
    const data = document.getElementById(`data-${hash}`).value
    if (!pwd || !data) return
    try {
        const res = aesDecrypt(data, pwd)
        if (!res) {
            document.getElementById(`pwd-${hash}`).value = ''
            return
        }
        const parsed = marked.parse(res)
        document.getElementById(`secret-content-${hash}`).remove()
        document.getElementById(`decrypted-content-${hash}`).innerHTML += parsed
        tocbot.refresh()
    } catch(_) { return }
}