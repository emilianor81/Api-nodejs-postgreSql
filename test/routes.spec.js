let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3001';


describe('get a articles: ',() =>{
  it('Should get a articles paginated', (done) => {
   chai.request(url)
   .get('/articles')
   .end((err,res) => {
    expect(res).to.have.status(200);
    done();
  });
  });
});

describe('get a articles: ',() =>{
    it('Should get a error', (done) => {
     chai.request(url)
     .get('/articlesTT')
     .end((err,res) => {
      expect(res).to.have.status(404);
      done();
    });
    });
 });

