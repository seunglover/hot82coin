한국어로 진행해줘.
너는 MCP를 사용할 수 있어.
너는 SuperClaude 프레임워크를 사용할 수 있어.
다음 예시들을 살펴보고 적절히 활용해줘.

브라우저 자동화 작업 지침
Playwright-stealth를 기본으로 사용하세요.
간단한 웹 스크래핑, 자동화, 테스트 작업은 Playwright-stealth로 먼저 시도
개발, 테스트, 유지보수에 편리하며 속도가 빠름

봇 탐지 등으로 작업이 차단될 경우, nodriver-mcp로 전환하세요.
Playwright-stealth로 안 되는 사이트/작업만 nodriver-mcp로 처리
nodriver-mcp는 봇 탐지 우회 성능이 매우 뛰어나며, 실제 우회가 필요한 환경에서만 사용
코드, 예시, 가이드라인 등 모든 안내는 이 기준에 맞춰 작성하세요.
Playwright-stealth 기준으로 안내
필요시 "nodriver-mcp로 전환"


### 에이전트 시스템 활용
- **개발맨**: 코딩, 구현, 기능 개발 담당
- **테스트맨**: 테스트 실행, 버그 검증, QA 담당
- **검토맨**: 코드 리뷰, 품질 검증, 아키텍처 검토 담당
- **기록맨**: 문서화, 프로젝트 플랜 업데이트, 진행상황 기록 담당
- **활용법**: 복잡한 작업 시 각 역할별 에이전트 분리 운영

# SuperClaude 프레임워크 사용 지침

## ⚡ 주요 /sc 명령어들 (우선 사용 권장)

### 프로젝트 관리
/sc:analyze        # 프로젝트 전체 분석 (첫 번째 추천)
/sc:build          # MCP 서버 빌드 및 테스트
/sc:improve        # 코드 품질 자동 개선
/sc:document       # 문서 자동 생성/업데이트
/sc:test           # 전체 MCP 서버 상태 확인

### 개발 작업
/sc:implement      # 새 기능 자동 구현
/sc:design         # 시스템 설계 및 아키텍처
/sc:cleanup        # 프로젝트 파일 정리
/sc:troubleshoot   # 문제 진단 및 해결

### 특화 작업
/sc:git            # Git 워크플로우 자동화
/sc:estimate       # 프로젝트 추정
/sc:task           # 작업 관리
/sc:workflow       # 워크플로우 자동화

## 🎯 현재 프로젝트 맞춤 사용법

### MCP 서버 관리
/sc:build nodriver-mcp --test --optimize     # Nodriver MCP 최적화
/sc:test --mcp-servers --health-check        # 모든 MCP 상태 확인

### 코드 품질 관리  
/sc:improve nodriver-mcp/ --quality --performance
/sc:analyze test_file/ --focus testing

### 문서 관리
/sc:document docs/project_plan.md --update --sync
/sc:document nodriver-mcp/ --generate-readme

## 📋 사용 원칙
- 복잡한 작업은 /sc 명령어 우선 사용
- 기존 MCP 도구와 병행 사용 가능
- 자동 페르소나 활성화로 전문성 확보
- 작업 효율성 70% 향상 기대

Node.js & Git
{ "tool": "terminal", "parameters": { "cmd": "npm install express" } }
{ "tool": "terminal", "parameters": { "cmd": "node server.js" } }
{ "tool": "terminal", "parameters": { "cmd": "git clone https://github.com/user/repo.git" } }

text-editor 사용 방법 (참고용 - 실제 작업에서는 edit-file-lines 사용)
// ──── ① 한 줄 교체 ─────────────────────────
// src/app.js 42번째 줄의 “foo”를 “bar”로 바꾼다.
{ "tool": "text-editor",
  "parameters": {
    "action": "replace",
    "file":   "src/app.js",
    "startLine": 42,
    "endLine":   42,
    "newText": "console.log('bar');"
  }
}

// ──── ② 여러 줄 추가(120~130) ────────────────
{ "tool": "text-editor",
  "parameters": {
    "action": "append",
    "file":   "utils.py",
    "startLine": 120,          // 120번째 줄 뒤에 삽입
    "newText": "# helper fn\\n"
             + "def slugify(text):\\n"
             + "    return text.lower().replace(' ', '-')\\n"
  }
}

// ──── ③ 파일 읽기(read-only) ────────────────
{ "tool": "filesystem",
  "parameters": {
    "cmd":  "readFile",
    "path": "src/router.ts"
  }
}

// ──── ④ 디렉터리 목록(list) ─────────────────
{ "tool": "filesystem",
  "parameters": {
    "cmd":  "listDirectory",   // or "list" in 최신 빌드
    "path": "./templates"
  }
}

// ──── ⑤ 터미널 래퍼(라인 편집) ────────────────
{ "tool": "terminal",
  "parameters": {
    "cmd": "edit src/index.html line 15"
  }
}

// ──── ⑥ 터미널 래퍼(디렉터리 목록) ───────────
{ "tool": "terminal",
  "parameters": {
    "cmd": "list components"
  }
}


파이썬 개발 도구
{ "tool": "terminal", "parameters": { "cmd": "python --version" } }
{ "tool": "terminal", "parameters": { "cmd": "pip install requests" } }
{ "tool": "terminal", "parameters": { "cmd": "pipx install black" } }
22. 테스트 파일 및 스크린샷 정리 의무화
테스트 파일, 스크린샷, 디버그 스크립트 등 모든 테스트 관련 파일은 test_file 폴더에 저장할 것:
- Python/JavaScript 테스트 스크립트
- 스크린샷 이미지 파일 (.png, .jpg)
- 디버그 로그 파일
- 테스트 결과 데이터
- 임시 테스트 파일들
이렇게 해야 프로젝트 루트가 깔끔하게 유지됨
{ "tool": "terminal", "parameters": { "cmd": "poetry add numpy" } }
{ "tool": "terminal", "parameters": { "cmd": "pytest tests/" } }
{ "tool": "terminal", "parameters": { "cmd": "tox" } }
{ "tool": "terminal", "parameters": { "cmd": "flake8 src/" } }
{ "tool": "terminal", "parameters": { "cmd": "pylint module.py" } }
{ "tool": "terminal", "parameters": { "cmd": "black ." } }
{ "tool": "terminal", "parameters": { "cmd": "isort ." } }
{ "tool": "terminal", "parameters": { "cmd": "mypy app.py" } }
{ "tool": "terminal", "parameters": { "cmd": "coverage run -m pytest" } }
{ "tool": "terminal", "parameters": { "cmd": "python -m cProfile script.py" } }
{ "tool": "terminal", "parameters": { "cmd": "pyinstrument script.py" } }

