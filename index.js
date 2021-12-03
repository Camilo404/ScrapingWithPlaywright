const { chromium } = require('playwright')

const shops = [
    {
        vendor: 'Microsoft',
        url: 'https://www.xbox.com/es-es/configure/8WJ714N3RBTL',
        checkStock: async ({ browser, url }) => {
            const page = await browser.newPage()
            await page.goto(url)
            const content = await page.textContent('[aria-label="Finalizar la compra del pack"]')
            const hasStock = content.includes('Sin existencias') === false
            return hasStock
        }
    }
]

;(async () => {
    const browser = await chromium.launch({ headless: false })

    for (const shop of shops) {
        const { checkStock, vendor, url } = shop
        const hasStock = await checkStock ({ browser, url })
        console.log(`${vendor}: ${hasStock ? 'HAS STOCK!!!!' : 'Out of stock'}`)
    }

    await browser.close()
})()