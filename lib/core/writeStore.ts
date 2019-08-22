import * as store from "../store/operate";
import { errorLog, noteLog } from "./createLogs";
import { createError } from "./createError";

/**
 * 设置代理地址
 * @param {string} addr - 代理地址
 */
export function setProxy (addr: string) {
    store.setProxyAddr(addr)
}

/**
 * 在模板里写入别称
 * @param {string} alias - 目标工具名称
 * @param {string} root - 所共享脚本的工具名称
 */
export function setAlias (alias: string, root: string) {
    let template = store.getTemplate()
    if (!template[root]) {
        // todo
        return errorLog(createError(`系统没有预设 '${root}' 的模板，请参考add template命令`))
    }
    if (template[alias]) {
        return noteLog(`系统已经存在 '${alias}' 的预设`)
    }
    if (!template[root].alias) {
        template[root].alias = []
    }
    if (template[root].alias!.includes(alias)) {
        return noteLog(`系统已经存在 '${alias}' 的预设`)
    }
    template[root].alias!.push(alias)
    store.setTemplate(template)

    return true
}

/**
 * 移去模板别称
 * @param {string} targetAlias - 目标工具名称
 */
export function removeAlias (targetAlias: string) {
    let template = store.getTemplate()
    let res = false
    if (template[targetAlias]) {
        return noteLog(`'${targetAlias}' 属于基本模板而非别称`)
    }
    for (const [toolName, { alias = [] }] of Object.entries(template)) {
        const targetIndex = alias.findIndex(name => name == targetAlias)
        if (targetIndex > -1) {
            alias.splice(targetIndex, 1)
            res = true
            break
        }
    }
    if (!res) {
        return noteLog(`没有名为 '${targetAlias}' 的别称`)
    }
    
    store.setTemplate(template)
    
    return true
}


interface ISetLinkerInStoreOptions {
    remove: boolean
}

/**
 * 写入已链接的工具
 * @param {string | string[]} tool - 工具名称
 * @param {boolean} options.remove - 移除工具
 */
export function setLinkerInStore (tool: string, options?: ISetLinkerInStoreOptions): void
export function setLinkerInStore (toolArray: string[], options?: ISetLinkerInStoreOptions): void
export function setLinkerInStore (toolArray: string|string[], {
    remove = false
} = {}) {
    if (typeof toolArray == 'string') toolArray = [toolArray]

    let setLinkerInStores = store.getLinkedTool()

    if (remove) {
        setLinkerInStores = setLinkerInStores.filter(setLinkerInStore => !toolArray.includes(setLinkerInStore))
    } else {
        setLinkerInStores = [...new Set([...setLinkerInStores, ...toolArray])]
    }
    store.setLinkedTool(setLinkerInStores)

    return true
}
