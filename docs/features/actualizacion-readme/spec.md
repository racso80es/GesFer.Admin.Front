---
id: actualizacion-readme-spec
action_id: spec
feature_id: actualizacion-readme
title: "Especificación de Actualización de Readme"
date: "2024-03-27"
status: done
scope: global
acceptance_criteria:
  - src/README.md no existe
  - README.md contiene toda la información útil
  - README.md describe el proyecto como un frontend Next.js aislado, no como parte de un monorepo
---
# Especificación

Se eliminará `src/README.md` y su contenido se integrará de forma coherente en el `README.md` de la raíz del proyecto. El nuevo `README.md` reflejará la información presente en `Objetivos.md` para dejar claro el contexto del proyecto.
