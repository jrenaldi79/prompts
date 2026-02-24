You are an expert in TypeScript, Node.js, React, Next.js, and Tailwind. We are using the **Next.js 15** stack, with a focus on the **App Router** and **Turbopack** for development and production builds. Use Node.js for backend logic within Next.js Route Handlers. If needed, Supabase is our preferred database provider.

**Note:** Project-specific CLAUDE.md files take precedence over this file. If a project has its own CLAUDE.md with different conventions, follow that file instead.

## Multi-Agent Setup: Symlink AGENTS.md and GEMINI.md to CLAUDE.md

Different AI coding tools look for different filenames by convention:
- **Claude Code** reads `CLAUDE.md`
- **OpenAI Codex / other agents** read `AGENTS.md`
- **Gemini CLI** reads `GEMINI.md`

Maintain one source of truth by creating symlinks so all agents use the same rules file.

**Run this once when setting up a new project:**
```bash
# From your project root
ln -sf CLAUDE.md AGENTS.md
ln -sf CLAUDE.md GEMINI.md
```

**Verify the links are set up correctly:**
```bash
ls -la CLAUDE.md AGENTS.md GEMINI.md
# Expected output:
# -rw-r--r--  CLAUDE.md
# lrwxr-xr-x  AGENTS.md -> CLAUDE.md
# lrwxr-xr-x  GEMINI.md -> CLAUDE.md
```

**Add to your project setup script or Makefile:**
```makefile
# Makefile
setup:
	ln -sf CLAUDE.md AGENTS.md
	ln -sf CLAUDE.md GEMINI.md
	npm install
```

**Why symlinks instead of copies?**
Copies drift. You update CLAUDE.md with new guidelines and forget to update the others. Symlinks guarantee all three files are always identical — edit one, all three update automatically.

**Note:** Symlinks work on macOS and Linux. On Windows, use `mklink` instead:
```cmd
mklink AGENTS.md CLAUDE.md
mklink GEMINI.md CLAUDE.md
```

## 🚨 MANDATORY: Test-Driven Development (TDD) First

**EVERY feature request MUST start with writing tests before any implementation.**

When receiving ANY feature request, your FIRST response should be:
1. "Let me start by writing the tests that define what success looks like for this feature"
2. Write comprehensive failing tests using the Red-Green-Refactor cycle
3. Only then proceed with implementation to make tests pass

**TDD Process - ALWAYS FOLLOW:**

1. **Red Phase** (REQUIRED FIRST STEP):
   - Write failing tests for the functionality you want to implement
   - Run tests to confirm they fail (shows "red" in test runner)
   - This validates that your test actually tests something

2. **Green Phase**:
   - Implement the simplest code that makes the test pass
   - Focus on making it work, not making it optimal
   - Run tests to confirm they now pass (shows "green")

3. **Refactor Phase**:
   - Clean up and optimize your implementation without changing behavior
   - Run tests after each refactor to ensure nothing is broken
   - Improve both implementation code AND test code

4. **Finalization Phase**:
   - Run full test suite: `npm run test`
   - Validate test coverage >90%: `npm run test:coverage`

**⚠️ If you start implementing before writing tests, STOP and write tests first.**

## 🚨 TDD Enforcement Checklist

**Before writing ANY implementation code, Claude MUST:**

1. ✅ **Explicitly state**: "Following TDD - writing tests first"
2. ✅ **Create test file** in appropriate `tests/` directory
3. ✅ **Write failing tests** that define expected behavior
4. ✅ **Run tests and show RED output** proving tests fail
5. ✅ **Only then write implementation**
6. ✅ **Run tests again and show GREEN output** proving tests pass

**Red Flags - STOP immediately if:**
- ❌ Creating files in `src/` before creating tests
- ❌ Using `Write` tool for implementation before tests exist
- ❌ Planning describes implementation details before test strategy
- ❌ User asks for feature and you immediately start coding

**Correct TDD Pattern:**
```
User: "Add streaming tracing support"
Assistant: "Following TDD - I'll write tests first to define what success looks like"
Assistant: *Creates tests/unit/test_streaming_tracing.test.ts*
Assistant: *Runs tests - shows RED (failing)*
Assistant: *Now creates src/utils/streaming-tracer.ts*
Assistant: *Runs tests - shows GREEN (passing)*
```

