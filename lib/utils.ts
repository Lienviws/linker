/**
 * when call created function after 'times' times, call resolve
 */
export function resolveCount (times: number, resolve: (value: any) => void){
    let res = undefined
    return function (data?: any) {
        res = data
        if (--times <= 0) {
            resolve(res)
        }
    }
}

/**
 * 简易模板引擎
 * @param {string|array} tpl - 模板字符串
 * @param {object} context - 环境作用域
 */
export function doTpl (tpl: string, context: {[key: string]: any}): string 
export function doTpl (tpl: string[], context: {[key: string]: any}): string[]
export function doTpl (stringOrArrayTpl: string|string[], context: {[key: string]: any}): string|string[] {
    let tplArray = stringOrArrayTpl
    let isOutString = false
    if (typeof tplArray == 'string') {
        isOutString = true
        tplArray = [tplArray]
    }

    const reg = /<%\s*(.+?)\s*%>/g
    let output:string[] = []
    
    for (const tpl of tplArray) {
        let index = 0
        let itemOutput = ''
        tpl.replace(reg, (match, escapeValue, offset, wholeStr) => {
            const value = context[escapeValue]
            itemOutput += wholeStr.substring(index, offset)
            itemOutput += value
            index = offset + match.length
    
            return match
        })
        itemOutput += tpl.substring(index, tpl.length)
        output.push(itemOutput)
    }

    return isOutString ? output[0] : output
}
