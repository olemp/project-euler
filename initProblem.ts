const argv = require('yargs').argv
import axios from 'axios'
import cheerio from 'cheerio'
import fs from 'fs'
import s from 'underscore.string'
import { pad } from './util'
import child_process from 'child_process'

const url = new URL(argv._[0])
const problemIndex = parseInt(new URLSearchParams(url.pathname.substring(1)).get('problem') || '')
let fileName = `${pad(problemIndex, 4)}-{{name}}.ts`


const createFile = () => {
    const template = fs.readFileSync('./_template.ts', 'utf8')
    const content = template
        .replace('[PROBLEM_INDEX]', problemIndex?.toString() || '')
        .replace('[PROBLEM_URL]', url.href)
    fs.writeFileSync(fileName, content)
}

// downloading the target web page 
// by performing an HTTP GET request in Axios
axios.request({
    method: "GET",
    url: url.href,
}).then(({ data }: any) => {
    const $ = cheerio.load(data)
    const h2 = s.classify($('#content h2').text())
    const content = $('#content .problem_content').text()
    console.log(content)
    fileName = fileName.replace('{{name}}', h2)
    createFile()
    child_process.exec(`code ${fileName}`)
})

