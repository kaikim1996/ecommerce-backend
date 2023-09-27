const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {

    const tagsData = await Tag.findAll({ include: [{ model: Product, through: ProductTag }] });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {

    const tagsData = await Tag.findByPk(req.params.id, {
      include: {
        model: Product, through: ProductTag
      }
    });
    if (!tagsData) {
      res.status(404).json({ message: "Could not find tag with that ID" })
    } else {
      res.status(200).json(tagsData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {

    const newTagsData = await Tag.create(req.body);
    res.status(200).json(newTagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then((tag) => {
    res.status(200).json(tag);
  }).catch((err) =>
    res.status(500).json(err));
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {

    const tagsData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;