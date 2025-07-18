# 🚀 배포 가이드

이 프로젝트는 정적 웹사이트이므로 간단하게 폴더를 복사해서 배포할 수 있습니다.

## 📋 배포 전 체크리스트

- [ ] 모든 파일이 올바른 위치에 있는지 확인
- [ ] API 키가 올바르게 설정되어 있는지 확인
- [ ] 로컬에서 테스트 완료
- [ ] 브라우저 호환성 확인

## 🌐 간단한 배포 방법

### 1. 웹 호스팅 서비스 사용

#### GitHub Pages (무료)
1. GitHub에 새 저장소 생성
2. 프로젝트 폴더의 모든 파일을 저장소에 업로드
3. 저장소 설정에서 Pages 활성화
4. `https://username.github.io/repository-name`에서 접속

#### Netlify (무료)
1. Netlify 사이트에 가입
2. "New site from Git" 클릭
3. GitHub 저장소 연결
4. 자동 배포 완료

#### Vercel (무료)
1. Vercel 사이트에 가입
2. "New Project" 클릭
3. GitHub 저장소 연결
4. 자동 배포 완료

### 2. 직접 파일 업로드

#### 일반 웹 호스팅
1. 호스팅 서비스의 파일 관리자 접속
2. `public_html` 또는 `www` 폴더에 모든 파일 업로드
3. `index.html`이 메인 페이지로 설정됨

#### AWS S3
1. S3 버킷 생성
2. 모든 파일을 버킷에 업로드
3. 정적 웹사이트 호스팅 설정
4. CloudFront 연결 (선택사항)

## 📁 배포할 파일 목록

```
coin/
├── index.html          # 메인 HTML 파일
├── css/
│   └── style.css      # 스타일시트
├── js/
│   ├── api.js         # 바이낸스 API 모듈
│   └── app.js         # 메인 애플리케이션 로직
└── README.md          # 프로젝트 설명서
```

## 🔧 환경 설정

### API 키 관리

현재 API 키는 클라이언트 사이드에 포함되어 있습니다. 프로덕션 환경에서는 보안을 위해 서버 사이드로 이동하는 것을 권장합니다.

### CORS 설정

바이낸스 API는 CORS를 지원하므로 별도 설정이 필요하지 않습니다.

## 📊 성능 최적화

### 1. 파일 압축 (선택사항)

```bash
# CSS 압축
npx clean-css-cli css/style.css -o css/style.min.css

# JS 압축
npx uglify-js js/api.js js/app.js -o js/bundle.min.js
```

### 2. 캐싱 설정

서버에서 다음 헤더를 설정하면 성능이 향상됩니다:

```
Cache-Control: max-age=3600
Content-Type: text/css
Content-Type: application/javascript
```

## 🔒 보안 고려사항

1. **API 키 보호**: 클라이언트 사이드에 API 키를 노출하지 않도록 주의
2. **HTTPS 사용**: 모든 배포에서 HTTPS 강제 사용
3. **Rate Limiting**: API 요청 제한 구현 (이미 구현됨)

## 📈 모니터링

### 1. Google Analytics 추가 (선택사항)

```html
<!-- index.html의 head 섹션에 추가 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. 에러 추적

```javascript
// js/app.js에 추가
window.addEventListener('error', (e) => {
  console.error('Application Error:', e.error);
});
```

## 🚨 문제 해결

### 일반적인 문제들

1. **CORS 오류**: 바이낸스 API는 CORS를 지원하므로 문제없음
2. **API 제한**: 요청 제한에 도달하면 자동으로 재시도
3. **네트워크 오류**: 오프라인 상태 감지 및 처리

### 디버깅

```javascript
// 개발 모드에서 디버깅 활성화
const DEBUG = true;

if (DEBUG) {
  console.log('API Response:', data);
}
```

## 📞 지원

배포 중 문제가 발생하면:

1. 브라우저 개발자 도구에서 오류 확인
2. 네트워크 탭에서 API 요청 상태 확인
3. 콘솔 로그 확인
4. 파일 경로가 올바른지 확인

---

**배포 완료 후**: 사이트가 정상적으로 작동하는지 확인하고, 필요시 성능 모니터링 도구를 설정하세요. 