/**
//  * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

    development: {
        client: 'mysql2',
        connection: {
            host: '127.0.0.1',
            port: 3306,
            database: 'chatapp',
            user: 'root',
            password: 'qtest123'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    production: {
        client: 'mysql2',
        connection: {
            host: '103.184.242.29',
            port: 3306,
            database: 'neoproduction',
            user: 'neodbadmin',
            password: 'Killer$123'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

};
