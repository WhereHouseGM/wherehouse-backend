import { expect } from 'chai';
import app from '../dist/app';
import {agent as request} from 'supertest';
import db from '../dist/models'

const getUserDemandsUrl = '/v1/user-demands'

interface FindOption {
  offset?: number;
  limit?: number;
}

function buildUrl(baseUrl: string, option: FindOption) {
  baseUrl += '?';
  if(option.offset !== undefined) baseUrl += `offset=${option.offset}`
  if(option.limit !== undefined) baseUrl += `&limit=${option.limit}`
  return baseUrl;
}

before(async function () {
  await db.sync({ force : true });
});

export async function getUserDemands(option: FindOption) {
  return request(app)
    .get(buildUrl(getUserDemandsUrl, option))
}

describe('get user demands', function() {
  it('success', async function() {
    const res = await getUserDemands({});

    expect(res.status).to.equal(200)
  })
})