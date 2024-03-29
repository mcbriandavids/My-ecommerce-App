import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

const addOrderedItems = asyncHandler(async (req, res) => {
	const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

	if (orderItems && orderItems.length === 0) {
		re.status(400);
		throw new Error('No ordered Items');
		return;
	} else {
		const order = new Order({
			user: req.user._id,
			orderItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice
		});
		const createdOrder = await order.save();
		res.status(201).json(createdOrder);
	}
});

const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate('user', 'name email');
	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error('Order Not Found');
	}
});

/*
@desc Update order to paid
@route GET /api/orders/:id/pay
@access Private
*/
const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);
	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email: req.body.payer.email_address
		};
		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error('Order Not Found');
	}
});

/*
@desc Update order to delivered
@route GET /api/orders/:id/deliver
@access Private/Admin
*/
const updateOrderToDelivered = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);
	if (order) {
		order.isDelivered = true;
		order.deliveredAt = Date.now();

		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error('Order Not Found');
	}
});
/*
@desc Get Logged in user orders
@route GET /api/orders/myorders
@access Private
*/
const getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id });
	res.json(orders);
});

/*
@desc Get all orders
@route GET /api/orders
@access Private/Admin
*/
const getOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({}).populate('user', 'id name');
	res.json(orders);
});
export { addOrderedItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered };
