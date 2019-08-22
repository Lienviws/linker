import Conf from 'conf'
import defaultTemplate from '../../template.json'
import mergeTemplate from '../helpers/mergeTemplate';

export interface ITemplateItem {
    /** 开启proxy的脚本模板 */
    start: Array<string>
    /** 关闭proxy的脚本模板 */
    stop: Array<string>
    /** 一致语法的工具名称 */
    alias?: Array<string>
}
export interface ITemplate {
    [tool: string]: ITemplateItem
}

const storeKey = {
    TEMPLATE: 'template',
    ADDR: 'addr',
    RUNNGING: 'running'
}

const store = new Conf({
    projectName: 'linker'
})

function setStore (key: string, value: any) {
    store.set(key, value)
}

function getStore<T> (key: string, dafaultValue?: T): T {
    return <T>store.get(key, dafaultValue)
}

export function getStorePath () {
    return store.path
}

/** 
 * 获取模板
 */
export function getTemplate () {
    const userTemplate =  getStore<ITemplate>(storeKey.TEMPLATE, {})
    return mergeTemplate(userTemplate, defaultTemplate)
}
/** 
 * 设置模板
 */
export function setTemplate (tpl: ITemplate) {
    setStore(storeKey.TEMPLATE, tpl)
}

/** 
 * 获取预设的代理地址
 */
export function getProxyAddr () {
    return getStore<string>(storeKey.ADDR, '')
}
/** 
 * 设置预设的代理地址
 */
export function setProxyAddr (addr: string) {
    setStore(storeKey.ADDR, addr)
}

/** 
 * 获取已代理的工具列表
 */
export function getLinkedTool (): string[] {
    return getStore<Array<string>>(storeKey.RUNNGING, [])
}
/** 
 * 写入代理的工具列表
 */
export function setLinkedTool (arr: Array<string>) {
    setStore(storeKey.RUNNGING, arr)
}