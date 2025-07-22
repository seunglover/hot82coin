/**
 * 다국어 지원 언어 데이터
 */
const i18n = {
    ko: {
        // 헤더
        title: "🔥 지금 핫한 코인 순위",
        subtitle: "해외거래소에서 핫한 코인",
        
        // 메뉴
        menu_all: "전체",
        menu_rising: "급등 코인",
        menu_volume: "거래량 급증",
        menu_longshort: "롱/숏 비율",
        menu_ai: "🔮 AI 추천",
        menu_tips: "꿀팁",
        menu_myinvest: "나의투자유형",
        
        // 1위 코인 정보
        top_coin_label: "🥇 1위 코인:",
        
        // 로딩
        loading_message: "코인 데이터를 불러오는 중...",
        loading_note: "모바일에서는 잠시 기다려주세요",
        
        // 시장 심리 지표
        market_sentiment_label: "📊 시장 심리 지표",
        sentiment_neutral: "중립",
        sentiment_bullish: "강세",
        sentiment_bearish: "약세",
        long_label: "롱:",
        short_label: "숏:",
        
        // 푸터
        realtime_updating: "실시간 반영중",
        next_update: "다음 업데이트:",
        mobile_optimized: "📱 모바일 최적화 | 🔄 5분 자동 업데이트",
        about_link: "📖 사이트 소개",
        privacy_link: "🔒 개인정보처리방침",
        terms_link: "📋 이용약관",
        
        // 모달
        coin_info: "코인 정보",
        
        // 기타
        volume_surge: "거래량 급증",
        volume_high: "거래량 높음",
        ai_pick: "AI PICK",
        rank_new: "NEW",
        no_data: "데이터 없음",
        
        // 테이블 헤더
        rank: "순위",
        coin: "코인명",
        longshort: "롱/숏",
        volume: "거래량",
        change: "변동률",
        chart: "차트",
        interest: "관심도",
        
        // 언어 전환
        language_ko: "한국어",
        language_en: "English",
        
        // 모달 관련
        market_cap: "시가총액",
        volume_24h: "24시간 거래량",
        price_chart_24h: "24시간 가격 변동",
        chart_loading: "실시간 차트 데이터 로딩 중...",
        symbol: "심볼",
        full_symbol: "전체 심볼",
        current_price: "현재가",
        krw_price: "원화 가격",
        
        // 시장 심리 상태
        very_optimistic: "매우 낙관적",
        optimistic: "낙관적",
        very_pessimistic: "매우 비관적",
        pessimistic: "비관적",
        
        // 모달 에러 메시지
        coin_not_found: "이 코인에 대한 정보를 찾을 수 없습니다.",
        searched_symbol: "찾은 심볼",
        available_coins: "사용 가능한 코인",
        
        // 리스트 관련
        long_percent: "롱",
        short_percent: "숏",
        estimated: "추정",
        no_data: "데이터 없음",
        volume_usd: "거래량",
        change_rate: "변동률",
        current_price: "현재가",
        market_cap_usd: "시가총액",
        volume_24h_usd: "24시간 거래량",
        change_24h: "24시간 변동률",
        community_score: "커뮤니티 점수",
        developer_score: "개발자 점수",
        liquidity_score: "유동성 점수",
        category: "카테고리",
        
        // 1위 코인 상태
        volume_explosion: "거래량 폭등",
        volume_surge_status: "거래량 급증",
        skyrocketing: "급등 중",
        rising: "상승 중",
        falling: "하락 중",
        bullish_long: "강세 (롱 우세)",
        bearish_short: "약세 (숏 우세)",
        balanced: "균형",
        active_trading: "거래 활발",
        night_trading: "야간 거래",
        
        // AI 관련
        ai_score: "점",
        long_ratio: "롱비중",
        
        // 이용약관 페이지
        terms_title: "이용약관",
        terms_intro_title: "서비스 이용에 관한 약관",
        terms_intro_subtitle: "최종 업데이트: 2024년 1월 15일",
        terms_intro_main: "🔥 지금 핫한 코인 순위(이하 \"본 사이트\")의 이용약관입니다. 본 사이트를 이용하시기 전에 이 약관을 주의 깊게 읽어보시기 바랍니다.",
        terms_article_1_title: "제1조 (목적)",
        terms_article_1_content: "본 약관은 본 사이트가 제공하는 암호화폐 정보 서비스의 이용과 관련하여 사이트와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.",
        terms_article_2_title: "제2조 (정의)",
        terms_site_def: "사이트",
        terms_site_def_content: "🔥 지금 핫한 코인 순위 웹사이트",
        terms_user_def: "이용자",
        terms_user_def_content: "본 사이트에 접속하여 서비스를 이용하는 모든 사용자",
        terms_service_def: "서비스",
        terms_service_def_content: "암호화폐 정보 제공 및 관련 부가 서비스",
        terms_article_3_title: "제3조 (서비스 내용)",
        terms_realtime_info: "실시간 정보 제공",
        terms_realtime_info_items: ["암호화폐 거래량 순위", "가격 변동 정보", "시장 심리 지표"],
        terms_analysis_tools: "분석 도구",
        terms_analysis_tools_items: ["스파크라인 차트", "AI 추천 시스템", "롱/숏 비율 분석"],
        terms_additional_services: "부가 서비스",
        terms_additional_services_items: ["모바일 최적화", "다크/라이트 모드", "실시간 업데이트"],
        terms_article_4_title: "제4조 (면책사항)",
        terms_disclaimer_intro: "본 사이트는 다음과 같은 경우에 대해 책임을 지지 않습니다:",
        terms_disclaimer_items: [
            "투자 손실: 제공된 정보를 바탕으로 한 투자 결정으로 인한 손실",
            "데이터 오류: API 제공업체의 데이터 오류로 인한 정보 부정확성",
            "서비스 중단: 기술적 문제로 인한 일시적 서비스 중단",
            "제3자 서비스: 외부 API 서비스의 장애로 인한 영향"
        ],
        terms_disclaimer_important: "중요: 본 사이트는 투자 조언을 제공하지 않으며, 모든 투자 결정은 이용자의 판단에 따라 이루어져야 합니다.",
        terms_article_5_title: "제5조 (금지행위)",
        terms_prohibited_intro: "이용자는 다음 행위를 해서는 안 됩니다:",
        terms_prohibited_items: [
            "불법적 이용: 법령에 위배되는 목적으로 서비스 이용",
            "서비스 방해: 서버에 과도한 부하를 주는 행위",
            "정보 무단 사용: 사이트의 정보를 무단으로 복제, 배포",
            "타인 피해: 다른 이용자에게 피해를 주는 행위"
        ],
        terms_article_6_title: "제6조 (개인정보 보호)",
        terms_privacy_content: "개인정보의 수집, 이용, 제공 등에 관한 사항은 개인정보처리방침에 따릅니다.",
        terms_article_7_title: "제7조 (약관 변경)",
        terms_change_content: "본 사이트는 필요에 따라 이 약관을 변경할 수 있습니다. 변경사항은 사이트 내 공지사항을 통해 고지하며, 변경된 약관은 공지 즉시 효력이 발생합니다.",
        terms_article_9_title: "제9조 (시행일)",
        terms_effective_date: "본 약관은 2024년 1월 15일부터 시행합니다.",
        
        // 개인정보처리방침 페이지
        privacy_title: "🔒 개인정보처리방침",
        privacy_intro_title: "개인정보 수집 및 이용에 관한 안내",
        privacy_intro_subtitle: "최종 업데이트: 2024년 1월 15일",
        privacy_intro_main: "🔥 지금 핫한 코인 순위(이하 \"본 사이트\")는 이용자의 개인정보를 중요하게 생각하며, 개인정보보호법을 준수하여 개인정보를 안전하게 보호하고 있습니다.",
        privacy_article_1_title: "📖 제1조 (개인정보 수집 목적)",
        privacy_article_1_content: "본 사이트는 다음과 같은 목적으로 개인정보를 수집합니다:",
        privacy_article_1_items: [
            "서비스 제공: 암호화폐 정보 제공 및 관련 서비스 운영",
            "서비스 개선: 이용자 경험 향상을 위한 서비스 분석 및 개선",
            "기술적 지원: 서비스 오류 해결 및 기술적 문제 대응"
        ],
        privacy_article_2_title: "🔍 제2조 (수집하는 개인정보 항목)",
        privacy_auto_collection: "자동 수집 정보",
        privacy_auto_collection_items: ["IP 주소", "접속 로그", "쿠키 정보", "브라우저 정보"],
        privacy_optional_collection: "선택적 수집 정보",
        privacy_optional_collection_items: ["언어 설정", "테마 설정", "사용자 선호도"],
        privacy_no_collection: "수집하지 않는 정보",
        privacy_no_collection_items: ["개인 신원 정보", "금융 정보", "주민등록번호", "전화번호"],
        privacy_article_3_title: "📖 제3조 (개인정보의 보유 및 이용기간)",
        privacy_retention_period: "보유 기간",
        privacy_retention_period_items: ["서비스 이용 중: 계속 보유", "서비스 종료 후: 1년", "법정 보존 의무: 관련 법령에 따라 보존"],
        privacy_destruction: "파기 방법",
        privacy_destruction_items: ["전자적 파일: 복구 불가능한 방법으로 영구 삭제", "출력물: 분쇄하거나 소각"],
        privacy_anonymization: "익명화 처리",
        privacy_anonymization_items: ["통계 목적: 개인을 식별할 수 없는 형태로 처리", "서비스 개선: 개인정보와 분리하여 처리"],
        privacy_article_4_title: "⚠️ 제4조 (개인정보의 제3자 제공)",
        privacy_third_party_intro: "본 사이트는 다음과 같은 경우에만 개인정보를 제3자에게 제공합니다:",
        privacy_third_party_items: [
            "이용자 동의: 사전에 이용자의 명시적 동의를 받은 경우",
            "법적 의무: 법령에 의해 요구되는 경우",
            "긴급 상황: 이용자의 생명, 신체, 재산의 보호를 위해 필요한 경우",
            "통계 목적: 개인을 식별할 수 없는 형태로 제공하는 경우"
        ],
        privacy_third_party_important: "중요: 본 사이트는 이용자의 개인정보를 영리 목적으로 제3자에게 제공하지 않습니다.",
        privacy_article_5_title: "🔒 제5조 (개인정보의 안전성 확보)",
        privacy_security_intro: "본 사이트는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:",
        privacy_security_items: [
            "기술적 보호: 암호화, 접근 제한 등 기술적 보안 조치",
            "관리적 보호: 개인정보 접근 권한 관리, 교육 등",
            "물리적 보호: 개인정보 보관 장소의 접근 제한",
            "정기 점검: 보안 취약점 점검 및 개선"
        ],
        privacy_article_6_title: "📋 제6조 (이용자의 권리)",
        privacy_rights_content: "이용자는 다음과 같은 권리를 가집니다:",
        privacy_rights_items: [
            "열람권: 본인의 개인정보에 대한 열람 요구",
            "정정권: 잘못된 개인정보의 정정 요구",
            "삭제권: 개인정보의 삭제 요구",
            "처리정지권: 개인정보 처리의 정지 요구"
        ],
        privacy_article_7_title: "📝 제7조 (개인정보처리방침 변경)",
        privacy_change_content: "본 개인정보처리방침은 법령 및 방침에 따라 변경될 수 있습니다. 변경사항은 사이트 내 공지사항을 통해 고지하며, 변경된 방침은 공지 즉시 효력이 발생합니다.",
        privacy_article_9_title: "📅 제9조 (시행일)",
        privacy_effective_date: "본 개인정보처리방침은 2024년 1월 15일부터 시행합니다.",
        privacy_protection_title: "정보 보호",
        privacy_protection_intro: "본 사이트는 사용자의 개인정보 보호를 위해 다음과 같은 보안 조치를 취하고 있습니다:",
        privacy_protection_items: [
            "HTTPS 암호화: 모든 데이터 전송 시 암호화",
            "보안 헤더: XSS, CSRF 등 공격 방지",
            "최소 정보 수집: 서비스 제공에 필요한 최소한의 정보만 수집",
            "정기 보안 점검: 보안 취약점 정기 점검"
        ],
        privacy_retention_title: "정보 보관 기간",
        privacy_retention_intro: "본 사이트는 다음과 같은 기간 동안 개인정보를 보관합니다:",
        privacy_retention_items: [
            "서비스 이용 정보: 서비스 제공 기간 동안",
            "쿠키 정보: 브라우저 설정에 따라 자동 삭제",
            "로그 정보: 30일 후 자동 삭제"
        ],
        privacy_rights_title: "사용자 권리",
        privacy_rights_intro: "사용자는 다음과 같은 권리를 가집니다:",
        privacy_rights_items: [
            "열람권: 본인의 개인정보에 대한 열람 요청",
            "정정권: 잘못된 개인정보의 정정 요청",
            "삭제권: 개인정보 삭제 요청",
            "처리정지권: 개인정보 처리 중단 요청"
        ],
        privacy_rights_note: "권리 행사는 이메일을 통해 요청하실 수 있습니다.",
        privacy_contact_title: "문의처",
        privacy_contact_intro: "개인정보 처리에 관한 문의사항이 있으시면 다음 방법으로 연락해 주세요:",
        privacy_contact_email: "이메일",
        privacy_contact_email_value: "",
        privacy_change_title: "개인정보처리방침 변경",
        privacy_change_content: "본 개인정보처리방침은 법령 및 방침에 따라 변경될 수 있습니다. 변경사항이 있을 경우 본 페이지를 통해 공지하겠습니다.",
        
        // 공통
        back_to_main: "🏠 메인으로 돌아가기",
        dark_mode: "다크 모드",
        light_mode: "라이트 모드"
    },
    
    en: {
        // 헤더
        title: "🔥 Hot Coin Rankings Now",
        subtitle: "Hot coins from overseas exchanges",
        
        // 메뉴
        menu_all: "All",
        menu_rising: "Rising",
        menu_volume: "Volume Surge",
        menu_longshort: "Long/Short",
        menu_ai: "🔮 AI Pick",
        menu_tips: "Tips",
        menu_myinvest: "My Invest Type",
        
        // 1위 코인 정보
        top_coin_label: "🥇 Top Coin:",
        
        // 로딩
        loading_message: "Loading coin data...",
        loading_note: "Please wait on mobile",
        
        // 시장 심리 지표
        market_sentiment_label: "📊 Market Sentiment",
        sentiment_neutral: "Neutral",
        sentiment_bullish: "Bullish",
        sentiment_bearish: "Bearish",
        long_label: "Long:",
        short_label: "Short:",
        
        // 푸터
        realtime_updating: "Real-time updating",
        next_update: "Next update:",
        mobile_optimized: "📱 Mobile optimized | 🔄 5min auto update",
        about_link: "📖 About",
        privacy_link: "🔒 Privacy Policy",
        terms_link: "📋 Terms of Service",
        
        // 모달
        coin_info: "Coin Info",
        
        // 기타
        volume_surge: "Volume Surge",
        volume_high: "High Volume",
        ai_pick: "AI PICK",
        rank_new: "NEW",
        no_data: "No data",
        
        // 테이블 헤더
        rank: "Rank",
        coin: "Coin",
        longshort: "Long/Short",
        volume: "Volume",
        change: "Change",
        chart: "Chart",
        interest: "Interest",
        
        // 언어 전환
        language_ko: "한국어",
        language_en: "English",
        
        // 모달 관련
        market_cap: "Market Cap",
        volume_24h: "24h Volume",
        price_chart_24h: "24h Price Chart",
        chart_loading: "Loading real-time chart data...",
        symbol: "Symbol",
        full_symbol: "Full Symbol",
        current_price: "Current Price",
        krw_price: "KRW Price",
        
        // 시장 심리 상태
        very_optimistic: "Very Optimistic",
        optimistic: "Optimistic",
        very_pessimistic: "Very Pessimistic",
        pessimistic: "Pessimistic",
        
        // 모달 에러 메시지
        coin_not_found: "Information for this coin could not be found.",
        searched_symbol: "Searched Symbol",
        available_coins: "Available Coins",
        
        // 리스트 관련
        long_percent: "Long",
        short_percent: "Short",
        estimated: "Est.",
        no_data: "No data",
        volume_usd: "Volume",
        change_rate: "Change",
        current_price: "Current Price",
        market_cap_usd: "Market Cap",
        volume_24h_usd: "24h Volume",
        change_24h: "24h Change",
        community_score: "Community Score",
        developer_score: "Developer Score",
        liquidity_score: "Liquidity Score",
        category: "Category",
        
        // 1위 코인 상태
        volume_explosion: "Volume Explosion",
        volume_surge_status: "Volume Surge",
        skyrocketing: "Skyrocketing",
        rising: "Rising",
        falling: "Falling",
        bullish_long: "Bullish (Long Dominant)",
        bearish_short: "Bearish (Short Dominant)",
        balanced: "Balanced",
        active_trading: "Active Trading",
        night_trading: "Night Trading",
        
        // AI 관련
        ai_score: "pts",
        long_ratio: "Long Ratio",
        
        // 이용약관 페이지
        terms_title: "Terms of Service",
        terms_intro_title: "Terms of Service",
        terms_intro_subtitle: "Last updated: January 15, 2024",
        terms_intro_main: "🔥 Hot Coin Rankings Now (hereinafter \"this site\") Terms of Service. Please read these terms carefully before using this site.",
        terms_article_1_title: "Article 1 (Purpose)",
        terms_article_1_content: "These terms establish the rights, obligations, and responsibilities between the site and users regarding the cryptocurrency information service provided by this site.",
        terms_article_2_title: "Article 2 (Definitions)",
        terms_site_def: "Site",
        terms_site_def_content: "🔥 Hot Coin Rankings Now website",
        terms_user_def: "User",
        terms_user_def_content: "All users who access this site and use the service",
        terms_service_def: "Service",
        terms_service_def_content: "Cryptocurrency information provision and related additional services",
        terms_article_3_title: "Article 3 (Service Content)",
        terms_realtime_info: "Real-time Information",
        terms_realtime_info_items: ["Cryptocurrency trading volume rankings", "Price change information", "Market sentiment indicators"],
        terms_analysis_tools: "Analysis Tools",
        terms_analysis_tools_items: ["Sparkline charts", "AI recommendation system", "Long/Short ratio analysis"],
        terms_additional_services: "Additional Services",
        terms_additional_services_items: ["Mobile optimization", "Dark/Light mode", "Real-time updates"],
        terms_article_4_title: "Article 4 (Disclaimer)",
        terms_disclaimer_intro: "This site is not responsible for the following cases:",
        terms_disclaimer_items: [
            "Investment losses: Losses from investment decisions based on provided information",
            "Data errors: Information inaccuracy due to API provider data errors",
            "Service interruption: Temporary service interruption due to technical issues",
            "Third-party services: Impact from external API service failures"
        ],
        terms_disclaimer_important: "Important: This site does not provide investment advice, and all investment decisions must be made at the user's discretion.",
        terms_article_5_title: "Article 5 (Prohibited Acts)",
        terms_prohibited_intro: "Users must not perform the following acts:",
        terms_prohibited_items: [
            "Illegal use: Using the service for purposes that violate laws",
            "Service interference: Acts that place excessive load on servers",
            "Unauthorized information use: Unauthorized copying and distribution of site information",
            "Harm to others: Acts that cause harm to other users"
        ],
        terms_article_6_title: "Article 6 (Privacy Protection)",
        terms_privacy_content: "Matters related to the collection, use, and provision of personal information are subject to the Privacy Policy.",
        terms_article_7_title: "Article 7 (Terms Changes)",
        terms_change_content: "This site may change these terms as necessary. Changes will be notified through site announcements, and changed terms take effect immediately upon notice.",
        terms_article_9_title: "Article 9 (Effective Date)",
        terms_effective_date: "These terms take effect from January 15, 2024.",
        
        // 개인정보처리방침 페이지
        privacy_title: "🔒 Privacy Policy",
        privacy_intro_title: "Personal Information Collection and Use Notice",
        privacy_intro_subtitle: "Last updated: January 15, 2024",
        privacy_intro_main: "🔥 Hot Coin Rankings Now (hereinafter \"this site\") values user privacy and safely protects personal information in compliance with privacy protection laws.",
        privacy_article_1_title: "📖 Article 1 (Purpose of Personal Information Collection)",
        privacy_article_1_content: "This site collects personal information for the following purposes:",
        privacy_article_1_items: [
            "Service provision: Cryptocurrency information provision and related service operation",
            "Service improvement: Service analysis and improvement for user experience enhancement",
            "Technical support: Service error resolution and technical problem response"
        ],
        privacy_article_2_title: "🔍 Article 2 (Personal Information Items Collected)",
        privacy_auto_collection: "Automatically Collected Information",
        privacy_auto_collection_items: ["IP address", "Access logs", "Cookie information", "Browser information"],
        privacy_optional_collection: "Optional Collection Information",
        privacy_optional_collection_items: ["Language settings", "Theme settings", "User preferences"],
        privacy_no_collection: "Information Not Collected",
        privacy_no_collection_items: ["Personal identity information", "Financial information", "Resident registration number", "Phone number"],
        privacy_article_3_title: "📖 Article 3 (Retention and Use Period of Personal Information)",
        privacy_retention_period: "Retention Period",
        privacy_retention_period_items: ["During service use: Continuous retention", "After service termination: 1 year", "Legal retention obligation: Retention according to relevant laws"],
        privacy_destruction: "Destruction Method",
        privacy_destruction_items: ["Electronic files: Permanent deletion by unrecoverable method", "Printed materials: Shredding or incineration"],
        privacy_anonymization: "Anonymization Processing",
        privacy_anonymization_items: ["Statistical purposes: Processing in forms that cannot identify individuals", "Service improvement: Processing separated from personal information"],
        privacy_article_4_title: "⚠️ Article 4 (Third-party Provision of Personal Information)",
        privacy_third_party_intro: "This site provides personal information to third parties only in the following cases:",
        privacy_third_party_items: [
            "User consent: When explicit consent is received in advance",
            "Legal obligation: When required by law",
            "Emergency situation: When necessary to protect user's life, body, or property",
            "Statistical purposes: When provided in forms that cannot identify individuals"
        ],
        privacy_third_party_important: "Important: This site does not provide user personal information to third parties for profit purposes.",
        privacy_article_5_title: "🔒 Article 5 (Security of Personal Information)",
        privacy_security_intro: "This site takes the following measures to ensure the security of personal information:",
        privacy_security_items: [
            "Technical protection: Technical security measures such as encryption and access restrictions",
            "Administrative protection: Personal information access authority management, education, etc.",
            "Physical protection: Access restrictions to personal information storage locations",
            "Regular inspection: Regular security vulnerability inspection and improvement"
        ],
        privacy_article_6_title: "📋 Article 6 (User Rights)",
        privacy_rights_content: "Users have the following rights:",
        privacy_rights_items: [
            "Right to access: Request to access personal information",
            "Right to correction: Request to correct incorrect personal information",
            "Right to deletion: Request to delete personal information",
            "Right to processing suspension: Request to suspend personal information processing"
        ],
        privacy_article_7_title: "📝 Article 7 (Privacy Policy Changes)",
        privacy_change_content: "This privacy policy may be changed according to laws and policies. Changes will be notified through site announcements, and changed policies take effect immediately upon notice.",
        privacy_article_9_title: "📅 Article 9 (Effective Date)",
        privacy_effective_date: "This privacy policy takes effect from January 15, 2024.",
        

        
        // 공통
        back_to_main: "🏠 Back to Main",
        dark_mode: "Dark Mode",
        light_mode: "Light Mode"
    }
};

