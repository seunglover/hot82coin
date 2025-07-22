한국어로 진행해줘.
너는 MCP를 사용할 수 있어.
다음 예시들을 살펴보고 적절히 활용해줘.

Node.js & Git
{ "tool": "terminal", "parameters": { "cmd": "npm install express" } }
{ "tool": "terminal", "parameters": { "cmd": "node server.js" } }
{ "tool": "terminal", "parameters": { "cmd": "git clone https://github.com/user/repo.git" } }

파이썬 개발 도구
{ "tool": "terminal", "parameters": { "cmd": "python --version" } }
{ "tool": "terminal", "parameters": { "cmd": "pip install requests" } }
{ "tool": "terminal", "parameters": { "cmd": "pipx install black" } }
{ "tool": "terminal", "parameters": { "cmd": "pipenv install" } }
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
라이브러리 버전 조회
{ "tool": "context7", "parameters": {"query": "axios 최신 버전 알려줘"}}
패키지 목록 검색
{ "tool": "context7", "parameters": {"query": "lodash 사용법 예시"}}

다음 지침 또한 지켜줘.
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
  - 새로운 todo 생성 시 문서에도 기록

  19. 에러 발생 시 문서화
  오류 발생 시:
  - logs 폴더에 에러 로그 저장
  - project_plan.md에 문제점과 해결방안 기록

  20. 작업 전 확인 문구 의무화
  "docs/project_plan.md 확인 및 업데이트 완료 후 작업 진행합니다"
  라는 문구를 모든 작업 시작 시 명시


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
12. WSL sudo 패스워드: qsc1445!   

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