**Incorrect Pattern (DO NOT DO THIS):**
```
User: "Add streaming tracing support"
Assistant: *Immediately creates src/utils/streaming-tracer.ts*
Assistant: *Then writes tests afterward*
```

## TDD Self-Check Questions

Before writing implementation, ask yourself:
1. Have I written tests that will fail without this code?
2. Have I run those tests and confirmed they're RED?
3. Can I describe what "passing" looks like in concrete test assertions?

If the answer to ANY of these is "no", STOP and write tests first.

## When TDD Can Be Skipped

TDD may be relaxed ONLY for:
- Documentation-only changes (*.md files)
- Configuration files (package.json, tsconfig.json)
- Simple refactoring with existing test coverage
- Emergency hotfixes (with tests added immediately after)

**All other code changes require tests first.**

## File Size & Complexity Limits

Keep files small and focused. Large files are harder to maintain, test, and review.

| Metric | Limit | Action |
|--------|-------|--------|
| File length | **300 lines max** | Split into modules |
| Function length | **50 lines max** | Extract helper functions |
| Class length | **200 lines max** | Decompose into smaller classes |

**Complexity Red Flags — refactor immediately if you see:**
- More than 5 levels of nested if/else
- More than 3 try/catch blocks in one function
- More than 10 imports in a single file
- Functions with more than 5 parameters
- Files mixing unrelated concerns (e.g., UI + data fetching + validation in one file)

**Code Quality Monitoring Commands:**
```bash
# Check for oversized files (adjust path for your project)
find src/ -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | xargs wc -l | sort -rn | head -20

# Find functions that may be too long
grep -rn "function\|const.*=.*=>" src/ | head -20

# Count imports per file to spot complexity
for f in $(find src/ -name "*.ts" -o -name "*.tsx"); do echo "$(grep -c '^import' $f) $f"; done | sort -rn | head -10
```

## Development Workflow

### Before Starting Any Task
- [ ] Read the task requirements fully before writing any code
- [ ] Check if tests exist for the area you're modifying
- [ ] Identify which files will be affected
- [ ] Review existing patterns in the codebase — match them

### During Development
- [ ] Follow TDD: write tests first, then implementation
- [ ] Keep files under 300 lines
- [ ] Keep functions under 50 lines
- [ ] Run tests frequently as you work
- [ ] Commit logical, atomic changes (not one giant commit)

### Before Committing
- [ ] All tests pass: `npm run test`
- [ ] Linting passes: `npm run lint`
- [ ] No hardcoded secrets or API keys in code
- [ ] New files have corresponding tests
- [ ] If you changed behavior, update relevant documentation
- [ ] Review your own diff before committing

## Code Review Checklist

When reviewing code (yours or others), check for:
- [ ] Tests exist and cover the change
- [ ] No files exceed 300 lines
- [ ] No functions exceed 50 lines
- [ ] Error handling is present for failure paths
- [ ] No hardcoded values that should be configuration
- [ ] Logging is present for debugging (not `console.log`)
- [ ] Types are properly defined (no `any` unless justified)
- [ ] Naming is clear and consistent with project conventions

## Documentation Sync

**If code changes, documentation must change in the same task.** Don't create separate "update docs" tasks — they get forgotten.

This includes:
- README updates when adding features or changing setup
- CLAUDE.md updates when adding dependencies or changing architecture
- Inline code comments for complex logic
- API documentation when endpoints change

## Workflow
- **FIRST PRIORITY**: Follow the mandatory TDD process above - always write tests before implementation.
- **TDD Verification**: Before using Write/Edit tools on src/, verify tests exist and are RED
- **Test File Naming**: Match implementation files: `src/utils/foo.ts` → `tests/unit/test_foo.test.ts`
- Always use appropriate linting to check for errors in code formatting and syntax (Next.js has this built-in).
- **Development Server Validation**: After starting any development server, ALWAYS check the server output for warnings, errors, or compilation issues. Use BashOutput tool to monitor server logs and address any issues before proceeding with development.
- Always verify library versions before installation, especially for CSS frameworks.
- Test authentication and external API connections with simple scripts before building features.
- When encountering styling issues, check CSS framework version compatibility first.


## Maintenance Guidelines

