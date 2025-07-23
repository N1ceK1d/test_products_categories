const products_service = require('../services/products');

exports.get_products = async (req, res, next) => {
    try {
        const products = await products_service.get_products();
        res.json(products);
    } catch (err) {
        next(err);
    }
};

exports.create_product = async (req, res, next) => {
    try {
        const { name, price, categoryId } = req.body;
        const newProduct = await products_service.create_product(name, price, categoryId);
        res.status(201).json(newProduct);
    } catch (err) {
        next(err);
    }
};

exports.update_product = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, price, categoryId } = req.body;
        const updatedProduct = await products_service.update_product(id, name, price, categoryId);
        res.json(updatedProduct);
    } catch (err) {
        next(err);
    }
};

exports.remove_product = async (req, res, next) => {
    try {
        const { id } = req.params;
        await products_service.remove_product(id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};