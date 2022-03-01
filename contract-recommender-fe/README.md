# 아파트 전기계약 추천 시스템 / Front-End

> **stack : electron, typescript, redux, socket.io-client, chakra-ui, recharts**

> **Front-End 목표**

1. Socket의 알림을 통한 실시간 View 변화주기
2. UI Library의 Design System 적극 활용하기 ( Dark Mode, Global Style, Color System )
3. Toss App Design 벤치마킹 ( 폰트 크기별 활용법, 색 활용, 간격, 그래프 컬러 등 등 )

# 1. Toss App Design 벤치마킹 & ChakraUI

> **Why? Toss?**

- 해당 프로젝트의 디자인 설계를 들어가기 전에 그래프가 많이 출력되는 형태가 나오겠구나 하고 생각을 했었다. 그리고 배경과 글씨의 색과 크기의 조합으로 사용자에게 추천 값이 눈에 잘 들어오게 만들어야 겠다고 생각을 했었다.
- Toss라는 App은 상당히 정보를 간결하고 직관성 있게 사용자에게 전달해주는 앱이라고 평상시에 생각을 했고, 주식 관련된 카테고리와 Light Mode, Dark Mode에 따른 변화도 있었기 때문에 해당 앱을 벤치마킹 대상으로 선정했다.

![Untitled](%E1%84%8B%E1%85%A1%E1%84%91%E1%85%A1%E1%84%90%E1%85%B3%20%E1%84%8C%E1%85%A5%E1%86%AB%20695db/Untitled.png)

> **Toss UI Features**

- Toss App을 벤치마킹 하면서 **매력을 느꼈던 점은 많은 색을 사용하지 않았다는 점** 이다.
  → Light Mode (약간의 회색의 배경, 컨텐츠의 내용이 들어가는 부분이 잘 보이도록 박스의 색은 하얀색, 중요한 글씨는 검은색, 부가적인 텍스트는 약간의 회색, 그 외의 컬러)
  → Dark Mode (검은색 배경, 컨텐츠의 내용이 들어가는 부분이 잘 보이도록 박스의 색은 어두운 회색, 중요한 글씨는 하얀색, 부가적인 텍스트는 약간의 회색, 그 외의 컬러)
- 폰트 크기 및 색 : 제목에서 **정보전달을 확실하게 하기 위하여 과감하게 폰트의 크기와 굵기를 키웠고**(앱의 경우에서), Light Mode에서는 제일 어두운 검은색, Dark Mode에서는 제일 밝은 하얀색에 가까운 색을 사용했다.
  → 그 외의 부가적인 텍스트들은 전체적인 View에서 사용자의 피로감을 덜기 위해 채도를 낮춘 색을 사용한 것 같고, 사용자의 눈이 자연스럽게 따라갈 수 있도록 배치시킨 느낌을 받았다.

> **Design System : Chakra UI Theme 에 적용시켰다. ( 아래 소스 링크 )**

![Untitled](%E1%84%8B%E1%85%A1%E1%84%91%E1%85%A1%E1%84%90%E1%85%B3%20%E1%84%8C%E1%85%A5%E1%86%AB%20695db/Untitled%201.png)

![Untitled](%E1%84%8B%E1%85%A1%E1%84%91%E1%85%A1%E1%84%90%E1%85%B3%20%E1%84%8C%E1%85%A5%E1%86%AB%20695db/Untitled%202.png)

