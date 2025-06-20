// Main Application Logic for My Cursed Wallet LOL
class WalletAnalyzer {
    constructor() {
        this.currentBoard = 'board-home';
        this.walletData = null;
        this.storyData = null;
        this.isAnalyzing = false;
        this.progressStages = [
            '온체인 데이터 탐색 중...',
            '트랜잭션 히스토리 분석 중...',
            '토큰 & NFT 활동 파악 중...',
            '흑역사 스토리 생성 중...',
            '결과 정리 중...'
        ];
        
        this.init();
    }

    init() {
        // Bind event listeners
        this.bindEvents();
        
        // Initialize share functionality
        this.initializeShare();
    }

    bindEvents() {
        // Home board
        const analyzeBtn = document.getElementById('analyze-btn');
        const walletInput = document.getElementById('wallet-input');
        
        analyzeBtn?.addEventListener('click', () => this.startAnalysis());
        walletInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.startAnalysis();
        });

        // Result boards
        document.querySelectorAll('.unlock-btn').forEach(btn => {
            btn.addEventListener('click', () => this.unlockResults());
        });

        document.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', () => this.showShareModal());
        });

        document.querySelectorAll('.reset-btn').forEach(btn => {
            btn.addEventListener('click', () => this.resetAnalysis());
        });

        // Share modal
        document.querySelector('.modal-close')?.addEventListener('click', () => {
            this.hideShareModal();
        });

        document.querySelectorAll('.share-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const platform = e.currentTarget.dataset.platform;
                this.shareResult(platform);
            });
        });
    }

    // Validate wallet address or ENS name
    validateInput(input) {
        const trimmed = input.trim();
        
        // Check if it's an ENS name
        if (trimmed.endsWith('.eth')) {
            return { valid: true, type: 'ens', value: trimmed };
        }
        
        // Check if it's a valid Ethereum address
        if (/^0x[a-fA-F0-9]{40}$/.test(trimmed)) {
            return { valid: true, type: 'address', value: trimmed };
        }
        
        return { valid: false };
    }

    // Start the analysis process
    async startAnalysis() {
        if (this.isAnalyzing) return;

        const input = document.getElementById('wallet-input').value;
        const validation = this.validateInput(input);
        
        if (!validation.valid) {
            this.showError('올바른 지갑 주소나 ENS 이름을 입력해주세요!');
            return;
        }

        this.isAnalyzing = true;
        this.walletData = null;
        this.storyData = null;

        // Show loader
        this.showBoard('board-loader');
        this.startProgress();

        try {
            // Analyze wallet
            const walletData = await window.NoditAPI.analyzeWallet(validation.value);
            this.walletData = walletData;

            // Generate story
            const storyData = window.StoryGenerator.generateStory(walletData);
            this.storyData = storyData;

            // Show results
            this.displayResults();
            this.showBoard('board-result-locked');

        } catch (error) {
            console.error('Analysis error:', error);
            this.showError('분석 중 오류가 발생했습니다. 다시 시도해주세요!');
            this.showBoard('board-home');
        } finally {
            this.isAnalyzing = false;
        }
    }

    // Progress bar animation
    startProgress() {
        const progressFill = document.querySelector('.progress-fill');
        const stageText = document.querySelector('.stage-text');
        let progress = 0;
        let stageIndex = 0;

        const interval = setInterval(() => {
            progress += 2;
            progressFill.style.width = `${progress}%`;

            // Update stage text
            const currentStage = Math.floor(progress / 20);
            if (currentStage !== stageIndex && currentStage < this.progressStages.length) {
                stageIndex = currentStage;
                stageText.textContent = this.progressStages[stageIndex];
            }

            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 100);
    }

    // Display analysis results
    displayResults() {
        if (!this.storyData) return;

        // Update wallet type
        document.querySelectorAll('.type-name').forEach(el => {
            el.textContent = this.storyData.walletType.name;
        });
        document.querySelectorAll('.type-emoji').forEach(el => {
            el.textContent = this.storyData.walletType.emoji;
        });

        // Update type description
        document.querySelectorAll('.desc-main').forEach(el => {
            el.textContent = this.storyData.typeDesc.main;
        });
        document.querySelectorAll('.desc-sub').forEach(el => {
            el.textContent = this.storyData.typeDesc.sub;
        });

        // Update cringe history
        const historyContainers = document.querySelectorAll('.history-list');
        historyContainers.forEach(container => {
            container.innerHTML = '';
            
            this.storyData.cringeHistory.forEach((story, index) => {
                const historyItem = document.createElement('div');
                historyItem.className = 'history-item';
                historyItem.innerHTML = `
                    <div class="history-title">
                        <span class="history-number">${index + 1}️⃣</span>
                        ${story.title}
                    </div>
                    <div class="history-desc">${story.description}</div>
                `;
                container.appendChild(historyItem);
            });
        });

        // Update stats
        const statsGrids = document.querySelectorAll('.stats-grid');
        statsGrids.forEach(grid => {
            grid.innerHTML = '';
            
            this.storyData.stats.forEach(stat => {
                const statItem = document.createElement('div');
                statItem.className = 'stat-item';
                statItem.innerHTML = `
                    <div class="stat-label">${stat.label}</div>
                    <div class="stat-value">${stat.value}</div>
                `;
                grid.appendChild(statItem);
            });
        });

        // Update persona
        const personaContainers = document.querySelectorAll('.persona-points');
        personaContainers.forEach(container => {
            container.innerHTML = '';
            
            this.storyData.persona.forEach(trait => {
                const traitItem = document.createElement('div');
                traitItem.className = 'persona-point';
                traitItem.innerHTML = `<span>• ${trait}</span>`;
                container.appendChild(traitItem);
            });
        });

        // Update final diagnosis
        document.querySelectorAll('.diagnosis-text').forEach(el => {
            el.textContent = this.storyData.finalDiagnosis;
        });

        // Copy locked content to unlocked board
        this.syncResultBoards();
    }

    // Sync content between locked and unlocked boards
    syncResultBoards() {
        const lockedBoard = document.getElementById('board-result-locked');
        const unlockedBoard = document.getElementById('board-result-unlocked');
        
        // Clone the content
        unlockedBoard.innerHTML = lockedBoard.innerHTML;
        
        // Remove blur from unlocked version
        unlockedBoard.querySelectorAll('.blur').forEach(el => {
            el.classList.remove('blur');
        });

        // Re-bind events for the cloned elements
        unlockedBoard.querySelector('.unlock-btn')?.addEventListener('click', () => this.unlockResults());
        unlockedBoard.querySelector('.share-btn')?.addEventListener('click', () => this.showShareModal());
        unlockedBoard.querySelector('.reset-btn')?.addEventListener('click', () => this.resetAnalysis());
    }

    // Show specific board
    showBoard(boardId) {
        document.querySelectorAll('.board').forEach(board => {
            board.classList.remove('active');
        });
        
        const targetBoard = document.getElementById(boardId);
        if (targetBoard) {
            targetBoard.classList.add('active');
            this.currentBoard = boardId;
            
            // Scroll to top
            window.scrollTo(0, 0);
        }
    }

    // Unlock results (simulate signup)
    unlockResults() {
        // Open Nodit signup in new tab
        window.open('https://id.lambda256.io/signup?referral=ZNYVEL', '_blank');
        
        // Show unlocked board after short delay
        setTimeout(() => {
            this.showBoard('board-result-unlocked');
        }, 300);
    }

    // Show share modal
    showShareModal() {
        const modal = document.getElementById('share-modal');
        modal?.classList.add('active');
    }

    // Hide share modal
    hideShareModal() {
        const modal = document.getElementById('share-modal');
        modal?.classList.remove('active');
    }

    // Share functionality
    shareResult(platform) {
        if (!this.storyData) return;

        const shareText = `내 지갑 유형은 "${this.storyData.walletType.name}" ${this.storyData.walletType.emoji}!\n\n${this.storyData.typeDesc.main}\n\n당신의 온체인 흑역사는? 👉`;
        const shareUrl = window.location.href;

        let shareLink = '';

        switch (platform) {
            case 'kakao':
                // Kakao sharing requires SDK initialization
                this.shareViaKakao(shareText, shareUrl);
                break;
                
            case 'twitter':
                shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
                window.open(shareLink, '_blank');
                break;
                
            case 'telegram':
                shareLink = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
                window.open(shareLink, '_blank');
                break;
        }

        this.hideShareModal();
    }

    // Kakao share implementation
    shareViaKakao(text, url) {
        // Note: Kakao SDK needs to be loaded in production
        if (window.Kakao && window.Kakao.isInitialized()) {
            window.Kakao.Share.sendDefault({
                objectType: 'feed',
                content: {
                    title: '내지갑 흑역사ㅋㅋㅋ',
                    description: text,
                    imageUrl: window.location.origin + '/og-image.png',
                    link: {
                        mobileWebUrl: url,
                        webUrl: url
                    }
                },
                buttons: [{
                    title: '내 흑역사 보러가기',
                    link: {
                        mobileWebUrl: url,
                        webUrl: url
                    }
                }]
            });
        } else {
            // Fallback to web share API or copy link
            this.copyShareLink(text, url);
        }
    }

    // Copy share link fallback
    copyShareLink(text, url) {
        const shareData = `${text}\n${url}`;
        
        if (navigator.share) {
            navigator.share({
                title: '내지갑 흑역사ㅋㅋㅋ',
                text: text,
                url: url
            }).catch(err => console.log('Share failed:', err));
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(shareData)
                .then(() => {
                    this.showToast('링크가 복사되었습니다!');
                })
                .catch(err => console.error('Copy failed:', err));
        }
    }

    // Reset analysis
    resetAnalysis() {
        // Clear data
        this.walletData = null;
        this.storyData = null;
        
        // Clear input
        const walletInput = document.getElementById('wallet-input');
        if (walletInput) {
            walletInput.value = '';
        }
        
        // Reset progress
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = '0%';
        }
        
        // Go back to home
        this.showBoard('board-home');
    }

    // Show error message
    showError(message) {
        this.showToast(message, 'error');
    }

    // Show toast notification
    showToast(message, type = 'info') {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'error' ? 'var(--error)' : 'var(--neon-mint)'};
            color: ${type === 'error' ? 'white' : 'var(--bg-primary)'};
            padding: 16px 24px;
            border-radius: 50px;
            font-weight: 600;
            z-index: 9999;
            animation: slideUp 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideDown 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // Initialize share functionality
    initializeShare() {
        // Add CSS for toast animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideUp {
                from {
                    transform: translate(-50%, 100px);
                    opacity: 0;
                }
                to {
                    transform: translate(-50%, 0);
                    opacity: 1;
                }
            }
            @keyframes slideDown {
                from {
                    transform: translate(-50%, 0);
                    opacity: 1;
                }
                to {
                    transform: translate(-50%, 100px);
                    opacity: 0;
                }
            }
            .toast {
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            }
        `;
        document.head.appendChild(style);
        
        // Generate OG image URL based on results
        this.updateOGTags();
    }

    // Update OG tags for social sharing
    updateOGTags() {
        if (!this.storyData) return;
        
        // Update meta tags
        const metaTags = {
            'og:title': `내 지갑 유형은 "${this.storyData.walletType.name}"!`,
            'og:description': this.storyData.typeDesc.main,
            'twitter:title': `내 지갑 유형은 "${this.storyData.walletType.name}"!`,
            'twitter:description': this.storyData.typeDesc.main
        };
        
        Object.entries(metaTags).forEach(([property, content]) => {
            let meta = document.querySelector(`meta[property="${property}"]`) || 
                       document.querySelector(`meta[name="${property}"]`);
            
            if (!meta) {
                meta = document.createElement('meta');
                if (property.startsWith('og:')) {
                    meta.setAttribute('property', property);
                } else {
                    meta.setAttribute('name', property);
                }
                document.head.appendChild(meta);
            }
            
            meta.setAttribute('content', content);
        });
    }
}

// Mock data for testing (remove in production)
class MockDataGenerator {
    static generateMockWalletData() {
        return {
            address: '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
            ens: null,
            chains: {
                ethereum: {
                    stats: {
                        transactionCount: Math.floor(Math.random() * 1000) + 100,
                        failedTransactionCount: Math.floor(Math.random() * 50)
                    },
                    nativeBalance: {
                        balance: (Math.random() * 10).toFixed(4),
                        symbol: 'ETH'
                    },
                    transactions: Array(10).fill(0).map(() => ({
                        hash: '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
                        from: '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
                        to: '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
                        value: Math.floor(Math.random() * 1e18).toString(),
                        gasUsed: Math.floor(Math.random() * 100000).toString(),
                        gasPrice: Math.floor(Math.random() * 100e9).toString(),
                        timestamp: Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000),
                        status: Math.random() > 0.1 ? '0x1' : '0x0'
                    })),
                    tokens: Array(Math.floor(Math.random() * 20)).fill(0).map(() => ({
                        contractAddress: '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
                        name: 'Random Token ' + Math.floor(Math.random() * 1000),
                        symbol: 'RND' + Math.floor(Math.random() * 100),
                        balance: Math.floor(Math.random() * 1000000).toString()
                    })),
                    nfts: Array(Math.floor(Math.random() * 30)).fill(0).map(() => ({
                        contractAddress: '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
                        name: 'Random NFT #' + Math.floor(Math.random() * 10000),
                        tokenId: Math.floor(Math.random() * 10000).toString()
                    })),
                    totalTransactions: Math.floor(Math.random() * 1000) + 100
                },
                arbitrum: {
                    stats: { transactionCount: Math.floor(Math.random() * 500) },
                    transactions: [],
                    tokens: [],
                    nfts: [],
                    totalTransactions: Math.floor(Math.random() * 500)
                },
                base: {
                    stats: { transactionCount: Math.floor(Math.random() * 300) },
                    transactions: [],
                    tokens: [],
                    nfts: [],
                    totalTransactions: Math.floor(Math.random() * 300)
                },
                polygon: {
                    stats: { transactionCount: Math.floor(Math.random() * 800) },
                    transactions: [],
                    tokens: [],
                    nfts: [],
                    totalTransactions: Math.floor(Math.random() * 800)
                },
                kaia: {
                    stats: { transactionCount: Math.floor(Math.random() * 200) },
                    transactions: [],
                    tokens: [],
                    nfts: [],
                    totalTransactions: Math.floor(Math.random() * 200)
                }
            },
            totalStats: {
                transactionCount: Math.floor(Math.random() * 3000) + 500,
                totalGasUsed: (Math.random() * 10e18).toString(),
                totalGasPrice: '0',
                earliestTransaction: Date.now() - (Math.random() * 3 * 365 * 24 * 60 * 60 * 1000),
                latestTransaction: Date.now() - (Math.random() * 30 * 24 * 60 * 60 * 1000),
                uniqueContracts: new Set(),
                failedTransactions: Math.floor(Math.random() * 100),
                tokenTransfers: Math.floor(Math.random() * 1000),
                nftTransfers: Math.floor(Math.random() * 500),
                uniqueTokens: new Set(),
                uniqueNFTs: new Set(),
                uniqueContractsCount: Math.floor(Math.random() * 100),
                uniqueTokensCount: Math.floor(Math.random() * 50),
                uniqueNFTsCount: Math.floor(Math.random() * 30),
                walletAgeDays: Math.floor(Math.random() * 1000) + 100,
                walletAgeMonths: Math.floor(Math.random() * 36) + 3
            }
        };
    }
}

// Initialize the application
let app;

document.addEventListener('DOMContentLoaded', () => {
    app = new WalletAnalyzer();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // ESC to close modal
        if (e.key === 'Escape') {
            app.hideShareModal();
        }
        
        // Ctrl/Cmd + Enter to analyze
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const input = document.getElementById('wallet-input');
            if (input && input.value && app.currentBoard === 'board-home') {
                app.startAnalysis();
            }
        }
    });
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Debug mode - add test wallet addresses
    if (window.location.search.includes('debug=true')) {
        const testAddresses = [
            'vitalik.eth',
            '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
            '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
            '0x1db3439a222c519ab44bb1144fc28167b4fa6ee6'
        ];
        
        console.log('🔧 Debug mode enabled!');
        console.log('Test addresses:', testAddresses);
        
        // Add mock data option
        window.useMockData = () => {
            app.walletData = MockDataGenerator.generateMockWalletData();
            app.storyData = window.StoryGenerator.generateStory(app.walletData);
            app.displayResults();
            app.showBoard('board-result-locked');
        };
        
        console.log('Use window.useMockData() to test with mock data');
    }
});

// Export for debugging
window.WalletAnalyzer = WalletAnalyzer;
