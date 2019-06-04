'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
	NODE_ENV: '"development"',
	// BASE_API: '"http://localhost:7099/"',
	// BASE_API: '"http://47.91.129.200:7099/"',
	BASE_API: '"http://hk.iimiim.cn:7099/"',
	QRCODE_URL: '"http://hk.iimiim.cn:8989/"',
	Content_Type: '"application/JSON; charset=UTF-8"',
	METHOD: "GET,POST"
})
