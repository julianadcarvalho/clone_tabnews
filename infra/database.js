import { Client } from 'pg'

async function query(querObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD
  });
  await client.connect()
  const result = await client.query(querObject)
  await client.end()
  return result;
}

export default {
  query: query,
};