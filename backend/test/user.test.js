process.env.NODE_ENV = 'test';

require('dotenv').config();
require('jest');
const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = require('../src/app');
const User = require('../src/models/User');

const okName = 'test name';
const okEmail = 'test@mail.com';
const okPassword = '123456789';
const badEmail = 'test';
const badPassword = '123';

beforeAll(async () => {
  const databaseURL = process.env.TEST_DATABASE;
  await mongoose.connect(
    databaseURL,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    error => {
      if (error) {
        console.error(error);
        process.exit(1);
      }
    }
  );
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Create user on /users/ POST', () => {
  afterEach(async () => {
    //await User.collection.drop();
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
    userId = jwt.verify(token, process.env.SALT).id;
    console.log('token ', token);
    console.log('userId ', userId);
  });

  afterEach(async () => {
    //await User.collection.drop();
  });

  test('should return status 200 and sucess message', async () => {
    const res = await request(app)
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    //console.log('Result ', res.body);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('User deleted sucessfully');
  });
});

describe('Update user on /users/ PUT', () => {});
