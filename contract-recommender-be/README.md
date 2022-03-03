# 아파트 전기계약 추천 시스템 / Back-End

> **stack : node.js, typescript. mongoose, socket-io ,express, python, numpy, pandas, scikit-learn**

> **추천 프로그램 목표**

1. 평균값 기반이 아닌 다른 값을 기반으로 추천해줄 수 있는 방법 (유사도 분석치)

> **Back-End 목표**

1. python 추천 프로세스와 서버간의 통신
2. Front-End와 socket을 통한 실시간 커뮤니케이션

# 1. 유사도 분석치

> **평균값 기반이 아닌, 다른 값을 기반으로 추천해줄 수 있는 방법이 없을까?**

![Untitled](%E1%84%8B%E1%85%A1%E1%84%91%E1%85%A1%E1%84%90%E1%85%B3%20%E1%84%8C%E1%85%A5%E1%86%AB%20c0978/Untitled.png)

- 평균이라는 값은 특정 행렬 혹은 벡터의 특징을 설명해줄 수 있는 훌륭한 지표이다. 모든 값들의 특징이 하나씩 반영되어 나타나는 값이기 때문이다.

→ 하지만 **평균**이라는 값은 **모든 스칼라 데이터에 공평**하기 때문에 **노이즈 데이터가 낄 수 있다는 단점이 존재**한다. 이 말은 해당 행렬이나 벡터를 평균으로서 설명하려들면, **노이즈가 낀 특징을 설명하는 것**과 같다.

→ **행렬의 특징을 가장 잘 설명해주는 벡터들의 집합으로 평균을 만들면 노이즈가 끼지 않은 특징으로서의 가치가 있겠다!**

> **벡터간 유사도 측정의 대표 알고리즘 : 유클리디안 거리, 코사인 유사도**

- 유클리디안 거리
  ![Untitled](%E1%84%8B%E1%85%A1%E1%84%91%E1%85%A1%E1%84%90%E1%85%B3%20%E1%84%8C%E1%85%A5%E1%86%AB%20c0978/Untitled%201.png)
- 코사인 유사도
  ![Untitled](%E1%84%8B%E1%85%A1%E1%84%91%E1%85%A1%E1%84%90%E1%85%B3%20%E1%84%8C%E1%85%A5%E1%86%AB%20c0978/Untitled%202.png)
  - 유클리디안 거리는 벡터간 거리 측정에 쓰이는 대표 알고리즘이며, 코사인 유사도는 벡터간 방향성 측정에 쓰이는 대표 알고리즘이다.
  - 두 알고리즘은 유사도 측정의 대표 알고리즘이지만 **유클리디안 거리는 방향성을 전혀 고려하지 않고, 코사인 유사도는 거리를 전혀 고려하지 않는다**는 단점이 있다.

> **MSE(Mean Squared Error)를 가중치로 사용하는 코사인 유사도 (eq. 향상된 유사도)**

- 향상된 유사도
  ![Untitled](%E1%84%8B%E1%85%A1%E1%84%91%E1%85%A1%E1%84%90%E1%85%B3%20%E1%84%8C%E1%85%A5%E1%86%AB%20c0978/Untitled%203.png)
  - 향상된 유사도는 MSE로 만들어진 가중치를 기존의 코사인 유사도에 적용시킨 알고리즘이다.
  - MSE는 두 벡터간의 평균 제곱 오차를 나타내며, 유클리디안 거리의 공식과 비슷한 성격을 가진다.
  → 코사인 유사도(방향성) 알고리즘에 유클리디안 거리(거리)를 가중치로 사용한 것과 같다.
  - **향상된 유사도 알고리즘에서 쓰이는 가중치는 거리를 고려하지 못하는 코사인 유사도에 Balancing Factor로서의 역할**을 하게 된다.
- 문제점
  - **향상된 유사도 알고리즘은 거리와 방향을 같이 고려**하기 때문에 특정 행렬 속에서 가장 전체 벡터들과의 유사도를 많이 띄고 있는 벡터를 선정할 때, **거리면에서 가장 우세한 벡터, 방향면에서 가장 우세한 벡터를 잡아내지 못할 수 있다.**

> **scikit-learn 라이브러리의 TruncatedSVD(행렬분해)를 이용한 유사도 우세성을 띄는 벡터들 찾아내기**

![Untitled](%E1%84%8B%E1%85%A1%E1%84%91%E1%85%A1%E1%84%90%E1%85%B3%20%E1%84%8C%E1%85%A5%E1%86%AB%20c0978/Untitled%204.png)