[Font System](https://github.com/formegusto/contract-recommender/blob/master/contract-recommender-fe/src/theme/fonts.ts), [Color System](https://github.com/formegusto/contract-recommender/blob/master/contract-recommender-fe/src/theme/colors.ts), [Box Color System (Semantic Tokens 활용)](https://github.com/formegusto/contract-recommender/blob/master/contract-recommender-fe/src/theme/tokens.ts)

> **Why? Chakra UI?**

1. Light Mode, Dark Mode 변화에 따른 설정이 비교적 간편해보였다.
2. Document 가 상당히 직관성 있게 잘 적혀져 있었다.
3. 가장 단순했던 이유는, 들어갈만한 컨텐츠가 많지 않아서, 이를 채울 수 있는 아이디어가 필요했는데, Stat 이라는 주식시장 에서 업, 다운을 나타내는 컴포넌트가 있었고, 여기에 많이 매력을 느꼈다고 볼 수 있을 거 같다. (사실 모든 라이브러리 들이 너무 이뻐서 고민했는데 여기에 끌린거였다. 매우 단순\_~)

   [Stat](https://chakra-ui.com/docs/data-display/stat)

# 2. 개발 내용

![Untitled](%E1%84%8B%E1%85%A1%E1%84%91%E1%85%A1%E1%84%90%E1%85%B3%20%E1%84%8C%E1%85%A5%E1%86%AB%20695db/Untitled%203.png)

[figma link](<https://www.figma.com/file/pTT102oc8rX0Nd7ulsIWYp/%EC%95%84%ED%8C%8C%ED%8A%B8-%EC%A0%84%EA%B8%B0%EA%B3%84%EC%95%BD-%EC%B6%94%EC%B2%9C-%EC%8B%9C%EC%8A%A4%ED%85%9C-(Contract-Recommender)?node-id=0%3A1>)

## 1. 메인 페이지

![Untitled](%E1%84%8B%E1%85%A1%E1%84%91%E1%85%A1%E1%84%90%E1%85%B3%20%E1%84%8C%E1%85%A5%E1%86%AB%20695db/Untitled%204.png)

## 2. 보고서 페이지

![Untitled](%E1%84%8B%E1%85%A1%E1%84%91%E1%85%A1%E1%84%90%E1%85%B3%20%E1%84%8C%E1%85%A5%E1%86%AB%20695db/Untitled%205.png)

- 해당 프로젝트에서 정말 중요하게 전달해야 하는 것은 공동설비사용량 증가에 따라 각 계약의 특징이 어떻게 변화하는지와 공동설비사용량이 어느 지점에서 단일계약이 유리해지는지, 종합계약이 유리해지는지에 대해 사용자에게 전달하는 것이 중요했기 이와 같은 점을 고려하고 개발을 진행했다.
  1. 그래프는 핵심! 잘 보이도록! 텍스트와 겹치는 내용의 그래프 요소의 색은 서로 동일하게 맞추기!
  2. 내용이 많기 때문에, 제목과 전달하고자 하는 핵심 포인트는 굵기를 크게, 색을 밝게 해서 강조시키기!

## 3. 소켓의 알림에 따른 변화

> **메인페이지 : 보고서 리스트 아이템 별 변화**

![Untitled](%E1%84%8B%E1%85%A1%E1%84%91%E1%85%A1%E1%84%90%E1%85%B3%20%E1%84%8C%E1%85%A5%E1%86%AB%20695db/Untitled%206.png)

- mongoDB 에는 document를 생성하면, \_id 라는 필드가 부여되는데, server 측에서 특정 시뮬레이션의 단계가 변화할 때 해당 시뮬레이션 \_id와 메시지가 담겨진 alert 객체를 소켓을 통해 해당 View, Client-Side에게 전달해준다.
- View에서는 서버에서 온 alert객체를 redux store에 저장시켜주면, 메인페이지 리스트 아이템들이 각자 자신의 alert인지 확인한 후, 자신의 alert이면, 자신의 상태를 변경시킨다.
  → 리스트가 통째로 재 렌더링하는 것을 방지하기 위하여, 아이템별 alert 체크를 하도록 했다.

![Untitled](%E1%84%8B%E1%85%A1%E1%84%91%E1%85%A1%E1%84%90%E1%85%B3%20%E1%84%8C%E1%85%A5%E1%86%AB%20695db/Untitled%207.png)

> **보고서 페이지 : 상세 페이지 변화**

![Untitled](%E1%84%8B%E1%85%A1%E1%84%91%E1%85%A1%E1%84%90%E1%85%B3%20%E1%84%8C%E1%85%A5%E1%86%AB%20695db/Untitled%208.png)

![Untitled](%E1%84%8B%E1%85%A1%E1%84%91%E1%85%A1%E1%84%90%E1%85%B3%20%E1%84%8C%E1%85%A5%E1%86%AB%20695db/Untitled%209.png)

- 상세페이지에 들어서면, 현재 보고 있는 페이지에서만 alert을 확인한 후, 해당 alert의 \_id가 현재 사용자가 보고 있는 \_id인지 확인한 후, 이것이 동일하면 해당 페이지의 데이터를 업데이트 시키는 방식으로 구성했다.

> **알림 리스트**

![Untitled](%E1%84%8B%E1%85%A1%E1%84%91%E1%85%A1%E1%84%90%E1%85%B3%20%E1%84%8C%E1%85%A5%E1%86%AB%20695db/Untitled%2010.png)

## 3. 스켈레톤 로딩

> 너무 해보고 싶었다.

![Untitled](%E1%84%8B%E1%85%A1%E1%84%91%E1%85%A1%E1%84%90%E1%85%B3%20%E1%84%8C%E1%85%A5%E1%86%AB%20695db/Untitled%2011.png)

![Untitled](%E1%84%8B%E1%85%A1%E1%84%91%E1%85%A1%E1%84%90%E1%85%B3%20%E1%84%8C%E1%85%A5%E1%86%AB%20695db/Untitled%2012.png)
