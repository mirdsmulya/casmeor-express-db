var response = require('../response')
var connection = require('../connection')

exports.order = function(req, res) {
    connection.query("SELECT * FROM `mysql-docker`.orders", (error, result) => {
        if (error) {console.log(error); } else {
            response.ok(result, res)
        }
    })
}

exports.saveOrder = function(req, res) {
    let orderInfo = req.body;
    let tempOrderItem = orderInfo.orderList;
    const orderItem = []
    delete orderInfo.orderList;
    tempOrderItem.forEach(element => {
        element["orderId"] = orderInfo.id;
        element = Object.values(element);
        orderItem.push(element)
    });
    orderInfo = [Object.values(orderInfo)];
    console.log(orderInfo);

    connection.query("INSERT INTO `mysql-docker`.orders (id, timeOrder, cashierIdentity, currentDate,  orderNumber,  tableNumber, name, paymentStatus, totalAmount) VALUES ?", [orderInfo] ,(error, result) => {
        if (!error) { 
            connection.query("INSERT INTO `mysql-docker`.orderList (image, name, description, price, quantity, itemId, orderId) VALUES ?", [orderItem] ,(error, result) => {
                if (!error) {
                    response.ok(result, res)
                } else {
                    connection.query("DELETE FROM `mysql-docker`.`orders` WHERE id = ?", req.body.id ,(error, result) => {
                        let a;
                    })
                    
                };
            });
        } else {console.log(error); }
    })
}

exports.getItemOrder = function(req, res) {
    connection.query("SELECT * FROM `mysql-docker`.orderList ", (error, result) =>  {
        // console.log(result);
        
        if (error) {console.log(error);} else {
            response.ok(result, res)
        }
    }) 
}

exports.updateOrder = function(req, res) {
    const order = req.body;
    console.log(order);
    connection.query("UPDATE `mysql-docker`.orders SET `name`=?, `tableNumber`=?, `totalAmount`=?, `paymentStatus`=? WHERE `id`= ?",[order.name, order.tableNumber, order.totalAmount, order.paymentStatus, order.id], (error, result) =>  {
        console.log(result);
        if (!error) {
            response.ok(result, res)
            console.log(result);


            
        }
    }) 
}

exports.deleteOrder = function(req, res) {    
    console.log("Body "+req.body);
    connection.query("DELETE FROM `mysql-docker`.orders WHERE id = ?",req.body, function (error, result){
        if(error) {console.log(error)} else{
            connection.query("DELETE FROM `mysql-docker`.orderList WHERE orderId = ?",req.body, function (error, result){
                if(error) {console.log(error)} else{
                    response.ok(result, res)
                }
            });
        }
    });
};