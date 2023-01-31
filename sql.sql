use skateclubspring;

ALTER USER 'root'@'localhost' IDENTIFIED VIA mysql_native_password USING PASSWORD('root');

select * from user;

update user set status='true' where id=2;
