import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import type { Configuration } from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const config: Configuration & { devServer?: DevServerConfiguration } = {
  mode: "development",
  entry: "./src/ts/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    module: true,
  },
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: [
          path.resolve(__dirname, "node_modules"),
          path.resolve(__dirname, "__test__")
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/html/index.html",
      filename: "./index.html",
      scriptLoading: "module", // 👈 <script type="module">
    }),
    new MiniCssExtractPlugin({
      filename: "css/index.css",
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    // 压缩
    compress: true,
    port: 3000,
    // 自动打开浏览器
    open: true,
    hot: true,
  },
};

export default config;
