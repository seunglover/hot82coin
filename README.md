# 🔥 지금 핫한 코인 순위 - 거래량 TOP 50

바이낸스 API를 사용한 실시간 코인 거래량 순위 웹사이트입니다.

## 🚀 배포

### Cloudflare Pages 배포
이 프로젝트는 Cloudflare Pages에 바로 배포할 수 있습니다.

1. GitHub에 코드 업로드
2. Cloudflare Dashboard → Pages → "Create a project"
3. GitHub 저장소 연결
4. 빌드 설정:
   - Framework preset: `None`
   - Build command: 비워두기
   - Build output directory: `.`

## 🔐 보안

### API 키 관리
- **현재 사용하는 API들은 모두 공개 API입니다**
- 바이낸스 공개 API: API 키 불필요
- 환율 API: API 키 불필요
- CoinGecko API: API 키 불필요

### 환경변수 (선택사항)
만약 향후 프라이빗 API를 사용하게 된다면:

```bash
# .env 파일 생성
BINANCE_API_KEY=your_api_key_here
NODE_ENV=production
```

## 📁 프로젝트 구조

```
coin/
├── index.html          # 메인 페이지
├── css/
│   └── style.css      # 스타일시트
├── js/
│   ├── api.js         # 바이낸스 API
│   ├── app.js         # 메인 애플리케이션
│   ├── coingecko-api.js # CoinGecko API
│   └── exchange-rate-api.js # 환율 API
├── _headers           # Cloudflare 헤더 설정
├── netlify.toml       # 배포 설정
└── README.md
```

## 🛠️ 개발

### 로컬 실행
```bash
# 정적 사이트이므로 브라우저에서 직접 열기
open index.html
```

### API 제한
- 바이낸스 API: 1분당 1200회 요청
- 환율 API: 1분당 100회 요청
- CoinGecko API: 1분당 50회 요청

## 📊 기능

- 실시간 코인 거래량 순위
- USD/KRW 환율 변환
- 코인 상세 정보 모달
- 반응형 디자인
- 모바일 최적화

## 🔄 업데이트

- 5분마다 자동 새로고침
- 수동 새로고침 버튼
- 마지막 업데이트 시간 표시

## 📱 지원 브라우저

- Chrome (권장)
- Firefox
- Safari
- Edge

## 🚨 주의사항

- API 키는 절대 Git에 커밋하지 마세요
- 프로덕션 배포 시 환경변수 사용을 권장합니다
- API 요청 제한을 초과하지 않도록 주의하세요 