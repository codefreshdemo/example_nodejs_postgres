"use strict";

const pg = require('pg');
const connectionString = 'postgres://user:admin@postgres:5432/todo';

describe('postgres test', () => {
    var client;

    before(() => {
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