Update this file when:

- [ ] Adding new major dependencies
- [ ] Changing architectural patterns
- [ ] Modifying directory structure
- [ ] Adding new environment variables
- [ ] Changing API response formats
- [ ] Implementing new testing patterns
- [ ] Discovering performance bottlenecks
- [ ] Making security changes


## Error Handling & Resilience
- Implement comprehensive error handling patterns at all levels (API, component, utility functions).
- Use Next.js App Router's `error.js` files for component-level error catching and React Error Boundaries for more granular control.
- Create standardized error response formats for APIs with consistent status codes and messages.
- Implement retry logic for network requests and external API calls.
- Handle loading states (`loading.js`), error states (`error.js`), and empty states in UI components.
- Use proper error logging with contextual information for debugging.
- Implement graceful degradation for non-critical features.
- Validate and sanitize all inputs at API boundaries.

## Security Best Practices
- Implement proper authentication and authorization patterns with Supabase.
- Use Row Level Security (RLS) policies in Supabase for data access control.
- Sanitize all user inputs to prevent XSS and injection attacks.
- Configure CORS policies appropriately for API Route Handlers.
- Implement rate limiting on API endpoints to prevent abuse.
- Store sensitive configuration in environment variables, never in code.
- Use HTTPS for all production communications.
- Validate JWT tokens and handle token expiration gracefully.
- Follow the principle of least privilege for database access and API permissions.

## Testing Framework Selection

Choose your testing framework based on your project stack. Set it up before writing any feature code.

| Framework | Best For | Install |
|-----------|----------|---------|
| **Vitest** | Vite-based or Next.js projects (fast, ESM-native, Jest-compatible API) | `npm install -D vitest` |
| **Jest** | Established Next.js/React projects (broad ecosystem, mature) | `npm install -D jest @types/jest ts-jest` |
| **React Testing Library** | Component testing (use alongside Vitest or Jest) | `npm install -D @testing-library/react @testing-library/jest-dom` |
| **Playwright** | End-to-end / integration testing | `npm install -D @playwright/test` |

**How to choose:**
- **New Next.js 15 project?** Start with Vitest — it's faster and handles ESM/TypeScript natively.
- **Existing Jest project?** Keep Jest — migration cost isn't worth it unless you're hitting performance issues.
- **Need E2E tests?** Add Playwright alongside your unit test framework.
- **Always add** React Testing Library for component-level testing regardless of which runner you pick.

**Configuration starter (Vitest + Next.js):**
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.ts',
    coverage: { reporter: ['text', 'html'], thresholds: { statements: 90 } },
  },
});
```

## Unit Testing Focus
- Prefer running single tests, and not the whole test suite, for performance.
- Run unit tests after completing medium-sized tasks so we find bugs while we build.
- Create unit tests that focus on critical functionality (business logic, utility functions).
- Mock dependencies (API calls, external modules) until they are built; once they are built, then swap to use the real API calls or modules.
- Test various data scenarios (valid inputs, invalid inputs, edge cases).
- Write maintainable tests with descriptive names grouped in describe blocks.
- Unit tests should be easily runnable via the configured test runner.
- Unit tests should be placed in their own directory.

## Integration & Component Testing
- Create integration tests for API endpoints that test the full request/response cycle.
- Use React Testing Library for component testing, focusing on user interactions.
- Test component behavior with different props and state combinations.
- Mock external dependencies (APIs, third-party libraries) in component tests.
- Test error states and loading states in components.
- Use test data factories for consistent test data generation.
- Test API contract compliance between frontend and backend.

## Code Quality Tools
- Use ESLint and Prettier for consistent code formatting - let tooling suggest appropriate configurations. Next.js has built-in support.
- Implement pre-commit hooks to run linting and basic tests.
- Use TypeScript in strict mode for maximum type safety.
- Set up automated quality checks in the development workflow.
- Use consistent import ordering and structure.

## Structured Logging

**Use a logging library — never use raw `console.log` in production code.**

Set up a centralized logger module early in the project. All application code imports from this module — never calls `console.log` directly. This gives you one place to control log format, level, and output.

**Recommended libraries (pick one based on your stack):**

| Library | Best For | Install |
|---------|----------|---------|
| **pino** | Next.js / Node.js (fast, JSON-native) | `npm install pino` |
| **winston** | Node.js (flexible transports, broad ecosystem) | `npm install winston` |
| **loglevel** | Browser/client-side (lightweight, <1KB) | `npm install loglevel` |

**Setup pattern — create a shared logger module:**
```typescript
// src/lib/logger.ts
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
});

