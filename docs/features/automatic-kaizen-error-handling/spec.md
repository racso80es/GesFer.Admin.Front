---
title: "Error Handling Architecture Specification"
type: "Architecture Improvement"
status: "Active"
date: "2026-03-30"
---

# Specification: Error Handling in Catch Blocks

## Architectural Rule
All code must adhere to strict TypeScript error handling. Inside `catch (error)` blocks, it is strictly prohibited to log or use the inferred `unknown` error object directly.

## Implementation Standard
Code must always use a type guard to extract the message:

```typescript
catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  // Log ONLY the safe string `message`, NEVER the original `error` object.
  console.error("Contextual message:", message);
  // Return the `message` if necessary for error responses.
}
```

This prevents exposing unexpected objects or breaking static code analyzers, ensuring logs only receive safe strings.