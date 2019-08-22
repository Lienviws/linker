import { ITemplateItem, ITemplate } from "../store/operate";

interface ICombineTemplateItem extends Omit<ITemplateItem, 'alias'> {
    /** 父层结构，alias数据专属 */
    parent?: string
}
interface ICombineTemplate {
    [tool: string]: ICombineTemplateItem
}

export default function combineTpl (template: ITemplate) {
    let tplCombine:ICombineTemplate = {}
    for (const [toolName, { start, stop, alias = []}] of Object.entries(template)) {
        const newElement = {
            start,
            stop,
        }
        tplCombine[toolName] = newElement
        const newAliasElement = Object.assign({}, newElement, {
            parent: toolName
        })
        for (const tool of alias) {
            tplCombine[tool] = newAliasElement
        }
    }

    return tplCombine
}
