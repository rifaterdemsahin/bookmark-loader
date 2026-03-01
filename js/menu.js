// Menu Management System
// Dynamically loads menu items from menu-config.json

class MenuManager {
  constructor() {
    this.config = null;
    this.init();
  }

  async init() {
    await this.loadConfig();
    this.renderContentMenu();
    this.renderSocialLinks();
    this.setupDebugMenu();
  }

  async loadConfig() {
    try {
      const response = await fetch('menu-config.json');
      this.config = await response.json();
    } catch (error) {
      console.error('Failed to load menu config:', error);
      this.config = this.getDefaultConfig();
    }
  }

  getDefaultConfig() {
    return {
      debug_menu: [],
      content_menu: [
        { title: 'Home', url: 'index.html', icon: '🏠' },
        { title: 'Bookmarks', url: 'bookmarks.html', icon: '🔖' },
        { title: 'Documentation', url: 'markdown_renderer.html', icon: '📚' }
      ],
      social_links: [
        { platform: 'GitHub', url: '#', icon: '🔗' },
        { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/rifaterdemsahin/', icon: '💼' },
        { platform: 'YouTube', url: 'https://www.youtube.com/@RifatErdemSahin', icon: '📺' }
      ]
    };
  }

  renderContentMenu() {
    const navLinks = document.getElementById('nav-links');
    if (!navLinks || !this.config) return;

    navLinks.innerHTML = this.config.content_menu
      .map(item => `
        <a href="${item.url}" title="${item.title}">
          ${item.icon} ${item.title}
        </a>
      `)
      .join('');
  }

  renderSocialLinks() {
    const socialLinks = document.getElementById('social-links');
    if (!socialLinks || !this.config) return;

    socialLinks.innerHTML = this.config.social_links
      .map(link => `
        <a href="${link.url}" target="_blank" rel="noopener noreferrer">
          ${link.icon} ${link.platform}
        </a>
      `)
      .join('');
  }

  setupDebugMenu() {
    const debugMenu = document.getElementById('debug-menu');
    const debugMenuItems = document.getElementById('debug-menu-items');

    if (!debugMenu || !debugMenuItems || !this.config) return;

    // Render debug menu items
    debugMenuItems.innerHTML = this.config.debug_menu
      .map(item => `
        <a href="${item.url}" title="${item.description}">
          ${item.title}
        </a>
      `)
      .join('');

    // Check debug mode cookie and show/hide menu
    this.updateDebugMenuVisibility();
  }

  updateDebugMenuVisibility() {
    const debugMenu = document.getElementById('debug-menu');
    if (!debugMenu) return;

    const isDebugMode = this.getDebugModeCookie();
    debugMenu.style.display = isDebugMode ? 'block' : 'none';
  }

  getDebugModeCookie() {
    const cookies = document.cookie.split(';');
    const debugCookie = cookies.find(c => c.trim().startsWith('debug='));
    return debugCookie ? debugCookie.split('=')[1] === 'true' : false;
  }

  setDebugModeCookie(enabled) {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1); // 1 year expiry
    document.cookie = `debug=${enabled}; expires=${expires.toUTCString()}; path=/`;
  }

  toggleDebugMode() {
    const currentMode = this.getDebugModeCookie();
    const newMode = !currentMode;
    this.setDebugModeCookie(newMode);
    this.updateDebugMenuVisibility();
    return newMode;
  }
}

// Initialize menu manager
const menuManager = new MenuManager();

// Export for use in other scripts
if (typeof window !== 'undefined') {
  window.menuManager = menuManager;
}
