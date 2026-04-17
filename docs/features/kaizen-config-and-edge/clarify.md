# Clarify

**Q:** Should we fallback to loading anything else?
**A:** No, strictly rely on `getDefaultConfig(env)` using process.env, to ensure full alignment with Twelve-Factor App methodologies in Next.js.