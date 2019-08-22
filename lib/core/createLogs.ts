import chalk from 'chalk'
import { IError } from "./createError";
import { ITemplate } from '../store/operate';

const log = console.log

/**
 * 打出错误信息
 * @param {Error} error - 错误对象
 */
export function errorLog (error: IError) {
    log(chalk.red('error: ' + error.message))
}

export function successLog (message: string) {
    log(chalk.green('success: ' + message))
}

export function noteLog (message: string) {
    log(chalk.yellow('note: ' + message))
}

export function info (message: string) {
    log(chalk.green(message))
}

export function lineFeed () {
    log('\r')
}

export function templateLog (template: ITemplate) {
    console.group()
    for (const [toolName, {start, stop, alias}] of Object.entries(template)) {
        lineFeed()
        console.group(('tool: ' + chalk.blue(toolName)))
        console.group(('start command: '))
        for (const item of start) {
            log(chalk.green(item))
        }
        console.groupEnd()
        console.group(('stop command: '))
        for (const item of stop) {
            log(chalk.green(item))
        }
        console.groupEnd()
        if (alias) {
            console.group(('alias list: '))
            for (const item of alias) {
                log(chalk.blue(item))
            }
            console.groupEnd()
        }
        console.groupEnd()
    }
    console.groupEnd()
    lineFeed()
}

export const color = chalk