/**
 * 현재 언어 설정 관리
 */
class LanguageManager {
    constructor() {
        this.currentLang = this.loadLanguage();
        this.init();
    }
    
    /**
     * 언어 설정 초기화
     */
    init() {
        this.updatePageLanguage();
        
        // IP 기반 지역 감지 실행 (비동기)
        this.detectLanguageByIP();
    }
    
    /**
     * 저장된 언어 설정 불러오기
     */
    loadLanguage() {
        // 저장된 언어 설정이 있으면 사용
        const savedLang = localStorage.getItem('language');
        if (savedLang) {
            return savedLang;
        }
        
        // 저장된 설정이 없으면 자동 감지
        return this.detectLanguage();
    }
    
    /**
     * 자동 언어 감지
     */
    detectLanguage() {
        // 1. 브라우저 언어 설정 확인
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang) {
            const langCode = browserLang.toLowerCase();
            if (langCode.startsWith('ko') || langCode.startsWith('ko-kr')) {
                return 'ko';
            } else if (langCode.startsWith('en')) {
                return 'en';
            }
        }
        
        // 2. 사용 가능한 언어 목록 확인
        const languages = navigator.languages || [navigator.language];
        for (const lang of languages) {
            const langCode = lang.toLowerCase();
            if (langCode.startsWith('ko')) {
                return 'ko';
            } else if (langCode.startsWith('en')) {
                return 'en';
            }
        }
        
