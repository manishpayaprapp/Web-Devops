import 'dotenv/config';
import { Client } from 'pg';

async function insertData(
  username: string,
  email: string,
  password: string
): Promise<void> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set. Add it to the .env file.');
  }

  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();

    const insertQuery = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, username, email;
    `;

    const values = [username, email, password];

    const res = await client.query(insertQuery, values);

    console.log('Insertion successful:', res.rows[0]);
  } finally {
    await client.end();
  }
}

insertData(
  'username5',
  'user5@example.com',
  'user_password'
).catch((err: unknown) => {
  console.error('Error during insertion:', err);
  process.exitCode = 1;
});
