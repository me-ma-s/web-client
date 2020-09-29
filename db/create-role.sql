-- не сбрасываем роль, вдруг она уже настроена и даже лучше
-- DROP ROLE IF EXISTS postgres; 
CREATE ROLE postgres WITH SUPERUSER CREATEDB CREATEROLE LOGIN PASSWORD 'postgres';