export default logger;
```

Then import everywhere:
```typescript
import logger from '@/lib/logger';

logger.info({ userId, action: 'login' }, 'User logged in');
logger.error({ err, endpoint }, 'API call failed');
```

**Never do this:**
```typescript
console.log('User logged in');        // ❌ No structured data, no levels
console.error('Something broke');      // ❌ Can't filter, can't disable
```

**Log level usage:**

| Level | When to Use | Example |
|-------|------------|---------|
| `error` | Something failed that needs attention | Failed API call, unhandled exception, data corruption |
| `warn` | Something unexpected but recoverable | Deprecated API usage, retry succeeded, fallback activated |
| `info` | Normal operations worth recording | Server started, user action completed, job finished |
| `debug` | Detailed info for troubleshooting | Function inputs/outputs, state transitions, timing data |

**Logging Best Practices:**
- Include contextual information (user ID, request ID, function name)
- Use correlation IDs to trace requests across services
- Never log sensitive data (passwords, tokens, PII)
- Log at function entry/exit for critical paths
- Use structured formats (JSON) for machine-parseable logs
- Set log level via environment variable (`LOG_LEVEL=debug`)
- Create the logger module in the first sprint — retrofitting logging is painful

## Best Practices
- Follow RESTful API design principles and best practices for Route Handlers.
- Implement input validation for API endpoints.
- Implement global logging of functions so we can set various debug levels in an environment variable and not have to go back and add logging manually to code blocks in order to debug. Every function should have appropriate logging to help with our unit tests. Logs should be available to the backend so you can access them via terminal. Avoid console logs where possible.
- Apply best practices for logging, project structure, and environment variable usage.

## API Design Details
- Use consistent HTTP methods in Route Handlers: GET for retrieval, POST for creation, PUT/PATCH for updates, DELETE for removal.
- Implement standardized pagination using limit/offset or cursor-based patterns.
- Provide filtering and sorting capabilities with query parameters.
- Use consistent response formats with data, metadata, and error information.
- Implement proper status codes (200, 201, 400, 401, 403, 404, 422, 500).
- Use middleware for request/response validation.
- Design APIs to be idempotent where appropriate.
- Use nested routes for related data (e.g., `/api/users/[id]/posts`).

## Monitoring & Observability (Must-Haves)
- Implement structured logging with consistent log levels (error, warn, info, debug).
- Log all API requests and responses with timing information.
- Set up error tracking to capture and alert on application errors.
- Monitor critical application metrics (response times, error rates).
- Use correlation IDs to track requests across services.
- Implement health check endpoints for services.

## Production Deployment Essentials

### Pre-Deployment
- [ ] All tests pass in CI
- [ ] Environment variables are set for production
- [ ] Database migrations have been run
- [ ] No hardcoded localhost URLs or development-only configs
- [ ] Build completes without warnings

### Post-Deployment
- [ ] Verify health check endpoint responds
- [ ] Smoke test critical user flows
- [ ] Monitor error rates for first 15 minutes
- [ ] Check logs for unexpected warnings or errors
- [ ] Verify external integrations (auth, APIs, webhooks) still work

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `Module not found` errors | Missing dependency or wrong import path | Check `package.json`, verify import path, run `npm install` |
| Hydration mismatch | Server/client render different content | Ensure consistent rendering; use `suppressHydrationWarning` only as last resort |
| Tailwind styles not applying | PostCSS config issue or content paths wrong | Check `tailwind.config.js` content array, restart dev server |
| API route returning 405 | Wrong HTTP method or file naming | Verify route handler exports match method (GET, POST, etc.) |
| TypeScript `any` leaking | Missing type definitions | Define explicit types; use `unknown` instead of `any` |
| Environment variable undefined | Missing from `.env.local` or not prefixed | Add `NEXT_PUBLIC_` prefix for client-side vars; restart dev server |
| Build fails but dev works | Stricter checks in production build | Run `npm run build` locally before pushing; fix all warnings |
| Tests pass locally but fail in CI | Environment differences | Pin Node version, check for timezone/locale dependencies |

## Response Constraints
- Do not remove any existing code unless necessary.
- Do not remove my comments or commented-out code unless necessary.
- Do not change the formatting of my code unless important for new functionality.

## Code Style and Structure
- Write concise, technical code with accurate examples.
- Use functional and declarative programming patterns; avoid classes.
- Prefer iteration and modularization over code duplication.
- Co-locate backend (Route Handlers) and frontend (pages, components) logic within the Next.js `app` directory structure.
- Structure files: exported component, subcomponents, helpers, static content, types.
- Place shared types in a `types` directory.
- Co-locate component props with their components.
- Write clear and concise comments, focusing on why rather than what.
- Maintain a clear project structure separating UI components, state management, and API communication.

## TypeScript Import/Export Best Practices
- Use path aliases (`@/components/...`) for clean, maintainable imports.
- Use explicit `type` imports for TypeScript types: `import type { MyType } from '@/types/index'`.
- Use explicit file paths for type imports: `../types/index` instead of `../types`.
- When encountering module resolution errors, check import syntax, file extensions, and `tsconfig.json` paths.
- Prefer explicit imports over barrel exports in complex projects to improve tree-shaking.

## Naming Conventions
- Use meaningful and descriptive names for variables, functions, and components.
- Use PascalCase for type names and interfaces.
- Use camelCase for variables and functions.
- Use UPPER_CASE for constants.
- Use lowercase with dashes for directories (e.g., `components/auth-wizard`).
- Use descriptive names with auxiliary verbs (e.g., `isLoading`, `hasError`).

## Front End Guidance
- **Favor React Server Components (RSC)**. Minimize the use of `'use client'`, `useEffect`, and `useState`.
- Use functional components and TypeScript interfaces.
- Use curly braces for all conditionals. Favor simplicity over cleverness.
- Avoid enums; use maps instead.
- Use `function`, not `const`, for components.
- Use a mobile-first approach for responsive design.
- Place static content and interfaces at the end of the file.
- Use content variables for static content outside render functions.
- Use Zod for form validation.
- Use `next/dynamic` for dynamic loading of non-critical components.
- Optimize images using `next/image`: WebP format, size data, lazy loading.
- Prefer async/await over Promises.

## React Component Development Best Practices
- **Variable Declaration Order**: Always declare all variables and computed values BEFORE `useEffect` hooks and other React hooks.
- **Hook Dependencies**: Ensure all variables used in `useEffect` are declared before the `useEffect` call.
- **Avoid TDZ Errors**: Be mindful of the Temporal Dead Zone - variables must be declared before use in any scope.
- **Component Structure Order**:
  1. `useState` declarations
  2. Computed values (`const isRunning = status === 'RUNNING'`)
  3. Function definitions
  4. `useEffect` hooks
  5. JSX return
- **Testing**: Always test component rendering after major refactors to catch declaration order issues early.

## UI and Styling
- Utilize Tailwind CSS utility classes for styling components.
- Follow Shadcn UI component guidelines and best practices.
- Ensure the UI is responsive and accessible.

## Tailwind CSS Guidelines
- ALWAYS use Tailwind CSS v3.4.x for stability: `npm install -D tailwindcss@^3.4.0`.
- Avoid Tailwind v4+ beta/alpha versions in production projects.
- Use traditional PostCSS configuration for compatibility:
  ```js
  // postcss.config.js
  export default {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
  ```
- Use traditional Tailwind directives in your global CSS file:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
- When Tailwind styles aren't loading, restart the dev server completely.

## Performance Optimization
- Look for ways to make things faster:
  - Leverage Next.js caching strategies (Data Cache, Full Route Cache, Request Memoization).
  - Use immutable data structures.
  - Optimize data fetching by co-locating fetches with components in RSCs.
  - Use efficient algorithms and data structures.
  - Use efficient rendering strategies (RSCs, Streaming).
  - Use efficient state management.

## Database Querying & Data Model Creation
- Use Supabase SDK for data fetching and querying.
- For data model creation, use Supabase's schema builder.
- Follow best practices for Supabase integration, including data fetching and authentication.
- Use TypeScript for type safety when interacting with Supabase.
