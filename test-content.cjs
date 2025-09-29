const http = require('http');

function testContent(path = '/') {
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
        console.log(`\n=== Testing ${path} ===`);
        console.log(`Status: ${res.statusCode}`);
        console.log(`Content-Length: ${data.length} bytes`);
        
        // Check for key content indicators
        const hasTitle = data.includes('<title>');
        const hasMetaDescription = data.includes('meta name="description"');
        const hasContent = data.includes('GOD Digital Marketing');
        const hasNavigation = data.includes('<nav');
        const hasFooter = data.includes('<footer');
        
        console.log(`Has Title: ${hasTitle}`);
        console.log(`Has Meta Description: ${hasMetaDescription}`);
        console.log(`Has GOD Digital Marketing: ${hasContent}`);
        console.log(`Has Navigation: ${hasNavigation}`);
        console.log(`Has Footer: ${hasFooter}`);
        
        if (data.length < 1000) {
          console.log('⚠️  WARNING: Content seems too small, might be SPA shell');
          console.log('First 500 chars:', data.substring(0, 500));
        } else {
          console.log('✅ Content looks good for SEO');
        }
        
        resolve({ path, status: res.statusCode, length: data.length, hasContent });
      });
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    
    req.end();
  });
}

async function runTests() {
  try {
    console.log('🔍 Testing prerendered content...\n');
    
    const paths = ['/', '/about', '/services', '/contact'];
    
    for (const path of paths) {
      await testContent(path);
    }
    
    console.log('\n🎯 Test completed!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

runTests();
