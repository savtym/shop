const User = require('./models/User.js');
const Product = require('./models/Product.js').Product;
const Cart = require('./models/Cart.js');


module.exports = (app, db) => {
    User.permissions = User.permissions.bind({ app, db});
    User.signUpUser = User.signUpUser.bind({ app, db});
    User.signInUser = User.signInUser.bind({ app, db});

    Product.getProducts = Product.getProducts.bind({ app, db});

    Cart.addProduct = Cart.addProduct.bind({ app, db});
    Cart.showProcuts = Cart.showProcuts.bind({ app, db});
    Cart.removeProduct = Cart.removeProduct.bind({ app, db});
    Cart.clearProducts = Cart.clearProducts.bind({ app, db});

    app.post('/api/v1/signup', User.signUpUser);
    app.post('/api/v1/signin', User.signInUser);
    app.get('/api/v1/products', Product.getProducts);
    app.post('/api/v1/cart/', Cart.showProcuts);
    app.post('/api/v1/cart/add', Cart.addProduct);
    app.post('/api/v1/cart/remove', Cart.removeProduct);
    app.post('/api/v1/cart/clear', Cart.clearProducts);
};
