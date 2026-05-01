---
contract_ref: paths.skillsDefinitionPath/skills-contract.json (Cúmulo)
implementation_path_ref: paths.skillCapsules.git-branch-manager
name: Git Branch Manager
owner: tekton-developer
skill_id: git-branch-manager
spec_version: 1.0.0
status: Active
---

# Skill: git-branch-manager

- `create: true` → `git checkout -b <branchName>`.
- `create: false` y `checkout: true` → `git checkout`.
- `create: false` y `checkout: false` → `git branch` (crea ref sin checkout).

Envelope v2: `meta.entityId` = `git-branch-manager`.
