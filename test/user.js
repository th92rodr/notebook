process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaihttp = require('chai-http');

const app = require('../app');
const User = require('../models/user');

const should = chai.should();
chai.use(chaihttp);

/* */
let userId;

function createUser(done) {
  const newUser = new User({
    name: 'test user name',
    password: 'test user password',
    email: 'test@user.com'
  });

  newUser.save((error, data) => {
    if (!error) {
      userId = data._id;

      console.log('new user ', data);
      console.log('new user ID ', userId);

      done();
    } else {
      console.error('Error creating user - ', error);

      return done('Error');
    }
  });
}

describe('Users', () => {
  // runs before all tests in this file
  before((done) => {
    // clear database collections
    User.collection.drop();
    done();
  });

  // runs before each test in this block
  beforeEach((done) => {
    createUser(done);
  });

  // runs after each test in this block
  afterEach((done) => {
    // clear database collections
    User.collection.drop();
    done();
  });

  it('should add a user on /user/add POST', (done) => {
    chai
      .request(app)
      .post('/user/add')
      .send({
        name: 'test user name',
        password: 'test user password',
        email: 'test@user.com'
      })
      .end((error, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.should.have.property('password');
        res.body.should.have.property('email');
        res.body.name.should.equal('test user name');
        res.body.password.should.equal('test user password');
        res.body.email.should.equal('test@user.com');
        done();
      });
  });

  it('should update a user on /user/update/<id> PUT', (done) => {
    chai
      .request(app)
      .put(`/user/update/${userId}`)
      .send({
        name: 'test user name',
        password: 'test user password',
        email: 'test@user.com'
      })
      .end((error, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.should.have.property('password');
        res.body.should.have.property('email');
        res.body.name.should.equal('test user name');
        res.body.password.should.equal('test user password');
        res.body.email.should.equal('test@user.com');
        done();
      });
  });

  it('should delete a user on /user/delete/<id> DELETE', (done) => {
    chai
      .request(app)
      .delete(`/user/delete/${userId}`)
      .end((error, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('REMOVED');
        done();
      });
  });
});