성능·부하 테스트 도구
{ "tool": "terminal", "parameters": { "cmd": "ab -n 1000 -c 10 http://localhost:3000/" } }
{ "tool": "terminal", "parameters": { "cmd": "wrk -t2 -c100 -d30s http://localhost:3000/" } }
{ "tool": "terminal", "parameters": { "cmd": "siege -c25 -t1M http://localhost:3000/" } }
{ "tool": "terminal", "parameters": { "cmd": "locust -f locustfile.py" } }
{ "tool": "terminal", "parameters": { "cmd": "k6 run script.js" } }
{ "tool": "terminal", "parameters": { "cmd": "hey -n1000 -c50 http://localhost:3000/" } }
{ "tool": "terminal", "parameters": { "cmd": "pytest --benchmark-only" } }

 기타 유틸리티
{ "tool": "terminal", "parameters": { "cmd": "curl https://api.example.com/data" } }
{ "tool": "terminal", "parameters": { "cmd": "http GET https://api.example.com/data" } }
{ "tool": "terminal", "parameters": { "cmd": "ls -la" } }
{ "tool": "terminal", "parameters": { "cmd": "dir" } }

// MySQL 예시 (terminal tool 사용)
[
  { "tool": "terminal",
    "parameters": {
      "cmd": "mysql -uroot -p -e \"SHOW TABLES;\" shorts_generator"
    }
  },
  { "tool": "terminal",
    "parameters": {
      "cmd": "mysql -uroot -p -e \"SELECT id, title FROM videos LIMIT 5;\" shorts_generator"
    }
  },
  { "tool": "terminal",
    "parameters": {
      "cmd": "mysql -uroot -p -e \"INSERT INTO videos (title, description) VALUES ('샘플','테스트');\" shorts_generator"
    }
  },
  { "tool": "terminal",
    "parameters": {
      "cmd": "mysql -uroot -p -e \"BEGIN; UPDATE videos SET view_count = view_count + 1 WHERE id = 42; COMMIT;\" shorts_generator"
    }
  }
]


Youtube MPC Server 사용 예시
{ "tool": "terminal", "parameters": { "cmd": "youtube-data-mcp-server --transport stdio --tool getVideoDetails --params '{\"videoIds\":[\"dQw4w9WgXcQ\",\"kJQP7kiw5Fk\"]}'" } }

{ "tool": "terminal", "parameters": { "cmd": "youtube-data-mcp-server --transport stdio --tool searchVideos --params '{\"query\":\"ChatGPT tutorial\",\"maxResults\":5}'" } }

{ "tool": "terminal", "parameters": { "cmd": "youtube-data-mcp-server --transport stdio --tool getTranscripts --params '{\"videoIds\":[\"dQw4w9WgXcQ\"],\"lang\":\"ko\"}'" } }

{ "tool": "terminal", "parameters": { "cmd": "youtube-data-mcp-server --transport stdio --tool getRelatedVideos --params '{\"videoId\":\"dQw4w9WgXcQ\",\"maxResults\":5}'" } }

{ "tool": "terminal", "parameters": { "cmd": "youtube-data-mcp-server --transport stdio --tool getChannelStatistics --params '{\"channelIds\":[\"UC_x5XG1OV2P6uZZ5FSM9Ttw\"]}'" } }

{ "tool": "terminal", "parameters": { "cmd": "youtube-data-mcp-server --transport stdio --tool getChannelTopVideos --params '{\"channelId\":\"UC_x5XG1OV2P6uZZ5FSM9Ttw\",\"maxResults\":3}'" } }

{ "tool": "terminal", "parameters": { "cmd": "youtube-data-mcp-server --transport stdio --tool getVideoEngagementRatio --params '{\"videoIds\":[\"dQw4w9WgXcQ\",\"kJQP7kiw5Fk\"]}'" } }

{ "tool": "terminal", "parameters": { "cmd": "youtube-data-mcp-server --transport stdio --tool getTrendingVideos --params '{\"regionCode\":\"KR\",\"categoryId\":\"10\",\"maxResults\":5}'" } }

{ "tool": "terminal", "parameters": { "cmd": "youtube-data-mcp-server --transport stdio --tool compareVideos --params '{\"videoIds\":[\"dQw4w9WgXcQ\",\"kJQP7kiw5Fk\"]}'" } }

Playwright MCP Server 사용 예시
페이지 열기
{ "tool":"playwright","parameters":{"action":"goto","url":"https://example.com"}} ,
로그인 버튼 클릭
{ "tool":"playwright","parameters":{"action":"click","selector":"#login-button"}} ,
검색어 입력 후 엔터
{ "tool":"playwright","parameters":{"action":"fill","selector":"input[name='q']","text":"MCP Server"}} ,
{ "tool":"playwright","parameters":{"action":"press","selector":"input[name='q']","key":"Enter"}} ,
페이지 스크린샷 저장
{ "tool":"playwright","parameters":{"action":"screenshot","path":"search-results.png"}} ,
콘솔 에러 로그 수집
{ "tool":"playwright","parameters":{"action":"getConsoleLogs"}} ,
네트워크 요청 내역 수집
{ "tool":"playwright","parameters":{"action":"getNetworkRequests"}} ,
JS 평가(페이지 타이틀 가져오기)
{ "tool":"playwright","parameters":{"action":"evaluate","expression":"document.title"}} ,
접근성 스냅샷(구조화된 DOM)
{ "tool":"playwright","parameters":{"action":"accessibilitySnapshot"}}

스크린샷 촬영 후 이미지 분석 워크플로우
// 1단계: 스크린샷 촬영 (MCP)
{ "tool": "mcp__playwright-stealth__playwright_screenshot", "parameters": {"name": "page_analysis", "savePng": true, "fullPage": false}}

// 2단계: 저장된 스크린샷 이미지 읽기 및 분석 (Read 도구)
{ "tool": "Read", "parameters": {"file_path": "C:\\Users\\username\\Downloads\\page_analysis-timestamp.png"}}

// 결과: 페이지 내용을 시각적으로 분석하여 요소 위치, 텍스트, 레이아웃 등을 파악할 수 있음

라이브러리 버전 조회
{ "tool": "context7", "parameters": {"query": "axios 최신 버전 알려줘"}}
패키지 목록 검색
{ "tool": "context7", "parameters": {"query": "lodash 사용법 예시"}}

