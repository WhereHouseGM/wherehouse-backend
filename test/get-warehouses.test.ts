import { expect } from 'chai';
import app from '../dist/app';
import {agent as request} from 'supertest';
import { signUp } from './sign-up.test';
import db from '../dist/models'

const getWarehousesUrl = '/v1/warehouses'

interface FindOption {
  offset?: number;
  limit?: number;
  address?: string;
}

function buildUrl(baseUrl: string, option: FindOption) {
  baseUrl += '?';
  if(option.offset !== undefined) baseUrl += `offset=${option.offset}`
  if(option.limit !== undefined) baseUrl += `&limit=${option.limit}`
  if(option.address !== undefined) baseUrl += `&address=${option.address}`
  return baseUrl;
}

export async function getWarehouses(option: FindOption) {
  return request(app)
    .get(buildUrl(getWarehousesUrl, option))
}

describe('get warehouses', function() {
  it('success', async function() {
    const res = await getWarehouses({});

    expect(res.status).to.equal(200)
  })
})