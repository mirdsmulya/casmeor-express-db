'use strict';

module.exports = function(app) {
    var accountController = require('./controller/accountController');
    var orderController = require('./controller/orderController');

    app.route('/account')
        .get(accountController.account);
    
    app.route('/saveAccount')
        .post(accountController.saveAccount);
    
    app.route('/deleteAccount')
        .delete(accountController.deleteAccount);

    app.route('/orders') 
        .get(orderController.order);
    
    app.route('/saveOrder') 
        .post(orderController.saveOrder);  
    
    app.route('/getItemOrder')
        .get(orderController.getItemOrder);

    app.route('/updateOrder')
        .put(orderController.updateOrder);

};