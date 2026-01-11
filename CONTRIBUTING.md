# Contributing Guidelines

## Code Standards

### Naming Conventions

- **Test Files:** `*.api.test.js` (e.g., `pet.api.test.js`)
- **Service Files:** `*Service.js` (e.g., `PetService.js`)
- **Utility Files:** `camelCase.js` (e.g., `testDataGenerator.js`)
- **Constants:** `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_COUNT`)

### Code Style

- Use ESLint for code quality
- Use Prettier for code formatting
- Follow existing code patterns
- Add comments for complex logic

### Test Writing Guidelines

1. **Use Given-When-Then format:**
   ```javascript
   test('Should create a new pet', async () => {
     // Given: Valid pet data
     const petData = TestDataGenerator.generatePet();
     
     // When: Creating a new pet
     const response = await petService.createPet(petData);
     
     // Then: Pet should be created
     ApiAssertions.assertStatus(response.status, 200);
   });
   ```

2. **Always clean up test data:**
   ```javascript
   test.afterEach(async () => {
     if (createdPetId) {
       await petService.deletePet(createdPetId);
     }
     await petService.dispose();
   });
   ```

3. **Use descriptive test names:**
   - ✅ Good: `Should create a new pet with valid data`
   - ❌ Bad: `Test 1`

4. **Add appropriate test tags:**
   - `@smoke` - Critical path tests
   - `@regression` - Full regression suite
   - `@positive` - Happy path scenarios
   - `@negative` - Error scenarios
   - `@boundary` - Boundary value testing
   - `@security` - Security validations
   - `@performance` - Performance checks

## Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Write/update tests
5. Ensure all tests pass (`npm test`)
6. Run linter (`npm run lint`)
7. Commit your changes (`git commit -m 'Add amazing feature'`)
8. Push to the branch (`git push origin feature/amazing-feature`)
9. Open a Pull Request

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `test`: Test additions or changes
- `refactor`: Code refactoring
- `style`: Code style changes
- `chore`: Maintenance tasks

### Example:
```
feat(pet-service): Add support for pet status update

- Added updatePetStatus method
- Added corresponding test cases
- Updated documentation

Closes #123
```

## Testing Requirements

- All new features must include tests
- Maintain or improve test coverage
- Tests must pass before PR submission
- Include both positive and negative test cases

## Documentation

- Update README.md for user-facing changes
- Update FRAMEWORK_DESIGN.md for architectural changes
- Add comments to complex code
- Update test case documentation

## Questions?

Feel free to open an issue for questions or discussions.
