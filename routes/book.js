var express = require('express');

var routes = function (Book) {

    var bookRouter = express.Router();
    var bookController = require('../controllers/book')(Book);

    bookRouter.route('/books')
        .post(bookController.post)
        .get(bookController.get);

    bookRouter.use('/books/:bookId', function (request, response, next) {
        console.log(request.params);
        Book.findById(request.params.bookId, function (error, book) {
            if (error) {
                response.status(500).send(error);
            } else if (book) {
                request.book = book;
                next();
            }
            else {
                response.status(404).send('no book found');
            }
        });
    });

    bookRouter.route('/books/:bookId')
        .get(function (request, response) {
            console.log(request);

            var returnBook = request.book.toJSON();
            returnBook.links = {};
            var newLink = 'http://' + request.headers.host + '/api/books?genre=' + returnBook.genre;
            returnBook.links.FilterByThisGenre = newLink.replace(' ' , '%20');
            response.json(returnBook);
        })
        .put(function (request, response) {
            book.title = request.body.title;
            book.author = request.body.author;
            book.genre = request.body.genre;
            book.read = request.body.read;
            book.save(function (error) {
                if (error) {
                    response.status(500).send(error);
                } else {
                    response.json(request.book);
                }
            });
        })
        .patch(function (request, response) {
            if (request.body._id)
                delete  request.body._id;

            for (var p in request.body) {
                request.book[p] = request.body[p];
            }

            request.book.save(function (error) {
                if (error) {
                    response.status(500).send(error);
                } else {
                    response.json(request.book);
                }
            });
        })
        .delete(function (request, response) {
            request.book.remove(function (error) {
                if (error) {
                    response.status(500).send(error);
                } else {
                    response.status(204).send('Removed');
                }
            });
        });

    return bookRouter;
};

module.exports = routes;