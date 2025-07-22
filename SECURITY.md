# 🔐 API 키 보안 가이드

## 현재 구현된 보안 방법

### 1. 설정 파일 분리
- API 키를 `config.js` 파일로 분리
- 환경별 설정 관리 (개발/프로덕션)

### 2. 환경변수 지원
- `.env` 파일을 통한 환경변수 관리
- `.gitignore`에 포함되어 Git에 업로드되지 않음

## 보안 강화 방법

### 방법 1: 환경변수 사용 (권장)
```bash
# .env 파일 생성
BINANCE_API_KEY=your_api_key_here
NODE_ENV=production
```

### 방법 2: 서버 사이드 프록시
```javascript
// server.js 예시
const express = require('express');
const app = express();

app.get('/api/binance/*', async (req, res) => {
    // 서버에서 API 키를 사용하여 바이낸스 API 호출
    // 클라이언트에는 API 키가 노출되지 않음
});
```

### 방법 3: API 키 암호화
```javascript
// 암호화된 API 키 사용
const encryptedKey = encrypt(process.env.BINANCE_API_KEY);
const decryptedKey = decrypt(encryptedKey);
```

## 배포 시 주의사항

1. **절대 API 키를 Git에 커밋하지 마세요**
2. **프로덕션 환경에서는 환경변수 사용**
3. **API 키 권한을 최소한으로 설정**
4. **정기적으로 API 키 로테이션**

## 현재 설정 확인

현재 `config.js` 파일에서 API 키가 관리되고 있습니다:
- 개발 환경: 하드코딩된 키 사용
- 프로덕션 환경: 환경변수 사용

## 추가 보안 강화

더 강한 보안이 필요하다면:
1. 서버 사이드 프록시 구현
2. API 키 암호화
3. 요청 제한 및 모니터링 추가 