export interface ApiCryptoRow {
    id: string,
    rank: string,
    symbol: string,
    name: string,
    supply: string,
    maxSupply: string,
    marketCapUsd: string,
    volumeUsd24Hr: string,
    priceUsd: string,
    changePercent24Hr: string,
    vwap24Hr: string,
    explorer: string
}

export interface ApiCryptoChart {
    date: string,
    priceUsd: string,
    time: number
}