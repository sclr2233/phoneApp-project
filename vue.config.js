export default {
  devServer: {
    proxy: {
      '/api': {  // 代理路径前缀，根据你的需求修改
        target: 'https://api.netease.im',  // 目标服务器地址
        changeOrigin: true,  // 允许跨域
        secure: false,  // 如果是https接口，需要配置这个参数
        pathRewrite: {
          '^/api': ''  // 重写路径，去掉路径中的 `/api` 前缀
        },
        headers: {
          'Access-Control-Allow-Origin': '*',  // 添加 CORS 头部
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
        }
      }
    }
  }
};