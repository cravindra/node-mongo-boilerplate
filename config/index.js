const merge = require('lodash/merge');
const common = {
    port: 6789
};
const envs = ['production', 'development'];
let env = (envs.indexOf(process.env.NODE_ENV) > -1 && process.env.NODE_ENV) || 'development';
module.exports = merge({env}, common, require(`./${env}`));
