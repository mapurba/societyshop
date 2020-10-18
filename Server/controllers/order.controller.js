const Orders = require('../models/Orders');
const Products = require('../models/Items');
const productController = require('./product.controller');

/* Helper Methods */
calculateBill = (items, quantityMap) => {
    console.log(items);
    const totalAmount = items.reduce((item1, item2) => ((item1.price * quantityMap[item1.itemCode]) + (item2.price * quantityMap[item2.itemCode])));
    const totalAmountAfterDiscount = items.reduce((item1, item2) =>
        ((item1.price * quantityMap[item1.itemCode]) * (1 - item1.discountPercentage / 100)) + ((item2.price * quantityMap[item2.itemCode]) * (1 - item2.discountPercentage / 100))
    );
    console.log(totalAmount, totalAmountAfterDiscount);
    return {
        totalAmount,
        totalAmountAfterDiscount,
        totalDiscount: (totalAmount - totalAmountAfterDiscount)
    };
}

exports.getAllOrders = (req, res) => {
    Orders.find({}).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(489);
    });
};

exports.createOrder = (req, res) => {
    const body = req.body;
    const items = body.items;
    const quantityMap = {};
    items.forEach((item) => {
        quantityMap[item.itemCode] = item.quantity;
    });
    const itemIds = items.map(item => item.itemCode);

    productController._getProductsByIds(itemIds).then((dbItems) => {
        const totalBill = calculateBill(dbItems, quantityMap);
        const newOrder = new Orders({
            orderItems: items,
            ...totalBill
        });
        console.log('New order: ', newOrder);
        newOrder.save((err, result) => {
            if (err) res.status(500).send(err);
            res.status(201).send(result)
        });
    }).catch(() => res.status(500));
};

