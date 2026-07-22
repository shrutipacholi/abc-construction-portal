import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function main() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD ?? '',
    database: process.env.MYSQL_DATABASE || 'abc_construction',
    multipleStatements: true,
  });

  try {
    const migrate = fs.readFileSync(path.join(__dirname, 'migrate.sql'), 'utf8');
    await connection.query(migrate);

    const adminHash = bcrypt.hashSync('Admin@123', 8);
    await connection.query(
      `INSERT INTO users (id, name, email, phone, company, role, password_hash, created_at)
       VALUES ('u-admin-000', 'Site Admin', 'admin@abcconstruction.com', '9000000000', 'ABC Construction', 'admin', ?, NOW())
       ON DUPLICATE KEY UPDATE role = 'admin', password_hash = VALUES(password_hash), name = VALUES(name)`,
      [adminHash],
    );

    await connection.query(`UPDATE users SET role = 'client' WHERE role IS NULL OR role = ''`);
    console.log('Migration complete. Admin: admin@abcconstruction.com / Admin@123');
  } finally {
    await connection.end();
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
