import { getTemplate, getLinkedTool, getProxyAddr, getStorePath } from "../store/operate";
import { templateLog, info, noteLog, color } from "./createLogs";

export function templateState () {
    templateLog(getTemplate())
}

export function linkedState () {
    
}

export function showSysStatus () {
    const addr = getProxyAddr()
    if (!addr) {
        return noteLog('you should set proxy address first')
    }
    info(`
    proxy address: ${color.blue(getProxyAddr())}
    linked tool: ${color.blue(getLinkedTool().join(', '))}
    `)
}

export function showProxyAddr () {
    info(`
    proxy address: ${color.blue(getProxyAddr())}
    `)
}

export function showLinkedTool () {
    info(`
    linked tool: ${color.blue(getLinkedTool().join(', '))}
    `)
}

export function showAlias (toolName: string) {
    const element = getTemplate()[toolName]
    if (!element) {
        return noteLog(`'${toolName}' not exist in root template`)
    }
    if (!element.alias || element.alias.length == 0) {
        return noteLog(`'${toolName}' has no alias`)
    } else {
        info(`
        alias: ${element.alias.join(', ')}
        `)
    }
    
}

export function showShorePath () {
    info(getStorePath())
}
