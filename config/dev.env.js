'use strict'

const merge = require('webpack-merge')
const production = require('./prod.env')

module.exports = merge(production, {
  NODE_ENV: '"development"',
  ROOT_API: '"http://lets-hang.test"'
})