다음 지침 또한 지켜줘.
0. **파일 편집 우선순위**: 실제 작업에서는 반드시 edit-file-lines MCP를 사용할 것. text-editor는 참고용으로만 사용.
1. 프로젝트 루트 폴더는D:\cursorwork야. 폴더 및 파일 생성 & 수정은D:\cursorwork 폴더에 대해 진행해줘.
2. 작업이 진행될 때마다, 그에 맞게 docs/project_plan.md 파일을 업데이트해줘.
3. 이미 생성된 파일들이 존재해. 기존에 존재하는 파일들 확인하여 작업 진행해야 해. 
4. 소스들이 많아 꼭 필요한 파일들만 읽은 후, 편집 또는 추가로 진행해줘. 
5. 파일을 write할 때는 먼저 read하고, 조금만 write 한후, 5~7번에 걸쳐 끝에 추가하는 방식으로 edit 진행해줘.
5. 파일을 edit할 때는 read한 후, 5~7번에 걸쳐 끝에 추가하는 방식으로 edit 진행해줘.
6. 각 파일이 18kb를 초과하지 않도록 긴 내용은 미리 여러 개의 파일로 기획하여 진행해줘.
7. docs 폴더에 파일을 업데이트하거나 생성할 때, 꼭 필요한 내용만 넣어서 용량을 줄여줘.
8. project_plan.md 파일에는 프로젝트 중요 사항 및 완료된 일, 해야할 일이 기록되어야 해.
9. 테스트 진행할 때는 MCP 도구를 이용해 진행해줘. 브라우저를 띄우고 각 메뉴도 클릭하고 하나씩 눌러보면서 진행해줘.
10. 쿼리 실행 등 DB 연결을 위해 mysql 쓸 때는 다음처럼 해봐.
{ args: [ -u, root, -e, \"SHOW DATABASES;\" ], command: mysql }
(중요한 점으로, "SHOW DATABASES;" 이 문구는 양 옆에 따옴표 있어야 해. 필수야)
11. 로그 정보가 logs 폴더에 쌓이도록 개발을 진행해야 해. 그리고 너는 logs 폴더의 내용을 통해 오류 확인해야 해.
12. 자바스크립트 작성 시, 이벤트마다 콘솔에 로그를 남겨야 해. 그래야 에러 발생시 원인을 찾을 수 있어. 
13. 디버깅 시, 콘솔의 로그를 찾아봐.
14. 작업을 임의로 진행하지 말고, 작업 전에 반드시 동의를 받아야 해.
15. 너는 하라고 한 구체적인 사항은 진행하고 무조건 대기해야 해. 명시적으로 시킨것만 해줘.
16. 작업 시작 전 체크리스트 의무화
  모든 작업 시작 전에 반드시:
  - docs 폴더 존재 여부 확인
  - project_plan.md 파일 존재 여부 확인  
  - 없으면 먼저 생성 후 작업 진행

  17. 작업 완료 후 의무 문서화
  파일 수정/생성/삭제 등 모든 작업 완료 후 반드시:
  - project_plan.md에 완료 내역 기록
  - 변경 사항 요약 추가
  - 다음 할 일 목록 업데이트

  18. TodoWrite와 문서 연동
  TodoWrite 도구 사용 시:
  - 완료된 todo는 project_plan.md에도 반영
  주의사항:
  1. MySQL 서버가 실제로 구동 중이어야 MCP 서버가 연결됩니다
  2. 기본 설정은 READ-ONLY (SELECT만 가능)
  3. INSERT/UPDATE/DELETE 작업을 위해서는 환경변수에서 해당 권한을 true로 설정해야 합니다
  4. 환경변수 설정: MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASS, MYSQL_DB
  5. 보안상 이유로 모든 쓰기 작업은 기본적으로 비활성화되어 있습니다
  
  ## Nodriver MCP Server 사용 예시 (스텔스 웹 자동화)
  
  // Nodriver MCP Server를 사용한 스텔스 웹 자동화 (Playwright-stealth 완전 대체)
  // 장점: 봇 탐지 우회 성능이 모든 기존 도구보다 우수함
  // 서버명: nodriver-opensearch
  // 설치 위치: D:/cursorwork/nodriver-mcp/
  // 스크린샷 저장: D:/cursorwork/test_file/
  
  ### 🚀 기본 브라우저 관리
  { "tool": "mcp__nodriver-opensearch__start_browser", "parameters": {"headless": false} }
  { "tool": "mcp__nodriver-opensearch__stop_browser", "parameters": {} }
  { "tool": "mcp__nodriver-opensearch__navigate", "parameters": {"url": "https://www.google.com", "wait_time": 3} }
  
  ### 📸 스크린샷 및 페이지 캡처
  { "tool": "mcp__nodriver-opensearch__screenshot", "parameters": {"filename": "google_test.png"} }
  // 스크린샷은 D:/cursorwork/test_file/ 폴더에 자동 저장됨
  
  ### 🖱️ 요소 조작 (CSS 선택자 기반)
  { "tool": "mcp__nodriver-opensearch__click", "parameters": {"selector": "button.search-btn"} }
  { "tool": "mcp__nodriver-opensearch__fill", "parameters": {"selector": "input[name='q']", "text": "검색어", "clear": true} }
  { "tool": "mcp__nodriver-opensearch__hover", "parameters": {"selector": ".menu-item"} }
  
  ### 📝 콘텐츠 추출
  { "tool": "mcp__nodriver-opensearch__get_text", "parameters": {"selector": ".product-title"} }
  { "tool": "mcp__nodriver-opensearch__get_visible_text", "parameters": {} }
  { "tool": "mcp__nodriver-opensearch__get_visible_html", "parameters": {} }
  
  ### ⚡ JavaScript 실행
  { "tool": "mcp__nodriver-opensearch__evaluate", "parameters": {"script": "document.title"} }
  { "tool": "mcp__nodriver-opensearch__evaluate", "parameters": {"script": "window.scrollTo(0, document.body.scrollHeight)"} }
  { "tool": "mcp__nodriver-opensearch__evaluate", "parameters": {"script": "document.querySelector('input[name=\"q\"]').value"} }
  
  ### 🔍 DOM 요소 분석 및 데이터 추출
  { "tool": "mcp__nodriver-opensearch__get_elements", "parameters": {"selector": ".product-item", "limit": 5} }
  { "tool": "mcp__nodriver-opensearch__extract_data", "parameters": {
    "container_selector": ".product-list",
    "item_selector": ".product-item",
    "fields": {
      "title": ".product-title",
      "price": ".price",
      "rating": ".rating"
    }
  }}
  
  ### 📊 페이지 정보 및 상태 확인
  { "tool": "mcp__nodriver-opensearch__get_page_info", "parameters": {} }
  { "tool": "mcp__nodriver-opensearch__console_logs", "parameters": {} }
  
  ### 🛡️ 스텔스 기능 (봇 탐지 우회)
  // 자동으로 적용되는 스텔스 기능들:
  // - navigator.webdriver = false로 설정
  // - User Agent 정상화 (headless 문자열 제거)
  // - Chrome 객체 정상 생성
  // - 플러그인 정보 정상화
  // - WebGL/GPU 정보 정상 표시
  // - Fingerprint 탐지 우회
  
  ### 🎯 실제 사용 예시 (쿠팡 상품 검색)
  // 1단계: 브라우저 시작
  { "tool": "mcp__nodriver-opensearch__start_browser", "parameters": {"headless": false} }
  
  // 2단계: 쿠팡 접속
  { "tool": "mcp__nodriver-opensearch__navigate", "parameters": {"url": "https://www.coupang.com", "wait_time": 3} }
  
  // 3단계: 검색창에 상품명 입력
  { "tool": "mcp__nodriver-opensearch__fill", "parameters": {"selector": "input[name='q']", "text": "노트북", "clear": true} }
  
  // 4단계: 검색 버튼 클릭
  { "tool": "mcp__nodriver-opensearch__click", "parameters": {"selector": "button[type='submit']"} }
  
  // 5단계: 결과 페이지 스크린샷
  { "tool": "mcp__nodriver-opensearch__screenshot", "parameters": {"filename": "coupang_search_result.png"} }
  
  // 6단계: 상품 정보 추출
  { "tool": "mcp__nodriver-opensearch__extract_data", "parameters": {
    "container_selector": ".search-product",
    "item_selector": ".search-product-wrap",
    "fields": {
      "title": ".name",
      "price": ".price-value",
      "rating": ".rating-total-count"
    }
  }}
  
  // 7단계: 브라우저 종료
  { "tool": "mcp__nodriver-opensearch__stop_browser", "parameters": {} }
  
  ### ✅ 검증된 스텔스 성능 (100% 성공률)
  // 다음 봇 탐지 사이트에서 완벽한 우회 성능 확인:
  // ✅ bot.sannysoft.com - 가장 까다로운 봇 탐지 사이트 완전 우회
  // ✅ intoli.com - Chrome headless 탐지 테스트 완전 통과
  // ✅ coupang.com - 실제 상용 서비스의 봇 탐지 시스템 완전 우회
  
  ### 🔧 주요 특징
  1. **최강 스텔스 기능**: 모든 주요 봇 탐지 사이트에서 100% 성공률
  2. **Playwright-stealth 완전 호환**: 기존 코드를 그대로 사용 가능
  3. **완전한 안정성**: 모든 기능에 완전한 에러 처리 적용
  4. **시각적 모드**: headless=false로 브라우저 창을 보면서 작업 가능
  5. **고성능**: nodriver 0.47.0 기반으로 빠르고 안정적인 웹 자동화
  6. **실시간 디버깅**: 콘솔 로그 수집 및 JavaScript 실행 결과 확인
  7. **구조화된 데이터 추출**: CSS 선택자 기반 자동 데이터 수집
  
  ### ⚠️ 주의사항
  1. **브라우저 관리**: start_browser로 시작 후 반드시 stop_browser로 종료할 것
  2. **대기 시간**: 페이지 로드 후 적절한 wait_time 설정 (기본 3초 권장)
  3. **CSS 선택자**: 정확한 CSS 선택자 사용으로 요소 식별 정확도 향상
  4. **스크린샷 저장**: 모든 스크린샷은 D:/cursorwork/test_file/ 폴더에 저장됨
  5. **에러 처리**: 각 단계별 결과 확인 후 다음 단계 진행 권장
  
  ### 🏆 성능 비교
  | 기능 | Nodriver MCP | Playwright-stealth | 일반 Selenium |
  |------|-------------|-------------------|--------------|
  | 봇 탐지 우회 | ✅ 100% | ⚠️ 70% | ❌ 20% |
  | 설치 복잡도 | ✅ 단순 | ⚠️ 보통 | ❌ 복잡 |
  | 실행 속도 | ✅ 빠름 | ⚠️ 보통 | ❌ 느림 |
  | 안정성 | ✅ 우수 | ⚠️ 보통 | ❌ 불안정 |
  | 스텔스 기능 | ✅ 최강 | ⚠️ 보통 | ❌ 없음 |
  
  **결론**: Nodriver MCP는 모든 웹 자동화 도구 중 최고의 봇 탐지 우회 성능을 제공합니다.
  
  ### 💡 추가 기능들
  { "tool": "mcp__nodriver-opensearch__get_elements", "parameters": {"selector": ".product-item", "limit": 5} }
  { "tool": "mcp__nodriver-opensearch__extract_data", "parameters": {
    "container_selector": ".product-list",
    "item_selector": ".product-item",
    "fields": {
      "title": ".product-title",
      "price": ".price",
      "rating": ".rating"
    }
  }}
  
  주의사항:
  1. 브라우저를 start_browser로 시작한 후 반드시 stop_browser로 종료해야 합니다
  2. 모든 스크린샷은 D:/cursorwork/test_file/ 폴더에 저장됩니다
  3. 봇 탐지 우회를 위해 적절한 대기 시간(wait_time)을 설정하세요
  4. CSS 선택자는 정확히 입력해야 요소를 찾을 수 있습니다
  5. 복잡한 페이지에서는 JavaScript 실행을 통해 동적 콘텐츠를 확인하세요
  
  ## 19. 에러 발생 시 문서화
  오류 발생 시:
  - logs 폴더에 에러 로그 저장
  - project_plan.md에 문제점과 해결방안 기록

  20. 작업 전 확인 문구 의무화
  "docs/project_plan.md 확인 및 업데이트 완료 후 작업 진행합니다"
  라는 문구를 모든 작업 시작 시 명시
  
  21. Git 커밋/푸시 시 확인 의무화
  Git 온라인 서버에 커밋/푸시할 때는 현재 작업 폴더 루트의 내용이 올바른지 사용자에게 확인받을 것:
  "현재 폴더의 파일들을 온라인 서버에 올려도 되는지 확인해주세요" 라고 물어본 후 진행


## 클로드 코드에서의 mcp-installer를 사용한 MCP (Model Context Protocol) 설치 및 설정 가이드 
공통 주의사항
1. 현재 사용 환경을 확인할 것. 모르면 사용자에게 물어볼 것. 
2. OS(윈도우,리눅스,맥) 및 환경들(WSL,파워셀,명령프롬프트등)을 파악해서 그에 맞게 세팅할 것. 모르면 사용자에게 물어볼 것.
3. mcp-installer을 이용해 필요한 MCP들을 설치할 것
   (user 스코프로 설치 및 적용할것)
4. 특정 MCP 설치시, 바로 설치하지 말고, WebSearch 도구로 해당 MCP의 공식 사이트 확인하고 현재 OS 및 환경 매치하여, 공식 설치법부터 확인할 것
5. 공식 사이트 확인 후에는 context7 MCP 존재하는 경우, context7으로 다시 한번 확인할 것
6. MCP 설치 후, task를 통해 디버그 모드로 서브 에이전트 구동한 후, /mcp 를 통해 실제 작동여부를 반드시 확인할 것 
7. 설정 시, API KEY 환경 변수 설정이 필요한 경우, 가상의 API 키로 디폴트로 설치 및 설정 후, 올바른 API 키 정보를 입력해야 함을 사용자에게 알릴 것
8. Mysql MCP와 같이 특정 서버가 구동중 상태여만 정상 작동한 것은 에러가 나도 재설치하지 말고, 정상 구동을 위한 조건을 사용자에게 알릴 것
9. 현재 클로드 코드가 실행되는 환경이야.
10. 설치 요청 받은 MCP만 설치하면 돼. 혹시 이미 설치된 다른 MCP 에러 있어도, 그냥 둘 것
11. 일단, 터미널에서 설치하려는 MCP 작동 성공한 경우, 성공 시의 인자 및 환경 변수 이름을 활용해, 올바른 위치의 json 파일에 MCP 설정을 직접할 것
12. WSL sudo 패스워드: qsc1445! (WSL 환경인 경우에만 해당)

*윈도우에서의 주의사항*
1. 설정 파일 직접 세팅시, Windows 경로 구분자는 백슬래시(\)이며, JSON 내에서는 반드시 이스케이프 처리(\\\\)해야 해.
** OS 공통 주의사항**
1. Node.js가 %PATH%에 등록되어 있는지, 버전이 최소 v18 이상인지 확인할 것
2. npx -y 옵션을 추가하면 버전 호환성 문제를 줄일 수 있음

### MCP 서버 설치 순서

1. 기본 설치
	mcp-installer를 사용해 설치할 것

2. 설치 후 정상 설치 여부 확인하기	
	claude mcp list 으로 설치 목록에 포함되는지 내용 확인한 후,
	task를 통해 디버그 모드로 서브 에이전트 구동한 후 (claude --debug), 최대 2분 동안 관찰한 후, 그 동안의 디버그 메시지(에러 시 관련 내용이 출력됨)를 확인하고 /mcp 를 통해(Bash(echo "/mcp" | claude --debug)) 실제 작동여부를 반드시 확인할 것

3. 문제 있을때 다음을 통해 직접 설치할 것

	*User 스코프로 claude mcp add 명령어를 통한 설정 파일 세팅 예시*
	예시1:
	claude mcp add --scope user youtube-mcp \
	  -e YOUTUBE_API_KEY=$YOUR_YT_API_KEY \

	  -e YOUTUBE_TRANSCRIPT_LANG=ko \
	  -- npx -y youtube-data-mcp-server


4. 정상 설치 여부 확인 하기
	claude mcp list 으로 설치 목록에 포함되는지 내용 확인한 후,
	task를 통해 디버그 모드로 서브 에이전트 구동한 후 (claude --debug), 최대 2분 동안 관찰한 후, 그 동안의 디버그 메시지(에러 시 관련 내용이 출력됨)를 확인하고, /mcp 를 통해(Bash(echo "/mcp" | claude --debug)) 실제 작동여부를 반드시 확인할 것


5. 문제 있을때 공식 사이트 다시 확인후 권장되는 방법으로 설치 및 설정할 것
	(npm/npx 패키지를 찾을 수 없는 경우) pm 전역 설치 경로 확인 : npm config get prefix
	권장되는 방법을 확인한 후, npm, pip, uvx, pip 등으로 직접 설치할 것

	#### uvx 명령어를 찾을 수 없는 경우
	# uv 설치 (Python 패키지 관리자)
	curl -LsSf https://astral.sh/uv/install.sh | sh

	#### npm/npx 패키지를 찾을 수 없는 경우
	# npm 전역 설치 경로 확인
	npm config get prefix


	#### uvx 명령어를 찾을 수 없는 경우
	# uv 설치 (Python 패키지 관리자)
	curl -LsSf https://astral.sh/uv/install.sh | sh


	## 설치 후 터미널 상에서 작동 여부 점검할 것 ##
	
	## 위 방법으로, 터미널에서 작동 성공한 경우, 성공 시의 인자 및 환경 변수 이름을 활용해서, 클로드 코드의 올바른 위치의 json 설정 파일에 MCP를 직접 설정할 것 ##


	설정 예시
		(설정 파일 위치)
		**리눅스, macOS 또는 윈도우 WSL 기반의 클로드 코드인 경우**
		- **User 설정**: `~/.claude/` 디렉토리
		- **Project 설정**: 프로젝트 루트/.claude

		**윈도우 네이티브 클로드 코드인 경우**
		- **User 설정**: `C:\Users\{사용자명}\.claude` 디렉토리
		- *User 설정파일*  C:\Users\{사용자명}\.claude.json
		- **Project 설정**: 프로젝트 루트\.claude

		1. npx 사용

		{
		  "youtube-mcp": {
		    "type": "stdio",
		    "command": "npx",
		    "args": ["-y", "youtube-data-mcp-server"],
		    "env": {
		      "YOUTUBE_API_KEY": "YOUR_API_KEY_HERE",
		      "YOUTUBE_TRANSCRIPT_LANG": "ko"
		    }
		  }
		}


		2. cmd.exe 래퍼 + 자동 동의)
		{
		  "mcpServers": {
		    "mcp-installer": {
		      "command": "cmd.exe",
		      "args": ["/c", "npx", "-y", "@anaisbetts/mcp-installer"],
		      "type": "stdio"
		    }
		  }
		}

		3. 파워셀예시
		{
		  "command": "powershell.exe",
		  "args": [
		    "-NoLogo", "-NoProfile",
		    "-Command", "npx -y @anaisbetts/mcp-installer"
		  ]
		}

		4. npx 대신 node 지정
		{
		  "command": "node",
		  "args": [
		    "%APPDATA%\\npm\\node_modules\\@anaisbetts\\mcp-installer\\dist\\index.js"
		  ]
		}

		5. args 배열 설계 시 체크리스트
		토큰 단위 분리: "args": ["/c","npx","-y","pkg"] 와
			"args": ["/c","npx -y pkg"] 는 동일해보여도 cmd.exe 내부에서 따옴표 처리 방식이 달라질 수 있음. 분리가 안전.
		경로 포함 시: JSON에서는 \\ 두 번. 예) "C:\\tools\\mcp\\server.js".
		환경변수 전달:
			"env": { "UV_DEPS_CACHE": "%TEMP%\\uvcache" }
		타임아웃 조정: 느린 PC라면 MCP_TIMEOUT 환경변수로 부팅 최대 시간을 늘릴 수 있음 (예: 10000 = 10 초) 

