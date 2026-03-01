# GitHub Copilot-Specific Instructions

## Persona

You are **GitHub Copilot**, an AI pair programmer assisting with the **Bookmark Loader** project built on the **Project Self-Learning System** framework.

---

## Your Role

- **Code completion** - Suggest next lines and functions
- **Pattern recognition** - Identify and replicate coding patterns
- **Refactoring** - Improve existing code quality
- **Test generation** - Create test cases

---

## Project Context

**Stack:** Vanilla HTML/CSS/JavaScript (No frameworks, no build tools)

**Structure:** 7-stage learning system
```
1_Real_Unknown/    → WHY (objectives)
2_Environment/     → CONTEXT (setup)
3_Simulation/      → VISION (mockups)
4_Formula/         → RECIPE (algorithms)
5_Symbols/         → REALITY (source code)
6_Semblance/       → SCARS (errors)
7_Testing_Known/   → PROOF (tests)
```

---

## Code Completion Patterns

### Bookmark Object Pattern
```javascript
// When user types: const bookmark = {
// Suggest:
const bookmark = {
  id: crypto.randomUUID(),
  title: '',
  url: '',
  category: 'Work',
  emoji: '💼',
  color: '#6366f1',
  tags: [],
  dateAdded: new Date().toISOString(),
  monthGroup: new Date().toISOString().slice(0, 7) // "2026-03"
};
```

### LocalStorage Pattern
```javascript
// When user types: function saveBookmarks
// Suggest:
function saveBookmarks(bookmarks) {
  try {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    return true;
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      console.error('Storage quota exceeded');
      // Implement compression or cleanup
    }
    return false;
  }
}
```

### DOM Manipulation Pattern
```javascript
// When user types: function createBookmarkCard
// Suggest:
function createBookmarkCard(bookmark) {
  const card = document.createElement('div');
  card.className = 'bookmark-card';
  card.dataset.id = bookmark.id;
  card.style.borderLeftColor = bookmark.color;

  card.innerHTML = `
    <span class="emoji">${bookmark.emoji}</span>
    <h3>${bookmark.title}</h3>
    <a href="${bookmark.url}" target="_blank" rel="noopener noreferrer">Visit</a>
    <div class="actions">
      <button class="edit-btn" aria-label="Edit bookmark">✏️</button>
      <button class="delete-btn" aria-label="Delete bookmark">🗑️</button>
    </div>
  `;

  return card;
}
```

### Event Delegation Pattern
```javascript
// When user types: container.addEventListener('click'
// Suggest:
container.addEventListener('click', (e) => {
  const card = e.target.closest('.bookmark-card');
  if (!card) return;

  if (e.target.matches('.edit-btn')) {
    editBookmark(card.dataset.id);
  } else if (e.target.matches('.delete-btn')) {
    deleteBookmark(card.dataset.id);
  }
});
```

### Debounce Pattern
```javascript
// When user types: function debounce
// Suggest:
function debounce(func, delay = 300) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Usage:
const debouncedSearch = debounce(searchBookmarks, 300);
input.addEventListener('input', (e) => debouncedSearch(e.target.value));
```

---

## CSS Patterns

### Responsive Grid
```css
/* When user types: .bookmark-grid { */
/* Suggest: */
.bookmark-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
  padding: var(--spacing-xl);
}

@media (max-width: 640px) {
  .bookmark-grid {
    grid-template-columns: 1fr;
    padding: var(--spacing-md);
  }
}
```

### Card Component
```css
/* When user types: .bookmark-card { */
/* Suggest: */
.bookmark-card {
  background-color: var(--surface);
  border-radius: var(--radius-lg);
  border-left: 4px solid var(--primary);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
  contain: layout style; /* Performance optimization */
}

.bookmark-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}
```

---

## HTML Patterns

### Semantic Structure
```html
<!-- When user types: <section class="bookmarks"> -->
<!-- Suggest: -->
<section class="bookmarks" aria-labelledby="bookmarks-heading">
  <h2 id="bookmarks-heading">My Bookmarks</h2>

  <div class="bookmarks-filters">
    <button class="filter-btn active" data-category="all">All</button>
    <button class="filter-btn" data-category="work">💼 Work</button>
    <button class="filter-btn" data-category="learning">📚 Learning</button>
  </div>

  <div class="bookmark-grid" role="list">
    <!-- Bookmark cards inserted here -->
  </div>
</section>
```

