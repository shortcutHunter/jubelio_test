'use strict';

const dotenv = require('dotenv');
dotenv.config();

const { Pool, Client } = require('pg');
const pg = require('pg');

// create a pool
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

const query_migration = `
	CREATE TABLE "product" (
	  "id" SERIAL PRIMARY KEY,
	  "name" varchar,
	  "sku" varchar UNIQUE,
	  "image" text,
	  "price" float,
	  "description" text
	);

`;

pool.query(query_migration, (err, res) => {
  pool.end()
})