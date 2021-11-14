/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1633495311208_9790';

  // add your middleware config here
  config.middleware = ['errorHandler', 'auth'];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.security = {
    csrf: {
      enable: false,
    },
    // 跨域白名单
    domainWhiteList: [
      'http://localhost:8080'
    ]
  }
  config.auth = {
    ignore: ['/login', '/register', '/ws']
  }
  //允许跨域的方法
  config.cors = {
    origin: '*',
    allowMethods: 'GET,POST,PUT,DELETE,PATCH'
  }
  config.valparams = {
    local: 'zh-cn',
    throwError: true	//主动抛出异常
  }
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: '',
    username: '',
    password: '',
    timezone: "+08:00",
    define: {
      //取消数据表复名
      freezeTableName: true,
      //自动写入时间措
      timestamps: true,
      //paranoid:true,
      createAt: 'create_at',
      updateAt: 'update_at',
      //deleteAt:'deleted_at',
      //拥有驼峰命名
      underscored: true
    }
  };
  config.crypto = {
    secret: 'ymtx@45ncashdaksh2!#@3nxjdas*_672'
  };
  config.redis = {
    client: {
      port: 6379,          // Redis port
      host: '127.0.0.1',   // Redis host
      password: '',
      db: 0,
    },
  }
  config.jwt = {
    secret: 'qhdgw@45ncashdaksh2!#@3nxjdas*_672'
  }
  config.oss = {
    client: {
      accessKeyId: '',
      accessKeySecret: '',
      bucket: '',
      endpoint: '',
      timeout: '60s',
    },
  }
  config.multipart = {
    mode: 'file',
    fileSize: 1048576000
  }

  return {
    ...config,
    ...userConfig,
  };
};
