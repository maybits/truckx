/ truckx /


STACK: mysql, express, node
Reason:
It's a light, scalable, and cross-platform way to execute code. It uses an event-driven I/O model which makes it extremely efficient and makes scalable network application possible. This service tends to be more I/O intensive which makes it a good usecase to be written in Nodejs.

////////////////////DB commands for setup//////////////////////////

1.Install mysql and run the following queries from the mysql command line:

create user user2@localhost identified with mysql_native_password by 'truckx';
GRANT ALL PRIVILEGES ON * . * TO user1@localhost;


2.Run these commands for creating tables;

create database truckx;
use truckx;

CREATE TABLE `dashcam` (
  `imei` int(11) NOT NULL,
  `is_active` tinyint(1) DEFAULT '0',
  `vehicle_number` varchar(255) DEFAULT NULL,
  `last_logged_in` datetime NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`imei`),
  KEY `idx_last_logged_in` (`last_logged_in`),
  KEY `idx_vehicle_number` (`vehicle_number`),
  KEY `idx_created_at` (`created_at`),
  KEY `idx_updated_at` (`updated_at`));

  CREATE TABLE `location` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `imei_id` int(11) NOT NULL,
  `datetime` datetime DEFAULT NULL,
  `lat` float DEFAULT NULL,
  `lng` float DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_datetime` (`datetime`),
  KEY `idx_imei` (`imei_id`),
  KEY `idx_created_at` (`created_at`),
  KEY `idx_updated_at` (`updated_at`),
  CONSTRAINT `idx_fk_location_imei` FOREIGN KEY (`imei_id`) REFERENCES `dashcam` (`imei`));

  CREATE TABLE `alarm` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `imei_id` int(11) NOT NULL,
  `type` ENUM('VIBRATION', 'OVERSPEED', 'CRASH', 'HARD_ACCELERATION', 'HARD_BRAKE','SHARP_TURN'),
  `trigger_datetime` datetime DEFAULT NULL,
  `lat` float DEFAULT NULL,
  `lng` float DEFAULT NULL,
  `filelist` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_trigger_datetime` (`trigger_datetime`),
  KEY `idx_imei` (`imei_id`),
  KEY `idx_created_at` (`created_at`),
  KEY `idx_updated_at` (`updated_at`),
  CONSTRAINT `idx_fk_alarm_imei` FOREIGN KEY (`imei_id`) REFERENCES `dashcam` (`imei`));

Insert into dashcam(imei, is_active, vehicle_number) values(123321, 0, 'KA-MP-0876');

////////////////////////////////////////////////////////////////////////////////


//////////////////////////CURL-REQUESTS (DASHCAM APIS)///////////////////////
1.Login

curl -X POST \
  http://localhost:7342/v1/dashcam/details \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 44ff311c-37a9-3fe4-b47a-6d3a0f9427a4' \
  -d '{
	"type": "LOGIN",
	"imei": 123321
}'

2.Alarm

curl -X POST \
  http://localhost:7342/v1/dashcam/details \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 0cafb9e2-32b2-4e5f-86e9-d7819cc4a214' \
  -d '{
"imei": 123321,
"type": "ALARM",
"alarm_type": "CRASH",
"alarm_time": "2020-08-18 16:45:35",
"latitude": 32.378903,
"longitude": -122.457324,
"file_list": ["a.mp4", "b.mp4"]
}'

3.Location

curl -X POST \
  http://localhost:7342/v1/dashcam/details \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 976a2a38-01ce-f5c3-0154-fc79ad6a9d72' \
  -d '{
"type": "LOCATION",
"imei": 123321,
"location_time": "2020-08-18 16:45:35",
"latitude": 32.378903,
"longitude": -122.457324
}'


//////////////////////////CURL-REQUESTS (ADMIN APIS)///////////////////////

1. To fetch alarm_details with or without filters
curl -X GET \
  'http://localhost:7342/v1/admin/fetch_alarm?imei=123321&start_time=2020-08-14%2011%3A15%3A35&end_time=2020-08-19%2011%3A15%3A35' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: bbedcb58-54fc-e18c-ea6b-1fe00e64e779'

