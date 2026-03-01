# AI Agent Instructions

## Project Overview

This is a **Bookmark Loader** project following the **Project Self-Learning System** framework. The system organizes development through 7 stages from Unknown → Proven.

---

## Core Objectives

1. **Build a bookmark dashboard** with visual grouping (emojis + colors)
2. **Enable single-click access** to monthly-organized bookmarks
3. **Deploy as static site** on GitHub Pages (no backend)
4. **Document the journey** through 7 stages

---

## 7-Stage Framework

When working on this project, always consider which stage you're in:

1. **1_Real_Unknown** - Problem definitions, OKRs, core questions
2. **2_Environment** - Setup guides, roadmap, constraints
3. **3_Simulation** - UI mockups, design vision
4. **4_Formula** - Step-by-step implementation recipes
5. **5_Symbols** - Actual source code
6. **6_Semblance** - Errors, workarounds, lessons learned
7. **7_Testing_Known** - Validation against original objectives

---

## Coding Standards

### Language & Stack
- **HTML5** - Semantic markup
- **CSS3** - Grid/Flexbox, custom properties, mobile-first
- **Vanilla JavaScript** (ES6+) - No frameworks required
- **LocalStorage** - For bookmark persistence

### File Organization
- Place source code in `5_Symbols/`
- Document algorithms in `4_Formula/`
- Log errors/issues in `6_Semblance/`
- Test results go in `7_Testing_Known/`

### Performance Requirements
- Page load: < 2 seconds
- Search response: < 100ms
- Support 500+ bookmarks without lag

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader friendly
- Min 44px touch targets on mobile

---

## Development Workflow

1. **Before coding:** Check `1_Real_Unknown/` for requirements
2. **During coding:** Update `6_Semblance/` with any issues encountered
3. **After coding:** Validate against `7_Testing_Known/` checklist
4. **Always:** Keep documentation in sync with code

---

## Git Commit Convention

```
feat: Add bookmark card component
fix: Resolve search autocomplete flicker
docs: Update 4_Formula with search algorithm
test: Add validation for LocalStorage quota
refactor: Extract menu logic to menu.js
```

---

## Key Features to Implement

- [ ] Bookmark CRUD operations
- [ ] Visual categorization (emoji + color)
- [ ] Monthly grouping
- [ ] Fuzzy search with autocomplete
- [ ] Import/export JSON
- [ ] Responsive design (mobile/tablet/desktop)
- [ ] Debug mode toggle
- [ ] Markdown documentation renderer

---

## Technical Constraints

- **No backend** - Static hosting only
- **No build step** - Direct HTML/CSS/JS
- **Browser support** - Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Storage limit** - LocalStorage ~5-10MB

---

## When Stuck

1. Check `4_Formula/` for implementation guidance
2. Review `6_Semblance/` for similar issues
3. Validate against `1_Real_Unknown/` objectives
4. Update documentation as you learn

---

## Success Criteria

See `7_Testing_Known/README.md` for complete testing checklist.

---

**Remember:** This is a self-documenting learning system. Every mistake, solution, and insight should be captured in the appropriate folder.
