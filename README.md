# 내지갑 흑역사ㅋㅋㅋ (My Cursed Wallet LOL)

블록체인은 다 기억한다... 당신의 온체인 흑역사를 분석해드립니다! 🎪

## 🎯 프로젝트 소개

5개 EVM 체인(Ethereum, Arbitrum, Base, Polygon, Kaia)의 과거 활동을 분석하여 MZ 감성의 재미있는 흑역사 스토리로 만들어주는 모바일 웹 서비스입니다.

## 🚀 주요 기능

- **지갑 분석**: 지갑 주소 또는 ENS 이름으로 온체인 활동 분석
- **흑역사 스토리**: 20가지 지갑 유형과 다양한 흑역사 시나리오
- **멀티체인 지원**: 5개 주요 EVM 체인 동시 분석
- **소셜 공유**: 카카오톡, X(Twitter), 텔레그램 공유 기능
- **다크모드 UI**: 네온 민트 포인트의 모던한 디자인

## 🛠️ 기술 스택

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **API**: Nodit Web3 Data API
- **Font**: Ownglyph meetme (필수 웹폰트)
- **지원 체인**: Ethereum, Arbitrum, Base, Polygon, Kaia

## 📁 프로젝트 구조

```
my-cursed-wallet-lol/
├── index.html      # 메인 HTML 파일
├── styles.css      # 스타일시트
├── app.js         # 메인 애플리케이션 로직
├── api.js         # Nodit API 통신 로직
├── stories.js     # 흑역사 스토리 생성 로직
└── README.md      # 프로젝트 문서
```

## 🚦 시작하기

### 1. 로컬 실행

```bash
# 프로젝트 클론
git clone [repository-url]
cd my-cursed-wallet-lol

# 로컬 서버 실행 (Python 3)
python -m http.server 8000

# 또는 Node.js http-server
npx http-server -p 8000
```

브라우저에서 `http://localhost:8000` 접속

### 2. 디버그 모드

URL에 `?debug=true` 파라미터를 추가하면 디버그 모드가 활성화됩니다:
- 테스트용 지갑 주소 콘솔 출력
- `window.useMockData()` 함수로 목 데이터 테스트 가능

### 3. API 키 설정

현재 API 키가 하드코딩되어 있습니다. 프로덕션 환경에서는 환경 변수로 관리하세요:

```javascript
// api.js
const NODIT_API = {
    apiKey: process.env.NODIT_API_KEY || 'YOUR_API_KEY'
    // ...
}
```

## 🎨 지갑 유형

총 20가지의 재미있는 지갑 유형:

- 🎪 러그풀 단골손님형
- 🚀 FOMO 투자천재형
- ⛽ 가스비 부자형
- 🖼️ NFT 수집광형
- 🐕 밈코인 중독자형
- 🌾 DeFi 농부형
- 🪂 에어드랍 헌터형
- 🧲 스캠 마그넷형
- 🌉 브릿지 노예형
- 🤦 실수 연발형
- ... 그리고 더 많은 유형들!

## 📱 UI/UX 플로우

1. **HOME**: 지갑 주소/ENS 입력
2. **LOADER**: 5단계 프로그레스 애니메이션
3. **RESULT-LOCKED**: 흑역사 결과 (일부 블러 처리)
4. **RESULT-UNLOCKED**: 전체 결과 공개 (Nodit 가입 후)

## 🔧 커스터마이징

### 스토리 추가하기

`stories.js` 파일에서 새로운 템플릿 추가:

```javascript
this.cringeTemplates.newCategory = [{
    title: '새로운 흑역사 제목 🎯',
    template: '${변수}를 활용한 스토리 템플릿'
}];
```

### 지갑 유형 추가하기

```javascript
this.walletTypes.push({
    name: '새로운 유형형',
    emoji: '🆕'
});
```

## 📈 성능 최적화

- API 호출 병렬 처리 (5개 체인 동시)
- 30초 타임아웃 설정
- 3단계 지수 백오프 재시도 로직
- 페이지네이션을 통한 대용량 데이터 처리

## 🔒 보안 고려사항

- 프라이빗 키는 절대 요구하지 않음
- 읽기 전용 API 사용
- XSS 방지를 위한 입력 검증
- HTTPS 필수 (프로덕션)

## 🚀 배포

### Vercel

```bash
vercel --prod
```

### Netlify

```bash
netlify deploy --prod
```

### 환경 변수 설정

```
NODIT_API_KEY=your_api_key_here
```

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

This project is licensed under the MIT License.

## 🙏 Credits

- **API Provider**: [Nodit](https://nodit.io)
- **Font**: Ownglyph meetme
- **Inspiration**: 온체인의 모든 실수들 💸

---

**Powered by Nodit** - turning your on-chain past into memes 🚀

> "블록체인은 다 기억한다..." 😱
