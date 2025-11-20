#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
뉴스 크롤러 설치 스크립트
필요한 패키지를 자동으로 설치하고 설정

실행: python setup_news_crawler.py
"""

import subprocess
import sys
import os
from pathlib import Path

def install_package(package):
    """패키지 설치"""
    try:
        print(f"📦 {package} 설치 중...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", package])
        print(f"✅ {package} 설치 완료")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {package} 설치 실패: {e}")
        return False

def install_playwright_browsers():
    """Playwright 브라우저 설치"""
    try:
        print("🌐 Playwright 브라우저 설치 중...")
        subprocess.check_call([sys.executable, "-m", "playwright", "install", "chromium"])
        print("✅ Chromium 브라우저 설치 완료")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ 브라우저 설치 실패: {e}")
        return False

def create_batch_file():
    """Windows 배치 파일 생성"""
    current_dir = Path(__file__).parent
    batch_content = f"""@echo off
cd /d "{current_dir}"
echo 🚀 Coinness 뉴스 크롤러 시작...
python news_scheduler.py --daemon
pause
"""
    
    batch_file = current_dir / "start_news_crawler.bat"
    with open(batch_file, 'w', encoding='utf-8') as f:
        f.write(batch_content)
    
    print(f"✅ 배치 파일 생성: {batch_file}")
    return batch_file

def main():
    print("🔧 Coinness 뉴스 크롤러 설치 시작")
    print("=" * 50)
    
    # 필수 패키지 목록
    packages = [
        "playwright",
        "schedule",
        "asyncio"
    ]
    
    # 패키지 설치
    success_count = 0
    for package in packages:
        if install_package(package):
            success_count += 1
    
    if success_count == len(packages):
        print("✅ 모든 패키지 설치 완료")
    else:
        print("⚠️ 일부 패키지 설치 실패")
        return
    
    # Playwright 브라우저 설치
    if install_playwright_browsers():
        print("✅ 브라우저 설치 완료")
    else:
        print("⚠️ 브라우저 설치 실패")
        return
    
    # 배치 파일 생성 (Windows용)
    if os.name == 'nt':
        batch_file = create_batch_file()
        print(f"📁 Windows 사용자는 {batch_file.name}을 실행하세요")
    
    print("\n" + "=" * 50)
    print("🎉 설치 완료!")
    print("\n📋 사용법:")
    print("1. 한번만 실행: python news_scheduler.py")
    print("2. 백그라운드 실행: python news_scheduler.py --daemon")
    if os.name == 'nt':
        print("3. Windows: start_news_crawler.bat 더블클릭")
    
    print("\n📄 결과 파일: news_data.json")
    print("⏱️ 업데이트 주기: 15분")

if __name__ == "__main__":
    main()