**중요사항**
	윈도우 네이티브 환경이고 MCP 설정에 어려움이 있는데 npx 환경이라면, cmd나 node 등으로 다음과 같이 대체해 볼것:
	{
	"mcpServers": {
	      "context7": {
		 "command": "cmd",
		 "args": ["/c", "npx", "-y", "@upstash/context7-mcp@latest"]
	      }
	   }
	}

	claude mcp add-json context7 -s user '{"type":"stdio","command":"cmd","args": ["/c", "npx", "-y", "@upstash/context7-mcp@latest"]}'

(설치 및 설정한 후는 항상 아래 내용으로 검증할 것)
	claude mcp list 으로 설치 목록에 포함되는지 내용 확인한 후,
	task를 통해 디버그 모드로 서브 에이전트 구동한 후 (claude --debug), 최대 2분 동안 관찰한 후, 그 동안의 디버그 메시지(에러 시 관련 내용이 출력됨)를 확인하고 /mcp 를 통해 실제 작동여부를 반드시 확인할 것

		
** MCP 서버 제거가 필요할 때 예시: **
claude mcp remove youtube-mcp


## 윈도우 네이티브 클로드 코드에서 클로드 데스크탑의 MCP 가져오는 방법 ###

"C:\Users\<사용자이름>\AppData\Roaming\Claude\claude_desktop_config.json" 이 파일이 존재한다면 클로드 데스크탑이 설치된 상태야.
이 파일의 mcpServers 내용을 클로드 코드 설정 파일(C:\Users\{사용자명}\.claude.json)의 user 스코프 위치(projects 항목에 속하지 않은 mcpServers가 user 스코프에 해당)로 그대로 가지고 오면 돼.
가지고 온 후, task를 통해 디버그 모드로 서브 에이전트 구동하여 (claude --debug) 클로드 코드에 문제가 없는지 확인할 것

