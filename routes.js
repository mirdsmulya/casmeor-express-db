'use strict';

module.exports = function(app) {
    var todoList = require('./controller');

    app.route('/account')
        .get(todoList.account);
    
    app.route('/saveAccount')
        .post(todoList.saveAccount);
    
    app.route('/deleteAccount')
        .delete(todoList.deleteAccount);
};