// Story Generator for My Cursed Wallet LOL
class StoryGenerator {
    constructor() {
        this.initializeData();
    }

    initializeData() {
        // Wallet Types
        this.walletTypes = [
            { name: '러그풀 단골손님형', emoji: '🎪' },
            { name: 'FOMO 투자천재형', emoji: '🚀' },
            { name: '가스비 부자형', emoji: '⛽' },
            { name: 'NFT 수집광형', emoji: '🖼️' },
            { name: '밈코인 중독자형', emoji: '🐕' },
            { name: 'DeFi 농부형', emoji: '🌾' },
            { name: '에어드랍 헌터형', emoji: '🪂' },
            { name: '스캠 마그넷형', emoji: '🧲' },
            { name: '브릿지 노예형', emoji: '🌉' },
            { name: '실수 연발형', emoji: '🤦' },
            { name: 'MEV 봇 먹이형', emoji: '🤖' },
            { name: '신중한 관망자형', emoji: '🔍' },
            { name: '데드 월렛형', emoji: '💀' },
            { name: '웨일 추종자형', emoji: '🐋' },
            { name: '트렌드 늦깎이형', emoji: '🐢' },
            { name: '하이리스크 도박꾼형', emoji: '🎰' },
            { name: '청산 마스터형', emoji: '💥' },
            { name: '똥손 트레이더형', emoji: '📉' },
            { name: '프로토콜 테스터형', emoji: '🧪' },
            { name: '소액 다분산형', emoji: '🔬' }
        ];

        // Type descriptions
        this.typeDescTemplates = {
            '러그풀 단골손님형': [
                { main: '어디서든 러그풀을 찾아내는 특별한 재능', sub: '믿고 거르는 프로젝트 선택 👍💸' }
            ],
            'FOMO 투자천재형': [
                { main: 'ATH에서만 매수하는 완벽한 타이밍', sub: '꼭지 스나이퍼 등극 🎯📈' }
            ],
            '가스비 부자형': [
                { main: '이더리움 네트워크 유지에 크게 기여 중', sub: '마이너들의 사랑 듬뿍 ⛏️❤️' }
            ],
            'NFT 수집광형': [
                { main: 'JPEG에 인생을 건 디지털 아트 감상가', sub: '미래의 피카소(?) 🎨🖼️' }
            ],
            '밈코인 중독자형': [
                { main: '개, 고양이, 햄스터... 동물원 포트폴리오 완성', sub: '노아의 방주 2.0 🐕🐈🐹' }
            ],
            'DeFi 농부형': [
                { main: '수확은 없고 씨앗만 뿌리는 영원한 농부', sub: '수확의 계절은 언제? 🌾❓' }
            ],
            '에어드랍 헌터형': [
                { main: '모든 테스트넷의 전설이 되어가는 중', sub: '무료 토큰 사냥꾼 🪂🎯' }
            ],
            '스캠 마그넷형': [
                { main: '스캠이 알아서 찾아오는 특이체질', sub: '사기꾼들의 VIP 🎭👑' }
            ],
            '브릿지 노예형': [
                { main: '모든 체인에 0.001 ETH씩 뿌려둔 완벽주의자', sub: '멀티체인 극한 체험 🌉🔗' }
            ],
            '실수 연발형': [
                { main: '0 하나 더 붙여서 보내는 건 일상', sub: '소수점은 장식 🔢😵' }
            ],
            'MEV 봇 먹이형': [
                { main: 'MEV 봇들의 단골 고객 1순위', sub: '봇들아 잘 먹고 살아 🤖🍖' }
            ],
            '신중한 관망자형': [
                { main: '3년째 "지금 들어가면 늦었나?" 고민 중', sub: '타이밍 계산기 고장 ⏰🤔' }
            ],
            '데드 월렛형': [
                { main: '블록체인 위의 디지털 무덤 인증', sub: '여기 토큰 잠들다 💀🪦' }
            ],
            '웨일 추종자형': [
                { main: '고래 따라 헤엄치다가 플랑크톤 신세', sub: '먹이사슬 최하위 🐋🦐' }
            ],
            '트렌드 늦깎이형': [
                { main: 'NFT는 2023년에 시작, DeFi는 이제 공부 중', sub: '유행 3년 늦게 따라가기 🐢📅' }
            ],
            '하이리스크 도박꾼형': [
                { main: '레버리지 100배가 기본, 1000배가 목표', sub: '인생은 한방 🎰💥' }
            ],
            '청산 마스터형': [
                { main: '청산 10번은 기본, 100번이 목표', sub: '청산 콜렉터 인증 💥🏆' }
            ],
            '똥손 트레이더형': [
                { main: '사면 떨어지고 팔면 오르는 마법의 손', sub: '시장 조작 능력자(?) 🙌📊' }
            ],
            '프로토콜 테스터형': [
                { main: '모든 신규 프로토콜의 베타 테스터', sub: '버그 찾기 전문가 🐛🔍' }
            ],
            '소액 다분산형': [
                { main: '100개 코인에 1만원씩 분산투자', sub: '극한의 리스크 관리 🎯📊' }
            ]
        };

        // Cringe templates
        this.cringeTemplates = {
            gasWaster: [{
                title: '가스비 플렉스 💸',
                template: '${date}에 단순 전송에 ${gasInUSD} 가스비 지출. 피자 ${pizzaCount}판 값으로 0.001 ETH 전송 성공!'
            }],
            failurePro: [{
                title: '실패 장인 🎯',
                template: '총 ${failedCount}번의 트랜잭션 실패 기록. 성공률 ${successRate}%로 역대급 똥손 인증!'
            }],
            mevVictim: [{
                title: 'MEV 봇 밥 🤖',
                template: '${date}에 ${lossAmount} 상당의 MEV 공격 당함. 봇들의 추수감사절 메인 디쉬!'
            }],
            nftAddict: [{
                title: 'JPEG 수집광 🖼️',
                template: '${nftCount}개의 NFT 보유 중. 현재 가치 ${currentValue}, 구매 가격 ${purchasePrice}. 수익률 ${roi}%!'
            }],
            tokenTrader: [{
                title: '알트코인 묘지 ⚰️',
                template: '${deadTokens}개의 죽은 토큰 보유 중. 토큰 공동묘지 관리자 자격 획득!'
            }],
            defiDegen: [{
                title: '유동성 공급 영웅 💎',
                template: '${lpCount}개 풀에 유동성 공급 중. 무상손실 ${ilAmount}. IL은 사랑입니다!'
            }],
            bridgeExplorer: [{
                title: '브릿지 노동자 🌉',
                template: '${bridgeCount}번의 브릿지 사용으로 ${bridgeFees} 수수료 지출. 다리 건너기 전문가!'
            }],
            airdropHunter: [{
                title: '에어드랍 그물 🪂',
                template: '${protocolCount}개 프로토콜에서 활동 중. 예상 에어드랍 ${expectedCount}개. 현실은...?'
            }],
            timingExpert: [{
                title: '새벽 전사 🌙',
                template: '${nightTxCount}개 트랜잭션이 새벽 2-5시 사이. 진정한 크립토 라이프!'
            }]
        };

        // Personality traits
        this.personalityTraits = [
            '극도의 낙관주의자 - "다음엔 대박날거야!"가 口頭禪',
            'FOMO 중독 - 남들이 사면 무조건 따라 사는 스타일',
            '인내심 제로 - 5분마다 차트 확인하는 단타 중독자',
            '극한 HODL - 죽어도 안 파는 다이아몬드 손',
            '트렌드 추종자 - 유행 따라 이리저리 옮겨다니기',
            '리서치 0% - "느낌 좋은데?"로 모든 투자 결정',
            '자신감 과잉 - 한 번 성공하면 투자의 신 코스프레',
            '피해의식 - "왜 나만 지나가면 떨어져?" 24/7 반복',
            '음모론자 - 모든 덤핑은 세력의 조작이라 확신',
            '긍정 에너지 - 90% 손실에도 "이제 오를 일만 남았다!"',
            '부정 에너지 - 10% 수익에도 "곧 떨어질거야..."',
            '계산 불가 - 수익률 계산은 포기한 지 오래',
            '뉴스 중독 - 크립토 뉴스가 주식량인 정보 과다 섭취자',
            '차트 맹신자 - 삼각수렴, 골든크로스만 믿는 기술적 분석가',
            '고래 스토커 - 웨일 알럿이 유일한 투자 지표',
            '커뮤니티 중독 - 디스코드, 텔레그램이 본거지',
            '세금 기피자 - 세금 계산은 내년의 나에게 미루기',
            '브릿지 애호가 - 수수료 아까운 줄 모르는 체인 여행가',
            '가스비 무관심 - "빨리 가는 게 중요해!" 속도광',
            '보안 무관심 - 프라이빗 키 스크린샷 찍어두기'
        ];

        // Final diagnosis templates
        this.diagnosisTemplates = [
            '${days}일째 크립토 중독... 치료약은 더 많은 크립토!',
            '손실률 ${lossRate}%지만 아직 희망은 있다... 아마도?',
            '${txCount}번의 실수를 거쳐 이제 진짜 전문가!',
            '총 ${totalFees} 수수료로 블록체인 발전에 기여 중!',
            '${failRate}% 실패율이지만 포기는 없다!',
            '${chainCount}개 체인 정복! 진정한 멀티체인 전사!',
            '${nftCount}개 NFT로 디지털 미술관 운영 중!',
            '하루 ${avgTx}개 트랜잭션... 이게 바로 온체인 라이프!',
            '${protocolCount}개 프로토콜 경험! 이제 뭐든 할 수 있어!',
            '${years}년차 크립토 베테랑... 아직도 초보 같은 느낌?'
        ];
    }

