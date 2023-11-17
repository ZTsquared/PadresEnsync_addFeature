
-- Drop Tables


SET foreign_key_checks = 0;
-- DROP TABLE if exists users;
DROP TABLE if exists gastos;
SET foreign_key_checks = 1;


--  Create Tables


-- CREATE TABLE users(
--   id INT NOT NULL AUTO_INCREMENT, 
--   userName VARCHAR(20) not null, 
--   password VARCHAR(128) not null,
--   PRIMARY KEY (id)
--   );


CREATE TABLE gastos (
  id INT NOT NULL AUTO_INCREMENT,
  dateExpense DATE not null,
  description VARCHAR(400) not null,
  total  DECIMAL(8,2) not null,
  userId int(11) not null,
  -- the user id should really be a foreign key to the user table. 
  -- I can sort that out later but for now i don't want to break Vani's existing code
  -- FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  approved tinyint(1),
  PRIMARY KEY (id)
);

