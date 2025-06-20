// Nodit API Configuration
const NODIT_API = {
    baseUrl: 'https://web3.nodit.io/v1',
    apiKey: '3BEQoFNMozE7G2faqMgcXsejA1B0pAG9',
    chains: {
        ethereum: 'ethereum',
        arbitrum: 'arbitrum',
        base: 'base',
        polygon: 'polygon',
        kaia: 'kaia'
    },
    network: 'mainnet',
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
    retryDelays: [500, 2000, 8000] // Exponential backoff
};

// API Helper Functions
class NoditAPI {
    constructor() {
        this.headers = {
            'X-API-KEY': NODIT_API.apiKey,
            'Content-Type': 'application/json'
        };
    }

    // Generic API call with retry logic
    async callAPI(endpoint, params = {}, attempt = 0) {
        const url = new URL(`${NODIT_API.baseUrl}${endpoint}`);
        
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), NODIT_API.timeout);

            const response = await fetch(url, {
                method: 'POST',
                headers: this.headers,
                signal: controller.signal,
                body: JSON.stringify(params)
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            if (attempt < NODIT_API.retryAttempts - 1) {
                await this.delay(NODIT_API.retryDelays[attempt]);
                return this.callAPI(endpoint, params, attempt + 1);
            }
            throw error;
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // ENS Resolution
    async resolveENS(ensName) {
        try {
            const endpoint = `/ethereum/mainnet/ens/getAddressByEnsName`;
            const result = await this.callAPI(endpoint, { name: ensName });
            console.log('ENS API result:', result); // 응답 구조 확인
            
            // Nodit API 응답 구조에 맞게 처리
            if (result && result.address) {
                return result.address;
            } else if (result && result.data && result.data.address) {
                return result.data.address;
            }
            
            console.error('ENS resolution: No address found in response');
            return null;
        } catch (error) {
            console.error('ENS resolution failed:', error);
            return null;
        }
    }

    // Get ENS Records
    async getENSRecords(address) {
        try {
            const endpoint = `/ethereum/mainnet/ens/getEnsRecordsByAccount`;
            const result = await this.callAPI(endpoint, { ownerAddress: address });
            return result.items || [];
        } catch (error) {
            console.error('ENS records fetch failed:', error);
            return [];
        }
    }

    // Get Account Stats
    async getAccountStats(chain, address) {
        try {
            const endpoint = `/${chain}/mainnet/stats/getAccountStats`;
            const result = await this.callAPI(endpoint, { address });
            console.log(`Account stats for ${chain}:`, result);
            
            // transactionCounts.external + internal 합산
            const external = result.transactionCounts?.external || 0;
            const internal = result.transactionCounts?.internal || 0;
            const totalTx = external + internal;
            
            return {
                transactionCount: totalTx,
                failedTransactionCount: result.failedTransactionCount || 0,
                // 추가 필드가 있다면 여기에 추가
                ...(result.data || result || {})
            };
        } catch (error) {
            console.error(`Account stats failed for ${chain}:`, error);
            return {
                transactionCount: 0,
                failedTransactionCount: 0
            };
        }
    }

    // Get Transactions with pagination
    async getTransactions(chain, address, page = 1, rpp = 100) {
        try {
            const endpoint = `/${chain}/mainnet/blockchain/getTransactionsByAccount`;
            const result = await this.callAPI(endpoint, { 
                accountAddress: address, 
                page, 
                rpp,
                order: 'desc'
            });
            return result;
        } catch (error) {
            console.error(`Transactions failed for ${chain}:`, error);
            return { items: [], count: 0 };
        }
    }

    // Get all transactions (handling pagination)
    async getAllTransactions(chain, address, maxPages = 10) {
        const allTransactions = [];
        let page = 1;
        let hasMore = true;

        while (hasMore && page <= maxPages) {
            const result = await this.getTransactions(chain, address, page);
            allTransactions.push(...(result.items || []));
            
            hasMore = result.items && result.items.length === 100;
            page++;
        }

        return allTransactions;
    }

    // Get Native Balance
    async getNativeBalance(chain, address) {
        try {
            const endpoint = `/${chain}/mainnet/native/getNativeBalanceByAccount`;
            const result = await this.callAPI(endpoint, { accountAddress: address });
            console.log(`Native balance for ${chain}:`, result);
            
            // Nodit API 응답 구조에 맞게 처리
            if (result && (result.balance !== undefined || result.value !== undefined)) {
                return {
                    balance: result.balance || result.value || '0',
                    symbol: result.symbol || this.getNativeSymbol(chain)
                };
            }
            
            return result.data || result || { balance: '0', symbol: this.getNativeSymbol(chain) };
        } catch (error) {
            console.error(`Native balance failed for ${chain}:`, error);
            return { balance: '0', symbol: this.getNativeSymbol(chain) };
        }
    }

    // Get native token symbol for chain
    getNativeSymbol(chain) {
        const symbols = {
            ethereum: 'ETH',
            arbitrum: 'ETH',
            base: 'ETH',
            polygon: 'MATIC',
            kaia: 'KLAY'
        };
        return symbols[chain] || 'ETH';
    }

    // Get Token Holdings
    async getTokensOwned(chain, address) {
        try {
            const endpoint = `/${chain}/mainnet/token/getTokensOwnedByAccount`;
            const result = await this.callAPI(endpoint, { accountAddress: address, rpp: 100 });
            return result.items || [];
        } catch (error) {
            console.error(`Tokens owned failed for ${chain}:`, error);
            return [];
        }
    }

    // Get Token Transfers
    async getTokenTransfers(chain, address, page = 1, rpp = 100) {
        try {
            const endpoint = `/${chain}/mainnet/token/getTokenTransfersByAccount`;
            const result = await this.callAPI(endpoint, { 
                accountAddress: address, 
                page, 
                rpp,
                order: 'desc'
            });
            return result;
        } catch (error) {
            console.error(`Token transfers failed for ${chain}:`, error);
            return { items: [], count: 0 };
        }
    }

    // Get Token Prices
    async getTokenPrices(chain, contractAddresses) {
        if (!contractAddresses.length) return {};
        
        try {
            const endpoint = `/${chain}/mainnet/token/getTokenPricesByContracts`;
            const result = await this.callAPI(endpoint, { 
                contractAddresses: contractAddresses.join(',')
            });
            
            const priceMap = {};
            (result.items || []).forEach(item => {
                priceMap[item.contractAddress.toLowerCase()] = item;
            });
            return priceMap;
        } catch (error) {
            console.error(`Token prices failed for ${chain}:`, error);
            return {};
        }
    }

    // Get NFT Holdings
    async getNFTsOwned(chain, address) {
        try {
            const endpoint = `/${chain}/mainnet/nft/getNftsOwnedByAccount`;
            const result = await this.callAPI(endpoint, { accountAddress: address, rpp: 100 });
            return result.items || [];
        } catch (error) {
            console.error(`NFTs owned failed for ${chain}:`, error);
            return [];
        }
    }

    // Get NFT Transfers
    async getNFTTransfers(chain, address, page = 1, rpp = 100) {
        try {
            const endpoint = `/${chain}/mainnet/nft/getNftTransfersByAccount`;
            const result = await this.callAPI(endpoint, { 
                accountAddress: address, 
                page, 
                rpp,
                order: 'desc'
            });
            return result;
        } catch (error) {
            console.error(`NFT transfers failed for ${chain}:`, error);
            return { items: [], count: 0 };
        }
    }

    // Get Internal Transactions
    async getInternalTransactions(chain, address, page = 1, rpp = 100) {
        try {
            // Only supported chains for internal transactions
            const supportedChains = ['ethereum', 'arbitrum', 'base', 'kaia'];
            if (!supportedChains.includes(chain)) {
                return { items: [], count: 0 };
            }

            const endpoint = `/${chain}/mainnet/blockchain/getInternalTransactionsByAccount`;
            const result = await this.callAPI(endpoint, { 
                accountAddress: address, 
                page, 
                rpp,
                order: 'desc'
            });
            return result;
        } catch (error) {
            console.error(`Internal transactions failed for ${chain}:`, error);
            return { items: [], count: 0 };
        }
    }

    // Comprehensive wallet analysis across all chains
    async analyzeWallet(address) {
        const results = {
            address,
            ens: null,
            chains: {},
            totalStats: {
                transactionCount: 0,
                totalGasUsed: '0',
                totalGasPrice: '0',
                earliestTransaction: null,
                latestTransaction: null,
                uniqueContracts: new Set(),
                failedTransactions: 0,
                tokenTransfers: 0,
                nftTransfers: 0,
                uniqueTokens: new Set(),
                uniqueNFTs: new Set()
            }
        };

        // Check if it's an ENS name
        let resolvedAddress = address;
        if (address.endsWith('.eth')) {
            resolvedAddress = await this.resolveENS(address);
            if (!resolvedAddress) {
                throw new Error('ENS 이름을 찾을 수 없습니다');
            }
            results.ens = address;
            results.address = resolvedAddress;
        }

        // Get ENS records for the address
        const ensRecords = await this.getENSRecords(resolvedAddress);
        if (ensRecords.length > 0) {
            results.ensRecords = ensRecords;
        }

        // Analyze each chain in parallel
        const chainPromises = Object.entries(NODIT_API.chains).map(async ([key, chain]) => {
            const chainData = {
                stats: {},
                nativeBalance: {},
                transactions: [],
                tokens: [],
                tokenTransfers: [],
                nfts: [],
                nftTransfers: [],
                internalTransactions: []
            };

            try {
                // Get basic stats
                chainData.stats = await this.getAccountStats(chain, resolvedAddress);
                
                // Get native balance
                chainData.nativeBalance = await this.getNativeBalance(chain, resolvedAddress);
                
                // Get transactions (limited to recent)
                const txResult = await this.getTransactions(chain, resolvedAddress, 1, 100);
                chainData.transactions = txResult.items || [];
                
                // Use transaction count from stats if available, otherwise from transaction result
                chainData.totalTransactions = chainData.stats.transactionCount || txResult.count || 0;
                
                // Get token holdings
                chainData.tokens = await this.getTokensOwned(chain, resolvedAddress);
                
                // Get token transfers (limited)
                const tokenTransferResult = await this.getTokenTransfers(chain, resolvedAddress, 1, 50);
                chainData.tokenTransfers = tokenTransferResult.items || [];
                chainData.totalTokenTransfers = tokenTransferResult.count || 0;
                
                // Get NFT holdings
                chainData.nfts = await this.getNFTsOwned(chain, resolvedAddress);
                
                // Get NFT transfers (limited)
                const nftTransferResult = await this.getNFTTransfers(chain, resolvedAddress, 1, 50);
                chainData.nftTransfers = nftTransferResult.items || [];
                chainData.totalNFTTransfers = nftTransferResult.count || 0;
                
                // Get internal transactions (limited)
                const internalTxResult = await this.getInternalTransactions(chain, resolvedAddress, 1, 50);
                chainData.internalTransactions = internalTxResult.items || [];

                // Get token prices for owned tokens
                if (chainData.tokens.length > 0) {
                    const tokenAddresses = chainData.tokens
                        .map(t => t.contractAddress)
                        .filter(addr => addr)
                        .slice(0, 100); // Limit to 100 tokens
                    
                    if (tokenAddresses.length > 0) {
                        chainData.tokenPrices = await this.getTokenPrices(chain, tokenAddresses);
                    }
                }

            } catch (error) {
                console.error(`Error analyzing ${chain}:`, error);
            }

            results.chains[chain] = chainData;
            return chainData;
        });

        await Promise.all(chainPromises);

        // Aggregate total stats
        this.aggregateStats(results);

        return results;
    }

    // Aggregate statistics across all chains
    aggregateStats(results) {
        Object.values(results.chains).forEach(chainData => {
            // Transaction stats
            if (chainData.stats) {
                results.totalStats.transactionCount += chainData.stats.transactionCount || 0;
                results.totalStats.failedTransactions += chainData.stats.failedTransactionCount || 0;
            }
            
            // Also count from totalTransactions if available
            if (!chainData.stats.transactionCount && chainData.totalTransactions) {
                results.totalStats.transactionCount += chainData.totalTransactions;
            }

            // Process transactions
            chainData.transactions.forEach(tx => {
                if (tx.to) {
                    results.totalStats.uniqueContracts.add(tx.to.toLowerCase());
                }
                
                // Track earliest and latest transactions
                const timestamp = tx.timestamp || tx.blockTimestamp || tx.timeStamp;
                if (timestamp) {
                    // Convert to milliseconds if needed (check if it's in seconds)
                    const timestampMs = timestamp < 10000000000 ? timestamp * 1000 : timestamp;
                    
                    if (!results.totalStats.earliestTransaction || 
                        timestampMs < results.totalStats.earliestTransaction) {
                        results.totalStats.earliestTransaction = timestampMs;
                    }
                    if (!results.totalStats.latestTransaction || 
                        timestampMs > results.totalStats.latestTransaction) {
                        results.totalStats.latestTransaction = timestampMs;
                    }
                }

                // Sum gas used
                if (tx.gasUsed && tx.gasPrice) {
                    const gasUsed = BigInt(tx.gasUsed);
                    const gasPrice = BigInt(tx.gasPrice);
                    const gasCost = gasUsed * gasPrice;
                    results.totalStats.totalGasUsed = (BigInt(results.totalStats.totalGasUsed) + gasCost).toString();
                }
            });

            // Token stats
            results.totalStats.tokenTransfers += chainData.totalTokenTransfers || 0;
            chainData.tokens.forEach(token => {
                if (token.contractAddress) {
                    results.totalStats.uniqueTokens.add(token.contractAddress.toLowerCase());
                }
            });

            // NFT stats
            results.totalStats.nftTransfers += chainData.totalNFTTransfers || 0;
            chainData.nfts.forEach(nft => {
                if (nft.contractAddress) {
                    results.totalStats.uniqueNFTs.add(nft.contractAddress.toLowerCase());
                }
            });
        });

        // Convert sets to counts
        results.totalStats.uniqueContractsCount = results.totalStats.uniqueContracts.size;
        results.totalStats.uniqueTokensCount = results.totalStats.uniqueTokens.size;
        results.totalStats.uniqueNFTsCount = results.totalStats.uniqueNFTs.size;

        // Calculate wallet age
        if (results.totalStats.earliestTransaction) {
            const walletAgeMs = Date.now() - results.totalStats.earliestTransaction;
            results.totalStats.walletAgeDays = Math.floor(walletAgeMs / (1000 * 60 * 60 * 24));
            results.totalStats.walletAgeMonths = Math.floor(walletAgeMs / (1000 * 60 * 60 * 24 * 30));
        }

        return results;
    }
}

// Export the API instance
window.NoditAPI = new NoditAPI();
