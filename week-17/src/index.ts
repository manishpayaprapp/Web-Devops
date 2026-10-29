import bcrypt from "bcryptjs";
import express from "express";
import { Client } from "pg";
import "dotenv/config";

const connectionString =
  process.env.DATABASE_URL?.trim() || process.env.DB_URL?.trim();

if (!connectionString) {
  throw new Error("Set DATABASE_URL or DB_URL in your .env file.");
}

const app = express();
app.use(express.json());

app.get("/users", async (_req, res) => {
  const client = new Client({ connectionString });

  try {
    await client.connect();
    const result = await client.query(
      `SELECT users.id, users.username, users.email,
              addresses.city, addresses.country,
              addresses.street, addresses.pincode
       FROM users
       LEFT JOIN addresses ON users.id = addresses.user_id
       ORDER BY users.id`
    );

    return res.json(result.rows);
  } catch (error) {
    console.error("Could not fetch users:", error);
    return res.status(500).json({ message: "Could not fetch users." });
  } finally {
    await client.end();
  }
});

app.post("/signup", async (req, res) => {
  const { username, email, password, city, country, street, pincode } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    !city ||
    !country ||
    !street ||
    !pincode
  ) {
    return res.status(400).json({ message: "All signup fields are required." });
  }

  const client = new Client({ connectionString });
  let transactionStarted = false;

  try {
    await client.connect();
    await client.query("BEGIN");
    transactionStarted = true;

    const passwordHash = await bcrypt.hash(password, 10);
    const userResult = await client.query(
      `INSERT INTO users (username, email, password)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [username, email, passwordHash]
    );

    await client.query(
      `INSERT INTO addresses (user_id, city, country, street, pincode)
       VALUES ($1, $2, $3, $4, $5)`,
      [userResult.rows[0].id, city, country, street, pincode]
    );

    await client.query("COMMIT");
    transactionStarted = false;
    return res.status(201).json({ message: "Signup successful." });
  } catch (error) {
    if (transactionStarted) {
      await client.query("ROLLBACK");
    }

    console.error("Signup failed:", error);
    return res.status(500).json({ message: "Signup failed." });
  } finally {
    await client.end();
  }
});

app.listen(Number(process.env.PORT ?? 3000), () => {
  console.log(`Server running on port ${process.env.PORT ?? 3000}`);
});
