import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config(
    {
        "path": "../.env"
    }
);

const pool = new Pool({
  user: process.env.DEVELOPMENT_POSTDB_USER,
  host: process.env.DEVELOPMENT_POSTDB_HOST,
  database: process.env.DEVELOPMENT_POSTDB_DB_NAME,
  password: process.env.DEVELOPMENT_POSTDB_PASSWORD,
  port: process.env.DEVELOPMENT_POSTDB_PORT
});

async function testConnectionDb() {
    let client;

    try {
        const client = await pool.connect()
        const res = await client.query("SELECT NOW()")
        console.log(`time server is: ${res.rows[0].now}`);
        process.exit(0)
    } catch (error) {
        console.log(`error connect database ${error}`);
        process.exit(-1)
    } finally {
        if (client) client.release();
    }
}

testConnectionDb();