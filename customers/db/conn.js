const { Sequelize } = require("sequelize");
const { sleep } = require("../utils/utils");

const MAX_RETRIES = 5;

const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;
const port = process.env.MYSQL_PORT;

const conn = new Sequelize(database, username, password, {
  host: host,
  port: port,
  dialect: "mysql",
});

async function syncDatabase(force = false, retry = 0) {
  console.info("Waiting for the database to start...");

  try {
    console.info("Connecting to the database...");
    await conn.authenticate();

    console.info("Syncing the database...");
    await conn.sync({ force });
  } catch (error) {
    if (retry < MAX_RETRIES) {
      console.warn(`Attempt ${retry + 1} of ${MAX_RETRIES}`);
      await sleep(10);
      syncDatabase(false, retry + 1)
    } else {
      console.warn("Max retries reached.");
    }
  }
}

module.exports = { conn, syncDatabase };
