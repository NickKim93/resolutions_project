# resolutions_project
프로젝트를 설정하려면:
1) git clone https://github.com/NickKim93/resolutions_project.git
2) npm i
3) 루트에 .env 파일을 생성하고 다음 속성을 사용합니다:

// Setup for PostgreSQL: 
DB_USER=<your_user>
DB_PASSWORD=<your_password>
DB_HOST=localhost
DB_PORT=<your_port>
DB_DATABASE=<your_db_name>

// Setup for JWT (you can change the values if needed)
ACCESS_TOKEN_SECRET=4b508f8fb85d280b35311b3a89bf7dfbb76c64c9acfd94761fd9548cb189e6e3db545f3c4492921958847cf80e7631d7fa2bb3d24388694f454f5ae77b060951
REFRESH_TOKEN_SECRET=fbdaf420637e5a3b1423a8b1f1b04e9d160bb3adf0aa27d10c2645c80502d839b78a5e25927ad43690856fa8cc6f03cfda9bc73c42efceb1f950660d9e31351f

4) 루트에 uploads 폴더 생성합니다
5) npm migrate (create schemas)
6) npm seed (put data inside tables, if required)
7) npm start (프로젝트를 시작합니다)