    // Main story generation
    generateStory(walletData) {
        const story = {
            walletType: this.determineWalletType(walletData),
            typeDesc: null,
            cringeHistory: [],
            stats: this.generateStats(walletData),
            persona: this.generatePersona(walletData),
            finalDiagnosis: null
        };

        story.typeDesc = this.getTypeDescription(story.walletType.name);
        story.cringeHistory = this.generateCringeHistory(walletData);
        story.finalDiagnosis = this.generateDiagnosis(walletData, story);

        return story;
    }

    determineWalletType(data) {
        const patterns = this.analyzePatterns(data);
        const scores = {};
        
        // Initialize all types with base score
        this.walletTypes.forEach(type => {
            scores[type.name] = 0;
        });
        
        // Enhanced scoring logic based on actual data patterns
        
        // Gas usage patterns
        const gasUsedETH = patterns.totalGasUsed > 0 ? Number(patterns.totalGasUsed) / 1e18 : 0;
        if (gasUsedETH > 1) {
            scores['가스비 부자형'] += 15;
        } else if (gasUsedETH > 0.5) {
            scores['가스비 부자형'] += 10;
        } else if (gasUsedETH > 0.1) {
            scores['가스비 부자형'] += 5;
        }
        
        // Failure rate
        if (patterns.failureRate > 0.3) {
            scores['실수 연발형'] += 20;
        } else if (patterns.failureRate > 0.2) {
            scores['실수 연발형'] += 15;
        } else if (patterns.failureRate > 0.1) {
            scores['실수 연발형'] += 10;
            scores['똥손 트레이더형'] += 5;
        }
        
        // NFT activity
        if (patterns.nftCount > 50) {
            scores['NFT 수집광형'] += 20;
        } else if (patterns.nftCount > 20) {
            scores['NFT 수집광형'] += 15;
        } else if (patterns.nftCount > 10) {
            scores['NFT 수집광형'] += 10;
        } else if (patterns.nftCount > 0) {
            scores['NFT 수집광형'] += 5;
        }
        
        // Token diversity
        if (patterns.uniqueTokens > 100) {
            scores['밈코인 중독자형'] += 15;
            scores['소액 다분산형'] += 10;
        } else if (patterns.uniqueTokens > 50) {
            scores['밈코인 중독자형'] += 12;
            scores['소액 다분산형'] += 8;
        } else if (patterns.uniqueTokens > 20) {
            scores['밈코인 중독자형'] += 8;
            scores['소액 다분산형'] += 5;
        }
        
        // DeFi activity
        if (patterns.defiProtocolCount > 10) {
            scores['DeFi 농부형'] += 20;
            scores['프로토콜 테스터형'] += 10;
        } else if (patterns.defiProtocolCount > 5) {
            scores['DeFi 농부형'] += 15;
            scores['프로토콜 테스터형'] += 8;
        } else if (patterns.defiProtocolCount > 2) {
            scores['DeFi 농부형'] += 10;
        }
        
        // Multi-chain activity
        if (patterns.activeChains >= 5) {
            scores['브릿지 노예형'] += 20;
            scores['에어드랍 헌터형'] += 10;
        } else if (patterns.activeChains >= 3) {
            scores['브릿지 노예형'] += 15;
            scores['에어드랍 헌터형'] += 8;
        } else if (patterns.activeChains >= 2) {
            scores['브릿지 노예형'] += 8;
        }
        
        // Transaction volume
        if (patterns.totalTransactions > 1000) {
            scores['하이리스크 도박꾼형'] += 10;
            scores['똥손 트레이더형'] += 8;
        } else if (patterns.totalTransactions > 500) {
            scores['FOMO 투자천재형'] += 8;
        } else if (patterns.totalTransactions < 10) {
            scores['신중한 관망자형'] += 15;
        } else if (patterns.totalTransactions < 50) {
            scores['신중한 관망자형'] += 8;
        }
        
        // Inactivity patterns
        if (patterns.daysSinceLastTx > 365) {
            scores['데드 월렛형'] += 20;
        } else if (patterns.daysSinceLastTx > 180) {
            scores['데드 월렛형'] += 15;
        } else if (patterns.daysSinceLastTx > 90) {
            scores['신중한 관망자형'] += 10;
        } else if (patterns.daysSinceLastTx < 7) {
            scores['FOMO 투자천재형'] += 5;
        }
        
        // Token transfer activity
        if (patterns.tokenTransfers > 500) {
            scores['똥손 트레이더형'] += 10;
            scores['하이리스크 도박꾼형'] += 8;
        } else if (patterns.tokenTransfers > 100) {
            scores['FOMO 투자천재형'] += 5;
        }
        
        // Airdrop hunter pattern (many chains, low value)
        if (patterns.activeChains > 3 && patterns.totalValue < 100) {
            scores['에어드랍 헌터형'] += 15;
        }
        
        // Select highest scoring type
        let selectedType = this.walletTypes[0];
        let highestScore = 0;
        
        // Log scores for debugging
        console.log('Wallet type scores:', scores);
        
        Object.entries(scores).forEach(([typeName, score]) => {
            if (score > highestScore) {
                highestScore = score;
                selectedType = this.walletTypes.find(t => t.name === typeName) || selectedType;
            }
        });
        
        // If scores are too close, consider secondary factors
        if (highestScore < 10) {
            // Default based on most obvious pattern
            if (patterns.nftCount > patterns.uniqueTokens && patterns.nftCount > 5) {
                selectedType = this.walletTypes.find(t => t.name === 'NFT 수집광형');
            } else if (patterns.failureRate > 0.15) {
                selectedType = this.walletTypes.find(t => t.name === '실수 연발형');
            } else if (patterns.activeChains > 2) {
                selectedType = this.walletTypes.find(t => t.name === '브릿지 노예형');
            } else if (patterns.totalTransactions < 20) {
                selectedType = this.walletTypes.find(t => t.name === '신중한 관망자형');
            } else {
                // Truly random only as last resort
                selectedType = this.walletTypes[Math.floor(Math.random() * this.walletTypes.length)];
            }
        }
        
        return selectedType;
    }

