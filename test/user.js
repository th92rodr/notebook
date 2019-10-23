process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaihttp = require('chai-http');

const app = require('../server');
const User = require('../models/user');

const should = chai.should();
chai.use(chaihttp);

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
      //console.log('new user ', data);
      //console.log('new user ID ', userId);
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
        name: 'test user name 2',
        password: 'test user password 2',
        email: 'test-2@user.com'
      })
      .end((error, res) => {
        //console.log('ADD RES BODY -> ', res.body);
        //console.log('ADD RES BODY USER -> ', res.body.user.createdUser);
        res.should.have.status(200);
        res.should.be.json;
        res.body.user.createdUser.should.be.a('object');
        res.body.user.createdUser.should.have.property('_id');
        res.body.user.createdUser.should.have.property('name');
        res.body.user.createdUser.should.have.property('password');
        res.body.user.createdUser.should.have.property('email');
        res.body.user.createdUser.name.should.equal('test user name 2');
        res.body.user.createdUser.email.should.equal('test-2@user.com');
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
        //console.log('UPDATE RES BODY -> ', res.body);
        res.should.have.status(204);
        done();
      });
  });

  it('should delete a user on /user/delete/<id> DELETE', (done) => {
    chai
      .request(app)
      .delete(`/user/delete/${userId}`)
      .end((error, res) => {
        //console.log('DELETE RES BODY -> ', res.body);
        res.should.have.status(204);
        done();
      });
  });
});
