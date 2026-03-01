# 6️⃣ Semblance — The "Scars"

## Errors, Near-Misses & Workarounds

This folder documents the gap between the plan and reality. Every mistake is a learning opportunity.

---

## 🐛 Known Issues & Workarounds

### Issue #1: LocalStorage Quota Exceeded

**Problem:**
```javascript
// Error when exceeding ~5MB storage
DOMException: QuotaExceededError
```

**Root Cause:**
LocalStorage has a 5-10MB limit per origin. With 1000+ bookmarks including metadata, we can hit this limit.

**Workaround:**
```javascript
try {
  localStorage.setItem('bookmarks', JSON.stringify(data));
} catch (e) {
  if (e.name === 'QuotaExceededError') {
    console.warn('Storage limit reached, compressing data...');
    // Fallback: Remove non-essential fields
    const compressed = data.map(b => ({
      id: b.id,
      title: b.title,
      url: b.url,
      category: b.category
    }));
    localStorage.setItem('bookmarks', JSON.stringify(compressed));
  }
}
```

**Status:** ✅ Fixed in `5_Symbols/js/storage.js:45`

---

### Issue #2: CSS Grid Not Centering Cards on Mobile

**Problem:**
On mobile (< 640px), single column cards were left-aligned instead of centered.

**Initial Attempt:**
```css
.bookmark-grid {
  justify-items: center; /* Didn't work as expected */
}
```

**Working Solution:**
```css
@media (max-width: 640px) {
  .bookmark-grid {
    grid-template-columns: 1fr;
    place-items: center;
  }

  .bookmark-card {
    max-width: 400px;
    width: 100%;
  }
}
```

**Status:** ✅ Fixed in `5_Symbols/css/responsive.css:23`

---

### Issue #3: Search Autocomplete Flickering

**Problem:**
Autocomplete dropdown was flickering on every keystroke, creating a poor UX.

**Root Cause:**
Search was triggering on every keyup event, causing rapid DOM updates.

**Solution:**
Implemented debouncing:
```javascript
let searchTimeout;
function handleSearch(query) {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    const results = searchBookmarks(query);
    updateAutocomplete(results);
  }, 300);
}
```

**Status:** ✅ Fixed in `5_Symbols/js/search.js:12`

---

### Issue #4: GitHub Pages Not Loading CSS

**Problem:**
After deploying to GitHub Pages, CSS files returned 404 errors.

**Root Cause:**
Relative paths like `./css/main.css` don't work in subdirectory deployments.

**Solution:**
Used absolute paths with repository name:
```html
<!-- Before -->
<link rel="stylesheet" href="./css/main.css">

<!-- After -->
<link rel="stylesheet" href="/bookmark-loader/css/main.css">
```

**Alternative (Better):**
```html
<!-- Use root-relative paths -->
<link rel="stylesheet" href="/css/main.css">
```

**Status:** ⚠️ Documented, needs testing on deployment

---

### Issue #5: Emoji Rendering Inconsistency

**Problem:**
Emojis render differently across Windows, Mac, and mobile devices.

**Examples:**
- Windows: Flat, colorless emojis
- Mac/iOS: 3D, colorful emojis
- Android: Varies by device

**Workaround:**
Used emoji font fallback:
```css
.emoji {
  font-family:
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji",
    sans-serif;
}
```

**Alternative Considered:**
Use SVG emoji library (e.g., Twemoji) for consistency.

**Status:** 🔄 Acceptable for now, may revisit

---

## 🔧 Performance Bottlenecks

### Rendering 500+ Cards

**Issue:**
Browser freezes when rendering 500+ bookmark cards simultaneously.

**Profiling Results:**
- Initial render: ~3.5 seconds
- Layout thrashing from reading/writing to DOM in loop

**Solution Attempts:**

1. **DocumentFragment (Partial Fix):**
```javascript
const fragment = document.createDocumentFragment();
bookmarks.forEach(b => {
  const card = createCard(b);
  fragment.appendChild(card);
});
container.appendChild(fragment);
```
Result: Reduced to ~2 seconds

2. **Virtual Scrolling (Future):**
Only render visible cards + buffer. Estimated improvement: <500ms

**Status:** 🔄 Improved but not optimal, virtual scrolling planned

---

## 📚 Lessons Learned

1. **Plan for storage limits early** - LocalStorage is convenient but has hard limits
2. **Test responsive design on actual devices** - Desktop browser DevTools don't catch all issues
3. **Debounce user input** - Essential for performant search UX
4. **Use absolute paths for GitHub Pages** - Saves deployment headaches
5. **Profile before optimizing** - Don't guess, measure actual bottlenecks

---

## 🔗 Related

- Testing validation: `7_Testing_Known/`
- Working implementations: `5_Symbols/`
- Original requirements: `1_Real_Unknown/`
