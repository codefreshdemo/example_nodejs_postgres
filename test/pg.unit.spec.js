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

    after(()=>{
        client.end();
    });

    it('test connection', (done) => {
        client.connect(function(err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                throw new Error(err);
            }
            console.log('connected as id ' + client.threadId);
            done();
        });
    });

    it('create a table', () => {
        const query = client.query(
            'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
        query.on('end', () => { client.end(); });
    });

    it('select all items', () => {

    });
});