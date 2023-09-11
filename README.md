<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest



# BASES1_P1_202109567
# Alvaro Norberto García Meza
# Carné -> 202109567

## Start project

## Start docker image of mysql
```
# command to run the docker image of mysql
docker run --name mysql-server -p 3306:3306 -e MYSQL_ROOT_PASSWORD=admin -d mysql
# start the docker image of mysql
docker start mysql-server
```

## Give access
```
docker exec -it <CONTAINER_ID>  mysql -uroot -p
CREATE USER 'nilu'@'172.17.0.1' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'nilu'@'172.17.0.1' WITH GRANT OPTION;
flush privileges;
exit 
```

