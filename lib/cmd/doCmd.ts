import { exec } from 'child_process'
import { resolveCount } from '../utils'
import { IPromiseArgs } from '../types';

export default function doCmd (array: Array<string>): Promise<IPromiseArgs> {
    let cmd = array.join(' && ')
    return new Promise((resolvePromise, reject) => {
        let resolve = resolveCount(2, resolvePromise)
        let child_process = exec(cmd, (error, stdout, stderr) => {
            stderr ? reject(stderr) : resolve([error, stdout])
        })
        child_process.on('exit', ()=> {
            resolve([null])
        })
    })
}