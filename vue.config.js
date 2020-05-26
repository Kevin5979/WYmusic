const jsdom = require('jsdom')
const { JSDOM } = jsdom
module.exports = {
  /* 部署应用包的基本URL, 不设置可能会出现打包后项目找不到资源问题 */
  publicPath: './',
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(html)$/,
          exclude: /node_modules/,
          use: {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        }
      ]
    },
    //配置别名,默认src为@,修改后需要重新编译才能生效
    resolve: {
      alias: {
        'api': '@/api',
        'assets': '@/assets',
        'components': '@/components',
        'router': '@/router',
        'store': '@/store',
        'views': '@/views',
        'tools': '@/tools',
        'plugin': '@/plugin'
      }
    }
  },
  // 以下代码是安装了预渲染的插件之后自动添加的
  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/',
        '/recommend',
        '/singer',
        '/rank',
        '/search',
        '/account',
        '/detail'
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true,
      postProcess: route => {
        // 预渲染内容写入之前的额外操作
        let reg = /<meta name="viewport".*user-scalable=no">/gi
        let res = route.html.match(reg)
        route.html = route.html.replace(res[1], '')

        // 1.根据字符串创建一个网页
        let html = new JSDOM(route.html)
        // 2.从创建好的网页中拿到document对象
        let dom = html.window.document
        // 3.找到对应的元素, 删除对应的元素
        let loadingEle = dom.querySelector('.container')
        dom.body.removeChild(loadingEle)
        // 4.重新序列化
        route.html = html.serialize()
        return route
      }
    }
  }
}