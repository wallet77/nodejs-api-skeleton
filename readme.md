# Start

## Configuration
.env file can be edited to change basic API variables.

## Basic
```bash
npm start
```

If you want to have a more readable output using bunyan:
```bash 
npm run start-bunyan
```

**Bunyan should be install globally, especially on windows**

## Custom
```bash 
node src/app.js | bunyan
```
OR
```bash 
supervisor -- src\app.js | bunyan
```

# Tests

## Launch test
```bash 
npm run tests
```

## Coverage
Coverage can be found in coverage directory in root directory.

