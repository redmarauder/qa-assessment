'use strict';

const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../app.js');

describe('API endpoint unit tests', function () {
    this.timeout(5000);

    const num1 = 10;
    const num2 = 20;

    it('should return welcome message', async function () {
        const res = await chai.request(app)
            .get('/');
        expect(res).to.have.status(200);
        expect(res.text).contains("Welcome to the Woebot QA Engineer REST API!");
    });

    it('should return route not found', async function () {
        const res = await chai.request(app)
            .get('/*');
        expect(res).to.have.status(404);
        expect(res.text).contains("Sorry. We couldn't find that route.");
    });

    it('should return param1 and param2 are equal', async function () {
        const res = await chai.request(app)
            .post('/comparison')
            .send({
                "param1": num1,
                "param2": num1
            });
        expect(res).to.have.status(200);
        expect(res.text).contains(`param1 (${num1}) is equal to param2 (${num1})`);
    });

    it('should return param1 is greater than param2', async function () {
        const res = await chai.request(app)
            .post('/comparison')
            .send({
                "param1": num2,
                "param2": num1
            });
        expect(res).to.have.status(200);
        expect(res.text).contains(`param1 (${num2}) is greater than param2 (${num1})`);
    });

    it('should return param1 is less than param2', async function () {
        const res = await chai.request(app)
            .post('/comparison')
            .send({
                "param1": num1,
                "param2": num2
            });
        expect(res).to.have.status(200);
        expect(res.text).contains(`param1 (${num1}) is less than param2 (${num2})`);
    });

    it('should return param1 is missing', async function () {
        const res = await chai.request(app)
            .post('/comparison')
            .send({
                "param2": num1
            });
        expect(res).to.have.status(400);
        expect(res.text).eqls("param1 is missing");
    });

    it('should return param2 is missing', async function () {
        const res = await chai.request(app)
            .post('/comparison')
            .send({
                "param1": num1
            });
        expect(res).to.have.status(400);
        expect(res.text).eqls("param2 is missing");
    });
});