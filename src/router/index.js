import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)

export const constantRouterMap = [{
		path: '/',
		component: _import('register/companyList'),
		hidden: true,
		meta: { keepAlive: true }
	},
	{
		path: '/register',
		component: _import('register/index'),
		hidden: true,
		meta: { keepAlive: true }
	},
	{
		path: '/404',
		component: _import('404'),
		hidden: true
	}
]

export default new Router({
	// mode: 'history', //后端支持可开
	scrollBehavior: () => ({
		y: 0
	}),
	routes: constantRouterMap
})

export const asyncRouterMap = [

]
