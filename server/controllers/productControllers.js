const Product = require('./../models/Product')

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
    const productsNo = products.length

    return res.json({
      productsNo,
      products,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const getAvaialableProducts = async (req, res) => {
  try {
    const products = await Product.find({ availability: true })
    const productsNo = products.length

    return res.json({
      productsNo,
      products,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const getProductById = async (req, res) => {
  const id = req.params.id
  try {
    const product = await Product.findOne({ _id: id })
    if (product) {
      return res.json(product)
    } else {
      return res.status(404).json({ message: 'Product not found' })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const addProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    image,
    availability,
    brand,
    categoryId,
    label,
  } = req.body
  try {
    const product = await Product.create({
      name,
      description,
      price,
      image,
      availability,
      brand,
      categoryId,
      label,
    })
    res.status(200).json(product)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const updateProduct = async (req, res) => {
  const id = req.params.id
  const product = await Product.findOne({ _id: id })

  if (product) {
    let updatedProductFields = req.body
    Object.keys(updatedProductFields).forEach((key) => {
      if (
        updatedProductFields[key] === '' ||
        updatedProductFields[key] === undefined
      ) {
        updatedProductFields[key] = product[key]
      }
    })
    try {
      const updatedProduct = await Product.updateOne(
        { _id: id },
        updatedProductFields
      )
      res.status(200).json(updatedProduct)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Internal server error' })
    }
  } else {
    res.status(404).send({ message: 'Product not found' })
  }
}

const deleteProduct = async (req, res) => {
  const id = req.params.id
  const product = await Product.findOne({ _id: id })
  if (product) {
    try {
      await Product.deleteOne({ _id: id })
      res.status(204)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Internal server error' })
    }
  } else {
    res.status(404).send({ message: 'Product not found' })
  }
}

module.exports = {
  getAllProducts,
  getAvaialableProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
}
