module.exports = {
  configureWebpack: {
    externals: {
      apexcharts: {
        root: 'ApexCharts',
        commonjs: 'apexcharts',
        commonjs2: 'apexcharts',
      },
    },
  },
};