var express = require('express');

var routes = function (Book) {

    var bookRouter = express.Router();

    bookRouter.route('/books')
        .post(function (request, response) {
            var book = new Book(request.body);

            console.log(book);
            book.save();
            response.status(201).send(book);

        })
        .get(function (request, response) {
            var query = {};

            if (request.query.genre) {
                query.genre = request.query.genre;
            }

            Book.find(query, function (error, books) {
                if (error) {
                    response.status(500).send(err);
                } else {
                    response.json(books);
                }
            });
        });

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
            response.json(request.book);

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