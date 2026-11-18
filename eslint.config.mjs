import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  // Existing hydration and local-storage restoration effects intentionally update state after mount.
  { rules: { 'react-hooks/set-state-in-effect': 'off' } },
  globalIgnores(['.next/**', 'node_modules/**', 'next-env.d.ts']),
]);
