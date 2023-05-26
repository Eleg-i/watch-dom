import esbuild from 'esbuild'
import { readFile } from 'node:fs/promises'

const packageJson = JSON.parse(await readFile('./package.json', 'utf-8')),
      { entry, outfile } = packageJson

/**
 * 开始构建
 * @param {String} platform 构建的平台类型
 */
function build(platform) {
  buildInFormat('cjs', platform)
  buildInFormat('esm', platform)
}

/**
 * 根据模块类型构建
 * @param {Stirng} format 构建的模块类型
 * @param {String} platform 构建的平台类型
 */
function buildInFormat(format, platform) {
  const config = {
    bundle: true,
    entryPoints: entry,
    format,
    minify: true,
    outfile: `dist/${outfile}.${format}.${platform}.min.js`,
    platform,
    target: 'esnext'
  }

  esbuild.build(config).catch(() => process.exit(1))
  config.minify = false
  config.outfile = `dist/${outfile}.${format}.${platform}.js`
  esbuild.build(config).catch(() => process.exit(1))
}

// build('node')
build('browser')
