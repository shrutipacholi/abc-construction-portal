-- Incremental migration for admin + file uploads (safe to re-run pieces manually)
USE abc_construction;

-- role column
SET @col := (
  SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = 'abc_construction' AND TABLE_NAME = 'users' AND COLUMN_NAME = 'role'
);
SET @sql := IF(@col = 0,
  'ALTER TABLE users ADD COLUMN role VARCHAR(20) NOT NULL DEFAULT ''client'' AFTER company',
  'SELECT 1');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- document file columns
SET @col := (
  SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = 'abc_construction' AND TABLE_NAME = 'documents' AND COLUMN_NAME = 'mime_type'
);
SET @sql := IF(@col = 0,
  'ALTER TABLE documents ADD COLUMN mime_type VARCHAR(120) NULL AFTER doc_type',
  'SELECT 1');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @col := (
  SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = 'abc_construction' AND TABLE_NAME = 'documents' AND COLUMN_NAME = 'file_path'
);
SET @sql := IF(@col = 0,
  'ALTER TABLE documents ADD COLUMN file_path VARCHAR(500) NULL AFTER mime_type',
  'SELECT 1');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @col := (
  SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = 'abc_construction' AND TABLE_NAME = 'documents' AND COLUMN_NAME = 'file_data'
);
SET @sql := IF(@col = 0,
  'ALTER TABLE documents ADD COLUMN file_data LONGBLOB NULL AFTER file_path',
  'SELECT 1');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;
