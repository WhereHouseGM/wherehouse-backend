import { expect } from 'chai';
import app from '../dist/app';
import {agent as request} from 'supertest';

const signUpUrl = '/v1/auth/sign-up'

async function signUp(signUpRequest) {
  return request(app)
    .post(signUpUrl)
    .send(signUpRequest);
}

describe('sign up', function () {
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

    const res = await signUp(signUpRequest)

    expect(res.status).to.equal(201)
    expect(res.body).not.to.be.empty
    expect(res.body.accessToken).not.to.be.empty
    expect(res.body.refreshToken).not.to.be.empty
    expect(res.body.tokenType).not.to.be.empty
  })

  it('failed due to invalid body', async function () {
    const signUpRequest = {
      name: "name",
      email: "email@naver.com",
      password: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      type: "SHIPPER",
      telephoneNumber: "027020123",
      companyName: "company",
    }

    const res = await signUp(signUpRequest)

    expect(res.status).to.equal(400)
    expect(res.body).not.to.be.empty
    expect(res.body.message).not.to.be.empty
  })
});