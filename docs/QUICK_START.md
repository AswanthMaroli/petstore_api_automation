# Quick Start Guide

## Getting Started in 5 Minutes

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure Environment

Create a `.env` file:

```env
BASE_URL=https://petstore3.swagger.io/api/v3
LOG_LEVEL=INFO
```

### Step 3: Run Your First Test

```bash
npm run test:smoke
```

### Step 4: View Results

```bash
npm run test:report
```

## Common Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:smoke` | Run smoke tests only |
| `npm run test:ui` | Run tests in UI mode |
| `npm run test:report` | Generate and view Allure report |

## Writing Your First Test

1. **Create a test file** in `src/tests/`
2. **Import required modules:**
   ```javascript
   const { test, expect } = require('@playwright/test');
   const PetService = require('../services/petService');
   ```

3. **Write your test:**
   ```javascript
   test('My first API test', async () => {
     const petService = new PetService();
     const response = await petService.findPetsByStatus('available');
     expect(response.status).toBe(200);
     await petService.dispose();
   });
   ```

4. **Run the test:**
   ```bash
   npm test
   ```

## Next Steps

- Read the [README.md](../README.md) for detailed documentation
- Review [FRAMEWORK_DESIGN.md](./FRAMEWORK_DESIGN.md) for architecture details
- Check [TEST_CASES.md](./TEST_CASES.md) for test case examples
