#!/usr/bin/env bash
sudo apt install postgresql-9.6
sudo pg_createcluster 9.6 postsneeze
sudo -u postgres psql --cluster 9.6/postsneeze -c "CREATE DATABASE ps_auth;"
sudo -u postgres psql --cluster 9.6/postsneeze --dbname=ps_auth -c "
    CREATE USER ps_auth WITH INHERIT LOGIN PASSWORD 'ps_auth';
    CREATE TABLE profile (
        profile_id SERIAL,
        email TEXT NOT NULL UNIQUE,
        nickname TEXT DEFAULT '' NOT NULL,
	    PRIMARY KEY(profile_id)
    );
    ALTER TABLE profile OWNER TO ps_auth;
"
