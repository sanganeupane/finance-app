export type MarketItemType = 'stock' | 'mutual-fund' | 'fixed-deposit' | 'bond' | 'etf';

export type MarketTrend = 'up' | 'down' | 'flat';

export type RiskLevel = 'low' | 'medium' | 'high';

export type Recommendation = 'buy' | 'hold' | 'sell' | 'invest' | 'avoid';

/**
 * Every market/investment opportunity item.
 * Recommendations are informational only — not financial advice.
 */
export interface MarketItem {
    id: string;
    symbol: string;
    name: string;
    type: MarketItemType;
    price: number;
    previousPrice: number;
    change: number;
    percentage: number;
    volume: number;
    sector: string;
    risk: RiskLevel;
    trend: MarketTrend;
    recommendation: Recommendation;
    updatedAt: string;
}

export interface MarketOverview {
    status: 'open' | 'closed' | 'pre-market' | 'after-hours';
    index: string;
    currentValue: number;
    change: number;
    percentage: number;
    volume: number;
    sentiment: 'bullish' | 'bearish' | 'neutral';
    updatedAt: string;
    disclaimer: string;
}

export interface TrendingMarketItem extends MarketItem {
    sparkline: number[];
}

export interface MarketSection {
    overview: MarketOverview;
    trending: TrendingMarketItem[];
    gainers: MarketItem[];
    losers: MarketItem[];
    mostTraded: MarketItem[];
    opportunities: MarketItem[];
}