- TruncatedSVD는 행렬분해의 대표적인 기법 중 하나로, 원본행렬을 3개의 행렬로 분해하는데, 여기서 분해된 행렬들의 크기를 축소시키면 원본행렬과 근사한 근사행렬이 나오게되며, 축소를 많이 할 수록, 원본행렬과 유사도가 떨어지게 하는 특징을 가진 기법이다.
- 이는 다른 의미로 바라보면, 축소를 계속해서 진행할 수록 행렬에서 설명력이 약한 데이터들은 제거되며, 이를 노이즈를 제거했다라고 말한다.

![Untitled](%E1%84%8B%E1%85%A1%E1%84%91%E1%85%A1%E1%84%90%E1%85%B3%20%E1%84%8C%E1%85%A5%E1%86%AB%20c0978/Untitled%205.png)

- 이것을 이용하여 차원을 계속 축소시키면서 축소된 근사행렬 속에서 모든 벡터들과 가장 유사도가 우세한 특정 벡터를 골라내는 작업을 했는데, **기존의 차원을 축소시키지 않은 상태에서 향상된 유사도를 통해 잡아낼 수 없었던 유사도 우세성을 가진 벡터들을 찾아낼 수 있었다.**

→ 이는 향상된 유사도 알고리즘의 문제점을 장점으로 사용한 방법으로도 볼 수 있다. 두 가지를 고려하기 때문에, 어느 한쪽에도 치우치지 않았다라는 단점을 이용해서 행렬이 축소된 형태에서 이들을 찾아낸 것 이다.

![Untitled](%E1%84%8B%E1%85%A1%E1%84%91%E1%85%A1%E1%84%90%E1%85%B3%20%E1%84%8C%E1%85%A5%E1%86%AB%20c0978/Untitled%206.png)

![Untitled](%E1%84%8B%E1%85%A1%E1%84%91%E1%85%A1%E1%84%90%E1%85%B3%20%E1%84%8C%E1%85%A5%E1%86%AB%20c0978/Untitled%207.png)

- 이들의 평균으로, 유사도 분석치(sims mean)이라는 것을 만들었다. 이는 다음과 같은 특징을 가진다.
  1. 기존의 **원본행렬에서 유사도 우세성을 띈 벡터**보다 **유사도 우세성이 높은 벡터**
  2. **평균만큼의 전체적인 유사도 우세성을 띄지는 않지만,** 해당 행렬의 **대체적인 벡터 및 패턴이라는 설명력을 가지는 벡터**

![Untitled](%E1%84%8B%E1%85%A1%E1%84%91%E1%85%A1%E1%84%90%E1%85%B3%20%E1%84%8C%E1%85%A5%E1%86%AB%20c0978/Untitled%208.png)

# 2. 각 시스템 간의 통신

## Python 추천 프로그램과 Back-End

> **Python → Back-End 작업 알림**

```python
req.patch(api_server + update_path, json={
    "id": id,
    "step": step,
    "type": "process success",
    "status": True,
    "message": mg.success
})
```

- Python Prgrogram 코드 중, [update_process](https://github.com/formegusto/contract-recommender/blob/master/contract-recommender-be/python/utils/update_process.py) 라는 HOF(Higher Order Function)로서의 역할을 하는 함수의 일부분이다. 해당 HOF는 특정 함수의 작업이 종료되면( = 추천 프로세스 중 어느 한 단계가 종료되면 )서버에 작업 종료처리 API를 어느 시뮬레이션의 어떤 작업이 종료되었는지에 대한 정보를 Body에 담아 요청한다.

> **Back-End → Front-End 작업 알림**

```tsx
const socket = req.app.get("socket") as Socket;
socket.emit("alert", {
  ...body,
});
```

- [Back-End 종료 API](https://github.com/formegusto/contract-recommender/blob/master/contract-recommender-be/src/routes/recoProcess/index.ts)의 일부분으로, 해당 API가 호출되면 Front-End와 연결되어 있는 소켓에 알림 데이터를 전송한다.

> **Front-End 알림 처리**

![Untitled](%E1%84%8B%E1%85%A1%E1%84%91%E1%85%A1%E1%84%90%E1%85%B3%20%E1%84%8C%E1%85%A5%E1%86%AB%20c0978/Untitled%209.png)

처음으로 프로그램을 실행시키게 되면 만나게 되는 서버의 소켓과 연결되고 있음을 알리는 Splash 화면이다.

```tsx
io.on("connect", () => {
  connectSocket(io);

  io.on("alert", (data: Alert) => {
    newAlert(data);
  });
});
```

- [Front-End의 SocketListener.tsx의 일부분](https://github.com/formegusto/contract-recommender/blob/master/contract-recommender-fe/src/containers/SocketListener.tsx)이다. 소켓으로 부터 알림이 오면, redux 스토어에 알림을 저장시킴으로서, 현재 사용자가 바라보고 있는 화면에서 소켓의 알림에 대한 반응이 필요한 View들에게 새로운 알림이 들어왔음을 알린다.
