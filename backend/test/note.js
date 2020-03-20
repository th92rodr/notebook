process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaihttp = require('chai-http');

const app = require('../server');
const Note = require('../models/note');
const User = require('../models/user');

const should = chai.should();
chai.use(chaihttp);

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
      //console.log('new note ', data);
      //console.log('new note ID ', noteId);
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
      //console.log('new user ', data);
      //console.log('new user ID ', userId);
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
        //console.log('INDEX RES BODY -> ', res.body);
        //console.log('INDEX RES BODY NOTES -> ', res.body.notes.notes);
        res.should.have.status(200);
        res.should.be.json;
        res.body.notes.notes.should.be.a('array');
        res.body.notes.notes[0].should.have.property('_id');
        res.body.notes.notes[0].should.have.property('title');
        res.body.notes.notes[0].should.have.property('description');
        res.body.notes.notes[0].title.should.equal('Test Note Title');
        res.body.notes.notes[0].description.should.equal(
          'Test note description'
        );
        done();
      });
  });

  it('should show a single note on /note/index/<id> GET', (done) => {
    chai
      .request(app)
      .get(`/note/index/${noteId}`)
      .end((error, res) => {
        //console.log('SHOW RES BODY -> ', res.body);
        //console.log('SHOW RES BODY NOTE -> ', res.body.note.note);
        res.should.have.status(200);
        res.should.be.json;
        res.body.note.note.should.be.a('object');
        res.body.note.note.should.have.property('_id');
        res.body.note.note.should.have.property('title');
        res.body.note.note.should.have.property('description');
        res.body.note.note.title.should.equal('Test Note Title');
        res.body.note.note.description.should.equal('Test note description');
        done();
      });
  });

  it('should add a note on /note/add POST', (done) => {
    chai
      .request(app)
      .post('/note/add')
      .set('userId', userId)
      .send({
        title: 'Test Note Title 2',
        description: 'Test note description 2'
      })
      .end((error, res) => {
        //console.log('ADD RES BODY -> ', res.body);
        //console.log('ADD RES BODY NOTE -> ', res.body.note.createdNote);
        res.should.have.status(200);
        res.should.be.json;
        res.body.note.createdNote.should.be.a('object');
        res.body.note.createdNote.should.have.property('_id');
        res.body.note.createdNote.should.have.property('title');
        res.body.note.createdNote.should.have.property('description');
        res.body.note.createdNote.title.should.equal('Test Note Title 2');
        res.body.note.createdNote.description.should.equal(
          'Test note description 2'
        );
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
        //console.log('UPDATE RES BODY -> ', res.body);
        res.should.have.status(204);
        done();
      });
  });

  it('should delete a note on /note/delete/<id> DELETE', (done) => {
    chai
      .request(app)
      .delete(`/note/delete/${noteId}`)
      .end((error, res) => {
        //console.log('DELETE RES BODY -> ', res.body);
        res.should.have.status(204);
        done();
      });
  });
});