    analyzePatterns(data) {
        const patterns = {
            totalTransactions: 0,
            failedTransactions: 0,
            totalGasUsed: BigInt(0),
            avgGasPrice: 0,
            nftCount: 0,
            uniqueTokens: 0,
            defiProtocols: new Set(),
            activeChains: 0,
            daysSinceLastTx: 0,
            buyHighSellLow: false,
            failureRate: 0,
            defiProtocolCount: 0,
            tokenTransfers: 0,
            nftTransfers: 0,
            hasTokens: false,
            hasNFTs: false,
            totalValue: 0
        };

        // Use aggregated stats first
        patterns.totalTransactions = data.totalStats?.transactionCount || 0;
        patterns.failedTransactions = data.totalStats?.failedTransactions || 0;
        patterns.uniqueTokens = data.totalStats?.uniqueTokensCount || 0;
        patterns.nftCount = data.totalStats?.uniqueNFTsCount || 0;
        patterns.tokenTransfers = data.totalStats?.tokenTransfers || 0;
        patterns.nftTransfers = data.totalStats?.nftTransfers || 0;

        // Analyze each chain for additional data
        Object.entries(data.chains).forEach(([chain, chainData]) => {
            // Count active chains
            if ((chainData.totalTransactions > 0) || 
                (chainData.stats?.transactionCount > 0) || 
                (chainData.transactions?.length > 0)) {
                patterns.activeChains++;
            }
            
            // Collect token and NFT counts if not in totalStats
            if (!data.totalStats?.uniqueTokensCount) {
                patterns.uniqueTokens += chainData.tokens?.length || 0;
            }
            if (!data.totalStats?.uniqueNFTsCount) {
                patterns.nftCount += chainData.nfts?.length || 0;
            }
            
            // Check if has tokens or NFTs
            if (chainData.tokens?.length > 0) patterns.hasTokens = true;
            if (chainData.nfts?.length > 0) patterns.hasNFTs = true;
            
            // Analyze DeFi activity
            chainData.transactions?.forEach(tx => {
                if (tx.to && this.isDefiProtocol(tx.to)) {
                    patterns.defiProtocols.add(tx.to.toLowerCase());
                }
            });
            
            // Calculate total value (native balance)
            if (chainData.nativeBalance?.balance) {
                const balance = parseFloat(chainData.nativeBalance.balance);
                if (!isNaN(balance) && balance > 0) {
                    // Rough USD estimation (you would need real prices for accuracy)
                    const usdEstimate = chain === 'ethereum' ? balance * 2000 : 
                                      chain === 'polygon' ? balance * 0.8 : 
                                      balance * 100; // default estimate
                    patterns.totalValue += usdEstimate;
                }
            }
        });

        // Calculate metrics
        if (patterns.totalTransactions > 0) {
            patterns.failureRate = patterns.failedTransactions / patterns.totalTransactions;
        }

        // Calculate days since last transaction
        if (data.totalStats?.latestTransaction) {
            const lastTxDate = new Date(data.totalStats.latestTransaction);
            patterns.daysSinceLastTx = Math.floor((Date.now() - lastTxDate) / (1000 * 60 * 60 * 24));
        } else {
            patterns.daysSinceLastTx = 999; // No transactions
        }

        // Calculate total gas used
        if (data.totalStats?.totalGasUsed) {
            patterns.totalGasUsed = BigInt(data.totalStats.totalGasUsed);
        }

        patterns.defiProtocolCount = patterns.defiProtocols.size;

        return patterns;
    }