또 C:\Users\<사용자이름>\AppData\Roaming\Claude\Claude Extensions\ -> 이 경로를 조회하면 mcp들이 있을 수 있어. 해당 mcp로 들어가면 manifest.json 파일이 존재해. 이걸 기반으로 네이티브 클로드로 가지고 올 수 있어.
(이렇게 가져오는 경우, 툴즈 정보를 보고, 해당 MCP 사용법을 CLAUDE.md 끝에 추가해줘)

## MySQL MCP Server 사용 예시

// MySQL MCP Server를 사용한 데이터베이스 조작 예시
// 기본 조회 명령어 (READ-ONLY, 기본 설정)
{ "tool": "mcp__mysql-server__mysql_query", "parameters": {"sql": "SHOW DATABASES;"} }
{ "tool": "mcp__mysql-server__mysql_query", "parameters": {"sql": "SHOW TABLES;"} }
{ "tool": "mcp__mysql-server__mysql_query", "parameters": {"sql": "SELECT * FROM users LIMIT 5;"} }
{ "tool": "mcp__mysql-server__mysql_query", "parameters": {"sql": "DESCRIBE users;"} }
{ "tool": "mcp__mysql-server__mysql_query", "parameters": {"sql": "SELECT COUNT(*) FROM users;"} }

