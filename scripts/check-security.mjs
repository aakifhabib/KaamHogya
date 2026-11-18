// Run after starting the production server: node scripts/check-security.mjs [base URL]
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const code = ts.transpileModule(fs.readFileSync('src/lib/json-ld.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const mod = { exports: {} };
vm.runInNewContext(code, { exports: mod.exports, module: mod });
const payload = '</script><script>alert(1)</script>';
const encoded = mod.exports.serializeJsonLd({ payload });
assert.ok(!encoded.includes('<'), 'JSON-LD must not contain raw HTML delimiters');
assert.equal(JSON.parse(encoded).payload, payload);
const base = process.argv[2] ?? 'http://localhost:3000';
for (const path of ['/', '/nadra', '/city/karachi', '/processes']) {
  const response = await fetch(base + path);
  assert.equal(response.status, 200, path);
  const html = await response.text();
  assert.ok(!/href=["']\/admin(?:["'/?#])/.test(html), `${path}: admin link in public HTML`);
  assert.match(response.headers.get('content-security-policy') ?? '', /object-src 'none'/);
}
const admin = await fetch(base + '/admin');
assert.equal(admin.status, 200);
assert.match(admin.headers.get('cache-control') ?? '', /no-store/);
assert.match(admin.headers.get('x-robots-tag') ?? '', /noindex/);
console.log('JSON-LD escaping, public navigation, admin route and response headers passed.');
