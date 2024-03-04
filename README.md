# resolutions_project
프로젝트를 설정하려면:
1) git clone https://github.com/NickKim93/resolutions_project.git
2) npm i
3) 루트에 .env 파일을 생성하고 다음 속성을 사용합니다:

<!-- Setup for PostgreSQL:  -->
DB_USER=<your_user>
DB_PASSWORD=<your_password>
DB_HOST=localhost
DB_PORT=<your_port>
DB_DATABASE=<your_db_name>

<!-- Setup for JWT (you can change the values if needed) -->
<!-- you can generate token secrets by using following commands in node command line ( to enter node terminal:  type "node" in terminal and press Enter): 
require('crypto').randomBytes(64).toString('hex'); -->
ACCESS_TOKEN_SECRET=<your_access_token_secret>
REFRESH_TOKEN_SECRET=<your_refresh_token_secret>

4) 루트에 uploads 폴더 생성합니다
5) npm run migrate (create schemas)
6) npm run seed (put data inside tables, if required)
7) npm start (프로젝트를 시작합니다)
