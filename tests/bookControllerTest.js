
var should = require('should'),
    sinon = require('sinon');

describe('Book Controller Test: ', function () {
    describe('POST tests', function () {
        it('should not allow an empty title on post', function () {
            var Book = function (book) {
                this.save = function () {
                };
            };

            var request = {
                body: {
                    author: 'John'
                }
            };

            var response = {
                status: sinon.spy(),
                send:   sinon.spy()
            };

            var bookController = require('../controllers/book')(Book);
            bookController.post(request, response);
            response.status.calledWith(400).should.equal(true, 'Bad Status' + response.status.args[0][0]);
            response.send.calledWith('Title is required').should.equal(true);
        });
    });
});