// 만약 ALLOW_INSERT_OPERATION=true로 설정한 경우 (삽입 가능)
{ "tool": "mcp__mysql-server__mysql_query", "parameters": {"sql": "INSERT INTO users (name, email) VALUES ('test', 'test@example.com');"} }

// 만약 ALLOW_UPDATE_OPERATION=true로 설정한 경우 (업데이트 가능)
{ "tool": "mcp__mysql-server__mysql_query", "parameters": {"sql": "UPDATE users SET name='updated' WHERE id=1;"} }

// 만약 ALLOW_DELETE_OPERATION=true로 설정한 경우 (삭제 가능)
{ "tool": "mcp__mysql-server__mysql_query", "parameters": {"sql": "DELETE FROM users WHERE id=1;"} }

// 다중 데이터베이스 사용 (전체 경로명 사용)
{ "tool": "mcp__mysql-server__mysql_query", "parameters": {"sql": "SELECT * FROM database_name.table_name;"} }
{ "tool": "mcp__mysql-server__mysql_query", "parameters": {"sql": "USE database_name; SELECT * FROM table_name;"} }

// 조인 쿼리 예시
{ "tool": "mcp__mysql-server__mysql_query", "parameters": {"sql": "SELECT u.name, p.title FROM users u JOIN posts p ON u.id = p.user_id LIMIT 10;"} }

주의사항:
1. MySQL 서버가 실제로 구동 중이어야 MCP 서버가 연결됩니다
2. 기본 설정은 READ-ONLY (SELECT만 가능)
3. INSERT/UPDATE/DELETE 작업을 위해서는 환경변수에서 해당 권한을 true로 설정해야 합니다
4. 환경변수 설정: MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASS, MYSQL_DB
5. 보안상 이유로 모든 쓰기 작업은 기본적으로 비활성화되어 있습니다


Shrimp Task Manager 사용법
1. init_project_rules
기능: 프로젝트별 코딩 표준과 규칙을 생성하거나 업데이트합니다. 새로운 규칙 세트를 만들어 이후 작업에 일관성을 부여합니다.
예시: { "tool": "init_project_rules", "parameters": {} }


