---
id: create-skill-git-close-cycle-objectives
action_id: objectives
feature_id: create-skill-git-close-cycle
title: Objetivos — skill git-close-cycle y enlace finalize-process
branch: feat/create-skill-git-close-cycle
date: "2026-05-01"
status: in_progress
scope: SddIA/skills, scripts/skills-rs, scripts/skills, acción finalize-process, Cúmulo
ley_aplicada: COMANDOS/GIT vía skills; paths vía cumulo.paths.json
---

# Objetivos

1. **Hito Forja:** Skill ejecutable **git-close-cycle** que, dado `targetBranch`, ejecute checkout a la rama de integración (`main`/`master` según `origin/HEAD` o fallback), `git pull origin HEAD`, `git fetch --prune origin` y elimine la rama local con `-d` y, si hace falta, `-D`.
2. **Hito Enlace:** La acción **finalize-process** debe declarar como **paso final orquestado** la invocación de **git-close-cycle** con la **rama de trabajo** de la tarea (capturada al inicio del cierre o equivalente), **después** de **git-create-pr**.
