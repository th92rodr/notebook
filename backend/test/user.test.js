process.env.NODE_ENV = 'test';

require('jest');
const jwt = require('jsonwebtoken');

const request = require('supertest');
const app = require('../src/app');

const User = require('../src/models/User');

const okName = 'test name';
const okEmail = 'test@mail.com';
const okPassword = '123456789';
const badEmail = 'test';
const badPassword = '123';

beforeAll(async () => {
  await User.collection.drop();
});

afterAll(async () => {
  await User.collection.drop();
});

describe('Create user on /users/ POST', () => {
  afterEach(async () => {
    await User.collection.drop();
  });

  test('should return status 201 and sucess message', async () => {
    const res = await request(app)
      .post('/users/')
      .send({
        name: okName,
        email: okEmail,
        password: okPassword
      });
    //console.log('Result ', res.body);

    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe('User created sucessfully');
  });

  test('should return status 422 and error message', async () => {
    const res = await request(app)
      .post('/users/')
      .send({
        name: okName,
        email: okEmail,
        password: badPassword
      });
    //console.log('Result ', res.body);

    expect(res.statusCode).toEqual(422);
    expect(res.body.message).toBe('Invalid input');
    expect(res.body.errors[0].msg).toBe(
      'Password is invalid or does not exists'
    );
  });

  test('should return status 422 and error message', async () => {
    const res = await request(app)
      .post('/users/')
      .send({
        name: okName,
        email: badEmail,
        password: okPassword
      });
    //console.log('Result ', res.body);

    expect(res.statusCode).toEqual(422);
    expect(res.body.message).toBe('Invalid input');
    expect(res.body.errors[0].msg).toBe('Email is invalid or does not exists');
  });

  test('should return status 422 and error message', async () => {
    const res = await request(app)
      .post('/users/')
      .send({
        email: okEmail,
        password: okPassword
      });
    //console.log('Result ', res.body);

    expect(res.statusCode).toEqual(422);
    expect(res.body.message).toBe('Invalid input');
    expect(res.body.errors[0].msg).toBe('Name does not exists');
  });
});

describe('Update user on /users/ PUT', () => {});

describe('Delete user on /users/ DELETE', () => {
  let userId;
  let token;
  beforeEach(async () => {
    await request(app)
      .post('/users/')
      .send({
        name: okName,
        email: okEmail,
        password: okPassword
      });

    const res = await request(app)
      .post('/users/login')
      .send({
        email: okEmail,
        password: okPassword
      });
    console.log('login res ', res.body);

    token = res.body.token;
    userId = await jwt.decode(token).id;
    console.log('token ', token);
    console.log('userId ', userId);
  });

  afterEach(async () => {
    await User.collection.drop();
  });

  test('should return status 200 and sucess message', async () => {
    const res = await request(app)
      .delete(`/users/${userId}`)
      .set('Authorization', token);
    console.log('Result ', res.body);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('User deleted sucessfully');
  });
});
