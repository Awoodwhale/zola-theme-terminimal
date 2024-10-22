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
            alertify.error('密码错误')
            document.getElementById(`pwd-${hash}`).value = ''
            return
        }
        alertify.success('解密成功')
        document.getElementById(`secret-content-${hash}`).remove()
        document.getElementById(`decrypted-content-${hash}`).innerHTML += marked.parse(res)
        tocbot.refresh()
    } catch (_) {
        alertify.error('解密失败')
    }
}