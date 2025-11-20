#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
뉴스 크롤링 스케줄러
15분마다 자동으로 Coinness 뉴스를 크롤링하여 JSON 업데이트

사용법:
1. python news_scheduler.py          # 한번만 실행
2. python news_scheduler.py --daemon # 백그라운드에서 계속 실행
"""

import asyncio
import schedule
import time
import argparse
from datetime import datetime
from python_coinness_crawler import CoinnessNewsCrawler

class NewsScheduler:
    def __init__(self):
        self.crawler = CoinnessNewsCrawler()
        self.is_running = False
    
    async def crawl_job(self):
        """크롤링 작업 실행"""
        if self.is_running:
            print("이전 크롤링이 아직 진행 중입니다. 스킵합니다.")
            return
        
        self.is_running = True
        try:
            print(f"\n[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] 뉴스 크롤링 시작")
            await self.crawler.crawl_news()
            print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] 크롤링 완료\n")
        except Exception as e:
            print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] 크롤링 실패: {e}\n")
        finally:
            self.is_running = False
    
    def run_job_sync(self):
        """동기 wrapper"""
        asyncio.run(self.crawl_job())
    
    def start_scheduler(self, daemon=False):
        """스케줄러 시작"""
        print("뉴스 크롤링 스케줄러 시작")
        print("15분마다 자동 실행")
        
        # 15분마다 실행
        schedule.every(15).minutes.do(self.run_job_sync)
        
        # 즉시 한번 실행
        print("첫 번째 크롤링 실행...")
        self.run_job_sync()
        
        if daemon:
            print("데몬 모드: 백그라운드에서 계속 실행됩니다.")
            print("   중지하려면 Ctrl+C를 누르세요.")
            
            try:
                while True:
                    schedule.run_pending()
                    time.sleep(60)  # 1분마다 체크
            except KeyboardInterrupt:
                print("\n스케줄러 종료됨")
        else:
            print("한번만 실행 완료")

def main():
    parser = argparse.ArgumentParser(description='Coinness 뉴스 크롤링 스케줄러')
    parser.add_argument('--daemon', action='store_true', 
                       help='백그라운드에서 계속 실행 (15분 간격)')
    
    args = parser.parse_args()
    
    scheduler = NewsScheduler()
    scheduler.start_scheduler(daemon=args.daemon)

if __name__ == "__main__":
    main()