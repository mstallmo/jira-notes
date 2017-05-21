let mongoose = require('mongoose');
let Ticket = require('../app/models/ticket');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server =  require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('/GET tickets', () => {
    it('it should GET all the tickets', (done) => {
        chai.request(server)
            .get('/tickets')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(3);
            done()
            });
    });
});