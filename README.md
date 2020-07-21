# wherehouse-backend

## Contribution

1. 환경설정

```
git clone https://github.com/WhereHouseGM/wherehouse-backend

npm install
```

2. 실행하기

* 테스트 건너뛰고 바로 실행하기
```
gulp
node server.js
```

* 테스트 돌리고 실행하기
```
npm run test
node server.js
```

* gulp 또는 npm run test를 실행했을 때 lint 에러가 발생했을땐 npm run format으로 autofix할 수 있습니다.

3. 프로젝트 구조 설명

```
src
  ㄴ app.ts
  ㄴ configs
  ㄴ errors
  ㄴ models
  ㄴ resources
    ㄴ v1
      ㄴ auth
      | ㄴ sign-up
      |   ㄴ controller
      |   ㄴ service.ts
      |   ㄴ 그 외에 더 필요한 것들
      ㄴ warehouse-types
        ㄴ controller.ts
        ㄴ service.ts
        ㄴ 그 외에 더 필요한 것들
```

* app.ts
    - express.Application을 설정하는 파일입니다. 
    - express.Application 인스턴스를 export 하므로 필요할 땐 import하여 사용할 수 있습니다

* configs
    - 설정 정보들을 모아둔 디렉토리입니다

* errors
    - 에러들을 모아둔 디렉토리입니다. 일단 지금은 기본적인 HTTP 에러부터 어플리케이션 에러까지 전부 여기에 보과합니다. 
      HTTP 에러: (BadRequestError: 400, NotFoundError: 404 etc)
      어플리케이션 에러: (UserNotFound: 404, UserAlreadyExist: 409 etc)

* models
    - 정의한 sequelize Model들을 보관하는 디렉토리입니다. 
    - 이 모델을은 entity임과 동시에 data access layer에 해당한다고 보시면 됩니다.

* resources
    - api 코드들이 있는 디렉토리입니다. 
    - api 버전을 나눌 수 있게 v1 디랙토리로 나눴습니다
    - v1 안에 필요한 리소스들을 디렉토리 별로 만들어서 개발하면 됩니다.
      (리소스: 사용자(Users), 창고 리뷰(warehouse reviews), warehouse types(창고 종류) ...)
    [API 스펙 문서 참고](https://stoplight.io/p/docs/gh/wherehousegm/wherehouse-api-spec/reference/wherehouse.v1.yaml/paths/~1v1~1warehouse-types/get?srn=gh/wherehousegm/wherehouse-api-spec/reference/wherehouse.v1.yaml/paths/~1v1~1warehouse-types/get&group=master)