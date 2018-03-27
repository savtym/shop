const User = require('./models/User.js');


module.exports = (app, db) => {
    User.signUpUser = User.signUpUser.bind({ app, db});
    User.signInUser = User.signInUser.bind({ app, db});

    app.post('/api/v1/signup', User.signUpUser);
    app.post('/api/v1/signin', User.signInUser);
    // app.post('/api/note/', Note.post.bind({ app, db }));
    // app.get('/api/note/:id', Note.get.bind({ app, db }));
    // app.put('/api/note/:id', Note.put.bind({ app, db }));
    // app.delete('/api/note/:id', Note.delete.bind({ app, db }));
};
