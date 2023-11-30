# We fix it to 10.3.9 because of bug in Docker for windows: https://stackoverflow.com/questions/70784437/innodb-preallocating-147456-bytes-for-file-xxx-ibd-failed-with-error-2
FROM mariadb:10.3.9
COPY init-db.sql /docker-entrypoint-initdb.d/