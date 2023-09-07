# BASES1_P1_202109567
# Alvaro Norberto García Meza
# Carné -> 202109567

## Start project

## Start docker image of mysql
```shell
# command to run the docker image of mysql
docker run --name mysql-server -p 3306:3306 -e MYSQL_ROOT_PASSWORD=admin -d mysql
# start the docker image of mysql
docker start mysql-server
```