const categories_service = require("../services/categories");

exports.get_categories = async (req, res, next) => {
  try {
    const categories = await categories_service.get_categories();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

exports.create_category = async (req, res, next) => {
  try {
    const { name, level, parentId } = req.body;
    const newCategory = await categories_service.create_category(name, level, parentId);
    res.status(201).json(newCategory);
  } catch (err) {
    next(err);
  }
};

exports.update_category = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCategory = await categories_service.update_category(id, name);
    res.json(updatedCategory);
  } catch (err) {
    next(err);
  }
};

exports.remove_category = async (req, res, next) => {
  try {
    const { id } = req.params;
    await categories_service.remove_category(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};