2. plan_task
기능: 사용자 요구사항을 바탕으로 작업들을 계획합니다. 
전체 목표를 달성하기 위한 세부 개발 작업 목록을 작성하며, 각 작업의 설명과 완료 조건을 정의합니다. 
(내부적으로 신규 작업들을 생성하여 Task Manager에 등록)
예시: { "tool": "plan_task", "parameters": { "description": "사용자 로그인 기능 추가" } }

3. analyze_task
기능: 계획된 작업이나 요구사항을 깊이 있게 분석합니다. 
관련 코드베이스를 검토하여 기술적 구현 가능성을 평가하고 잠재적 위험 요소를 식별합니다. 
필요한 경우 핵심 부분에 대한 의사코드(pseudocode) 형태의 예시를 제시합니다.
예시: { "tool": "analyze_task", "parameters": {} } (현재 컨텍스트의 작업을 분석)

4. process_thought
기능: 복잡한 문제를 단계적으로 사고하기 위한 추론 도구입니다. 
작업 계획 중 여러 단계의 논리적 사고 과정을 거쳐야 할 때 사용됩니다. 
각 단계마다 가설을 세우고 검증하며, 생각을 체계적으로 전개하도록 돕습니다.
예시: { "tool": "process_thought", "parameters": {} } (다음 단계의 사고를 진행)


5. reflect_task
기능: 앞서 수행한 분석 결과나 해결책에 대해 반성적 평가를 합니다. 
해결 방안의 완전성을 검토하고 최적화 기회를 찾습니다. 
최종 계획이 모범 사례에 부합하는지 점검하며, 개선이 필요한 부분을 식별합니다.
예시: { "tool": "reflect_task", "parameters": {} } (현재 계획에 대한 개선점 도출)

6. split_tasks
기능: 하나의 큰 작업을 여러 개의 하위 작업으로 분할합니다. 
복잡한 작업의 경우 논리적으로 독립적인 작은 작업들로 쪼개어 처리하며, 이 과정에서 작업 간 의존 관계와 우선순위도 함께 지정합니다. 
기존 작업 목록에 새로운 작업을 추가할 때는 추가(append), 덮어쓰기(overwrite), 선택적 갱신(selective), 전체 초기화(clearAllTasks) 네 가지 모드로 업데이트할 수 있습니다 
(기본적으로 새로운 계획 수립 시에는 clearAllTasks 모드를 사용하여 이전 미완료 작업을 모두 백업 후 제거하고 새로 작성).
예시: { "tool": "split_tasks", "parameters": { "mode": "append", "tasks": [ { "name": "DB 스키마 변경", "description": "사용자 테이블에 비밀번호 해시 필드 추가" } ] } }

7. list_tasks
기능: 현재 모든 작업 목록을 요약해서 보여줍니다. 
각각의 작업 ID, 이름, 상태(예: 진행 전, 진행 중, 완료), 우선순위, 의존 관계 등을 표 형태로 출력합니다.
예시: { "tool": "list_tasks", "parameters": {} }


8. query_task
기능: 작업 목록에서 키워드 혹은 ID로 특정 작업들을 검색합니다. 
일치하는 작업들의 간략한 정보를 리스트업해줍니다.
예시: { "tool": "query_task", "parameters": { "keyword": "로그인" } } (이 경우 "로그인"과 관련된 작업들을 검색)


9. get_task_detail
기능: 특정 작업의 상세 정보를 가져옵니다. 
작업 ID를 입력하면 해당 작업의 전체 내용(설명, 세부 구현 가이드, 성공 기준, 의존성 등)을 출력합니다. 
긴 내용도 모두 표시하여 사용자가 작업에 대한 완전한 맥락을 파악할 수 있게 해줍니다.
예시: { "tool": "get_task_detail", "parameters": { "id": "TASK-2025-0001" } }


10. delete_task
기능: 지정한 미완료 작업을 삭제합니다. 잘못 생성되었거나 더 이상 필요 없는 작업을 정리할 때 사용합니다. (이미 완료된 작업은 삭제 불가하여 기록이 보존됩니다.)
예시: { "tool": "delete_task", "parameters": { "id": "TASK-2025-0003" } }


11. execute_task
기능: 특정 ID(또는 이름)의 작업을 실행합니다. 
Task Manager에 등록된 해당 작업의 구현 절차를 진행하며, 필요한 경우 소스코드를 수정하거나 커맨드를 실행합니다. 
실행 완료 후 작업 상태를 업데이트하고 결과 요약을 제공합니다. (만약 파라미터를 비워 호출하면 남아있는 최고 우선순위 작업을 자동으로 선택하여 실행합니다.)
예시: { "tool": "execute_task", "parameters": { "id": "TASK-2025-0001" } }


12. verify_task
기능: 완료된 작업이 요구사항을 충족하는지 검증합니다. 작업의 성공 기준에 따라 결과물을 검사하고 누락된 부분이나 문제가 없는지 확인합니다. 
검증 결과 만족스럽지 않으면 관련 피드백을 제시하고, 만족하면 다음 단계로 넘어갑니다.
예시: { "tool": "verify_task", "parameters": { "id": "TASK-2025-0001" } }


13. complete_task
기능: 해당 작업을 완료 상태로 표시하고 마무리합니다. 
작업 완료 보고서를 생성하고, 다른 작업들이 이 작업을 의존하고 있었다면 그 제약을 해제하여 앞으로 수행 가능하도록 업데이트합니다. 
(일반적으로 execute_task와 verify_task를 성공적으로 마친 뒤 내부적으로 호출됩니다.)
예시: { "tool": "complete_task", "parameters": { "id": "TASK-2025-0001" } }


Shrimp Task Manager의 TaskPlanner 모드 역할:
당신은 “TaskPlanner” 역할을 수행하는 AI 비서입니다.
사용자가 제시한 요구사항이나 기능 요청을 기반으로, Shrimp Task Manager의 plan_task 도구만을 사용하여
“작업 목록”을 체계적으로 작성하세요.
- 절대로 코드 실행(execute_task)이나 수정, 터미널 명령 등을 수행하지 마세요.
- 각 작업(task)은 1–2일 내에 완료할 수 있는 단위로 쪼개고, 최대 10개 이하로 나누세요.
- 각 작업에는 명확한 완료 기준(acceptance criteria)을 반드시 포함하세요.
- 작업 간 의존 관계(dependencies)도 함께 식별해 명시하세요.
- pseudocode나 구현 가이드는 포함하지 말고, 오직 작업 이름·설명·완료 기준·의존 관계만 작성하세요.
예시 사용자 요청: “사용자 프로필 편집 기능 추가”
→ plan_task 도구 호출로 작업 리스트를 반환합니다.



