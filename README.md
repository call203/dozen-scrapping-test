


# 더즌 스크핑 상품 개발 과제


## 🌱 개발 환경
- node.js v20.18.0



## 🛠 설치 및 실행
### Environment Variables
이 프로젝트를 실행하기위해선, 다음 환경 변수를 .env.local 파일에 추가해야합니다.
```
//.env.local
NEXT_PUBLIC_API_ENDPOINT= API 엔드포인트
```


### 의존성 패키지 설치
```
npm install
```
### 개발 환경 실행
```
npm run dev
```
### 프로젝트 실행 후
기본 http://localhost:3000/ 로그인 페이지 부터 접속


<br/>

## ❓ 구성 및 선정 이유 
- **Next.js v15.1.0** :  이 프로젝트가 커지게되면 서버 사이드 렌더링 (SSR) 추가 등 개발 확장을 고려하고 직관적인 라우팅 시스템과 페이지 관리 기능을 제공하여 선택하게 되었습니다.

- **Zustand**: 요즘 가장 인기있는 상태관리 라이브러리로 깨끗한 코드를 제공하고 코드가 더 짧고 가독성이 높아서 도입하게 되었습니다.

- **@tankstack/react-query**: 복잡하고 정황한 코드가 필요한 다른 데이터 불러오기 방식과 달리 React Component 내부에서 간단하고 직관적으로 API가 사용가능하여 도입하게 되었습니다.

- **Shadcn** : 2일 내 완성된 UI 디자인을 목표로, 세션된 디자인과 더불어 사용자 인터페이스를 빠르고 효율적으로 만들 수 있는 Shadcn를 사용하였습니다. 이 컴포넌트 컬렉션는 정기적인 업데이트와 최신 웹 표준에 맞춰 안전한 도구로 도입하게 되었습니다.

- **TailwindCSS** :  Shadcn의 스타일링이 TailwindCSS를 도입하기도 하였고 클래스 기반으로 빠르고 직관적인 스타일링을 제공하여 도입하게되었습니다.

Emotion과 styled-component를 활용하여 CSS를 다룬 경험은 많지만 UI 디자인이 없는 상황으로 그의 대한 고민을 줄이고 Shadcn과 TailwindCSS를 활용하여 주어진 2일이라는 짧은 시간 안에 빠르고 완성도 있는 프로젝트를 완성하는 데 주력했습니다.



<br/>

## ⭐ 구현 내용

### 로그인 페이지 
- [x] react-hook-from을 이용하여 폼 상태 관리 및 유효성 검사를 간편하게 구현했습니다. 이를 통해 입력 필드의 값과 에러 메시지를 관리하였습니다.
- [x] 회원 정보 오류 및 서버 오류가 나타나면 form 하단에 표시됩니다.
- [x] 로그인이 성공한다면 서버에서 받은 token을 로컬스토리지에 `accessToken` 키의 값으로 저장하고 헤더에 토큰을 셋팅합니다. (authAPI.tsx)
- [x] API 호출과 응답 마다 interceptor를 활용하여 토큰의 만료 시간 체크 후 만료되었다면 로컬 스토리지에서 데이터 삭제후 로그인 페이지로 넘어가게 합니다. (authAPI.tsx)


### API 목록 조회 페이지 + 스크래핑 데이터 응답 팝업 
- [x] 로그인에 성공하면 바로 보여지는 페이지로 접근시 API 목록 api가 호출됩니다.
- [x] API 목록 호출시 로딩 (LoadingSpinner.tsx)과 오류(만약 일어날시) 페이지에 표시됩니다.
- [x] 리스트는 페이지당 10개씩 보여지며 페이지가 길어지면 버튼이 5개씩만 보이고 나머지는 ...으로 처리하여 깔끔한 UI를 구성하였습니니다. (ScrapTablePagination.tsx)
- [x] 호출하기 버튼을 누를시 일어나는 비즈니스 로직은 다른 컴포넌트에서도 사용됨으로 `useScrapData` 커스텀 훅으로 만들어서 분리하였습니다.
- [x] 호출하기 버튼을 누르면   `useScrapData` 커스텀 훅 안에 비즈니스 로직이 동작합니다. 먼저 scrapdata api를 호출하고 만약 성공하면 호출 시간과 함께 전역상태에 저장합니다. 마지막으로 호출 데이터가 포함된 팝업이 열립니다.

*호출된 API 목록을 조회하기위한 데이터를 저장시 로컬 스토리지에 저장하여 불러올 수도 있지만   데이터가 로컬스토리지에 저장되면 보안상의 용량제한, 데이터 무결성, 보안 등의 문제가 일어날 수 있음을 생각했고 또 프론트엔드의 상태 관리 능력을 보여주기위해, 데이터 로컬 스토리지 대신 전역 상태로 관리하였습니다.

### API 호출 조회 목록 + 스크래핑 데이터 응답 팝업
- [x] 호출 목록 리스트는 (authapi.tsx)에 저장되어있습니다.
- [x] 호출 목록 리스트는 처음에 최신순 정렬되어 보여줍니다.
- [x] 사용자가 북마크 표시할시 해당 데이터의 상태값 `bookmark`는 true 로 바뀝니다.
- [x] Select 박스에서 사용자는 최신 순과 오래된 순으로 언제든지 정렬할 수 있습니다.
- [x] 정렬할 때 마다 북마크는 호출시간에 상관없이 맨 위로 표시됩니다.
- [x] 각 카드는 호출하기 버튼이 있고 API 목록 페이지와 같이 useScrapData 커스텀 훅을 사용하여 api 호출및 팝업을 띄워줍니다.






