
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
                response.status(500).send(err);
            } else {
                response.json(books);
            }
        });
    };

    return {
        post: post,
        get: get
    }
};

module.exports = controller;