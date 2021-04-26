#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "postgres" <<-EOSQL
    CREATE USER services;
    CREATE DATABASE blind;
    GRANT ALL PRIVILEGES ON DATABASE blind TO services;
    ALTER USER services WITH PASSWORD 'password';
EOSQL
