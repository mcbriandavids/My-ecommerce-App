import express from 'express';
const router = express.Router();
import { protect, admin } from '../middleWares/authMiddleWare.js';
import {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
	createProductReview,
	getTopProducts
} from '../controllers/productController.js';

/* Fetch All Products*/
router.route('/').get(getProducts).post(protect, admin, createProduct);

router.route('/:id/reviews').post(protect, createProductReview);
router.get('/top', getTopProducts);
/* Fetch A Single Product and Delete A product*/
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct);

export default router;