    isDefiProtocol(address) {
        const defiProtocols = [
            '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
            '0x881d40237659c251811cec9c364ef91dc08d300c',
            '0x1111111254fb6c44bac0bed2854e76f90643097d',
            '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
            '0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad'
        ];
        
        return defiProtocols.includes(address.toLowerCase());
    }

    getTypeDescription(typeName) {
        const descriptions = this.typeDescTemplates[typeName];
        if (!descriptions || descriptions.length === 0) {
            return {
                main: '독특한 투자 스타일의 소유자',
                sub: '분석 불가한 신비로운 지갑 🔮❓'
            };
        }
        
        return descriptions[0];
    }

    generateCringeHistory(data) {
        const stories = [];
        const patterns = this.analyzePatterns(data);
        
        // Add various stories based on actual data patterns
        if (patterns.failureRate > 0.05) {
            stories.push(this.generateFailureStory(data, patterns));
        }
        
        if (patterns.nftCount > 0) {
            stories.push(this.generateNFTStory(data, patterns));
        }
        
        if (patterns.tokenTransfers > 10) {
            stories.push(this.generateTokenTraderStory(data, patterns));
        }
        
        if (patterns.defiProtocolCount > 0) {
            stories.push(this.generateDeFiStory(data, patterns));
        }
        
        if (patterns.activeChains > 1) {
            stories.push(this.generateBridgeStory(data, patterns));
        }
        
        if (patterns.totalGasUsed > 0) {
            stories.push(this.generateGasStory(data, patterns));
        }
        
        // Add time-based story
        stories.push(this.generateTimeStory(data, patterns));
        
        // Ensure at least 3 stories, remove duplicates
        const uniqueStories = [];
        const seenTitles = new Set();
        
        stories.forEach(story => {
            if (!seenTitles.has(story.title)) {
                uniqueStories.push(story);
                seenTitles.add(story.title);
            }
        });
        
        // Fill with random stories if needed
        while (uniqueStories.length < 3) {
            const randomStory = this.generateRandomStory(data, patterns);
            if (!seenTitles.has(randomStory.title)) {
                uniqueStories.push(randomStory);
                seenTitles.add(randomStory.title);
            }
        }
        
        return uniqueStories.slice(0, 5);
    }

