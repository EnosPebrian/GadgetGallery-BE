const { ResponseError } = require('../../errors');
const { sequelize, Product } = require('../../models');
const getProductByProductId = require('./getProductByProductId');

async function addProduct(values, transaction) {
  const { name, description, price, weight, discount } = values;
  const [product, isCreated] = await Product.findOrCreate({
    where: { name },
    defaults: { name, description, price, weight, discount },
    transaction,
  });
  if (!isCreated) throw new ResponseError('product name already exist', 400);
  return product;
}

async function addProductCategories(product, values, transaction) {
  const { categoryIds } = values;
  await product.setCategories(categoryIds, { transaction });
}

async function addProductImages(product, values, transaction) {
  await Promise.all(
    values.images.map((image) =>
      product.createProductImage({ image }, { transaction })
    )
  );
}

async function createProduct(req) {
  const product = await sequelize.transaction(async (t) => {
    const data = await addProduct(req.body, t);
    if (req.body.categoryIds) await addProductCategories(data, req.body, t);
    await addProductImages(data, req.body, t);
    const result = await getProductByProductId(data.getDataValue('id'), t);
    return result;
  });
  return product;
}

module.exports = createProduct;