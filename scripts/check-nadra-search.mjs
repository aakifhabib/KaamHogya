// Run with node scripts/check-nadra-search.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
function load(file, dependencies = {}) {
  const source = fs.readFileSync(file, 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const mod = { exports: {} };
  vm.runInNewContext(code, { module: mod, exports: mod.exports, require: name => {
    if (!(name in dependencies)) throw Error(`Unexpected import ${name}`);
    return dependencies[name];
  }});
  return mod.exports;
}
const data = load('src/data/nadra-services.ts');
const { findNadraServices } = load('src/lib/nadra-search.ts', { '@/data/nadra-services': data });
for (const [query, slug] of [['B-form', 'child-registration'], ['FRC Lahore', 'family-registration-certificate'], ['lost cnic', 'lost-cnic'], ['POC', 'pakistan-origin-card'], ['succession', 'succession-certificate']]) {
  assert.ok(findNadraServices(query).some(service => service.slug === slug), `${query}: ${slug}`);
}
assert.equal(findNadraServices('').length, 0);
assert.equal(findNadraServices('lahore').length, 0);
assert.equal(findNadraServices('unmatchable123').length, 0);
console.log('NADRA search aliases, city terms, and empty/unmatched cases passed.');