Shrimp Task Manager의 TaskExecutor 모드 역할:
당신은 “TaskExecutor” 역할을 수행하는 AI 비서입니다.
Shrimp Task Manager의 execute_task, verify_task, complete_task 도구를 사용해
이미 계획된 각 작업을 실행하고 검증하세요.

- 절대로 새로운 작업 계획(plan_task)이나 분석(analyze_task) 단계를 수행하지 마세요.
- “execute_task” 도구로 지정된 작업을 실행하고, 결과를 간결히 보고하세요.
- 실행이 끝나면 “verify_task” 도구로 검증 기준을 점검하고, 부족한 부분이 있으면 피드백을 제시하세요.
- 검증을 통과하면 “complete_task” 도구로 작업을 완료 상태로 표시하세요.
- 터미널 명령이나 파일 수정이 필요하다면 Claude Desktop의 기본 MCP 도구(terminal, write_file 등)를 적절히 사용하세요.
- 각 단계별 결과만 간결히 출력하고, 중간 디버그 로그는 포함하지 마세요.

예시 명령: `{ "tool": "execute_task", "parameters": { "id": "TASK-2025-0001" } }`
→ 작업 실행 후 검증, 완료까지 차례대로 수행합니다.

# 제미나이 웹 자동화 프로젝트 가이드라인

## 📋 프로젝트 개요
API 없이 제미나이(Gemini) 웹 인터페이스를 자동화하여 질문-답변 시스템을 구축하는 프로젝트

### 🎯 목표
- gemini.google.com 웹 인터페이스 직접 제어
- API 키 없이 제미나이 활용
- 다양한 브라우저 환경에서 동작
- 크로스 플랫폼 호환성

### 🛠️ 기술 스택
- **Tampermonkey 스크립트**: 브라우저 확장 자동화
- **Chrome 확장 프로그램**: 네이티브 브라우저 통합
- **웹 애플리케이션**: HTML/CSS/JavaScript 기반
- **북마클릿**: 간단한 원클릭 실행

## 🚀 SuperClaude 명령어 활용 패턴

### 개발 단계별 최적 명령어
1. **프로젝트 분석**: `/sc:analyze` (analyzer, architect 페르소나)
2. **시스템 설계**: `/sc:design` (architect, frontend 페르소나)
3. **기능 구현**: `/sc:implement` (frontend, security 페르소나)
4. **코드 개선**: `/sc:improve` (refactorer, performance 페르소나)
5. **테스트 실행**: `/sc:test` (qa 페르소나)
6. **문제 해결**: `/sc:troubleshoot` (analyzer, qa 페르소나)
7. **문서 작성**: `/sc:document` (scribe, mentor 페르소나)

### MCP 서버 통합
- **Context7**: 라이브러리 패턴 및 베스트 프랙티스 연구
- **Sequential**: 복잡한 분석 및 단계별 추론
- **Magic**: UI 컴포넌트 생성 (필요시)
- **Playwright**: 브라우저 자동화 테스트

## 📁 프로젝트 디렉토리 구조
```
D:\cursorwork\
├── gemini-automation/           # 메인 프로젝트 폴더
│   ├── tampermonkey/           # Tampermonkey 스크립트들
│   ├── chrome-extension/       # Chrome 확장 프로그램
│   ├── web-app/               # 웹 애플리케이션
│   ├── bookmarklets/          # 북마클릿 코드
│   └── README.md              # 프로젝트 소개
├── test_file/                 # 테스트 결과 및 스크린샷
└── docs/                      # 프로젝트 문서
```

## ⚡ Shrimp Task Manager 워크플로우

### 작업 계획 → 실행 → 검증 사이클
1. **init_project_rules**: 프로젝트 코딩 표준 설정
2. **plan_task**: 전체 요구사항 분석 및 계획 수립
3. **split_tasks**: 실행 가능한 작업 단위로 분할
4. **execute_task**: 개별 작업 실행 (SuperClaude 명령어와 연동)
5. **verify_task**: 완료 기준 검증
6. **list_tasks**: 진행 상황 추적

### 각 작업 실행 패턴
```
Shrimp: execute_task → SuperClaude: /sc:implement → SuperClaude: /sc:test → Shrimp: verify_task
```

## 🧪 테스트 및 검증 방법

### 브라우저 자동화 테스트
- **Playwright-stealth**: 기본 웹 자동화 도구
- **Nodriver MCP**: 봇 탐지 우회가 필요한 경우
- **DOM 조작 검증**: CSS 선택자 기반 요소 제어
- **크로스 브라우저 테스트**: Chrome, Firefox, Edge 호환성

### 테스트 시나리오
1. gemini.google.com 접속
2. 구글 계정 로그인
3. 질문 입력창 식별 및 텍스트 입력
4. 답변 대기 및 결과 추출
5. 스크린샷 저장 및 검증

## 🔒 보안 및 주의사항

### 봇 탐지 우회
- 적절한 대기 시간 설정 (3초 권장)
- User-Agent 정상화
- 자연스러운 마우스/키보드 이벤트
- 세션 관리 및 쿠키 처리

### 계정 보안
- 개인 구글 계정 정보 보호
- 자동 로그인 설정 시 주의
- 로그 파일에 민감 정보 기록 금지

## 📊 성공 기준 및 검증 방법

### 기능적 요구사항
- ✅ gemini.google.com 자동 접속
- ✅ 질문 텍스트 자동 입력
- ✅ 답변 결과 자동 추출
- ✅ 결과 로컬 저장

### 성능 요구사항
- ✅ 응답 대기 시간 < 30초
- ✅ 봇 탐지 우회 성공률 > 90%
- ✅ 크로스 브라우저 호환성
- ✅ 에러 복구 및 재시도 기능

## 🔄 개발 우선순위

### Phase 1: 기본 기능 (1-2일)
1. Tampermonkey 스크립트 기본 버전
2. DOM 요소 식별 및 자동 입력
3. 기본 답변 추출 기능

### Phase 2: 고급 기능 (2-3일)
1. Chrome 확장 프로그램 개발
2. 에러 처리 및 재시도 로직
3. 사용자 인터페이스 개선

### Phase 3: 최적화 (1-2일)
1. 성능 최적화
2. 크로스 브라우저 호환성
3. 문서화 및 배포 준비
