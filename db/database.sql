CREATE DATABASE IF NOT EXIST kicksmart;
USE kicksmart;
create table users(
id INT NOT NULL auto_increment PRIMARY KEY,
email varchar(100) NOT NULL,
name VARCHAR(20) NOT NULL,
password varchar(30) NOT NULL
);
show tables;
describe users;
