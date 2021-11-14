'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  jwt: {
    enable: true,
    package: "egg-jwt"
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  cors: {
    enable: true,
    package: 'egg-cors'
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize'
  },
  valparams: {
    enable: true,
    package: 'egg-valparams'
  },
  websocket: {
    enable: true,
    package: 'egg-websocket-plugin',
  },
  oss: {
    enable: true,
    package: 'egg-oss',
  },
};
