import { request, config } from 'utils'

const { api } = config;
const {
  get_info,
  get_account,
  get_code,
  get_table_rows,
} = api;

export function chain_get_info (params) {
  return request({
    url: get_info,
    method: 'get',
    data: params,
  })
}

export function chain_get_account (params) {
  return request({
    url: get_account,
    method: 'post',
    data: params,
  })
}

export function chain_get_code (params) {
  return request({
    url: get_code,
    method: 'post',
    data: params,
  })
}

export function chain_get_table_rows (params) {
  return request({
    url: get_table_rows,
    method: 'post',
    data: params,
  })
}
