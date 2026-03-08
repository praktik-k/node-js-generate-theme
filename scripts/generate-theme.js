import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const themeName = process.argv[2] || 'theme-1'

const configPath = path.join(__dirname, `../configs/${themeName}.json`)
const basicThemePath = path.join(__dirname, '../configs/basic-theme.css')
const themesDir = path.join(__dirname, '../themes')
const outputPath = path.join(themesDir, `${themeName}.css`)

const data = await fs.readFile(configPath, 'utf-8')
const config = JSON.parse(data)

const generatedCss = `
/* Genetrated CSS from ${themeName}.json */
body {
    color: ${config.brandColor};
    font-family: ${config.font};
}

h1 {
    font-size: ${config.h1};
}
`

await fs.mkdir(themesDir, { recursive: true })

await fs.copyFile(basicThemePath, outputPath)
await fs.appendFile(outputPath, generatedCss, 'utf-8')

console.log(`файл сохранен в: ${outputPath}`);
