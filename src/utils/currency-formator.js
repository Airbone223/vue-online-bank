export function currency(price) {
    return new Intl.NumberFormat('us-US', {
        currency: 'USD',
        style: 'currency'
    }).format(price)
}
