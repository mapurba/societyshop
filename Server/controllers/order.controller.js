const Orders = require("../models/Orders");
const Products = require("../models/Items");
const productController = require("./product.controller");

/* Helper Methods */
calculateBill = (items, quantityMap) => {
  console.log("calculating bill....");
  let bill = {};
  try {
    const totalAmount = items.reduce((acc, item2) => {
      return acc + item2.price.new * 1;
    }, 0);

    const totalAmountAfterDiscount = items.reduce(
      (acc, item2) =>
        acc +
        item2.price.new *
          quantityMap[item2.itemCode] *
          (1 - item2.discountPercentage / 100),
      0
    );

    bill = {
      totalAmount: totalAmount,
      totalAmountAfterDiscount: totalAmountAfterDiscount || 0,
      totalDiscount: totalAmount - totalAmountAfterDiscount || 0,
    };
    console.log({ bill });

    return bill;
  } catch (e) {
    console.log(e);
  }
  return bill;
};

exports.getAllOrders = async (req, res) => {
  const ruser = await req.user;

  // if (ruser["isMer"] == true) {
  Orders.find({ })
    .sort({ createdAt: -1 })
    .then((result) => {
      res.status(200).send({ data: result });
    })
    .catch((err) => {
      res.status(489);
    });
  // } else {
  //   console.log(ruser["isMer"]);
  //   res.send(ruser).status(469);
  // }
};

exports.createOrder = async (req, res) => {
  const body = req.body;
  const user = req.user;
  const mer = "5fe4ae3de6f7e817e02a536f"; //only one merchent in system
  if (body) {
    const items = body.items.filter((item) => item.itemCode != null);
    const quantityMap = {};
    items.forEach((item) => {
      quantityMap[item.itemCode] = item.quantity;
    });
    const itemIds = items.map((item) => item.itemCode);
    const OrderIds = items.map((item) => {
      return { itemCode: item.itemCode, quantity: item.quantity, price: item.price ,image:item.image,name:item.name,discp:'',brand:item.brand };
    });
    const dbItems = await productController._getProductsByIds(itemIds);
    const totalBill = calculateBill(dbItems, quantityMap);
    const newOrder = new Orders({
      orderItems: OrderIds,
      ...totalBill,
      user,
      mer: mer,
    });
    let respos = await newOrder.save();
    res.send({ respos }).status(201);
  }
};