    generateFailureStory(data, patterns) {
        const template = this.cringeTemplates.failurePro[0];
        const successRate = ((1 - patterns.failureRate) * 100).toFixed(1);
        
        let story = template.template;
        story = story.replace('${failedCount}', patterns.failedTransactions);
        story = story.replace('${successRate}', successRate);
        
        return {
            title: template.title,
            description: story
        };
    }

    generateNFTStory(data, patterns) {
        const template = this.cringeTemplates.nftAddict[0];
        const nftCount = patterns.nftCount;
        // More realistic value estimates
        const avgNFTValue = 0.05; // Assume 0.05 ETH average current value
        const avgPurchasePrice = 0.2; // Assume 0.2 ETH average purchase price
        const currentValue = (nftCount * avgNFTValue).toFixed(2);
        const purchasePrice = (nftCount * avgPurchasePrice).toFixed(2);
        const roi = -75; // Typical NFT loss
        
        let story = template.template;
        story = story.replace('${nftCount}', nftCount);
        story = story.replace('${currentValue}', `${currentValue} ETH`);
        story = story.replace('${purchasePrice}', `${purchasePrice} ETH`);
        story = story.replace('${roi}', roi);
        
        return {
            title: template.title,
            description: story
        };
    }

    generateTimeStory(data, patterns) {
        const template = this.cringeTemplates.timingExpert[0];
        // Estimate night transactions (30% of total is a reasonable guess)
        const nightTxCount = Math.floor(patterns.totalTransactions * 0.3);
        
        let story = template.template;
        story = story.replace('${nightTxCount}', nightTxCount);
        
        return {
            title: template.title,
            description: story
        };
    }

