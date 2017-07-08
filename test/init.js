/**
 * Created by nikolai on 7/7/17.
 *
 */

var pool = require('./db');


pool.connect((err, client, done) => {
    if (err) {
        return console.error('error fetching client from pool', err);
    }
    client.query('CREATE TABLE IF NOT EXISTS items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)',
        function (err, result) {
            done(err);

            if (err) {
                return console.error('error running query', err);
            }
            console.log(result);

            pool.connect((err, client, done) => {
                if (err) {
                    return console.error('error fetching client from pool', err);
                }

                // SQL Query > Insert Data
                client.query('INSERT INTO items(text, complete) values($1, $2)', ['test', true]);
                const query = client.query('SELECT * FROM items');
                query.on('row', (row, result) => {
                    result.addRow(row);
                });
                query.on('end', (result) => {
                    console.log("results:" + JSON.stringify(result.rows, null, " "));
                    client.end();
                });
            })
        });
});



