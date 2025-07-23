##### 스프린트 미션2 ( - 2025.07.27)
## 요구사항
---
### 기본
##### 클래스 구현하기
> - [x] Product 클래스 구현
> - [x] ElectronicProduct 클래스 구현
> - [x] Article 클래스 구현
> - [x] class 키워드 이용
> - [x] 각 클래스 마다 constructor 작성
> - [x] 추상화/캡슐화/상속/다형성 고려
##### Article 요청 함수 구현하기
> - [x] getArticleList() 함수 구현
> - [x] getArticle() 함수 구현
> - [x] createArticle() 함수 구현
> - [x] patchArticle() 구현
> - [x] deleteArticle() 구현
> - [x] fetch 또는 axios 이용
> - [x] .then() 비동기 처리
> - [x] .catch() 오류 처리
##### Product 요청 함수 구현
> - [x] getProductList() 함수 구현
> - [x] getProduct() 함수 구현
> - [x] createProduct() 함수 구현
> - [x] patchProduct() 함수 구현
> - [x] deleteProduct() 함수 구현
> - [x] async/await 비동기 처리
> - [x] try/catch 오류 처리
> - [x] getProductList() 상품 리스트 인스턴스로 products 배열에 저장
##### 기타
> - [x] main.js 파일 구현
> - [x] export 활용해서 파일 분리
> - [x] 각 함수 실행 코드 작성, 동작 확인
##### git 사용하기
> - [x] README.md 파일 작성
---
### 심화
> - [x] Article 클래스에 createdAt 프로퍼티 구현
---
## 주요 변경 사항
> - get, set을 이용한 캡슐화
> - .env 파일을 이용해서 환경변수 설정
>   - 'node --env-file=.env src/main.js'로 실행
>   - .env.example 파일로 .env 예시 파일 생성
> - index.js 파일을 이용한 파일 캡슐화
> - 기능별 폴더 구분
> - 공통 URL을 BASE_URL 상수로 관리
>   - 각 서비스에서 ARTICLE_URL, PRODUCT_URL로 상수화
---
## 멘토님에게 남길 메시지