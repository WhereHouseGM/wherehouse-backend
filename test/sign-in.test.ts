import { expect } from 'chai';
import app from '../dist/app';
import {agent as request} from 'supertest';
import { signUp } from './sign-up.test';
import db from '../dist/models'

const signInUrl = '/v1/auth/sign-in'

export async function signIn(signInRequest) {
  return request(app)
    .post(signInUrl)
    .send(signInRequest);
}

before(async function () {
  await db.sync({ force : true });
});

describe('sign in', function () {
  it('success', async function () {

    const signUpRequest = {
      name: "name",
      email: "email@naver.com",
      password: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      type: "SHIPPER",
      telephoneNumber: "027020123",
      companyName: "company",
      phoneNumber: "01034231234"
    }

    await signUp(signUpRequest);

    const signInRequest = {
      email: "email@naver.com",
      password: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    };

    const res = await signIn(signInRequest);

    expect(res.status).to.equal(200)
    expect(res.body).not.to.be.empty
    expect(res.body.accessToken).not.to.be.empty
    expect(res.body.refreshToken).not.to.be.empty
    expect(res.body.tokenType).not.to.be.empty
  })

  it('failed since user not exists', async function () {
    const signInRequest = {
      email: "email1@naver.com",
      password: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    };

    const res = await signIn(signInRequest);

    expect(res.status).to.equal(404)
    expect(res.body).not.to.be.empty
    expect(res.body.message).not.to.be.empty
  })
});