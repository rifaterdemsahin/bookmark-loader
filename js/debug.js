// Debug Mode Toggle Handler

class DebugManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupToggleButton();
    this.setupKeyboardShortcut();
  }

  setupToggleButton() {
    const toggleButton = document.getElementById('debug-toggle');
    if (!toggleButton) return;

    toggleButton.addEventListener('click', () => {
      if (window.menuManager) {
        const newState = window.menuManager.toggleDebugMode();
        this.showNotification(
          newState ? 'Debug mode enabled' : 'Debug mode disabled'
        );
      }
    });
  }

  setupKeyboardShortcut() {
    // Ctrl+Shift+D to toggle debug mode
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        if (window.menuManager) {
          const newState = window.menuManager.toggleDebugMode();
          this.showNotification(
            newState ? 'Debug mode enabled 🐛' : 'Debug mode disabled'
          );
        }
      }
    });
  }

  showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: #1f2937;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      z-index: 10000;
      animation: slideIn 0.3s ease-out;
    `;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(400px);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Auto-remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
}

// Initialize debug manager
const debugManager = new DebugManager();

// Export for use in other scripts
if (typeof window !== 'undefined') {
  window.debugManager = debugManager;
}
