<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


# Proyecto 1 - Bases de Datos 1

# Estudiante: Alvaro Norberto García Meza
# Carné: 202109567

### [Manual Técnico](/docs/manual.md)

## Start project

## Start docker image of mysql
```
# command to run the docker image of mysql
$ docker run --name mysql-server -p 3306:3306 -e MYSQL_ROOT_PASSWORD=admin -d mysql
# start the docker image of mysql
$ docker start mysql-server
```

## Give access
```
$ docker exec -it <CONTAINER_ID>  mysql -uroot -p
mysql> CREATE USER 'nilu'@'172.17.0.1' IDENTIFIED BY 'password';
mysql> GRANT ALL PRIVILEGES ON *.* TO 'nilu'@'172.17.0.1' WITH GRANT OPTION;
mysql> flush privileges;
mysql> exit 
```

## Postman
```
https://api.postman.com/collections/20330284-3d109ff2-bda6-4536-9e30-9bac98b7a0dc?access_key=PMAT-01HAA8W7W5JXJD7FNNKA1XQZ7P
```