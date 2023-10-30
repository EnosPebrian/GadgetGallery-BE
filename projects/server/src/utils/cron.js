const { Op } = require('sequelize');
const cron = require('node-cron');
const db = require('../models');

const optionCronDeleteUnpaid = {
  attributes: [
    'status',
    'id',
    [
      db.sequelize.fn(
        'timediff',
        db.sequelize.fn('NOW'),
        db.sequelize.col('createdAt')
      ),
      'timediff',
    ],
  ],
  where: {
    [Op.and]: [
      db.sequelize.where(
        db.sequelize.fn(
          'timediff',
          db.sequelize.fn('NOW'),
          db.sequelize.col('createdAt')
        ),
        {
          [Op.gte]: '24:00:00',
        }
      ),
      { status: 'unpaid' },
    ],
  },
  logging: false,
};

const cronDeleteUnpaid = () =>
  cron.schedule(`2 * * * *`, async () => {
    const result = await db.Order.findAll(optionCronDeleteUnpaid);
    const id = [];
    result.forEach((order) => id.push(order.dataValues.id));
    await db.Order.update(
      { status: 'cancelled' },
      { where: { id: { [Op.in]: id } } }
    );
  });

module.exports = cronDeleteUnpaid;