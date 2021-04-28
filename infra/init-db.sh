#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "postgres" <<-EOSQL
    CREATE USER services;
    GRANT postgres TO services;
    CREATE DATABASE blind WITH OWNER services;
    \c blind;
    grant all on all sequences in schema public to services;
    grant all on all tables in schema public to services;
    GRANT ALL PRIVILEGES ON DATABASE blind TO services;
    ALTER USER services WITH PASSWORD 'password';
EOSQL
