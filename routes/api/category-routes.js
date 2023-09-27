const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//GET
router.get('/', async (req, res) => {
  try {

    const categoryData = await Category.findAll({
      include: [
        { model: Product }
      ]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {

    const categoryDataID = await Category.findByPk(req.params.id, { include: [{ model: Product }] });
    if (!categoryDataID) {
      res.status(404).json({ message: 'Category with the given ID doesnt exist!' });
    } else {
      res.status(200).json(categoryDataID);
    }
  } catch (err) {
    res.status(500).json(err);
  }

});

//POST
router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value

  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then((category) => {
    res.status(200).json(category);
  }
  ).catch((err) =>
    res.status(500).json(err));
});

//DELETE
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'Category with given ID doesnt exist ' });
    } else {
      res.status(200).json(categoryData);
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;