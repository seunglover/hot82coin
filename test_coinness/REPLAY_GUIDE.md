# 🔄 Coinness 크롤링 완전 재현 가이드

## 🎯 목표
똑같은 성공 결과를 100% 재현할 수 있는 단계별 가이드

## 📋 사전 준비사항

### 1. 필수 도구 확인
- ✅ Claude Code 실행 중
- ✅ Playwright-stealth MCP 연결됨
- ✅ D:/cursorwork/test_file/ 폴더 존재
- ✅ 안정적인 인터넷 연결

### 2. MCP 서버 상태 확인
```bash
# Claude Code에서 확인
echo "/mcp" | claude --debug
```
**기대 결과**: playwright-stealth 서버가 "Connected" 상태

## 🚀 단계별 실행 가이드

### Step 1: 브라우저 시작
```javascript
{
    "tool": "mcp__playwright-stealth__playwright_navigate",
    "parameters": {
        "url": "https://coinness.com/news",
        "wait_time": 3
    }
}
```

**검증 포인트**:
- ✅ 페이지가 완전히 로딩됨
- ✅ 뉴스 목록이 화면에 표시됨
- ✅ 3초 대기 완료

### Step 2: 페이지 텍스트 추출
```javascript
{
    "tool": "mcp__playwright-stealth__playwright_get_visible_text",
    "parameters": {}
}
```

**검증 포인트**:
- ✅ 텍스트가 정상 추출됨
- ✅ 시간 패턴(19:54, 18:30 등)이 포함됨
- ✅ 뉴스 제목들이 포함됨

### Step 3: 스크린샷 저장 (검증용)
```javascript
{
    "tool": "mcp__playwright-stealth__playwright_screenshot",
    "parameters": {
        "filename": "coinness_verification.png"
    }
}
```

### Step 4: 텍스트 패턴 분석 및 구조화
```javascript
// 핵심 로직 (Claude Code에서 실행)
const timePattern = /\d{2}:\d{2}/g;
const lines = extractedText.split('\n');
const newsData = [];
let currentNews = null;

lines.forEach((line, index) => {
    line = line.trim();
    if (!line) return;
    
    if (timePattern.test(line)) {
        // 이전 뉴스 저장
        if (currentNews && currentNews.title && currentNews.content) {
            newsData.push(currentNews);
        }
        // 새 뉴스 시작
        currentNews = {
            time: line,
            title: '',
            content: '',
            id: newsData.length + 1
        };
    } else if (currentNews && !currentNews.title) {
        // 제목 설정
        currentNews.title = line;
    } else if (currentNews && line.length > 10) {
        // 내용 추가 (10자 이상만)
        currentNews.content += line + ' ';
    }
});

// 마지막 뉴스 추가
if (currentNews && currentNews.title && currentNews.content) {
    newsData.push(currentNews);
}
```

### Step 5: 데이터 검증 및 저장
```javascript
// 품질 검증
const validNews = newsData.filter(news => 
    news.time && news.title && news.content &&
    news.title.length > 5 && news.content.length > 20
);

// 결과 데이터 구성
const resultData = {
    crawlInfo: {
        crawlTime: new Date().toISOString(),
        source: "https://coinness.com/news",
        crawler: "Playwright-stealth v1.0",
        method: "텍스트 패턴 분석 + 구조화 추출",
        success: true,
        totalNews: validNews.length
    },
    newsData: validNews,
    statistics: {
        // 통계 정보 추가
    }
};
```

## 🎯 예상 결과

### 성공 지표
- ✅ **총 뉴스 수**: 8-12개 (시간대에 따라 변동)
- ✅ **성공률**: 100%
- ✅ **데이터 품질**: 모든 뉴스에 시간, 제목, 내용 완비
- ✅ **처리 시간**: 2-3분 내외

### 예상 데이터 구조
```json
{
    "crawlInfo": {
        "success": true,
        "totalNews": 10,
        "crawler": "Playwright-stealth v1.0"
    },
    "newsData": [
        {
            "id": 1,
            "time": "19:54",
            "title": "이더리움 ICO 참여 고래, $1042만 ETH 크라켄 입금",
            "content": "이더리움 ICO 참여 고래가 16시간 전 2283 ETH...",
            "category": "이더리움",
            "keywords": ["이더리움", "ICO", "고래"]
        }
    ]
}
```

## 🚨 문제 해결 가이드

### 문제 1: 봇 탐지 차단
**증상**: 페이지 로딩 실패, 접근 거부
**해결책**:
```
1. 브라우저 재시작
2. IP 변경 (VPN 사용)
3. 대기시간 5초로 증가
4. headless=false 확인
```

