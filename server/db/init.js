import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const host = process.env.MYSQL_HOST || '127.0.0.1';
const port = Number(process.env.MYSQL_PORT || 3306);
const user = process.env.MYSQL_USER || 'root';
const password = process.env.MYSQL_PASSWORD ?? '';
const database = process.env.MYSQL_DATABASE || 'abc_construction';

async function main() {
  console.log(`Connecting to MySQL at ${host}:${port} as ${user}...`);
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
    multipleStatements: true,
  });

  try {
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    const seed = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');
    await connection.query(schema);
    console.log('Schema applied.');
    await connection.query(seed);
    console.log('Seed data loaded.');

    const [counts] = await connection.query(`
      SELECT 'users' AS table_name, COUNT(*) AS rows_count FROM \`${database}\`.users
      UNION ALL SELECT 'quote_requests', COUNT(*) FROM \`${database}\`.quote_requests
      UNION ALL SELECT 'projects', COUNT(*) FROM \`${database}\`.projects
      UNION ALL SELECT 'milestones', COUNT(*) FROM \`${database}\`.milestones
      UNION ALL SELECT 'payments', COUNT(*) FROM \`${database}\`.payments
      UNION ALL SELECT 'documents', COUNT(*) FROM \`${database}\`.documents
      UNION ALL SELECT 'messages', COUNT(*) FROM \`${database}\`.messages
      UNION ALL SELECT 'notifications', COUNT(*) FROM \`${database}\`.notifications
    `);
    console.table(counts);
    console.log('MySQL database ready:', database);
  } finally {
    await connection.end();
  }
}

main().catch((err) => {
  console.error('\nMySQL init failed:', err.message);
  console.error('\nAdd your MySQL password to .env as MYSQL_PASSWORD=..., then run:');
  console.error('  npm run db:init\n');
  process.exit(1);
});
