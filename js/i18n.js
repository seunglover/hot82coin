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
        
        // 투자유형 테스트
        myinvest_title: "🧠 나의 투자유형 테스트",
        myinvest_subtitle: "15개 질문으로 내 투자성향을 알아보세요!",
        
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
        light_mode: "라이트 모드",
        // 꿀팁/투자경고 다국어 텍스트 추가
        tips_title: "💡 코인 투자 꿀팁",
        tips_subtitle: "초보자를 위한 실전 팁들",
        tips_card1_title: "거래량 급증이 뭔가요?",
        tips_card1_summary: "거래량이 갑자기 늘어나면 뭔가 일이 터진 거예요. 뉴스 확인해보세요!",
        tips_card1_detail: "거래량 급증은 암호화폐 시장에서 가장 중요한 지표 중 하나입니다. 일반적으로 24시간 평균 거래량 대비 200% 이상 증가할 때를 '급증'으로 분류합니다. 거래량 급증의 주요 원인은 다음과 같습니다: 첫째, 대형 기업의 암호화폐 투자 발표나 파트너십 체결. 예를 들어, 테슬라가 비트코인을 자사 재고로 보유하겠다고 발표했을 때 비트코인 거래량이 급증했습니다. 둘째, 규제 정책의 변화. 미국 SEC의 ETF 승인이나 중국의 암호화폐 규제 강화 등이 해당됩니다. 셋째, 기술적 업데이트나 하드포크. 이더리움의 런던 하드포크나 비트코인의 탭루트 업그레이드 등이 거래량 급증을 유발합니다. 넷째, 유명인의 언급이나 소셜미디어 트렌드. 일론 머스크의 트윗이나 레딧의 WallStreetBets 같은 커뮤니티의 영향도 큽니다. 하지만 거래량 급증이 항상 긍정적인 신호는 아닙니다. '펌프 앤 덤프' 스키마나 시장 조작의 가능성도 있으므로, 반드시 관련 뉴스와 배경을 확인해야 합니다. 또한 거래량 급증 후에는 보통 큰 변동성이 뒤따르므로, 투자 결정을 내리기 전에 충분한 분석이 필요합니다. 거래량 급증을 확인하는 방법은 여러 거래소의 거래량 데이터를 비교하고, 온체인 데이터(블록체인 거래 내역)도 함께 참고하는 것이 좋습니다. 특히 대형 지갑의 움직임이나 거래소 유입/유출량을 확인하면 더 정확한 판단을 할 수 있습니다.",
        tips_card2_title: "롱/숏 비율 보는 법",
        tips_card2_summary: "롱 비율 높으면 대부분이 올라갈 거라 생각하는 거죠. 하지만 시장은 예측 불가능이에요.",
        tips_card2_detail: "롱/숏 비율은 레버리지 거래(선물, 옵션)에서 투자자들의 시장 전망을 보여주는 중요한 지표입니다. 이 비율은 거래소에서 제공하는 데이터로, 롱 포지션과 숏 포지션의 비율을 나타냅니다. 일반적으로 롱 비율이 60% 이상이면 대부분의 투자자가 가격 상승을 예상한다는 뜻이고, 숏 비율이 60% 이상이면 하락을 예상한다는 의미입니다. 하지만 이 지표를 해석할 때 주의할 점들이 있습니다. 첫째, 극단적인 비율(90% 이상 롱 또는 숏)일 때는 반대 움직임이 올 가능성이 높습니다. 이는 '컨트리언 지표'로, 대부분이 한 방향을 예상할 때 시장이 반대로 움직이는 경향이 있기 때문입니다. 둘째, 롱/숏 비율은 단기적인 시장 심리를 반영하므로, 장기 투자 판단에는 한계가 있습니다. 셋째, 거래소마다 계산 방식이 다를 수 있으므로, 여러 거래소의 데이터를 비교하는 것이 좋습니다. 넷째, 대형 투자자(웨일)의 포지션과 소액 투자자들의 포지션을 구분해서 보는 것이 중요합니다. 웨일들의 움직임이 시장에 미치는 영향이 더 크기 때문입니다. 롱/숏 비율을 활용한 투자 전략으로는 '컨트리언 전략'이 있습니다. 예를 들어, 롱 비율이 90% 이상일 때는 숏 포지션을 고려하고, 숏 비율이 90% 이상일 때는 롱 포지션을 고려하는 방식입니다. 하지만 이 전략도 100% 성공을 보장하지는 않으므로, 다른 지표들과 함께 사용해야 합니다. 또한 롱/숏 비율은 변동성이 큰 시장에서 더 유용하며, 횡보장에서는 신뢰도가 떨어질 수 있습니다. 마지막으로, 이 지표는 참고용일 뿐이며, 절대적인 투자 기준으로 삼으면 안 됩니다. 항상 기본적 분석과 기술적 분석을 함께 사용하는 것이 중요합니다.",
        tips_card3_title: "급등 코인 주의사항",
        tips_card3_summary: "급등 코인은 이미 늦었을 가능성이 높아요. 조심하세요!",
        tips_card3_detail: "급등 코인에 투자할 때는 특히 신중해야 합니다. 일반적으로 24시간 내 50% 이상 상승한 코인을 '급등 코인'으로 분류합니다. 급등 코인의 주요 특징과 위험성을 이해하는 것이 중요합니다. 첫째, 급등 코인은 이미 큰 상승을 보인 상태이므로, 조정(하락) 가능성이 높습니다. 이는 '이익 실현' 때문입니다. 큰 수익을 올린 투자자들이 이익을 실현하면서 매도 압력이 생기기 때문입니다. 둘째, 급등 코인은 보통 'FOMO'(Fear Of Missing Out, 놓칠까봐 두려운 심리)를 유발합니다. 다른 사람들이 수익을 내고 있다는 소식을 듣고 급하게 투자하는 것은 매우 위험합니다. 셋째, 급등 코인은 종종 '펌프 앤 덤프' 스키마의 일부일 수 있습니다. 일부 세력이 인위적으로 가격을 끌어올린 후 소액 투자자들에게 팔아넘기는 방식입니다. 넷째, 급등 코인은 기본적 가치와 괴리가 있을 가능성이 높습니다. 단순한 루머나 소문에 의한 상승일 수 있으므로, 프로젝트의 실제 가치를 확인해야 합니다. 급등 코인에 투자하려면 다음과 같은 전략을 사용하는 것이 좋습니다. 첫째, '스케일링 인' 전략입니다. 한 번에 모든 자금을 투자하지 말고, 작은 금액부터 시작해서 점진적으로 늘려가는 방식입니다. 둘째, 명확한 손절매 기준을 세우는 것입니다. 일반적으로 투자 금액의 10-15% 손실 시 손절매하는 것을 권장합니다. 셋째, 기본적 분석과 기술적 분석을 모두 고려해야 합니다. 프로젝트의 백서, 팀, 기술, 파트너십 등을 확인하고, 차트 분석도 함께 해야 합니다. 넷째, 다른 투자자들의 의견에 휘둘리지 말고, 자신만의 투자 기준을 세우는 것이 중요합니다. 또한 급등 코인 투자 시 주의할 점으로는, 레버리지 거래는 피하는 것이 좋습니다. 급등 코인은 이미 높은 변동성을 가지고 있으므로, 레버리지를 추가하면 위험이 기하급수적으로 증가합니다. 마지막으로, 급등 코인에 투자할 때는 '손실을 감수할 수 있는 금액'만 사용해야 합니다. 절대 생활비나 대출금을 사용해서는 안 됩니다.",
        tips_card4_title: "손절매 전략",
        tips_card4_summary: "손실을 최소화하는 방법을 알아보세요. 투자에서 가장 중요한 건 손절매예요.",
        tips_card4_detail: "손절매는 투자에서 가장 중요한 전략 중 하나입니다. '손실을 줄이는 것이 수익을 늘리는 것보다 중요하다'는 투자 격언이 있습니다. 효과적인 손절매 전략을 세우는 방법을 알아보겠습니다. 첫째, 고정 손절매 비율을 정하는 것입니다. 일반적으로 투자 금액의 5-10% 손실 시 손절매하는 것을 권장합니다. 예를 들어, 100만원을 투자했다면 5-10만원 손실 시 손절매하는 것입니다. 이는 감정에 휘둘리지 않고 객관적으로 손실을 제한할 수 있게 해줍니다. 둘째, 이동평균선 기반 손절매입니다. 예를 들어, 20일 이동평균선 아래로 떨어지면 손절매하는 방식입니다. 이는 기술적 분석을 기반으로 한 손절매로, 시장의 추세 변화를 반영합니다. 셋째, 시간 기반 손절매입니다. 예를 들어, 1주일 내에 수익이 나지 않으면 손절매하는 방식입니다. 이는 자금의 효율적 활용을 위한 전략입니다. 넷째, 변동성 기반 손절매입니다. 코인의 변동성이 평소보다 2-3배 높아지면 손절매하는 방식입니다. 이는 급격한 하락을 예방하는 효과가 있습니다. 손절매를 실행할 때 주의할 점들도 있습니다. 첫째, 손절매 후에도 계속 모니터링해야 합니다. 손절매한 코인이 다시 상승할 수 있으므로, 재진입 시점을 고려해야 합니다. 둘째, 손절매는 감정적으로 실행해야 합니다. '다시 올라올 것이다'는 희망적 사고에 휘둘리지 말고, 미리 정한 기준을 철저히 지켜야 합니다. 셋째, 손절매 후에는 반드시 투자 일지를 작성해야 합니다. 왜 손절매했는지, 무엇을 배웠는지 기록하는 것이 중요합니다. 넷째, 손절매는 전체 포트폴리오 관점에서 실행해야 합니다. 개별 코인의 손절매가 전체 포트폴리오에 미치는 영향을 고려해야 합니다. 또한 손절매와 함께 고려해야 할 전략으로는 '부분 손절매'가 있습니다. 예를 들어, 5% 손실 시 50%만 손절매하고, 10% 손실 시 나머지를 손절매하는 방식입니다. 이는 급격한 손실을 방지하면서도 회복 가능성을 남겨두는 전략입니다. 마지막으로, 손절매 후에는 반드시 '쿨다운' 기간을 가져야 합니다. 감정적으로 다음 투자를 결정하지 말고, 충분한 분석과 계획을 세운 후 재투자해야 합니다.",
        tips_card5_title: "차트 보는 법 기초",
        tips_card5_summary: "캔들스틱 패턴을 읽으면 시장 방향을 예측할 수 있어요.",
        tips_card5_detail: "차트 분석은 암호화폐 투자에서 필수적인 기술입니다. 기본적인 차트 분석법을 체계적으로 알아보겠습니다. 첫째, 캔들스틱 패턴을 이해해야 합니다. 캔들스틱은 일정 기간의 시가, 고가, 저가, 종가를 시각적으로 나타낸 것입니다. 주요 패턴으로는 '망치형'(Hammer), '도지형'(Doji), '하라미'(Harami), '모닝스타'(Morning Star), '이브닝스타'(Evening Star) 등이 있습니다. 망치형은 하락 후 반등 가능성을, 도지형은 시장의 망설임을 나타냅니다. 둘째, 이동평균선을 활용해야 합니다. 20일, 50일, 200일 이동평균선이 가장 많이 사용됩니다. 20일선은 단기 추세, 50일선은 중기 추세, 200일선은 장기 추세를 나타냅니다. 이동평균선의 교차(골든크로스, 데드크로스)는 중요한 매매 신호입니다. 셋째, 지지선과 저항선을 그려야 합니다. 지지선은 가격이 하락을 멈추는 지점이고, 저항선은 가격이 상승을 멈추는 지점입니다. 이 선들이 깨질 때(브레이크아웃) 중요한 매매 신호가 됩니다. 넷째, RSI, MACD, 볼린저 밴드 등의 기술적 지표를 활용해야 합니다. RSI는 과매수/과매도 상태를, MACD는 모멘텀을, 볼린저 밴드는 변동성을 나타냅니다. 다섯째, 거래량 분석이 중요합니다. 가격 상승과 함께 거래량이 증가하면 상승 신호가 강하고, 가격 상승에 거래량이 감소하면 상승 신호가 약합니다. 차트 분석 시 주의할 점들도 있습니다. 첫째, 차트 분석만으로는 부족합니다. 기본적 분석(프로젝트 배경, 팀, 기술 등)과 함께 사용해야 합니다. 둘째, 과거 패턴이 미래를 보장하지 않습니다. 시장 상황은 항상 변화하므로, 여러 지표를 종합적으로 분석해야 합니다. 셋째, 시간대별 차트를 함께 보는 것이 중요합니다. 1시간, 4시간, 일봉, 주봉 차트를 모두 확인해야 전체적인 추세를 파악할 수 있습니다. 넷째, 차트 분석은 연습이 필요합니다. 페이퍼 트레이딩(실제 투자 없이 가상으로 거래하는 것)을 통해 경험을 쌓는 것이 좋습니다. 또한 차트 분석을 위한 도구들도 알아두어야 합니다. TradingView, Coinigy, CryptoCompare 등의 차트 플랫폼을 활용하면 더 정확한 분석이 가능합니다. 마지막으로, 차트 분석은 '확률 게임'이라는 점을 기억해야 합니다. 100% 정확한 예측은 불가능하므로, 리스크 관리가 항상 우선되어야 합니다.",
        tips_card6_title: "포트폴리오 분산 투자",
        tips_card6_summary: "모든 달걀을 한 바구니에 담지 마세요. 리스크를 분산시키는 게 중요해요.",
        tips_card6_detail: "분산 투자는 리스크를 줄이는 가장 효과적인 방법 중 하나입니다. '모든 달걀을 한 바구니에 담지 마라'는 투자 격언이 있습니다. 효과적인 포트폴리오 분산 전략을 알아보겠습니다. 첫째, 자산별 분산입니다. 암호화폐뿐만 아니라 주식, 채권, 부동산, 현금 등 다양한 자산에 투자하는 것입니다. 일반적으로 암호화폐는 전체 포트폴리오의 5-10%를 차지하는 것이 적절합니다. 둘째, 암호화폐 내에서의 분산입니다. 비트코인(40%), 이더리움(30%), 기타 알트코인(30%) 정도로 분산하는 것이 좋습니다. 비트코인과 이더리움은 시장의 기축 통화 역할을 하므로 안정성이 상대적으로 높습니다. 셋째, 시가총액별 분산입니다. 대형 코인(시가총액 상위 10위), 중형 코인(11-50위), 소형 코인(51위 이후)으로 분산하는 것입니다. 대형 코인은 안정성이 높고, 소형 코인은 성장 가능성이 높습니다. 넷째, 섹터별 분산입니다. DeFi(탈중앙화 금융), NFT, 게임, 인프라, 프라이버시 등 다양한 섹터에 분산하는 것입니다. 각 섹터는 서로 다른 성장 주기를 가지고 있습니다. 다섯째, 지역별 분산입니다. 한국, 미국, 유럽, 아시아 등 다양한 지역의 거래소와 프로젝트에 분산하는 것입니다. 이는 규제 리스크를 줄이는 효과가 있습니다. 포트폴리오 분산 시 주의할 점들도 있습니다. 첫째, 과도한 분산은 피해야 합니다. 너무 많은 코인에 분산하면 관리가 어려워지고 수수료가 증가할 수 있습니다. 일반적으로 10-20개 정도의 코인으로 분산하는 것이 적절합니다. 둘째, 정기적인 리밸런싱이 필요합니다. 시장 상황에 따라 각 코인의 비중이 변하므로, 월 1회 정도 포트폴리오를 점검하고 조정해야 합니다. 셋째, 코인 간의 상관관계를 고려해야 합니다. 비트코인과 대부분의 알트코인은 높은 상관관계를 가지고 있으므로, 완전한 분산 효과를 기대하기는 어렵습니다. 넷째, 투자 목적과 기간에 따라 분산 전략을 달리해야 합니다. 단기 투자자는 안정적인 대형 코인에 집중하고, 장기 투자자는 성장 가능성이 높은 소형 코인도 포함할 수 있습니다. 또한 분산 투자를 위한 도구들도 활용할 수 있습니다. 첫째, 인덱스 펀드나 ETF를 활용하는 방법입니다. 여러 코인을 한 번에 투자할 수 있어 편리합니다. 둘째, 자동 리밸런싱 서비스를 활용하는 방법입니다. 일정 비율로 자동 조정해주는 서비스들이 있습니다. 셋째, 달러 코스트 애버리징(DCA)을 활용하는 방법입니다. 정기적으로 일정 금액을 투자하여 평균 매수가를 낮추는 전략입니다. 마지막으로, 분산 투자는 '완벽한 분산'을 추구하는 것이 아니라, '적절한 분산'을 추구해야 합니다. 개인의 투자 성향, 자금 규모, 투자 기간 등을 고려하여 맞춤형 분산 전략을 세우는 것이 중요합니다.",
        tips_card7_title: "FOMO 조심하세요",
        tips_card7_summary: "FOMO = Fear Of Missing Out (놓칠까봐 두려운 심리)",
        tips_card7_detail: "FOMO(Fear Of Missing Out)는 암호화폐 투자에서 가장 위험한 심리 중 하나입니다. 다른 사람들이 수익을 내고 있다는 소식을 듣고 급하게 투자하는 것은 매우 위험한 행동입니다. FOMO의 심리적 메커니즘을 이해하고 대처 방법을 알아보겠습니다. FOMO가 발생하는 주요 원인들은 다음과 같습니다. 첫째, 소셜미디어의 영향입니다. 트위터, 텔레그램, 디스코드 등에서 다른 사람들의 수익 자랑을 보면서 '나도 해야겠다'는 생각이 듭니다. 둘째, FOMO는 인간의 기본적인 심리인 '소속감'과 '경쟁심'에서 비롯됩니다. 다른 사람들이 참여하는 것에 참여하지 않으면 소외감을 느끼게 됩니다. 셋째, 정보 과부하로 인한 스트레스입니다. 24시간 시장이 열려있고, 실시간으로 정보가 쏟아지면서 '놓치면 안 된다'는 강박관념이 생깁니다. 넷째, 과거의 후회 경험이 FOMO를 강화시킵니다. '그때 투자했더라면'이라는 후회가 다음 기회에 더 강하게 투자하게 만듭니다. FOMO에 대처하는 방법들도 있습니다. 첫째, 투자 계획을 미리 세워야 합니다. 어떤 코인에, 언제, 얼마나 투자할지 미리 정해두고, 그 계획을 철저히 지켜야 합니다. 둘째, 소셜미디어 사용을 제한해야 합니다. 특히 투자 결정을 내리기 전에는 소셜미디어를 멀리하는 것이 좋습니다. 셋째, '늦었다'고 생각하는 것보다는 '다음 기회를 기다리자'는 마음가짐이 중요합니다. 시장에는 항상 기회가 있습니다. 넷째, 충분한 분석과 계획 없이 감정에 휘둘려 투자하면 대부분 손실을 보게 됩니다. 다섯째, 투자 일지를 작성하는 것이 도움이 됩니다. FOMO로 인한 투자와 계획적 투자의 결과를 비교해보면 차이를 명확히 알 수 있습니다. FOMO를 예방하는 구체적인 전략들도 있습니다. 첫째, '쿨다운' 기간을 두는 것입니다. 투자하고 싶은 충동이 들면 24시간 기다린 후 결정하는 것입니다. 둘째, 투자 금액을 제한하는 것입니다. FOMO로 인한 투자는 작은 금액으로 시작하고, 성공적일 때만 금액을 늘리는 것입니다. 셋째, 멘토나 투자 파트너를 만드는 것입니다. 감정적 결정을 내리기 전에 상의할 수 있는 사람이 있으면 도움이 됩니다. 넷째, 정기적인 포트폴리오 점검을 하는 것입니다. FOMO로 인한 투자들이 얼마나 성과가 좋은지 객관적으로 평가해야 합니다. 또한 FOMO는 시장의 극단적인 상황에서 더욱 강해집니다. 예를 들어, 비트코인이 하루에 20% 상승할 때나, 특정 코인이 100% 이상 급등할 때 FOMO가 극에 달합니다. 이런 상황에서는 특히 신중해야 합니다. 마지막으로, FOMO는 완전히 없앨 수는 없지만, 관리할 수 있습니다. FOMO를 인식하고, 이를 투자 전략에 반영하는 것이 중요합니다. 예를 들어, FOMO를 예상하고 미리 준비된 투자 계획을 세우는 것입니다.",
        tips_card8_title: "모바일 거래 팁",
        tips_card8_summary: "모바일에서도 안전하게 거래하는 방법을 알아보세요.",
        tips_card8_detail: "모바일 거래는 편리하지만 보안과 사용성 측면에서 주의할 점들이 많습니다. 안전하고 효율적인 모바일 거래 방법을 알아보겠습니다. 첫째, 보안 설정이 가장 중요합니다. 생체 인증(지문, 얼굴 인식)을 반드시 활성화해야 합니다. 이는 비밀번호보다 훨씬 안전하고 편리합니다. 둘째, 2단계 인증(2FA)을 설정해야 합니다. SMS, 이메일, Google Authenticator, Authy 등 다양한 방법이 있습니다. Google Authenticator나 Authy 같은 앱 기반 인증이 가장 안전합니다. 셋째, 공용 Wi-Fi 사용을 피해야 합니다. 공용 Wi-Fi는 해킹 위험이 높으므로, 가능하면 개인 핫스팟이나 유료 Wi-Fi를 사용해야 합니다. 넷째, 거래소 앱을 항상 최신 버전으로 업데이트해야 합니다. 보안 패치가 포함된 업데이트이므로 즉시 설치해야 합니다. 다섯째, 스크린샷이나 스크린 레코딩을 피해야 합니다. 개인정보나 거래 내역이 노출될 위험이 있습니다. 모바일 거래의 사용성 개선 방법들도 있습니다. 첫째, 화면 설정을 최적화해야 합니다. 글자 크기, 밝기, 대비를 조정하여 가독성을 높여야 합니다. 둘째, 자주 사용하는 기능들을 즐겨찾기에 추가해야 합니다. 빠른 접근이 가능하도록 설정하는 것이 중요합니다. 셋째, 알림 설정을 적절히 조정해야 합니다. 중요한 가격 변동이나 거래 완료 알림만 받도록 설정하는 것이 좋습니다. 넷째, 모바일에서 사용하기 편한 차트 앱을 별도로 설치하는 것이 좋습니다. TradingView, Coinigy 등의 모바일 앱을 활용하면 더 정확한 분석이 가능합니다. 모바일 거래 시 주의할 점들도 있습니다. 첫째, 화면이 작아 실수할 가능성이 높습니다. 특히 가격이나 수량 입력 시 주의해야 합니다. 둘째, 네트워크 연결이 불안정할 수 있습니다. 중요한 거래는 안정적인 네트워크 환경에서 해야 합니다. 셋째, 배터리 소모가 큽니다. 외출 시에는 보조배터리를 준비하는 것이 좋습니다. 넷째, 모바일에서는 복잡한 거래(레버리지, 옵션 등)를 피하는 것이 좋습니다. 데스크톱에서 하는 것이 더 안전합니다. 모바일 거래를 위한 추가 팁들도 있습니다. 첫째, 여러 거래소 앱을 설치해두는 것이 좋습니다. 한 거래소에 문제가 생겨도 다른 거래소를 사용할 수 있습니다. 둘째, 오프라인 지갑 앱도 설치해두는 것이 좋습니다. 긴급한 상황에서 자산을 안전하게 보관할 수 있습니다. 셋째, 백업 계획을 세워두어야 합니다. 모바일 기기를 분실하거나 고장났을 때를 대비한 계획이 필요합니다. 넷째, 정기적으로 거래 내역을 확인하고 백업해야 합니다. 모바일에서는 실수할 가능성이 높으므로, 정기적인 점검이 중요합니다. 또한 모바일 거래는 '보조 도구'로 사용하는 것이 좋습니다. 중요한 투자 결정이나 큰 거래는 데스크톱에서 하는 것을 권장합니다. 모바일은 주로 시장 모니터링이나 작은 거래에 활용하는 것이 적절합니다. 마지막으로, 모바일 거래는 편리함과 안전성의 균형을 찾는 것이 중요합니다. 너무 편리함에만 집중하면 보안 위험이 증가하고, 너무 보안에만 집중하면 사용성이 떨어집니다.",
        tips_detail_view: "자세히보기",
        // 투자 경고
        investment_warning_title: "⚠️ 투자 경고",
        investment_warning_subtitle: "본 사이트는 정보 제공 목적으로만 제작되었습니다",
        warning_info_purpose_title: "정보 제공 목적",
        warning_info_purpose_content: "이 사이트는 암호화폐 시장 정보를 제공하는 목적으로만 제작되었습니다. 투자 조언이나 추천을 제공하지 않습니다.",
        warning_investment_responsibility_title: "투자 책임",
        warning_investment_responsibility_content: "모든 투자 결정과 그 결과는 전적으로 본인의 책임입니다. 투자 손실에 대한 책임은 투자자 본인에게 있습니다.",
        warning_market_risk_title: "시장 위험",
        warning_market_risk_content: "암호화폐 시장은 높은 변동성을 가지고 있습니다. 투자 원금의 일부 또는 전부를 잃을 수 있습니다.",
        warning_careful_investment_title: "신중한 투자",
        warning_careful_investment_content: "투자 결정 전 충분한 검토와 분석을 거쳐 신중하게 판단하시기 바랍니다.",
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
        
        // 투자유형 테스트
        myinvest_title: "🧠 My Investment Type Test",
        myinvest_subtitle: "Find out your investment style with 15 questions!",
        
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
        light_mode: "Light Mode",
        // 꿀팁/투자경고 다국어 텍스트 추가
        tips_title: "💡 Crypto Investment Tips",
        tips_subtitle: "Practical tips for beginners",
        tips_card1_title: "What is a volume surge?",
        tips_card1_summary: "If trading volume suddenly increases, something has happened. Check the news!",
        tips_card1_detail: "Volume surge is one of the most important indicators in the cryptocurrency market. Generally, when trading volume increases by 200% or more compared to the 24-hour average volume, it is classified as a 'surge'. The main causes of volume surges are as follows: First, major companies' cryptocurrency investment announcements or partnership agreements. For example, when Tesla announced that it would hold Bitcoin as a corporate asset, Bitcoin's trading volume surged. Second, changes in regulatory policies. This includes the SEC's ETF approval in the US or China's strengthening of cryptocurrency regulations. Third, technical updates or hard forks. Ethereum's London hard fork or Bitcoin's Taproot upgrade can cause volume surges. Fourth, celebrity mentions or social media trends. Elon Musk's tweets or communities like Reddit's WallStreetBets also have significant influence. However, volume surges are not always positive signals. There may be 'pump and dump' schemes or market manipulation, so it's essential to check related news and background information. Additionally, volume surges are usually followed by high volatility, so thorough analysis is needed before making investment decisions. To verify volume surges, it's good to compare trading volume data from multiple exchanges and also refer to on-chain data (blockchain transaction records). Particularly, checking the movements of large wallets or exchange inflows/outflows can help make more accurate judgments.",
        tips_card2_title: "How to read long/short ratio",
        tips_card2_summary: "A high long ratio means most expect a rise, but the market is unpredictable.",
        tips_card2_detail: "The long/short ratio is an important indicator showing investors' market outlook in leveraged trading (futures, options). This ratio is data provided by exchanges, representing the ratio between long and short positions. Generally, when the long ratio is 60% or higher, it means most investors expect a price rise, and when the short ratio is 60% or higher, it means they expect a decline. However, there are several points to be careful about when interpreting this indicator. First, when there are extreme ratios (90% or more long or short), there's a high possibility of opposite movements. This is a 'contrarian indicator' - when most people expect one direction, the market tends to move in the opposite direction. Second, the long/short ratio reflects short-term market sentiment, so it has limitations for long-term investment decisions. Third, calculation methods may differ between exchanges, so it's good to compare data from multiple exchanges. Fourth, it's important to distinguish between large investors (whales) and small investors. The movements of whales have a greater impact on the market. Investment strategies using the long/short ratio include the 'contrarian strategy'. For example, when the long ratio is 90% or higher, consider short positions, and when the short ratio is 90% or higher, consider long positions. However, this strategy doesn't guarantee 100% success, so it should be used together with other indicators. Also, the long/short ratio is more useful in volatile markets and may be less reliable in sideways markets. Finally, this indicator is for reference only and should not be used as an absolute investment criterion. It's always important to use both fundamental and technical analysis together.",
        tips_card3_title: "Caution for surging coins",
        tips_card3_summary: "Surging coins are often already late. Be careful!",
        tips_card3_detail: "When investing in surging coins, it's especially important to be cautious. Generally, coins that have risen 50% or more within 24 hours are classified as 'surging coins'. It's important to understand the main characteristics and risks of surging coins. First, surging coins have already shown significant gains, so there's a high possibility of correction (decline). This is due to 'profit taking' - investors who have made large profits sell their holdings, creating selling pressure. Second, surging coins usually trigger 'FOMO' (Fear Of Missing Out). It's very dangerous to invest hastily after hearing that others are making profits. Third, surging coins may often be part of 'pump and dump' schemes. Some groups artificially inflate prices and then sell to small investors. Fourth, surging coins may have a disconnect from fundamental value. The rise may be due to simple rumors or speculation, so you need to verify the actual value of the project. To invest in surging coins, it's good to use the following strategies. First, the 'scaling in' strategy. Don't invest all your money at once, but start with small amounts and gradually increase. Second, set clear stop-loss criteria. Generally, it's recommended to sell when you lose 10-15% of your investment. Third, consider both fundamental and technical analysis. Check the project's whitepaper, team, technology, partnerships, etc., and also do chart analysis. Fourth, it's important to establish your own investment criteria without being swayed by other investors' opinions. Also, when investing in surging coins, it's good to avoid leveraged trading. Surging coins already have high volatility, so adding leverage exponentially increases risk. Finally, when investing in surging coins, only use 'money you can afford to lose'. Never use living expenses or borrowed money.",
        tips_card4_title: "Stop-loss strategy",
        tips_card4_summary: "Learn how to minimize losses. The most important thing in investing is stop-loss.",
        tips_card4_detail: "Stop-loss is one of the most important strategies in investing. There's an investment saying that 'minimizing losses is more important than maximizing profits'. Let's learn how to establish effective stop-loss strategies. First, set a fixed stop-loss percentage. Generally, it's recommended to sell when you lose 5-10% of your investment. For example, if you invested 1 million won, sell when you lose 50,000-100,000 won. This allows you to objectively limit losses without being swayed by emotions. Second, moving average-based stop-loss. For example, sell when the price falls below the 20-day moving average. This is a stop-loss based on technical analysis, reflecting market trend changes. Third, time-based stop-loss. For example, sell if there's no profit within a week. This is a strategy for efficient use of funds. Fourth, volatility-based stop-loss. Sell when the coin's volatility becomes 2-3 times higher than usual. This has the effect of preventing sharp declines. There are also points to be careful about when executing stop-loss. First, continue monitoring even after stop-loss. The sold coin may rise again, so consider re-entry timing. Second, execute stop-loss emotionally. Don't be swayed by hopeful thinking like 'it will go up again', but strictly follow the criteria you set in advance. Third, write an investment journal after stop-loss. It's important to record why you sold and what you learned. Fourth, execute stop-loss from a portfolio perspective. Consider how individual coin stop-loss affects the entire portfolio. Also, a strategy to consider along with stop-loss is 'partial stop-loss'. For example, sell 50% when you lose 5%, and sell the rest when you lose 10%. This is a strategy that prevents sharp losses while leaving room for recovery. Finally, take a 'cooldown' period after stop-loss. Don't make the next investment decision emotionally, but reinvest after sufficient analysis and planning.",
        tips_card5_title: "Chart basics",
        tips_card5_summary: "Reading candlestick patterns can help predict market direction.",
        tips_card5_detail: "Chart analysis is an essential skill in cryptocurrency investing. Let's systematically learn basic chart analysis methods. First, understand candlestick patterns. Candlesticks visually represent the open, high, low, and close prices for a certain period. Major patterns include 'Hammer', 'Doji', 'Harami', 'Morning Star', 'Evening Star', etc. Hammer indicates potential rebound after decline, and Doji indicates market hesitation. Second, utilize moving averages. The 20-day, 50-day, and 200-day moving averages are most commonly used. The 20-day line represents short-term trends, the 50-day line represents medium-term trends, and the 200-day line represents long-term trends. Crossovers of moving averages (golden cross, death cross) are important trading signals. Third, draw support and resistance lines. Support lines are points where prices stop falling, and resistance lines are points where prices stop rising. When these lines break (breakout), it becomes an important trading signal. Fourth, utilize technical indicators like RSI, MACD, and Bollinger Bands. RSI indicates overbought/oversold conditions, MACD indicates momentum, and Bollinger Bands indicate volatility. Fifth, volume analysis is important. When price rises with increasing volume, the upward signal is strong, and when price rises with decreasing volume, the upward signal is weak. There are also points to be careful about in chart analysis. First, chart analysis alone is not enough. It should be used together with fundamental analysis (project background, team, technology, etc.). Second, past patterns don't guarantee the future. Market conditions always change, so you need to analyze multiple indicators comprehensively. Third, it's important to look at time-based charts together. You need to check 1-hour, 4-hour, daily, and weekly charts to understand the overall trend. Fourth, chart analysis requires practice. It's good to gain experience through paper trading (virtual trading without actual investment). Also, you should know the tools for chart analysis. Platforms like TradingView, Coinigy, and CryptoCompare can provide more accurate analysis. Finally, remember that chart analysis is a 'probability game'. 100% accurate prediction is impossible, so risk management should always come first.",
        tips_card6_title: "Portfolio diversification",
        tips_card6_summary: "Don't put all your eggs in one basket. Diversifying risk is important.",
        tips_card6_detail: "Diversification is one of the most effective ways to reduce risk. There's an investment saying, 'Don't put all your eggs in one basket'. Let's learn effective portfolio diversification strategies. First, asset diversification. Invest not only in cryptocurrencies but also in stocks, bonds, real estate, cash, and other various assets. Generally, it's appropriate for cryptocurrencies to account for 5-10% of the total portfolio. Second, diversification within cryptocurrencies. It's good to diversify with Bitcoin (40%), Ethereum (30%), and other altcoins (30%). Bitcoin and Ethereum serve as market base currencies, so they have relatively high stability. Third, market cap-based diversification. Diversify into large coins (top 10 by market cap), medium coins (11-50), and small coins (51st and later). Large coins have high stability, and small coins have high growth potential. Fourth, sector-based diversification. Diversify across various sectors like DeFi (decentralized finance), NFT, gaming, infrastructure, privacy, etc. Each sector has different growth cycles. Fifth, regional diversification. Diversify across various regions like Korea, US, Europe, Asia, etc. This has the effect of reducing regulatory risk. There are also points to be careful about in portfolio diversification. First, avoid excessive diversification. Diversifying into too many coins makes management difficult and increases fees. Generally, it's appropriate to diversify into about 10-20 coins. Second, regular rebalancing is necessary. Each coin's weight changes according to market conditions, so you need to check and adjust your portfolio about once a month. Third, consider correlation between coins. Bitcoin and most altcoins have high correlation, so it's difficult to expect complete diversification effects. Fourth, diversify strategies differently according to investment purpose and period. Short-term investors focus on stable large coins, while long-term investors can include small coins with high growth potential. You can also utilize tools for diversification. First, use index funds or ETFs. It's convenient to invest in multiple coins at once. Second, use automatic rebalancing services. There are services that automatically adjust to certain ratios. Third, use dollar cost averaging (DCA). This is a strategy of investing a certain amount regularly to lower the average purchase price. Finally, diversification doesn't pursue 'perfect diversification' but 'appropriate diversification'. It's important to establish a customized diversification strategy considering individual investment tendencies, fund size, investment period, etc.",
        tips_card7_title: "Beware of FOMO",
        tips_card7_summary: "FOMO = Fear Of Missing Out",
        tips_card7_detail: "FOMO (Fear Of Missing Out) is one of the most dangerous emotions in cryptocurrency investing. It's very dangerous to invest hastily after hearing that others are making profits. Let's understand the psychological mechanism of FOMO and learn coping methods. The main causes of FOMO are as follows. First, the influence of social media. Seeing others' profit boasts on Twitter, Telegram, Discord, etc., makes you think 'I should do it too'. Second, FOMO stems from basic human psychology: 'sense of belonging' and 'competitiveness'. If you don't participate in what others are participating in, you feel alienated. Third, stress from information overload. With 24-hour markets and real-time information pouring in, you develop an obsession that 'I can't miss out'. Fourth, past regret experiences strengthen FOMO. Regret like 'if I had invested then' makes you invest more strongly in the next opportunity. There are also methods to cope with FOMO. First, make investment plans in advance. Decide in advance which coins to invest in, when, and how much, and strictly follow that plan. Second, limit social media use. It's good to stay away from social media, especially before making investment decisions. Third, it's important to have the mindset of 'wait for the next opportunity' rather than thinking 'I'm too late'. There are always opportunities in the market. Fourth, investing without sufficient analysis and planning usually results in losses. Fifth, writing an investment journal helps. Comparing the results of FOMO-driven investments with planned investments clearly shows the difference. There are also specific strategies to prevent FOMO. First, take a 'cooldown' period. When you feel the urge to invest, wait 24 hours before deciding. Second, limit investment amounts. Start FOMO-driven investments with small amounts and only increase the amount when successful. Third, find a mentor or investment partner. Having someone to consult before making emotional decisions helps. Fourth, conduct regular portfolio reviews. Objectively evaluate how well FOMO-driven investments are performing. Also, FOMO becomes stronger in extreme market situations. For example, when Bitcoin rises 20% in a day or when a specific coin surges 100% or more, FOMO reaches its peak. Be especially careful in such situations. Finally, FOMO cannot be completely eliminated but can be managed. It's important to recognize FOMO and reflect it in investment strategies. For example, prepare investment plans in advance anticipating FOMO.",
        tips_card8_title: "Mobile trading tips",
        tips_card8_summary: "Learn how to trade safely on mobile.",
        tips_card8_detail: "Mobile trading is convenient but has many points to be careful about in terms of security and usability. Let's learn safe and efficient mobile trading methods. First, security settings are most important. You must activate biometric authentication (fingerprint, facial recognition). This is much safer and more convenient than passwords. Second, set up two-factor authentication (2FA). There are various methods like SMS, email, Google Authenticator, Authy, etc. App-based authentication like Google Authenticator or Authy is safest. Third, avoid using public Wi-Fi. Public Wi-Fi has high hacking risks, so use personal hotspots or paid Wi-Fi when possible. Fourth, always update exchange apps to the latest version. Updates include security patches, so install them immediately. Fifth, avoid screenshots or screen recordings. There's a risk of exposing personal information or transaction history. There are also methods to improve mobile trading usability. First, optimize screen settings. Adjust font size, brightness, and contrast to improve readability. Second, add frequently used features to favorites. It's important to set up for quick access. Third, adjust notification settings appropriately. Set to receive only important price changes or transaction completion notifications. Fourth, it's good to install separate chart apps that are convenient for mobile use. Using mobile apps like TradingView and Coinigy can provide more accurate analysis. There are also points to be careful about in mobile trading. First, the screen is small, so mistakes are likely. Be especially careful when entering prices or quantities. Second, network connections may be unstable. Important trades should be made in stable network environments. Third, battery consumption is high. Prepare a power bank when going out. Fourth, it's good to avoid complex trades (leverage, options, etc.) on mobile. It's safer to do them on desktop. There are also additional tips for mobile trading. First, it's good to install multiple exchange apps. You can use other exchanges if one has problems. Second, it's good to install offline wallet apps too. You can safely store assets in emergency situations. Third, have a backup plan. You need a plan in case you lose your mobile device or it breaks. Fourth, regularly check and backup transaction history. Mistakes are likely on mobile, so regular checks are important. Also, mobile trading is good to use as a 'supplementary tool'. Important investment decisions or large trades are recommended to be done on desktop. Mobile is appropriate for market monitoring or small trades. Finally, mobile trading is important to find a balance between convenience and security. Focusing too much on convenience increases security risks, and focusing too much on security reduces usability.",
        tips_detail_view: "View details",
        // 투자 경고
        investment_warning_title: "⚠️ Investment Warning",
        investment_warning_subtitle: "This site is for informational purposes only",
        warning_info_purpose_title: "Information Purpose",
        warning_info_purpose_content: "This site is for providing crypto market information only. It does not provide investment advice or recommendations.",
        warning_investment_responsibility_title: "Investment Responsibility",
        warning_investment_responsibility_content: "All investment decisions and results are entirely your responsibility. Losses are your own responsibility.",
        warning_market_risk_title: "Market Risk",
        warning_market_risk_content: "The crypto market is highly volatile. You may lose some or all of your principal.",
        warning_careful_investment_title: "Careful Investment",
        warning_careful_investment_content: "Please make careful decisions after sufficient review and analysis before investing."
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
        
        // 꿀팁과 투자경고 섹션 업데이트
        if (window.coinApp && typeof window.coinApp.renderTipsContent === 'function') {
            window.coinApp.renderTipsContent();
        }
        if (window.coinApp && typeof window.coinApp.renderInvestmentWarning === 'function') {
            window.coinApp.renderInvestmentWarning();
        }
        if (window.coinApp && typeof window.coinApp.renderMyInvestContent === 'function') {
            window.coinApp.renderMyInvestContent();
        }
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