    generateGasStory(data, patterns) {
        const template = this.cringeTemplates.gasWaster[0];
        const gasInETH = Number(patterns.totalGasUsed) / 1e18;
        const gasInUSD = (gasInETH * 2000).toFixed(2); // Rough ETH price estimate
        const pizzaCount = Math.floor(gasInUSD / 20); // $20 per pizza
        
        let story = template.template;
        story = story.replace('${date}', '최근');
        story = story.replace('${gasInUSD}', `$${gasInUSD}`);
        story = story.replace('${pizzaCount}', pizzaCount || 1);
        
        return {
            title: template.title,
            description: story
        };
    }

    generateTokenTraderStory(data, patterns) {
        const template = this.cringeTemplates.tokenTrader[0];
        // Estimate dead tokens (50% is typical in crypto)
        const deadTokens = Math.floor(patterns.uniqueTokens * 0.5);
        
        let story = template.template;
        story = story.replace('${deadTokens}', deadTokens || 5);
        
        return {
            title: template.title,
            description: story
        };
    }

    generateDeFiStory(data, patterns) {
        const template = this.cringeTemplates.defiDegen[0];
        const lpCount = Math.max(patterns.defiProtocolCount, 3);
        const ilAmount = (lpCount * 50).toFixed(2); // Estimate $50 IL per pool
        
        let story = template.template;
        story = story.replace('${lpCount}', lpCount);
        story = story.replace('${ilAmount}', `$${ilAmount}`);
        
        return {
            title: template.title,
            description: story
        };
    }

