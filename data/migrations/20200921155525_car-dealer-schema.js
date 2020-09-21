exports.up = function(knex) {
    return knex.schema.createTable('cars', tbl => {
        tbl.increments('id');
        tbl.string('vin', 18).unique().notNullable();
        tbl.string('make',128).notNullable();
        tbl.string('model',128).notNullable();
        tbl.integer('mileage').notNullable();
        tbl.string('transmission-type',128);
        tbl.string('title-status');
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');
};
