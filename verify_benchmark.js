const http = require('http');

const itemsToCheck = [
    {
        url: 'http://localhost:3000/discovery-health/priority-classic/gastroscopy',
        // 4250 vs High Average -> Should be good value
        checks: ['Great Value', 'Market Avg']
    },
    {
        url: 'http://localhost:3000/discovery-health/classic-comprehensive/gastroscopy',
        // 7250 vs Lower Average -> Should be expensive
        checks: ['Higher than Average']
    }
];

function checkUrl(item) {
    return new Promise((resolve) => {
        http.get(item.url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const missing = item.checks.filter(c => !data.includes(c));
                if (missing.length === 0) {
                    console.log(`✅ Passed: ${item.url.split('3000')[1]}`);
                    resolve(true);
                } else {
                    console.error(`❌ Failed: ${item.url.split('3000')[1]} - Missing: ${missing.join(', ')}`);
                    resolve(false);
                }
            });
        }).on('error', (e) => {
            console.error(`❌ Error fetching ${item.url}: ${e.message}`);
            resolve(false);
        });
    });
}

(async () => {
    console.log("Verifying Benchmarking...");
    const results = await Promise.all(itemsToCheck.map(checkUrl));
    if (results.every(r => r)) {
        console.log("ALL CHECKS PASSED");
    } else {
        console.log("SOME CHECKS FAILED");
    }
})();