    generateBridgeStory(data, patterns) {
        const template = this.cringeTemplates.bridgeExplorer[0];
        const bridgeCount = patterns.activeChains * 10; // Estimate bridges
        const bridgeFees = (bridgeCount * 5).toFixed(2); // $5 per bridge
        
        let story = template.template;
        story = story.replace('${bridgeCount}', bridgeCount);
        story = story.replace('${bridgeFees}', `$${bridgeFees}`);
        
        return {
            title: template.title,
            description: story
        };
    }

    generateRandomStory(data, patterns) {
        const availableTemplates = [];
        
        // Select templates based on actual data
        if (patterns.totalGasUsed > 0) {
            availableTemplates.push(...this.cringeTemplates.gasWaster);
        }
        if (patterns.tokenTransfers > 50) {
            availableTemplates.push(...this.cringeTemplates.mevVictim);
        }
        if (patterns.uniqueTokens > 5) {
            availableTemplates.push(...this.cringeTemplates.tokenTrader);
        }
        if (patterns.defiProtocolCount > 0) {
            availableTemplates.push(...this.cringeTemplates.defiDegen);
        }
        if (patterns.activeChains > 1) {
            availableTemplates.push(...this.cringeTemplates.bridgeExplorer);
            availableTemplates.push(...this.cringeTemplates.airdropHunter);
        }
        
        // Fallback to all templates if none selected
        if (availableTemplates.length === 0) {
            availableTemplates.push(
                ...this.cringeTemplates.gasWaster,
                ...this.cringeTemplates.tokenTrader,
                ...this.cringeTemplates.airdropHunter
            );
        }
        
        const template = availableTemplates[Math.floor(Math.random() * availableTemplates.length)];
        let story = template.template;
        
        // Replace with values based on actual data
        story = story.replace(/\${[^}]+}/g, (match) => {
            const key = match.slice(2, -1);
            switch(key) {
                case 'date': return '최근';
                case 'gasInUSD': 
                    const gasETH = Number(patterns.totalGasUsed) / 1e18;
                    return '$' + (gasETH * 2000 / patterns.totalTransactions).toFixed(2);
                case 'pizzaCount': 
                    const gasUSD = Number(patterns.totalGasUsed) / 1e18 * 2000;
                    return Math.max(1, Math.floor(gasUSD / patterns.totalTransactions / 20));
                case 'lossAmount': 
                    return (patterns.tokenTransfers * 2).toFixed(2) + ' USD';
                case 'deadTokens': 
                    return Math.max(5, Math.floor(patterns.uniqueTokens * 0.3));
                case 'lpCount': 
                    return Math.max(3, patterns.defiProtocolCount);
                case 'ilAmount': 
                    return '$' + (patterns.defiProtocolCount * 50).toFixed(2);
                case 'bridgeCount': 
                    return Math.max(10, patterns.activeChains * 10);
                case 'bridgeFees': 
                    return '$' + (patterns.activeChains * 50).toFixed(2);
                case 'protocolCount': 
                    return Math.max(10, patterns.defiProtocolCount + patterns.activeChains * 3);
                case 'expectedCount': 
                    return Math.max(5, patterns.activeChains * 2);
                default: 
                    return Math.floor(Math.random() * 100);
            }
        });
        
