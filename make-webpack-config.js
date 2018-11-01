var makeWebpackConfig = require('@split-demo/shared-config').makeWepbackConfigOther;

module.exports = makeWebpackConfig('chat', { app: true, lazyLoadable: true });
