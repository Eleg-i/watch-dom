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
  esbuild
    .build({
      bundle: true,
      entryPoints: entry,
      format,
      minify: false,
      outfile: `dist/${outfile}.${format}.${platform}.min.js`,
      platform,
      target: 'es2022',
      watch: {
        onRebuild(error, result) {
          if (error) console.error('watch build failed:', error)
          // eslint-disable-next-line no-console
          else console.log('watch build succeeded:', result)
        }
      }
    })
    .catch(() => process.exit(1))
}

// build('node')
build('browser')
