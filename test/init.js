/**
 * Created by nikolai on 7/7/17.
 *
 */

var pool = require('./db');
var async = require('async');

async.series({
    one: function(releaseConn) {
        pool.connect((err, client, done) => {
            if (err) {
                return console.error('error fetching client from pool', err);
            }
            //use the client for executing the query
            client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)', function (err, result) {
                //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
                done(err);

                if (err) {
                    return console.error('error running query', err);
                }
                console.log(result);

                client.end();
            });
        });
        releaseConn(null, 1);
    },
    two: function(releaseConn) {
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
        });
        releaseConn(null, 2);
    }
}, function (err, results) {
    console.log('results:' + results);
});

// pool.connect( (err, client, done) => {
//     // Handle connection errors
//     if(err) {
//         return console.error('error fetching client from pool', err);
//     }
//
//     //use the client for executing the query
//     client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)', function(err, result) {
//         //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
//         done(err);
//
//         if(err) {
//             return console.error('error running query', err);
//         }
//         console.log(result);
//         //output: 1
//     });
//
//     // SQL Query > Insert Data
//     client.query('INSERT INTO items(text, complete) values($1, $2)', ['test', true]);
//     const query = client.query('SELECT * FROM items');
//     query.on('row', (row, result) => {
//         result.addRow(row);
//     });
//     query.on('end', (result) => {
//         console.log("results:" + JSON.stringify(result.rows, null, " "));
//         client.end();
//     });
// });

