export interface SavedBagCrypto {
    id: string,
    name: string,
    symbol: string,
    priceUsd: number
}

export interface BagCrypto extends SavedBagCrypto {
    amount: number
}