        // 3. IP 기반 지역 감지 (비동기)
        this.detectLanguageByIP();
        
        // 4. 기본값 (한국어) - 한국에서 접속하면 한국어로 표시
        return 'ko';
    }
    
    /**
     * IP 기반 지역 감지
     */
    async detectLanguageByIP() {
        try {
            // 무료 IP 지역 감지 API 사용
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            
            if (data.country_code === 'KR') {
                // 한국에서 접속한 경우 한국어로 설정
                if (this.currentLang !== 'ko') {
                    this.changeLanguage('ko');
                }
            } else if (data.country_code) {
                // 한국이 아닌 다른 국가에서 접속한 경우 영어로 설정
                if (this.currentLang !== 'en') {
                    this.changeLanguage('en');
                }
            }
        } catch (error) {
            console.log('IP 기반 언어 감지 실패, 브라우저 설정 사용:', error);
            // IP 감지 실패 시 기본값은 한국어로 설정
            if (this.currentLang !== 'ko') {
                this.changeLanguage('ko');
            }
        }
    }
    
    /**
     * 언어 설정 저장
     */
    saveLanguage(lang) {
        localStorage.setItem('language', lang);
        this.currentLang = lang;
    }
    
    /**
     * 텍스트 번역
     */
    t(key) {
        return i18n[this.currentLang][key] || i18n.ko[key] || key;
    }
    
    /**
     * 언어 변경
     */
    changeLanguage(lang) {
        this.saveLanguage(lang);
        this.updatePageLanguage();
        
        // 언어 전환 버튼 업데이트
        this.updateLanguageButtons();
        
        // 페이지 새로고침 없이 텍스트 업데이트
        this.updateAllTexts();
        
        // 사용자에게 언어 변경 알림
        this.showLanguageChangeNotification(lang);
    }
    
    /**
     * 언어 변경 알림 표시
     */
    showLanguageChangeNotification(lang) {
        const notification = document.createElement('div');
        notification.className = 'language-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span>🌐 ${lang === 'ko' ? '한국어로 변경되었습니다' : 'Changed to English'}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // 스타일 적용
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 12px 16px;
            box-shadow: var(--shadow);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            font-size: 0.9rem;
            color: var(--text-primary);
        `;
        
        // 닫기 버튼 이벤트
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: var(--text-secondary);
            font-size: 1.2rem;
            cursor: pointer;
            margin-left: 10px;
            padding: 0;
        `;
        
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        });
        
        // 3초 후 자동 제거
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease-in';
                setTimeout(() => notification.remove(), 300);
            }
        }, 3000);
        
        document.body.appendChild(notification);
    }
    
    /**
     * 페이지 언어 속성 업데이트
     */
    updatePageLanguage() {
        document.documentElement.lang = this.currentLang;
    }
    
    /**
     * 언어 전환 버튼 업데이트
     */
    updateLanguageButtons() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === this.currentLang) {
                btn.classList.add('active');
            }
        });
    }
    
    /**
     * 모든 텍스트 업데이트
     */
    updateAllTexts() {
        // 헤더
        const title = document.querySelector('.header h1');
        const subtitle = document.querySelector('.header p');
        if (title) title.textContent = this.t('title');
        if (subtitle) subtitle.textContent = this.t('subtitle');
        
        // 메뉴 버튼
        const menuButtons = document.querySelectorAll('.menu-btn');
        menuButtons.forEach(btn => {
            const menuType = btn.getAttribute('data-menu');
            if (menuType && menuType !== 'theme') {
                btn.textContent = this.t(`menu_${menuType}`);
            }
        });
        
        // 리스트 헤더 업데이트
        this.updateListHeaders();
        
        // 1위 코인 라벨
        const topCoinLabel = document.querySelector('.top-coin-label');
        if (topCoinLabel) topCoinLabel.textContent = this.t('top_coin_label');
        
        // 로딩 메시지
        const loadingMessages = document.querySelectorAll('.loading p');
        if (loadingMessages.length > 0) {
            loadingMessages[0].textContent = this.t('loading_message');
            if (loadingMessages[1]) {
                loadingMessages[1].textContent = this.t('loading_note');
            }
        }
        
        // 시장 심리 지표
        const sentimentLabel = document.querySelector('.sentiment-label');
        if (sentimentLabel) sentimentLabel.textContent = this.t('market_sentiment_label');
        
        // 시장 심리 상태 텍스트
        const sentimentStatus = document.getElementById('sentiment-status');
        if (sentimentStatus) {
            const currentStatus = sentimentStatus.textContent;
            if (currentStatus === '중립' || currentStatus === 'Neutral') {
                sentimentStatus.textContent = this.t('sentiment_neutral');
            } else if (currentStatus === '강세' || currentStatus === 'Bullish') {
                sentimentStatus.textContent = this.t('sentiment_bullish');
            } else if (currentStatus === '약세' || currentStatus === 'Bearish') {
                sentimentStatus.textContent = this.t('sentiment_bearish');
            } else if (currentStatus === '매우 낙관적' || currentStatus === 'Very Optimistic') {
                sentimentStatus.textContent = this.t('very_optimistic');
            } else if (currentStatus === '낙관적' || currentStatus === 'Optimistic') {
                sentimentStatus.textContent = this.t('optimistic');
            } else if (currentStatus === '매우 비관적' || currentStatus === 'Very Pessimistic') {
                sentimentStatus.textContent = this.t('very_pessimistic');
            } else if (currentStatus === '비관적' || currentStatus === 'Pessimistic') {
                sentimentStatus.textContent = this.t('pessimistic');
            }
        }
        
        // 거래량 급증 배지 업데이트
        this.updateVolumeBadges();
        
        // 롱/숏 라벨
        const longRatio = document.getElementById('long-ratio');
        const shortRatio = document.getElementById('short-ratio');
        if (longRatio) {
            const currentText = longRatio.textContent;
            const ratioMatch = currentText.match(/:\s*(.+)$/);
            const ratioValue = ratioMatch ? ratioMatch[1] : '-';
            longRatio.textContent = `${this.t('long_label')} ${ratioValue}`;
        }
        if (shortRatio) {
            const currentText = shortRatio.textContent;
            const ratioMatch = currentText.match(/:\s*(.+)$/);
            const ratioValue = ratioMatch ? ratioMatch[1] : '-';
            shortRatio.textContent = `${this.t('short_label')} ${ratioValue}`;
        }
        
        // 푸터
        const footerText = document.querySelector('.footer p');
        if (footerText) footerText.textContent = this.t('mobile_optimized');
        
        const aboutLink = document.querySelector('.footer-link');
        if (aboutLink) aboutLink.textContent = this.t('about_link');
        
        // Footer 링크들 업데이트
        const footerLinks = document.querySelectorAll('.footer-link');
        footerLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === 'about.html') {
                link.textContent = this.t('about_link');
            } else if (href === 'privacy.html') {
                link.textContent = this.t('privacy_link');
            } else if (href === 'terms.html') {
                link.textContent = this.t('terms_link');
            }
        });
        
        // 모달 제목
        const modalTitle = document.getElementById('modalTitle');
        if (modalTitle) modalTitle.textContent = this.t('coin_info');
        
        // 모달 내용 업데이트 (동적으로 생성된 모달 내용)
        this.updateModalContent();
        
        // 실시간 업데이트 텍스트
        const lastUpdate = document.getElementById('last-update');
        if (lastUpdate) {
            lastUpdate.textContent = this.t('realtime_updating');
        }
        
        // 다음 업데이트 텍스트
        const nextUpdate = document.getElementById('next-update');
        if (nextUpdate) {
            // 기존 시간 정보를 보존
            const currentText = nextUpdate.textContent;
            const timeMatch = currentText.match(/:\s*(.+)$/);
            const timeText = timeMatch ? timeMatch[1] : '-';
            nextUpdate.textContent = `${this.t('next_update')} ${timeText}`;
        }
        
        // 개인정보처리방침 페이지 요소들 업데이트
        this.updatePrivacyPage();
        
        // 이용약관 페이지 요소들 업데이트
        this.updateTermsPage();
    }
    
    /**
     * 리스트 헤더 업데이트
     */
    updateListHeaders() {
        const listHeaders = document.querySelectorAll('.list-header .sortable');
        if (listHeaders.length === 0) return;
        
        listHeaders.forEach(header => {
            const sortKey = header.getAttribute('data-sort-key');
            if (sortKey) {
                let headerText = '';
                switch (sortKey) {
                    case 'rank':
                        headerText = this.t('rank');
                        break;
                    case 'symbol':
                        headerText = this.t('coin');
                        break;
                    case 'longAccount':
                        headerText = this.t('longshort');
                        break;
                    case 'volume':
                        headerText = this.t('volume');
                        break;
                    case 'priceChangePercent':
                        headerText = this.t('change');
                        break;
                }
                
                // 정렬 화살표 유지
                const arrow = header.textContent.match(/[▲▼]/);
                if (arrow) {
                    headerText += ' ' + arrow[0];
                }
                
                header.textContent = headerText;
            }
        });
        
        // 차트와 관심도 컬럼도 업데이트
        const chartHeader = document.querySelector('.col-sparkline');
        const interestHeader = document.querySelector('.col-interest');
        
        if (chartHeader) {
            chartHeader.textContent = this.t('chart');
        }
        if (interestHeader) {
            interestHeader.textContent = this.t('interest');
        }
    }
    
    /**
     * 모달 내용 업데이트
     */
    updateModalContent() {
        const modalContent = document.getElementById('modalContent');
        if (!modalContent) return;
        
        // 모달이 열려있는지 확인
        const modal = document.getElementById('coinModal');
        if (modal.style.display !== 'block') return;
        
        // 현재 모달에 표시된 코인 정보 찾기
        const coinTitle = modalContent.querySelector('.coin-title h3');
        if (!coinTitle) return;
        
        const symbol = coinTitle.textContent;
        
        // 모달 내용의 모든 텍스트 업데이트
        const statLabels = modalContent.querySelectorAll('.stat-label');
        statLabels.forEach(label => {
            const text = label.textContent;
            if (text === '시가총액') {
                label.textContent = this.t('market_cap');
            } else if (text === '24시간 거래량') {
                label.textContent = this.t('volume_24h');
            } else if (text === '순위') {
                label.textContent = this.t('rank');
            } else if (text === '변동률') {
                label.textContent = this.t('change');
            }
        });
        
        // 스파크라인 섹션 제목
        const sparklineTitle = modalContent.querySelector('.sparkline-section h4');
        if (sparklineTitle) {
            sparklineTitle.textContent = this.t('price_chart_24h');
        }
        
        // 스파크라인 노트
        const sparklineNote = modalContent.querySelector('.sparkline-note');
        if (sparklineNote) {
            sparklineNote.textContent = this.t('chart_loading');
        }
        
        // 코인 정보 섹션 제목
        const coinInfoTitle = modalContent.querySelector('.coin-info-section h4');
        if (coinInfoTitle) {
            coinInfoTitle.textContent = this.t('coin_info');
        }
        
        // 코인 정보 라벨들
        const infoLabels = modalContent.querySelectorAll('.info-label');
        infoLabels.forEach(label => {
            const text = label.textContent;
            if (text === '심볼:') {
                label.textContent = this.t('symbol') + ':';
            } else if (text === '전체 심볼:') {
                label.textContent = this.t('full_symbol') + ':';
            } else if (text === '현재가:') {
                label.textContent = this.t('current_price') + ':';
            } else if (text === '원화 가격:') {
                label.textContent = this.t('krw_price') + ':';
            }
        });
    }
    
    /**
     * 거래량 급증 배지 업데이트
     */
    updateVolumeBadges() {
        const volumeBadges = document.querySelectorAll('.volume-surge-badge');
        volumeBadges.forEach(badge => {
            const text = badge.textContent;
            if (text.includes('거래량 급증') || text.includes('Volume Surge')) {
                badge.textContent = this.t('volume_surge');
            } else if (text.includes('거래량 높음') || text.includes('High Volume')) {
                badge.textContent = this.t('volume_high');
            } else if (text.includes('거래량 급등') || text.includes('Volume Surge')) {
                badge.textContent = this.t('volume_surge');
            }
        });
    }
    
    /**
     * 개인정보처리방침 페이지 업데이트
     */
    updatePrivacyPage() {
        // 제목
        const privacyTitle = document.getElementById('privacy-title');
        if (privacyTitle) privacyTitle.textContent = this.t('privacy_title');
        
        // 소개 제목
        const privacyIntroTitle = document.getElementById('privacy-intro-title');
        if (privacyIntroTitle) privacyIntroTitle.textContent = this.t('privacy_intro_title');
        
        // 소개 부제목
        const privacyIntroSubtitle = document.getElementById('privacy-intro-subtitle');
        if (privacyIntroSubtitle) privacyIntroSubtitle.textContent = this.t('privacy_intro_subtitle');
        
        // 소개 내용
        const privacyIntroMain = document.getElementById('privacy-intro-main');
        if (privacyIntroMain) privacyIntroMain.textContent = this.t('privacy_intro_main');
        
        // 제1조
        const privacyArticle1Title = document.getElementById('privacy-article-1-title');
        if (privacyArticle1Title) privacyArticle1Title.textContent = this.t('privacy_article_1_title');
        
        const privacyArticle1Content = document.getElementById('privacy-article-1-content');
        if (privacyArticle1Content) privacyArticle1Content.textContent = this.t('privacy_article_1_content');
        
        // 제1조 리스트 항목들 업데이트
        const privacyArticle1Items = document.getElementById('privacy-article-1-items');
        if (privacyArticle1Items) {
            const items = privacyArticle1Items.querySelectorAll('li');
            const translations = i18n[this.currentLang].privacy_article_1_items;
            if (Array.isArray(translations)) {
                items.forEach((item, index) => {
                    if (translations[index]) {
                        const strongTag = item.querySelector('strong');
                        const text = translations[index];
                        const colonIndex = text.indexOf(':');
                        if (colonIndex !== -1) {
                            const label = text.substring(0, colonIndex);
                            const content = text.substring(colonIndex + 1);
                            if (strongTag) {
                                strongTag.textContent = label;
                                item.innerHTML = strongTag.outerHTML + content;
                            }
                        }
                    }
                });
            }
        }
        
        // 제2조
        const privacyArticle2Title = document.getElementById('privacy-article-2-title');
        if (privacyArticle2Title) privacyArticle2Title.textContent = this.t('privacy_article_2_title');
        
        const privacyAutoCollection = document.getElementById('privacy-auto-collection');
        if (privacyAutoCollection) privacyAutoCollection.textContent = this.t('privacy_auto_collection');
        
        const privacyOptionalCollection = document.getElementById('privacy-optional-collection');
        if (privacyOptionalCollection) privacyOptionalCollection.textContent = this.t('privacy_optional_collection');
        
        const privacyNoCollection = document.getElementById('privacy-no-collection');
        if (privacyNoCollection) privacyNoCollection.textContent = this.t('privacy_no_collection');
        
        // 제2조 리스트 항목들 업데이트
        const privacyAutoCollectionItems = document.getElementById('privacy-auto-collection-items');
        if (privacyAutoCollectionItems) {
            const items = privacyAutoCollectionItems.querySelectorAll('li');
            const translations = i18n[this.currentLang].privacy_auto_collection_items;
            items.forEach((item, index) => {
                if (translations[index]) {
                    item.textContent = translations[index];
                }
            });
        }
        
        const privacyOptionalCollectionItems = document.getElementById('privacy-optional-collection-items');
        if (privacyOptionalCollectionItems) {
            const items = privacyOptionalCollectionItems.querySelectorAll('li');
            const translations = i18n[this.currentLang].privacy_optional_collection_items;
            items.forEach((item, index) => {
                if (translations[index]) {
                    item.textContent = translations[index];
                }
            });
        }
        
        const privacyNoCollectionItems = document.getElementById('privacy-no-collection-items');
        if (privacyNoCollectionItems) {
            const items = privacyNoCollectionItems.querySelectorAll('li');
            const translations = i18n[this.currentLang].privacy_no_collection_items;
            items.forEach((item, index) => {
                if (translations[index]) {
                    item.textContent = translations[index];
                }
            });
        }
        
        // 제3조
        const privacyArticle3Title = document.getElementById('privacy-article-3-title');
        if (privacyArticle3Title) privacyArticle3Title.textContent = this.t('privacy_article_3_title');
        
        const privacyRetentionPeriod = document.getElementById('privacy-retention-period');
        if (privacyRetentionPeriod) privacyRetentionPeriod.textContent = this.t('privacy_retention_period');
        
        const privacyDestruction = document.getElementById('privacy-destruction');
        if (privacyDestruction) privacyDestruction.textContent = this.t('privacy_destruction');
        
        const privacyAnonymization = document.getElementById('privacy-anonymization');
        if (privacyAnonymization) privacyAnonymization.textContent = this.t('privacy_anonymization');
        
        // 제3조 리스트 항목들 업데이트
        const privacyRetentionPeriodItems = document.getElementById('privacy-retention-period-items');
        if (privacyRetentionPeriodItems) {
            const items = privacyRetentionPeriodItems.querySelectorAll('li');
            const translations = i18n[this.currentLang].privacy_retention_period_items;
            items.forEach((item, index) => {
                if (translations[index]) {
                    item.textContent = translations[index];
                }
            });
        }
        
        const privacyDestructionItems = document.getElementById('privacy-destruction-items');
        if (privacyDestructionItems) {
            const items = privacyDestructionItems.querySelectorAll('li');
            const translations = i18n[this.currentLang].privacy_destruction_items;
            items.forEach((item, index) => {
                if (translations[index]) {
                    item.textContent = translations[index];
                }
            });
        }
        
        const privacyAnonymizationItems = document.getElementById('privacy-anonymization-items');
        if (privacyAnonymizationItems) {
            const items = privacyAnonymizationItems.querySelectorAll('li');
            const translations = i18n[this.currentLang].privacy_anonymization_items;
            items.forEach((item, index) => {
                if (translations[index]) {
                    item.textContent = translations[index];
                }
            });
        }
        
        // 제4조
        const privacyArticle4Title = document.getElementById('privacy-article-4-title');
        if (privacyArticle4Title) privacyArticle4Title.textContent = this.t('privacy_article_4_title');
        
        const privacyThirdPartyIntro = document.getElementById('privacy-third-party-intro');
        if (privacyThirdPartyIntro) privacyThirdPartyIntro.textContent = this.t('privacy_third_party_intro');
        
        // 제4조 리스트 항목들 업데이트
        const privacyThirdPartyItems = document.getElementById('privacy-third-party-items');
        if (privacyThirdPartyItems) {
            const items = privacyThirdPartyItems.querySelectorAll('li');
            const translations = i18n[this.currentLang].privacy_third_party_items;
            items.forEach((item, index) => {
                if (translations[index]) {
                    const strongTag = item.querySelector('strong');
                    const text = translations[index];
                    const colonIndex = text.indexOf(':');
                    if (colonIndex !== -1) {
                        const label = text.substring(0, colonIndex);
                        const content = text.substring(colonIndex + 1);
                        if (strongTag) {
                            strongTag.textContent = label;
                            item.innerHTML = strongTag.outerHTML + content;
                        }
                    }
                }
            });
        }
        
        const privacyThirdPartyImportant = document.getElementById('privacy-third-party-important');
        if (privacyThirdPartyImportant) privacyThirdPartyImportant.textContent = this.t('privacy_third_party_important');
        
        // 제5조
        const privacyArticle5Title = document.getElementById('privacy-article-5-title');
        if (privacyArticle5Title) privacyArticle5Title.textContent = this.t('privacy_article_5_title');
        
        const privacySecurityIntro = document.getElementById('privacy-security-intro');
        if (privacySecurityIntro) privacySecurityIntro.textContent = this.t('privacy_security_intro');
        
        // 제5조 리스트 항목들 업데이트
        const privacySecurityItems = document.getElementById('privacy-security-items');
        if (privacySecurityItems) {
            const items = privacySecurityItems.querySelectorAll('li');
            const translations = i18n[this.currentLang].privacy_security_items;
            items.forEach((item, index) => {
                if (translations[index]) {
                    const strongTag = item.querySelector('strong');
                    const text = translations[index];
                    const colonIndex = text.indexOf(':');
                    if (colonIndex !== -1) {
                        const label = text.substring(0, colonIndex);
                        const content = text.substring(colonIndex + 1);
                        if (strongTag) {
                            strongTag.textContent = label;
                            item.innerHTML = strongTag.outerHTML + content;
                        }
                    }
                }
            });
        }
        
        // 제6조
        const privacyArticle6Title = document.getElementById('privacy-article-6-title');
        if (privacyArticle6Title) privacyArticle6Title.textContent = this.t('privacy_article_6_title');
        
        const privacyRightsContent = document.getElementById('privacy-rights-content');
        if (privacyRightsContent) privacyRightsContent.textContent = this.t('privacy_rights_content');
        
        // 제6조 리스트 항목들 업데이트
        const privacyRightsItems = document.getElementById('privacy-rights-items');
        if (privacyRightsItems) {
            const items = privacyRightsItems.querySelectorAll('li');
            const translations = i18n[this.currentLang].privacy_rights_items;
            items.forEach((item, index) => {
                if (translations[index]) {
                    const strongTag = item.querySelector('strong');
                    const text = translations[index];
                    const colonIndex = text.indexOf(':');
                    if (colonIndex !== -1) {
                        const label = text.substring(0, colonIndex);
                        const content = text.substring(colonIndex + 1);
                        if (strongTag) {
                            strongTag.textContent = label;
                            item.innerHTML = strongTag.outerHTML + content;
                        }
                    }
                }
            });
        }
        
        // 제7조
        const privacyArticle7Title = document.getElementById('privacy-article-7-title');
        if (privacyArticle7Title) privacyArticle7Title.textContent = this.t('privacy_article_7_title');
        
        const privacyChangeContent = document.getElementById('privacy-change-content');
        if (privacyChangeContent) privacyChangeContent.textContent = this.t('privacy_change_content');
        
        // 제9조
        const privacyArticle9Title = document.getElementById('privacy-article-9-title');
        if (privacyArticle9Title) privacyArticle9Title.textContent = this.t('privacy_article_9_title');
        
        const privacyEffectiveDate = document.getElementById('privacy-effective-date');
        if (privacyEffectiveDate) privacyEffectiveDate.textContent = this.t('privacy_effective_date');
        
        // 뒤로가기 버튼
        const backToMain = document.getElementById('back-to-main');
        if (backToMain) backToMain.textContent = this.t('back_to_main');
    }
    
    /**
     * 이용약관 페이지 업데이트
     */
    updateTermsPage() {
        // 제목
        const termsTitle = document.getElementById('terms-title');
        if (termsTitle) termsTitle.textContent = this.t('terms_title');
        
        // 소개 제목
        const termsIntroTitle = document.getElementById('terms-intro-title');
        if (termsIntroTitle) termsIntroTitle.textContent = this.t('terms_intro_title');
        
        // 소개 부제목
        const termsIntroSubtitle = document.getElementById('terms-intro-subtitle');
        if (termsIntroSubtitle) termsIntroSubtitle.textContent = this.t('terms_intro_subtitle');
        
        // 소개 내용
        const termsIntroMain = document.getElementById('terms-intro-main');
        if (termsIntroMain) termsIntroMain.textContent = this.t('terms_intro_main');
        
        // 제1조
        const termsArticle1Title = document.getElementById('terms-article-1-title');
        if (termsArticle1Title) termsArticle1Title.textContent = this.t('terms_article_1_title');
        
        const termsArticle1Content = document.getElementById('terms-article-1-content');
        if (termsArticle1Content) termsArticle1Content.textContent = this.t('terms_article_1_content');
        
        // 제1조 리스트 항목들 업데이트 (이용약관에는 제1조에 리스트가 없음)
        
        // 제2조
        const termsArticle2Title = document.getElementById('terms-article-2-title');
        if (termsArticle2Title) termsArticle2Title.textContent = this.t('terms_article_2_title');
        
        const termsSiteDef = document.getElementById('terms-site-def');
        if (termsSiteDef) termsSiteDef.textContent = this.t('terms_site_def');
        
        const termsSiteDefContent = document.getElementById('terms-site-def-content');
        if (termsSiteDefContent) termsSiteDefContent.textContent = this.t('terms_site_def_content');
        
        const termsUserDef = document.getElementById('terms-user-def');
        if (termsUserDef) termsUserDef.textContent = this.t('terms_user_def');
        
        const termsUserDefContent = document.getElementById('terms-user-def-content');
        if (termsUserDefContent) termsUserDefContent.textContent = this.t('terms_user_def_content');
        
        const termsServiceDef = document.getElementById('terms-service-def');
        if (termsServiceDef) termsServiceDef.textContent = this.t('terms_service_def');
        
        const termsServiceDefContent = document.getElementById('terms-service-def-content');
        if (termsServiceDefContent) termsServiceDefContent.textContent = this.t('terms_service_def_content');
        
        // 제3조
        const termsArticle3Title = document.getElementById('terms-article-3-title');
        if (termsArticle3Title) termsArticle3Title.textContent = this.t('terms_article_3_title');
        
        const termsRealtimeInfo = document.getElementById('terms-realtime-info');
        if (termsRealtimeInfo) termsRealtimeInfo.textContent = this.t('terms_realtime_info');
        
        const termsAnalysisTools = document.getElementById('terms-analysis-tools');
        if (termsAnalysisTools) termsAnalysisTools.textContent = this.t('terms_analysis_tools');
        
        const termsAdditionalServices = document.getElementById('terms-additional-services');
        if (termsAdditionalServices) termsAdditionalServices.textContent = this.t('terms_additional_services');
        
        // 제3조 리스트 항목들 업데이트
        const termsRealtimeInfoItems = document.getElementById('terms-realtime-info-items');
        if (termsRealtimeInfoItems) {
            const items = termsRealtimeInfoItems.querySelectorAll('li');
            const translations = i18n[this.currentLang].terms_realtime_info_items;
            items.forEach((item, index) => {
                if (translations[index]) {
                    item.textContent = translations[index];
                }
            });
        }
        
        const termsAnalysisToolsItems = document.getElementById('terms-analysis-tools-items');
        if (termsAnalysisToolsItems) {
            const items = termsAnalysisToolsItems.querySelectorAll('li');
            const translations = i18n[this.currentLang].terms_analysis_tools_items;
            items.forEach((item, index) => {
                if (translations[index]) {
                    item.textContent = translations[index];
                }
            });
        }
        
        const termsAdditionalServicesItems = document.getElementById('terms-additional-services-items');
        if (termsAdditionalServicesItems) {
            const items = termsAdditionalServicesItems.querySelectorAll('li');
            const translations = i18n[this.currentLang].terms_additional_services_items;
            items.forEach((item, index) => {
                if (translations[index]) {
                    item.textContent = translations[index];
                }
            });
        }
        
        // 제4조
        const termsArticle4Title = document.getElementById('terms-article-4-title');
        if (termsArticle4Title) termsArticle4Title.textContent = this.t('terms_article_4_title');
        
        const termsDisclaimerIntro = document.getElementById('terms-disclaimer-intro');
        if (termsDisclaimerIntro) termsDisclaimerIntro.textContent = this.t('terms_disclaimer_intro');
        
        const termsDisclaimerImportant = document.getElementById('terms-disclaimer-important');
        if (termsDisclaimerImportant) termsDisclaimerImportant.textContent = this.t('terms_disclaimer_important');
        
        // 제4조 리스트 항목들 업데이트
        const termsDisclaimerItems = document.getElementById('terms-disclaimer-items');
        if (termsDisclaimerItems) {
            const items = termsDisclaimerItems.querySelectorAll('li');
            const translations = i18n[this.currentLang].terms_disclaimer_items;
            items.forEach((item, index) => {
                if (translations[index]) {
                    const strongTag = item.querySelector('strong');
                    const text = translations[index];
                    const colonIndex = text.indexOf(':');
                    if (colonIndex !== -1) {
                        const label = text.substring(0, colonIndex);
                        const content = text.substring(colonIndex + 1);
                        if (strongTag) {
                            strongTag.textContent = label;
                            item.innerHTML = strongTag.outerHTML + content;
                        }
                    }
                }
            });
        }
        
        // 제5조
        const termsArticle5Title = document.getElementById('terms-article-5-title');
        if (termsArticle5Title) termsArticle5Title.textContent = this.t('terms_article_5_title');
        
        const termsProhibitedIntro = document.getElementById('terms-prohibited-intro');
        if (termsProhibitedIntro) termsProhibitedIntro.textContent = this.t('terms_prohibited_intro');
        
        // 제5조 리스트 항목들 업데이트
        const termsProhibitedItems = document.getElementById('terms-prohibited-items');
        if (termsProhibitedItems) {
            const items = termsProhibitedItems.querySelectorAll('li');
            const translations = i18n[this.currentLang].terms_prohibited_items;
            items.forEach((item, index) => {
                if (translations[index]) {
                    const strongTag = item.querySelector('strong');
                    const text = translations[index];
                    const colonIndex = text.indexOf(':');
                    if (colonIndex !== -1) {
                        const label = text.substring(0, colonIndex);
                        const content = text.substring(colonIndex + 1);
                        if (strongTag) {
                            strongTag.textContent = label;
                            item.innerHTML = strongTag.outerHTML + content;
                        }
                    }
                }
            });
        }
        
        // 제6조
        const termsArticle6Title = document.getElementById('terms-article-6-title');
        if (termsArticle6Title) termsArticle6Title.textContent = this.t('terms_article_6_title');
        
        const termsPrivacyContent = document.getElementById('terms-privacy-content');
        if (termsPrivacyContent) termsPrivacyContent.textContent = this.t('terms_privacy_content');
        
        // 제7조
        const termsArticle7Title = document.getElementById('terms-article-7-title');
        if (termsArticle7Title) termsArticle7Title.textContent = this.t('terms_article_7_title');
        
        const termsChangeContent = document.getElementById('terms-change-content');
        if (termsChangeContent) termsChangeContent.textContent = this.t('terms_change_content');
        
        // 제9조
        const termsArticle9Title = document.getElementById('terms-article-9-title');
        if (termsArticle9Title) termsArticle9Title.textContent = this.t('terms_article_9_title');
        
        const termsEffectiveDate = document.getElementById('terms-effective-date');
        if (termsEffectiveDate) termsEffectiveDate.textContent = this.t('terms_effective_date');
        
        // 뒤로가기 버튼
        const backToMain = document.getElementById('back-to-main');
        if (backToMain) backToMain.textContent = this.t('back_to_main');
    }
}

// 전역 언어 관리자 인스턴스
window.languageManager = new LanguageManager(); 