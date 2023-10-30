const { ResponseError } = require('../../errors');
const {
  sequelize,
  Warehouse,
  WarehouseUser,
  WarehouseProduct,
} = require('../../models');

async function activateWarehouse(warehouse, warehouseId, transaction) {
  await warehouse.restore({ transaction });
  await WarehouseUser.restore({ where: { warehouseId }, transaction });
  await WarehouseProduct.restore({ where: { warehouseId }, transaction });
}

async function deactivateWarehouse(warehouse, warehouseId, transaction) {
  await warehouse.destroy({ transaction });
  await WarehouseUser.destroy({ where: { warehouseId }, transaction });
  await WarehouseProduct.destroy({ where: { warehouseId }, transaction });
}

async function updateWarehouseActivationByWarehouseId(req) {
  const wh = await sequelize.transaction(async (t) => {
    const { action } = req.query;
    const { warehouseId } = req.params;
    const warehouse = await Warehouse.findByPk(warehouseId, {
      paranoid: false,
      transaction: t,
    });
    if (!warehouse) throw new ResponseError('warehouse not found', 404);
    if (action === 'activate')
      await activateWarehouse(warehouse, warehouseId, t);
    else if (action === 'deactivate')
      await deactivateWarehouse(warehouse, warehouseId, t);
    else throw new ResponseError('invalid action', 400);
    return warehouse.toJSON();
  });
  return wh;
}

module.exports = updateWarehouseActivationByWarehouseId;