# MunieOS Agent Instructions

This site is operated by MunieOS agents. Content is managed through the CMS API. Code changes go through this repository.

## Content changes

Use the MunieOS CMS API to create, update, and publish content. Do not modify content as files in this repo — the content abstraction layer fetches from the CMS API.

## Code changes

Modify components, layouts, and configuration in this repo via git commits. All changes must pass the validation pipeline (typecheck, lint, build) before merging.

## Section components

Section components live in `src/components/sections/`. Each section type in the CMS maps to a component here via `registry.ts`. When creating a new section type, add both the CMS model (via API) and the component (in this repo).
