import { Client } from 'pg'

async function query(querObject) {
  const isProduction = process.env.NODE_ENV === 'production';

  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    ...(isProduction && {
      ssl: {
        rejectUnauthorized: false,
      },
    }),
  });

  await client.connect();

  try {
    const result = await client.query(querObject);
    return result;

  } catch (error) {
    console.error(error);
    throw error;

  } finally {
    await client.end();
  }
}

export default {
  query,
};