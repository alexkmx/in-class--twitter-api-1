module.exports = {
    context: __dirname,
    entry:'./src/client/js/App.js',
    devtool:'cheap-eval-source-map',
    output: {
      path: `${__dirname}/public/js`,
      filename: 'bundle.js'
    },
    resolve:{
      extensions: ['.js','.json']
    },
    stats: {
      colors: true,
      reasons: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader'
        }
      ]
    }
  }
