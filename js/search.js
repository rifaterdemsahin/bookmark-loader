// Search and Autocomplete System

class SearchManager {
  constructor() {
    this.searchInput = null;
    this.autocompleteDropdown = null;
    this.searchTimeout = null;
    this.selectedIndex = -1;
    this.results = [];
    this.init();
  }

  init() {
    this.searchInput = document.getElementById('search-input');
    this.autocompleteDropdown = document.getElementById('search-autocomplete');

    if (!this.searchInput || !this.autocompleteDropdown) return;

    this.setupEventListeners();
    this.setupKeyboardShortcuts();
  }

  setupEventListeners() {
    // Input event with debouncing
    this.searchInput.addEventListener('input', (e) => {
      this.handleSearch(e.target.value);
    });

    // Focus event
    this.searchInput.addEventListener('focus', () => {
      if (this.searchInput.value.length > 0) {
        this.handleSearch(this.searchInput.value);
      }
    });

    // Keyboard navigation
    this.searchInput.addEventListener('keydown', (e) => {
      this.handleKeyboardNavigation(e);
    });

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
      if (!this.searchInput.contains(e.target) && !this.autocompleteDropdown.contains(e.target)) {
        this.hideDropdown();
      }
    });
  }

  setupKeyboardShortcuts() {
    // Ctrl+K to focus search
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        this.searchInput.focus();
        this.searchInput.select();
      }

      // Escape to close dropdown
      if (e.key === 'Escape') {
        this.hideDropdown();
        this.searchInput.blur();
      }
    });
  }

  handleSearch(query) {
    // Clear previous timeout
    clearTimeout(this.searchTimeout);

    // Hide dropdown if query is empty
    if (!query || query.trim().length === 0) {
      this.hideDropdown();
      return;
    }

    // Debounce search (300ms delay)
    this.searchTimeout = setTimeout(() => {
      this.performSearch(query);
    }, 300);
  }

  async performSearch(query) {
    try {
      // Search through all markdown files in the repository
      const results = await this.searchMarkdownFiles(query);
      this.displayResults(results);
    } catch (error) {
      console.error('Search error:', error);
      this.displayError();
    }
  }

  async searchMarkdownFiles(query) {
    // Load searchable items from various sources
    let allPages = [
      { title: '1. Real Unknown - The Why', file: '1_Real_Unknown/README.md', description: 'Problem definitions and objectives' },
      { title: '2. Environment - The Context', file: '2_Environment/README.md', description: 'Setup guides and roadmap' },
      { title: '3. Simulation - The Vision', file: '3_Simulation/README.md', description: 'UI mockups and prototypes' },
      { title: '4. Formula - The Recipe', file: '4_Formula/README.md', description: 'Implementation guides' },
      { title: '5. Symbols - The Reality', file: '5_Symbols/README.md', description: 'Source code' },
      { title: '6. Semblance - The Scars', file: '6_Semblance/README.md', description: 'Errors and workarounds' },
      { title: '7. Testing - The Proof', file: '7_Testing_Known/README.md', description: 'Validation and testing' },
      { title: 'Home', file: 'index.html', description: 'Main dashboard' },
      { title: 'Bookmarks', file: 'bookmarks.html', description: 'Bookmark management' },
      { title: 'February 2026 Dashboard', file: 'february-2026.html', description: 'Personal shortcut dashboard for February 2026' },
      { title: 'Video Production Matrix', file: 'video-production.html', description: 'Video production maturity matrix and resources' }
    ];

    // Load video production projects dynamically
    try {
      const response = await fetch('data/video-production-links.json');
      const data = await response.json();

      // Add all video production projects to search
      data.categories.forEach(category => {
        category.projects.forEach(project => {
          allPages.push({
            title: `${project.emoji} ${project.name}`,
            file: project.live || project.github || project.external,
            description: `${category.name} - Video production project`
          });
        });
      });
    } catch (error) {
      console.warn('Could not load video production links for search:', error);
    }

    // Fuzzy search implementation
    const fuzzyResults = allPages.filter(page => {
      const searchText = `${page.title} ${page.description}`.toLowerCase();
      return this.fuzzyMatch(searchText, query.toLowerCase());
    });

    return fuzzyResults.slice(0, 5); // Limit to 5 results
  }

  fuzzyMatch(str, pattern) {
    let patternIdx = 0;
    let strIdx = 0;

    while (strIdx < str.length && patternIdx < pattern.length) {
      if (str[strIdx] === pattern[patternIdx]) {
        patternIdx++;
      }
      strIdx++;
    }

    return patternIdx === pattern.length;
  }

  displayResults(results) {
    this.results = results;
    this.selectedIndex = -1;

    if (results.length === 0) {
      this.autocompleteDropdown.innerHTML = `
        <div class="autocomplete-item" style="color: #6b7280;">
          No results found
        </div>
      `;
      this.showDropdown();
      return;
    }

    this.autocompleteDropdown.innerHTML = results
      .map((result, index) => `
        <div class="autocomplete-item" data-index="${index}">
          <div style="font-weight: 500;">${this.highlightMatch(result.title, this.searchInput.value)}</div>
          <div style="font-size: 0.875rem; color: #6b7280;">${result.description}</div>
        </div>
      `)
      .join('');

    // Add click handlers
    this.autocompleteDropdown.querySelectorAll('.autocomplete-item').forEach(item => {
      item.addEventListener('click', () => {
        const index = parseInt(item.dataset.index);
        if (!isNaN(index)) {
          this.selectResult(index);
        }
      });

      // Hover effect
      item.addEventListener('mouseenter', () => {
        this.selectedIndex = parseInt(item.dataset.index);
        this.updateSelection();
      });
    });

    this.showDropdown();
  }

  highlightMatch(text, query) {
    if (!query) return text;

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<strong style="background-color: #fef3c7;">$1</strong>');
  }

  displayError() {
    this.autocompleteDropdown.innerHTML = `
      <div class="autocomplete-item" style="color: #ef4444;">
        Error performing search
      </div>
    `;
    this.showDropdown();
  }

  handleKeyboardNavigation(e) {
    if (!this.autocompleteDropdown.classList.contains('active')) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.selectedIndex = Math.min(this.selectedIndex + 1, this.results.length - 1);
        this.updateSelection();
        break;

      case 'ArrowUp':
        e.preventDefault();
        this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
        this.updateSelection();
        break;

      case 'Enter':
        e.preventDefault();
        if (this.selectedIndex >= 0) {
          this.selectResult(this.selectedIndex);
        }
        break;
    }
  }

  updateSelection() {
    const items = this.autocompleteDropdown.querySelectorAll('.autocomplete-item');
    items.forEach((item, index) => {
      if (index === this.selectedIndex) {
        item.classList.add('selected');
      } else {
        item.classList.remove('selected');
      }
    });
  }

  selectResult(index) {
    if (index < 0 || index >= this.results.length) return;

    const result = this.results[index];

    // Check if it's an external URL (starts with http/https)
    if (result.file.startsWith('http://') || result.file.startsWith('https://')) {
      window.open(result.file, '_blank');
      return;
    }

    // Handle local files
    const url = result.file.endsWith('.html')
      ? result.file
      : `markdown_renderer.html?file=${result.file}`;

    window.location.href = url;
  }

  showDropdown() {
    this.autocompleteDropdown.classList.add('active');
  }

  hideDropdown() {
    this.autocompleteDropdown.classList.remove('active');
    this.selectedIndex = -1;
  }
}

// Initialize search manager
const searchManager = new SearchManager();

// Export for use in other scripts
if (typeof window !== 'undefined') {
  window.searchManager = searchManager;
}
