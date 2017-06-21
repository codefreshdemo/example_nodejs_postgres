"use strict";

var pg = require('pg');

var connectionString = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@postgres:5432/${process.env.POSTGRES_DB}`;

describe('postgres test', () => {
    var client;

    before(() => {
        console.log("POSTGRES_USER="+process.env.POSTGRES_USER);
        console.log("POSTGRES_PASSWORD="+process.env.POSTGRES_PASSWORD);
        console.log("POSTGRES_DB="+process.env.POSTGRES_DB);
        client = new pg.Client(connectionString);
    });

    after(() => {
        client.end();
    });

    it('create a table', () => {
        client.connect();
        const query = client.query(
            'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
        query.on('end', () => {
            console.log();
            client.end();
        });
    });


    it('insert data', () => {
        pg.connect(connectionString, (err, client, done) => {
            // Handle connection errors
            if(err) {
                done();
                console.log(err);
                return;
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
    });
});