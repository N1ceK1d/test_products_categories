const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories');
const productsController = require('../controllers/products')

const app = express();

// Категории
router.get('/categories', categoriesController.get_categories);
router.post('/categories/', categoriesController.create_category);
router.put('/categories/:id', categoriesController.update_category);
router.delete('/categories/:id', categoriesController.remove_category);

// Продукты
router.get('/products/', productsController.get_products);
router.post('/products/', productsController.create_product);
router.put('/products/:id', productsController.update_product);
router.delete('/products/:id', productsController.remove_product);

module.exports = router;