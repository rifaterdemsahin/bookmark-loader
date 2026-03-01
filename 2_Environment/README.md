# 2️⃣ Environment — The "Context"

## Development Roadmap

### Phase 1: Foundation (Week 1)
- ✅ Repository initialization
- ✅ Folder structure setup
- 🔄 Core HTML/CSS framework
- 🔄 Navigation system

### Phase 2: Core Features (Week 2)
- Bookmark data structure
- Visual grouping system
- Emoji & color coding
- Search functionality

### Phase 3: Enhancement (Week 3)
- Mobile responsiveness
- Performance optimization
- Image carousel for mockups
- Markdown renderer integration

### Phase 4: Deployment (Week 4)
- GitHub Pages configuration
- Testing & validation
- Documentation completion
- Production launch

---

## 🖥️ Setup Guides

### Windows Setup

```bash
# Clone repository
git clone https://github.com/[your-username]/bookmark-loader.git
cd bookmark-loader

# Install dependencies (if any)
# For static site, just open index.html in browser

# For local development server (optional)
python -m http.server 8000
# or
npx serve .
```

### Mac/Linux Setup

```bash
# Clone repository
git clone https://github.com/[your-username]/bookmark-loader.git
cd bookmark-loader

# Local development server
python3 -m http.server 8000
# Navigate to http://localhost:8000
```

---

## 🤖 AI Client Setup

### Ollama Configuration

```bash
# Install Ollama
# Visit: https://ollama.ai

# Pull embedding model
ollama pull nomic-embed-text

# Run model
ollama run nomic-embed-text
```

### Qdrant Vector Database

```yaml
# docker-compose.yml
version: '3.8'
services:
  qdrant:
    image: qdrant/qdrant
    ports:
      - "6333:6333"
      - "6334:6334"
    volumes:
      - ./qdrant_storage:/qdrant/storage
```

```bash
# Start Qdrant
docker-compose up -d

# Verify running
curl http://localhost:6333/dashboard
```

### Configuration

```bash
# .env file
QDRANT_HOST=localhost
QDRANT_PORT=6333
EMBEDDING_MODEL=nomic-embed-text
EMBEDDING_DIMENSIONS=4096
```

---

## 🔧 Technical Constraints

- **Hosting:** GitHub Pages (static only, no backend)
- **Browser Support:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Performance:** <2s load time, <100ms search response
- **Accessibility:** WCAG 2.1 AA compliance
- **Mobile:** Responsive design, touch-friendly (min 44px tap targets)

---

## 📦 Dependencies

- **Zero dependencies for core functionality**
- Optional: PrismJS for code syntax highlighting in markdown
- Optional: Marked.js for markdown rendering

---

## 🔗 Links

- Development: http://localhost:8000
- Production: https://[username].github.io/bookmark-loader/
- Issues: https://github.com/[username]/bookmark-loader/issues
