// Setup file for vitest
import { vi } from 'vitest'

// Mock environment variables
process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000'

// Mock Next.js modules
global.vi = vi
