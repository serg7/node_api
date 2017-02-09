
var controller = function(Book) {
    var post = function (request, response) {
        var book = new Book(request.body);

        if (!request.body.title) {
            response.status(400);
            response.send('Title is required');
        }
        else {
            book.save();
            response.status(201);
            response.send(book);
        }

        console.log(book);
        book.save();
        response.status(201);
        response.send(book);
    };

    var get = function (request, response) {
        var query = {};

        if (request.query.genre) {
            query.genre = request.query.genre;
        }

        Book.find(query, function (error, books) {
            if (error) {
                response.status(500).send(error);
            }
            else {

                var returnBooks = [];
                books.forEach(function (elem, index, array) {
                    var newBook = elem.toJSON();
                    newBook.links = {};
                    newBook.links.self = 'http://' + request.headers.host + '/api/books/' + newBook._id;

                    returnBooks.push(newBook);
                });
                
                response.json(returnBooks);
            }
        });
    };

    return {
        post: post,
        get: get
    }
};

module.exports = controller;