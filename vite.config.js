import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000
  }
})
```

**.gitignore:**
```
node_modules
dist
.env
.DS_Store
npm-debug.log
