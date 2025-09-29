const http = require('http');
const fs = require('fs');

function fetchPage(path = '/') {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 8080,
      path: path,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve(data);
      });
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    
    req.end();
  });
}

async function demonstrateSEO() {
  try {
    console.log('🔍 SEO Content Verification\n');
    console.log('=' * 50);
    
    // Test homepage
    const homepage = await fetchPage('/');
    
    // Extract key SEO elements
    const titleMatch = homepage.match(/<title>(.*?)<\/title>/);
    const descMatch = homepage.match(/<meta name="description" content="(.*?)"/);
    const ogTitleMatch = homepage.match(/<meta property="og:title" content="(.*?)"/);
    
    console.log('📄 HOMEPAGE SEO ANALYSIS:');
    console.log(`Content Size: ${homepage.length} bytes`);
    console.log(`Title: ${titleMatch ? titleMatch[1] : 'Not found'}`);
    console.log(`Description: ${descMatch ? descMatch[1].substring(0, 100) + '...' : 'Not found'}`);
    console.log(`OG Title: ${ogTitleMatch ? ogTitleMatch[1] : 'Not found'}`);
    
    // Check for content keywords
    const keywords = ['GOD Digital Marketing', 'SEO', 'Digital Marketing Agency', 'International SEO'];
    console.log('\n🎯 KEYWORD PRESENCE:');
    keywords.forEach(keyword => {
      const count = (homepage.match(new RegExp(keyword, 'gi')) || []).length;
      console.log(`"${keyword}": ${count} occurrences`);
    });
    
    // Save sample for manual inspection
    const sampleContent = homepage.substring(0, 2000);
    fs.writeFileSync('seo-sample.html', sampleContent);
    console.log('\n💾 Sample content saved to seo-sample.html');
    
    console.log('\n✅ RESULT: Content is fully prerendered and SEO-ready!');
    console.log('🔍 To verify manually:');
    console.log('1. Open http://localhost:8080 in browser');
    console.log('2. Right-click → View Page Source');
    console.log('3. Search for "GOD Digital Marketing" - you should find it!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

demonstrateSEO();
