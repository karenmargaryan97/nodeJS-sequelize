const chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../src/app');

const should = chai.should();
chai.use(chaiHttp);

describe('Admin Controller', () => {
    let id;

    it('Should signup admin', (done) => {
        chai.request(server)
            .post('/admin/signup')
            .send({ fullName: 'Super Admin', email: 'admin@gmail.com', password: 'Admin2018' })
            .end((err, result) => {
                if (err) {
                    done(err);
                }

                result.should.have.status(201);
                result.body.should.to.not.be.empty;

                id = result.body.contact[result.body.contact.length - 1].id;

                done();
            });
    });

    it('Should get all contacts', (done) => {
        chai.request(server)
            .get('/contacts')
            .end((err, res) => {
                if (err) {
                    done(err);
                }

                res.should.have.status(200);

                done();
            });
    });

    it('Should get contact by id', (done) => {
        chai.request(server)
            .get('/contacts/' + id)
            .end((err, res) => {
                if (err) {
                    done(err);
                }

                res.should.have.status(200);
                res.body.should.to.not.be.empty;

                done();
            });
    });

    it('Should edit existing contact', (done) => {
        chai.request(server)
            .put('/contacts/' + id)
            .send({ name: 'Stewie', phone: '55555' })
            .end((err, result) => {
                if (err) {
                    done(err);
                }

                result.should.have.status(200);
                result.body.should.to.not.be.empty;
                result.body.contact[result.body.contact.length - 1].phone.should.be.equal('55555');

                done();
            });
    });

    it('Should delete contact', (done) => {
        chai.request(server)
            .delete('/contacts/' + id)
            .end((err, res) => {
                if (err) {
                    done(err);
                }

                res.should.have.status(204);

                done();
            });
    });
});
