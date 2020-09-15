var path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 引用plugin
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
function resolve(dir) {
  return path.join(__dirname, "..", dir);
}
module.exports = {
  // target: "node",
  entry: "./src/main.js", // 入口起点
  output: {
    filename: "js/build.js",
    path: resolve("build") // 输出路径，所有资源打包都会输出到这个文件夹下
  },
  // loader配置  css html js img file
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: "eslint-loader",
        enforce: "pre",
        include: [resolve("src")]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader" // 处理以.vue结尾的文件
      },
      {
        test: /\.scss$/,
        // 使用哪些loader进行处理
        use: [
          // use数组中loader执行顺序：从右到左，从下到上，依次执行(先执行css-loader)
          // style-loader：创建style标签，将js中的样式资源插入进去，添加到head中生效
          "style-loader",
          // css-loader：将css文件变成commonjs模块加载到js中，里面内容是样式字符串
          "css-loader",
          // less-loader：将less文件编译成css文件，需要下载less-loader和less
          "sass-loader"
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        // url-loader：处理图片资源，问题：默认处理不了html中的img图片
        test: /\.(jpg|png|gif)$/,
        // 需要下载 url-loader file-loader
        loader: "url-loader",
        options: {
          // 图片大小小于8kb，就会被base64处理，优点：减少请求数量（减轻服务器压力），缺点：图片体积会更大（文件请求速度更慢）
          // base64在客户端本地解码所以会减少服务器压力，如果图片过大还采用base64编码会导致cpu调用率上升，网页加载时变卡
          limit: 8 * 1024,
          // 给图片重命名，[hash:10]：取图片的hash的前10位，[ext]：取文件原来扩展名
          name: "[hash:10].[ext]",
          // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是conmonjs，解析时会出问题：[object Module]
          // 解决：关闭url-loader的es6模块化，使用commonjs解析
          esModule: false,
          outputPath: "imgs"
        }
      },
      {
        test: /\.html$/,
        // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
        loader: "html-loader"
      },
      {
        // 排除html|js|css|less|jpg|png|gif文件
        exclude: /\.(vue|html|js|css|scss|jpg|png|gif)/,
        // file-loader：处理其他文件
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]",
          outputPath: "media"
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(), // 清除旧资源
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new VueLoaderPlugin()
  ],
  resolve: {
    // 配置解析模块路径别名: 优点：当目录层级很复杂时，简写路径；缺点：路径不会提示
    alias: {
      "@": resolve("src")
    },
    // 配置省略文件路径的后缀名（引入时就可以不写文件后缀名了）
    extensions: [".js", ".json", ".jsx", ".css", ".vue"],
    // 告诉 webpack 解析模块应该去找哪个目录
    modules: [resolve(__dirname, "../../node_modules"), "node_modules"]
  },
  node: {
    fs: "empty"
  },
  externals: ["fs"],
  mode: "development", // 开发模式
  devServer: {
    // 项目构建后路径
    contentBase: resolve(__dirname, "build"),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true
  }
};
