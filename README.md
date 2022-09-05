# 1 setup nodemailer email to send emails
# 2 create jwt keys
# 3 create database


### env structure
PROJECT_STATUS='development' # production <br>

PLATFORM_NAME=HarderGamers <br>
SECRET_KEY='' jwt<br>
REFRESH_KEY='' jwt<br>

SERVER_PORT=3000 <br>
MONGO_USER='' <br>
MONGO_PASSWORD='' <br>
MONGO_DATABASE='communitydb' <br>
MONGO_HOST='localhost' <br>
MONGO_PORT=27017 <br>

MAIL_PROVIDER='Mail.ru' <br>
MAIL='' <br>
MAIL_PASS='' <br>

WEBSITE_HOST='http://localhost:3000/' <br>

# NPMs

body-parser, cookie-parser, cors, crypto-js, dotenv, express, jsonwebtoken, mongodb, nodemailer, nodemon, ts-node, typescript, uuid <br>

### step 1:<br>
download mongodb.<br>

### step 2:<br>
create general admin user on mongodb "admin" database.<br>

### step 3:<br>
create 'use_database' => use 'use_database'.<br>

### step 4:<br>
create 'dbOwner' user on 'use_database'.<br>

### step 5:<br>
enable mongodb Auth from config file.<br>


### platform production setup<br>

set environment variables correctly, url included<br>
