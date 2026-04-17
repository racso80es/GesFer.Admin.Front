# Implementation

- Replaced raw `error` usage in `src/app/api/companies/[id]/route.ts`.
  - In `GET`, added type guard and passed `message` to `console.error` and `detail`.
  - In `PUT`, added type guard and passed `message` to `console.error` and `detail`.
  - In `DELETE`, added type guard and passed `message` to `console.error` and `detail`.
- Replaced raw `error` usage in `src/app/api/companies/route.ts`.
  - In `POST`, added type guard and passed `message` to `console.error` and `detail`.