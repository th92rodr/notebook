process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaihttp = require('chai-http');

const app = require('../app');
const Note = require('../models/note');
const User = require('../models/user');

const should = chai.should();
chai.use(chaihttp);

/* */
let noteId;
let userId;

function createNote(done, user) {
  const newNote = new Note({
    title: 'Test Note Title',
    description: 'Test note description',
    creator: user
  });

  newNote.save((error, data) => {
    if (!error) {
      noteId = data._id;

      console.log('new note ', data);
      console.log('new note ID ', noteId);

      done();
    } else {
      console.error('Error creating note - ', error);

      return done('Error');
    }
  });
}

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

      createNote(done, newUser);
    } else {
      console.error('Error creating user - ', error);

      return done('Error');
    }
  });
}

describe('Notes', () => {
  // runs before all tests in this file
  before((done) => {
    // clear database collections
    User.collection.drop();
    Note.collection.drop();
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
    Note.collection.drop();
    done();
  });

  it('should list all notes on /note/index GET', (done) => {
    chai
      .request(app)
      .get('/note/index')
      .set('userId', userId)
      .end((error, res) => {
        console.log('RES -> ', res);
        console.log('RES BODY -> ', res.body);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('title');
        res.body[0].should.have.property('description');
        res.body[0].title.should.equal('Test Note Title');
        res.body[0].description.should.equal('Test note description');
        done();
      });
  });

  it('should show a single note on /note/index/<id> GET', (done) => {
    chai
      .request(app)
      .get(`/note/index/${noteId}`)
      .end((error, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('title');
        res.body.should.have.property('description');
        res.body.title.should.equal('Test Note Title');
        res.body.description.should.equal('Test note description');
        done();
      });
  });

  it('should add a note on /note/add POST', (done) => {
    chai
      .request(app)
      .post('/note/add')
      .set('userId', userId)
      .send({ title: 'Test Note Title', description: 'Test note description' })
      .end((error, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('title');
        res.body.should.have.property('description');
        res.body.title.should.equal('Test Note Title');
        res.body.description.should.equal('Test note description');
        done();
      });
  });

  it('should update a note on /note/update/<id> PUT', (done) => {
    chai
      .request(app)
      .put(`/note/update/${noteId}`)
      .send({
        title: 'Updated Test Note Title',
        description: 'Updated test note description'
      })
      .end((error, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('title');
        res.body.should.have.property('description');
        res.body.title.should.equal('Updated Test Note Title');
        res.body.description.should.equal('Updated test note description');
        done();
      });
  });

  it('should delete a note on /note/delete/<id> DELETE', (done) => {
    chai
      .request(app)
      .delete(`/note/delete/${noteId}`)
      .end((error, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('REMOVED');
        done();
      });
  });
});
