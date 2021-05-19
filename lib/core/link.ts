import { getTemplate, getProxyAddr, getLinkedTool } from "../store/operate";
import combineTpl from "../helpers/combineTpl";
import { createError } from "./createError";
import { doTpl } from "../utils";
import doCmd from "../cmd/doCmd";
import { errorLog } from "./createLogs";
import { setLinkerInStore } from "./writeStore";
import { IPromiseArgs } from "../types";

function run (tool: string, prop: ('start'|'stop')): Promise<IPromiseArgs>
function run (tool: string[], prop: ('start'|'stop')): Promise<IPromiseArgs>
function run (toolArray: string | string[], prop: ('start'|'stop')) {
    if (typeof toolArray == 'string') toolArray = [toolArray]
    toolArray = toolArray.map(item => item.trim()).filter(item => item)
    const combinedTpl = combineTpl(getTemplate())
    const proxyAddr = getProxyAddr()

    let cmdList: string[] = []
    let linkList: string[] = []

    for (const tool of toolArray) {
        if (!combinedTpl[tool]) {
            // todo: add template
            return errorLog(createError(`系统没有预设 '${tool}' 的模板，如若添加，请参考alias或者template命令`))
        }
        linkList.push(tool)
        cmdList = [...cmdList, ...doTpl(combinedTpl[tool][prop], {
            tool,
            proxy: proxyAddr,
        })]
    }

    if (cmdList.length) {
        return doCmd(cmdList).then(([error, stdout]) => {
            if (error) {
                return [error]
            }
            if (prop == 'start') {
                setLinkerInStore(linkList)
            } else if (prop == 'stop') {
                setLinkerInStore(linkList, { remove: true })
            }
            return [error, stdout]
        })
    } else {
        return Promise.resolve([createError('系统不存在该预设')])
    }
}

export function link (tool = '') {
    // link all
    return run(tool.split(','), 'start')
}

export function unlink (tool = '') {
    return run(tool.split(','), 'stop')
}

export function unlinkAll () {
    return run(getLinkedTool(), 'stop')
}
