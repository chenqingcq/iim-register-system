import axios from '@/utils/axios'
const qs = require('qs');

export function getCompanyList(params) {
	return axios({
		headers: { 'Content-Type': '"application/x-www-form-urlencoded; charset=UTF-8"' },
		url: 'app/2.1.0/property/companys',
		method: 'post',
		params: params

	})
}

export function getFieldsList(params) {
	return axios({
		url: '/app/2.1.0/register/prepare/company',
		method: 'post',
		data: JSON.stringify(params)
	})
}

export function sendMsg(params) {
	return axios({
		url: '/app/2.1.0/register/sms',
		method: 'post',
		data: JSON.stringify(params)
	})
}

export function addVisitor(params) {
	return axios({
		url: '/app/2.1.0/visitor/add/user',
		method: 'post',
		data: JSON.stringify(params)
	})
}
export function upload(data) {
	return axios({
		url: '/app/2.0.0/register/picture',
		method: 'post',
		data
	})
}
