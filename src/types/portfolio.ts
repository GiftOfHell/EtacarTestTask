export interface CurrencySummary {
    id: string,
    name: string,
    symbol: string,
    priceUsd: number
}

export interface CurrencySummaryWithAmount extends CurrencySummary {
    amount: number
}