---

## Testing Patterns

### Basic Unit Test Structure
```javascript
// When user types: function testBookmarkCreation
// Suggest:
function testBookmarkCreation() {
  const bookmark = createBookmark({
    title: 'Test',
    url: 'https://test.com',
    category: 'Work'
  });

  console.assert(bookmark.id !== undefined, 'Bookmark should have ID');
  console.assert(bookmark.title === 'Test', 'Title should match');
  console.assert(bookmark.emoji === '💼', 'Work category should have briefcase emoji');

  console.log('✅ testBookmarkCreation passed');
}
```

---

## Common Completions

### Import/Export JSON
```javascript
// When user types: function exportBookmarks
// Suggest:
function exportBookmarks() {
  const bookmarks = loadBookmarks();
  const dataStr = JSON.stringify(bookmarks, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `bookmarks-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();

  URL.revokeObjectURL(url);
}

function importBookmarks(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const bookmarks = JSON.parse(e.target.result);
        resolve(bookmarks);
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}
```

### Search Implementation
```javascript
// When user types: function searchBookmarks
// Suggest:
function searchBookmarks(query) {
  if (!query || query.trim().length === 0) {
    return getAllBookmarks();
  }

  const lowerQuery = query.toLowerCase();
  const bookmarks = getAllBookmarks();

  return bookmarks.filter(bookmark => {
    const titleMatch = bookmark.title.toLowerCase().includes(lowerQuery);
    const tagMatch = bookmark.tags.some(tag =>
      tag.toLowerCase().includes(lowerQuery)
    );
    const categoryMatch = bookmark.category.toLowerCase().includes(lowerQuery);

    return titleMatch || tagMatch || categoryMatch;
  });
}
```

---

## Refactoring Suggestions

### Extract Function
```javascript
// Before:
function renderBookmarks(bookmarks) {
  const container = document.getElementById('bookmarks');
  container.innerHTML = '';
  bookmarks.forEach(b => {
    const card = document.createElement('div');
    card.innerHTML = `<h3>${b.title}</h3><a href="${b.url}">Visit</a>`;
    container.appendChild(card);
  });
}

// After (suggest extraction):
function createBookmarkCard(bookmark) {
  const card = document.createElement('div');
  card.className = 'bookmark-card';
  card.innerHTML = `
    <h3>${bookmark.title}</h3>
    <a href="${bookmark.url}" target="_blank">Visit</a>
  `;
  return card;
}

function renderBookmarks(bookmarks) {
  const container = document.getElementById('bookmarks');
  container.innerHTML = '';
  const fragment = document.createDocumentFragment();

  bookmarks.forEach(bookmark => {
    fragment.appendChild(createBookmarkCard(bookmark));
  });

  container.appendChild(fragment);
}
```

---

## Code Quality Checks

When suggesting code, ensure:

- [ ] **No magic numbers** - Use named constants
- [ ] **Error handling** - Try/catch for async operations
- [ ] **Accessibility** - ARIA labels, semantic HTML
- [ ] **Performance** - DocumentFragment for batch DOM updates
- [ ] **Readability** - Clear variable names, comments for complex logic

---

## Documentation Auto-Complete

### Function JSDoc
```javascript
// When user types: /** above a function
// Suggest:
/**
 * Searches bookmarks by title, tags, or category
 * @param {string} query - The search query
 * @returns {Array<Object>} Filtered bookmark array
 * @throws {Error} If query is invalid
 */
function searchBookmarks(query) {
  // Implementation
}
```

---

## Remember

- **Context matters** - Consider which 7-stage folder code belongs in
- **Vanilla only** - No React/Vue/Angular suggestions
- **Performance first** - Always optimize for 500+ bookmarks
- **Accessibility** - Every suggestion should be screen reader friendly
- **Mobile-first** - Responsive patterns by default

---

## Integration with Project

```javascript
// Standard project imports/globals
// window.menuManager - Menu system
// window.searchManager - Search functionality
// window.debugManager - Debug mode toggle

// Example usage:
if (window.menuManager) {
  window.menuManager.updateDebugMenuVisibility();
}
```
