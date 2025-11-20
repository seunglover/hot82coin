// Coinness.com 실시간 뉴스 크롤러 
// Nodriver MCP 사용 버전

const fs = require('fs');
const path = require('path');

class CoinnessRealtimeCrawler {
    constructor() {
        this.baseUrl = 'https://coinness.com/news';
        this.results = [];
        this.logFile = path.join(__dirname, 'realtime_crawler_log.txt');
        this.dataFile = path.join(__dirname, 'coinness_realtime_data.json');
        this.maxRetries = 3;
        this.delay = 6000; // 6초 대기 (봇 탐지 방지)
    }

    log(message) {
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] ${message}\n`;
        console.log(message);
        fs.appendFileSync(this.logFile, logEntry, 'utf8');
    }

    // 지연 함수
    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // 뉴스 데이터 추출 함수 (MCP 도구 연동용)
    extractNewsData(htmlContent) {
        // HTML 파싱 로직 (실제로는 MCP 도구의 결과를 처리)
        // 여기서는 구조만 제공
        
        const newsItems = [];
        
        try {
            // CSS 선택자를 통한 데이터 추출 시뮬레이션
            // 실제로는 mcp__nodriver-opensearch__extract_data 결과 처리
            
            this.log('📊 뉴스 데이터 추출 중...');
            
            // 샘플 데이터 구조
            const sampleNews = {
                id: Date.now().toString(),
                title: '[테스트] 비트코인 가격 변동 분석',
                link: 'https://coinness.com/news/sample-123',
                publishTime: new Date().toISOString(),
                category: '비트코인',
                summary: '테스트용 뉴스 요약입니다.',
                extractTime: new Date().toISOString()
            };
            
            newsItems.push(sampleNews);
            
        } catch (error) {
            this.log(`❌ 데이터 추출 오류: ${error.message}`);
        }
        
        return newsItems;
    }

    // 데이터 검증 함수
    validateNewsData(newsItem) {
        const required = ['title', 'link', 'publishTime'];
        
        for (const field of required) {
            if (!newsItem[field]) {
                this.log(`⚠️ 필수 필드 누락: ${field}`);
                return false;
            }
        }
        
        return true;
    }

    // 중복 제거 함수
    removeDuplicates(newsArray) {
        const seen = new Set();
        return newsArray.filter(item => {
            const key = item.link || item.title;
            if (seen.has(key)) {
                return false;
            }
            seen.add(key);
            return true;
        });
    }

    // 메인 크롤링 함수
    async crawlCoinness() {
        this.log('🚀 Coinness 실시간 크롤링 시작');
        
        let attempt = 0;
        let allNews = [];
        
        while (attempt < this.maxRetries) {
            try {
                attempt++;
                this.log(`📡 크롤링 시도 ${attempt}/${this.maxRetries}`);
                
                // 실제 크롤링은 여기서 MCP 도구 호출
                // 지금은 테스트용 데이터 생성
                await this.sleep(this.delay);
                
                // 샘플 HTML 콘텐츠 (실제로는 MCP 결과)
                const htmlContent = '<html>...</html>';
                
                const extractedNews = this.extractNewsData(htmlContent);
                
                // 데이터 검증
                const validNews = extractedNews.filter(news => 
                    this.validateNewsData(news)
                );
                
                allNews = allNews.concat(validNews);
                
                this.log(`✅ ${validNews.length}개 뉴스 수집 완료`);
                break;
                
            } catch (error) {
                this.log(`❌ 크롤링 실패 (${attempt}/${this.maxRetries}): ${error.message}`);
                
                if (attempt < this.maxRetries) {
                    this.log(`⏳ ${this.delay/1000}초 후 재시도...`);
                    await this.sleep(this.delay);
                } else {
                    throw new Error('최대 재시도 횟수 초과');
                }
            }
        }

        // 중복 제거
        allNews = this.removeDuplicates(allNews);

        // 결과 데이터 구성
        const resultData = {
            crawlTime: new Date().toISOString(),
            source: 'coinness.com/news',
            totalNews: allNews.length,
            attempts: attempt,
            news: allNews,
            metadata: {
                userAgent: 'Nodriver-MCP-Crawler/1.0',
                delays: this.delay,
                maxRetries: this.maxRetries
            }
        };

        // 결과 저장
        fs.writeFileSync(this.dataFile, JSON.stringify(resultData, null, 2), 'utf8');
        this.log(`💾 데이터 저장 완료: ${this.dataFile}`);

        return resultData;
    }

    // 크롤링 결과 요약
    printResults(data) {
        console.log('\n📋 크롤링 결과 요약:');
        console.log(`- 총 뉴스 수: ${data.totalNews}`);
        console.log(`- 크롤링 시간: ${data.crawlTime}`);
        console.log(`- 시도 횟수: ${data.attempts}/${this.maxRetries}`);
        console.log(`- 데이터 파일: ${this.dataFile}`);
        console.log(`- 로그 파일: ${this.logFile}`);
        
        if (data.news.length > 0) {
            console.log('\n📰 최신 뉴스 미리보기:');
            data.news.slice(0, 3).forEach((news, idx) => {
                console.log(`${idx + 1}. ${news.title}`);
                console.log(`   링크: ${news.link}`);
                console.log(`   시간: ${news.publishTime}`);
            });
        }
    }
}

// 실행 함수
async function runRealtimeCrawler() {
    console.log('🔍 Coinness 실시간 크롤러 테스트');
    
    const crawler = new CoinnessRealtimeCrawler();
    
    try {
        const result = await crawler.crawlCoinness();
        crawler.printResults(result);
        console.log('\n✅ 실시간 크롤링 테스트 완료!');
        
        return result;
        
    } catch (error) {
        console.error('❌ 크롤링 실패:', error.message);
        throw error;
    }
}

// 스크립트 직접 실행 시
if (require.main === module) {
    runRealtimeCrawler();
}

module.exports = CoinnessRealtimeCrawler;