        return {
            title: template.title,
            description: story
        };
    }

    generateStats(data) {
        const stats = [];
        const patterns = this.analyzePatterns(data);
        
        stats.push({
            label: '총 트랜잭션',
            value: patterns.totalTransactions.toLocaleString()
        });
        
        const totalGasETH = (parseInt(data.totalStats.totalGasUsed || '0') / 1e18).toFixed(4);
        stats.push({
            label: '총 가스비',
            value: `${totalGasETH} ETH`
        });
        
        stats.push({
            label: '지갑 나이',
            value: `${data.totalStats.walletAgeMonths || 0}개월`
        });
        
        stats.push({
            label: '마지막 활동',
            value: `${patterns.daysSinceLastTx}일 전`
        });
        
        stats.push({
            label: '활동 체인',
            value: `${patterns.activeChains}개`
        });
        
        stats.push({
            label: '보유 NFT',
            value: patterns.nftCount.toLocaleString()
        });
        
        return stats;
    }

    generatePersona(data) {
        const traits = [];
        const applicableTraits = [...this.personalityTraits];
        
        // Select 3 random traits
        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * applicableTraits.length);
            traits.push(applicableTraits[randomIndex]);
            applicableTraits.splice(randomIndex, 1);
        }
        
        return traits;
    }

    generateDiagnosis(data, story) {
        const templates = [...this.diagnosisTemplates];
        const template = templates[Math.floor(Math.random() * templates.length)];
        const patterns = this.analyzePatterns(data);
        
        let diagnosis = template;
        
        // Replace variables
        diagnosis = diagnosis.replace('${days}', data.totalStats.walletAgeDays || 0);
        diagnosis = diagnosis.replace('${lossRate}', Math.floor(Math.random() * 50 + 30));
        diagnosis = diagnosis.replace('${txCount}', patterns.totalTransactions);
        diagnosis = diagnosis.replace('${totalFees}', `${(parseInt(data.totalStats.totalGasUsed || '0') / 1e18).toFixed(2)} ETH`);
        diagnosis = diagnosis.replace('${failRate}', (patterns.failureRate * 100).toFixed(1));
        diagnosis = diagnosis.replace('${chainCount}', patterns.activeChains);
        diagnosis = diagnosis.replace('${nftCount}', patterns.nftCount);
        diagnosis = diagnosis.replace('${avgTx}', Math.floor(patterns.totalTransactions / (data.totalStats.walletAgeDays || 1)));
        diagnosis = diagnosis.replace('${protocolCount}', patterns.defiProtocolCount);
        diagnosis = diagnosis.replace('${years}', Math.floor((data.totalStats.walletAgeDays || 0) / 365));
        
        return diagnosis;
    }
}

// Export
window.StoryGenerator = new StoryGenerator();
