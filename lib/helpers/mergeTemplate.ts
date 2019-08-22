import combineTpl from "./combineTpl";
import { ITemplate } from "../store/operate";

export default function mergeTemplate (targetTpl: ITemplate, baseTpl: ITemplate) {
    const mergedTemplate: ITemplate = {}
    const combinedTargetTpl = combineTpl(targetTpl)
    const combinedBaseTpl = combineTpl(baseTpl)
    for (const [toolName, element] of Object.entries(combinedBaseTpl)) {
        if (!combinedTargetTpl[toolName]) {
            combinedTargetTpl[toolName] = element 
        }
    }

    const combinedTargetTplEntries = Object.entries(combinedTargetTpl)
    // find root tool
    for (const [toolName, element] of combinedTargetTplEntries) {
        if (!element.parent) {
            mergedTemplate[toolName] = element
        }
    }
    // push alias into root alias's list
    for (const [toolName, element] of combinedTargetTplEntries) {
        if (element.parent) {
            mergedTemplate[element.parent].alias = mergedTemplate[element.parent].alias || []
            mergedTemplate[element.parent].alias!.push(toolName)
        }
    }

    return mergedTemplate
}
