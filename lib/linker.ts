import program from 'commander'
import { link, unlink, unlinkAll } from './core/link';
import { setProxy, setAlias, removeAlias } from './core/writeStore';
import { showSysStatus, showProxyAddr, showLinkedTool, templateState, showAlias, showShorePath } from './core/display';
import { errorLog, info, successLog, noteLog, lineFeed } from './core/createLogs';

function linkOutPut (error: null|undefined|Error, stdout: string) {
    if (error) {
        return errorLog(error)
    }
    lineFeed()
    noteLog(`tool stdout`)
    console.log(stdout)
    showLinkedTool()
}

program
    .version('1.0.0')

program
    .command('link [toolName]')
    .description('link tool proxy')
    .action(async function (toolName, cmd) {
        const [error, stdout] = await link(toolName)
        linkOutPut(error, stdout)
    })

program
    .command('unlink [toolName]')
    .description('unlink tool proxy')
    .action(async function (toolName, cmd) {
        const [error, stdout] = await unlink(toolName)
        linkOutPut(error, stdout)
    })

program.command('unlinkAll')
    .description('unlink all linked tool proxy')
    .action(async (cmd) => {
        const [error, stdout]  = await unlinkAll()
        linkOutPut(error, stdout)
    })

program.command('set <proxy>')
    .description('set proxy address, like "127.0.0.1:8899"')
    .action((proxy) => {
        setProxy(proxy)
        showProxyAddr()
    })

program.command('alias [aliasName] [parentTool]')
    .description('set tool alias')
    .option('-r, --remove <aliasName>', 'remove alias')
    .option('-l, --list <rootName>', 'alias list')
    .action((aliasName, parentTool, cmd) => {
        if (cmd.remove) {
            let ok = removeAlias(cmd.remove)
            if (ok) successLog(`'${aliasName}' removed`)
        } else if (cmd.list) {
            showAlias(cmd.list)
        } else if (aliasName && parentTool) {
            let ok = setAlias(aliasName, parentTool)
            if (ok) successLog(`'${aliasName}' added in '${parentTool}'`)
        } else {
            info('wrong usage')
        }
    })

program.command('status')
    .description('check the proxy tool status')
    .option('-t, --template', 'show template')
    .option('-p, --path', 'show store path')
    .action((cmd) => {
        if (cmd.template) {
            templateState()
        } else if (cmd.path) {
            showShorePath()
        } else {
            showSysStatus()
        }
    })

program.parse(process.argv)
