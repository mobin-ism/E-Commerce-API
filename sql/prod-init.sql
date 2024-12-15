-- Ensure the database is created if it doesn't exist
DO $do$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'e-commerce-api') THEN
        CREATE DATABASE "e-commerce-api";
    END IF;
END $do$;

-- Switch to the created database (optional)
\c "e-commerce-api";