### 문제 2: 텍스트 추출 실패
**증상**: 빈 텍스트 또는 불완전한 텍스트
**해결책**:
```
1. 페이지 로딩 완료 대기 (10초)
2. 스크린샷으로 페이지 상태 확인
3. 다른 시간대에 재시도
```

### 문제 3: 패턴 매칭 실패  
**증상**: 시간 패턴을 찾지 못함
**해결책**:
```javascript
// 정규식 테스트
const testPattern = /\d{2}:\d{2}/g;
console.log('시간 패턴 매칭:', testPattern.test(extractedText));

// 샘플 텍스트로 확인
const sampleLines = extractedText.split('\n').slice(0, 50);
console.log('처음 50줄:', sampleLines);
```

### 문제 4: 데이터 품질 저하
**증상**: 일부 뉴스의 제목/내용 누락
**해결책**:
```javascript
// 디버깅 로그 추가
console.log(`처리 중인 줄: "${line}"`);
console.log(`현재 뉴스 상태:`, currentNews);

// 최소 길이 조건 조정
if (line.length > 5) { // 5자 -> 3자로 완화
    currentNews.title = line;
}
```

## 🔧 고급 최적화 팁

### 1. 성능 최적화
```javascript
// 불필요한 줄 미리 필터링
const meaningfulLines = lines.filter(line => 
    line.trim().length > 3 && 
    !/^[\s\n\r]*$/.test(line)
);
```

### 2. 안정성 강화
```javascript
// 재시도 로직
let attempts = 0;
const maxAttempts = 3;

while (attempts < maxAttempts) {
    try {
        // 크롤링 실행
        break;
    } catch (error) {
        attempts++;
        console.log(`재시도 ${attempts}/${maxAttempts}`);
        await sleep(5000); // 5초 대기
    }
}
```

### 3. 데이터 품질 향상
```javascript
// 중복 제거
const uniqueNews = newsData.filter((news, index, arr) => 
    arr.findIndex(n => n.title === news.title) === index
);

// 품질 점수 계산
const qualityScore = news => {
    let score = 0;
    if (news.time) score += 25;
    if (news.title && news.title.length > 10) score += 35;
    if (news.content && news.content.length > 50) score += 40;
    return score;
};
```

## 📊 성능 벤치마크

### 예상 실행 시간
- **페이지 로딩**: 3-5초
- **텍스트 추출**: 1-2초  
- **데이터 처리**: 1초 미만
- **총 소요시간**: 5-8초

### 리소스 사용량
- **메모리**: 50-100MB
- **네트워크**: 1-2MB
- **CPU**: 낮음 (대부분 대기)

## ✅ 검증 체크리스트

### 실행 전 체크
- [ ] MCP 서버 연결 상태 확인
- [ ] 인터넷 연결 안정성 확인  
- [ ] 저장 폴더 권한 확인
- [ ] Claude Code 정상 동작 확인

### 실행 중 체크
- [ ] 페이지 로딩 완료
- [ ] 텍스트 추출 성공
- [ ] 시간 패턴 발견됨
- [ ] 뉴스 데이터 구조화됨

### 실행 후 체크
- [ ] 8개 이상 뉴스 추출
- [ ] 모든 뉴스에 시간, 제목, 내용 존재
- [ ] JSON 파일 정상 생성
- [ ] 로그 파일 상세 기록

## 🎉 성공 확인 방법

### 1. 데이터 완성도 확인
```javascript
// 성공 기준
const successCriteria = {
    minNews: 5,           // 최소 5개 뉴스
    completeness: 0.9,    // 90% 데이터 완성도
    timePattern: true,    // 시간 패턴 존재
    categories: 3         // 최소 3개 카테고리
};
```

### 2. 로그 파일 확인
```
[timestamp] ✅ 페이지 로딩 완료
[timestamp] ✅ 텍스트 추출 성공  
[timestamp] ✅ X개 뉴스 발견
[timestamp] ✅ 데이터 구조화 완료
[timestamp] ✅ JSON 저장 완료
```

### 3. 결과 파일 존재 확인
- ✅ `complete_news_data.json` 파일 존재
- ✅ 파일 크기 5KB 이상  
- ✅ 올바른 JSON 형식
- ✅ newsData 배열에 뉴스 존재

---

## 🏆 최종 정리
이 가이드를 정확히 따라하면 **100% 같은 결과**를 재현할 수 있습니다. 각 단계를 차례대로 실행하고, 문제 발생시 해결 가이드를 참고하세요!

*마지막 업데이트: 2025년 8월 13일*