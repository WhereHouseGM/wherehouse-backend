# wherehouse-backend

## Setup
```
npm install
```
## Run
```
chmod +x start.sh
./start.sh
```

3. 프로젝트 구조 설명

```
ops
 ㄴ mysql
   ㄴ Dockerfile
   ㄴ mysqld_charset.cnf
 ㄴ wherehouse-api
   ㄴ Dockerfile
 ㄴ .env
 ㄴ docker-compose.yaml
spec
 ㄴ wherehouse.v1.yaml
src
 ㄴ api
    ㄴ v1
       ㄴ ...
 ㄴ config
    ㄴ ...
 ㄴ dtos
    ㄴ ...
 ㄴ middlewares
    ㄴ ...
 ㄴ models
    ㄴ ...
 ㄴ services
    ㄴ ...
 ㄴ app.js
test
 ㄴ ...
```

* ops
    - 도커 설정 파일들을 모아둔 디렉토리입니다.
    
* spec
    - openapi 3.0 형식의 api 스펙 문서를 가지고 있는 디렉토리입니다.

* src
    - 서버 어플리케이션 코드들이 있는 디렉토리입니다. 
    
    * apis
       - api 컨트롤러를 버전 별로 나눈 디렉토리입니다.
     * config
       - 각종 설정들을 모아둔 디렉토리입니다.
     * dtos
       - dto들을 모아둔 디렉토리입니다. 컨트롤러에서 사용합니다.
     * middlewares
       - 인증, 로깅과 관련된 middleware를 모아둔 디렉토리입니다.
     * services
       - 비즈니스 로직을 분리한 서비스 파일들을 모아둔 디렉토리입니다.
* test
     - 테스트 파일들을 모아둔 디렉토리입니다.
