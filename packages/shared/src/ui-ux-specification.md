# 🎨 UI/UX SPECIFICATION
**Version:** 1.0  
**Authority Level:** PRODUCTION READY  
**Project:** Bali Car Charter & Intelligent Itinerary Builder

---

## 1. OVERVIEW

The UI/UX Specification defines the adaptive design system for Bali Car Charter platform, ensuring consistent user experience across desktop and mobile devices while supporting the multi-agent AI interaction patterns.

---

## 2. VISUAL IDENTITY & DESIGN TOKENS

### 2.1 Color Palette
| Token | Color Value | Use Case |
|-------|-------------|----------|
| primary-50 | #fff7ed | Background accent |
| primary-500 | #f97316 | Primary buttons, CTAs |
| primary-600 | #ea580c | Primary button hover |
| primary-700 | #c2410c | Primary button active |
| secondary-50 | #eff6ff | Secondary background |
| secondary-500 | #3b82f6 | Secondary buttons |
| success-500 | #10b981 | Success states, confirmations |
| warning-500 | #f59e0b | Warnings, alerts |
| error-500 | #ef4444 | Errors, destructive actions |
| gray-50 | #f9fafb | Light backgrounds |
| gray-500 | #6b7280 | Body text |
| gray-900 | #111827 | Primary text |

### 2.2 Typography
| Element | Font Family | Size | Weight | Line Height |
|---------|-------------|------|--------|-------------|
| H1 | Inter, sans-serif | 32px | 700 | 1.2 |
| H2 | Inter, sans-serif | 24px | 600 | 1.3 |
| H3 | Inter, sans-serif | 20px | 600 | 1.4 |
| Body (Large) | Inter, sans-serif | 18px | 400 | 1.6 |
| Body (Base) | Inter, sans-serif | 16px | 400 | 1.6 |
| Body (Small) | Inter, sans-serif | 14px | 400 | 1.6 |
| Code | JetBrains Mono, monospace | 14px | 400 | 1.5 |

### 2.3 Spacing Scale
| Scale | Size (rem) | Use |
|-------|------------|-----|
| none | 0 | No spacing |
| px | 0.125 | Fine adjustments |
| 0.5 | 0.25 | Small gaps |
| 1 | 0.5 | Small elements spacing |
| 2 | 1 | Component spacing |
| 4 | 2 | Section spacing |
| 8 | 4 | Major section separation |
| 16 | 8 | Page-level spacing |

---

## 3. COMPONENT LIBRARY

### 3.1 Design System
The component library is built with Tailwind CSS following atomic design principles:
- Atoms: Buttons, inputs, badges, icons
- Molecules: Form fields, card components, navigation elements
- Organisms: Booking cards, itinerary panels, map controls
- Templates: Page layouts, booking flows, itinerary builders
- Pages: Specific application pages with complete functionality

### 3.2 Component Categories
| Category | Key Components | Accessibility |
|----------|----------------|---------------|
| Navigation | Top bar, bottom nav, breadcrumb, tabs | ARIA labels, keyboard navigation |
| Data Display | Cards, tables, itinerary timeline, maps | Screen reader support |
| Forms & Inputs | Multi-step booking forms, text inputs, select dropdowns | Form validation, error handling |
| Feedback | Toasts, modals, progress indicators, loading states | Announcements, focus management |
| Layout | Grid systems, split-pane, responsive containers | Semantic HTML structure |

---

## 4. BREAKPOINT MATRIX

| Breakpoint | Device | Main Features |
|------------|--------|---------------|
| 320px | Mobile | Single column, bottom navigation, swipe gestures |
| 768px | Tablet | Two-column layout, side navigation, map expansion |
| 1024px | Small Desktop | Three-column layout, split-screen mode |
| 1280px | Desktop | Four-column layout, full split-pane with map | 
| 1920px | Large Desktop | Optimized grid, enhanced map controls |

---

## 5. ADAPTIVE LAYOUT PATTERNS

### 5.1 Desktop & Tablet (>= 768px)
**Visual Mode:** Dashboard Multi-Pane responsive
**Layout Split-Screen:**
- **Left Side (50%):** Dynamic Interactive Map Canvas
  - Mapbox/Google Maps with destination pins
  - Route visualization with traffic indicators
  - Real-time traffic updates display
  - Location search and filter controls
- **Right Side (50%):** Itinerary Builder & Vehicle Selection
  - Timeline builder with drag-and-drop
  - Destination cards with detailed information
  - Vehicle selection panel with pricing
  - Booking confirmation and payment section

### 5.2 Mobile Devices (< 768px)
**Visual Mode:** PWA / Native App-like Feeling
**Layout Mechanics:**
- **Bottom Navigation Bar:**
  - Explore (Map view, destination browsing)
  - Builder (Itinerary construction)
  - Booking (Check out, confirmation)
  - Concierge AI (Chat interface)
- **Bottom Sheet UI:**
  - Destination details
  - Price summary
  - Vehicle selection
  - Quick actions
- **Swipeable Cards:**
  - Destination cards for reordering
  - Pricing cards with vehicle info
  - Review cards for booking confirmation
- **Floating Action Bar:**
  - Primary booking action button
  - Quick access to payment methods
  - Emergency contact support

---

## 6. INTERACTION PATTERNS

### 6.1 Micro-interactions
| Interaction | Animation Duration | Effect |
|-------------|-------------------|--------|
| Button Press | 0.1s | Scale transform, color change |
| Card Hover | 0.2s | Lift effect, shadow enhancement |
| Menu Expand | 0.3s | Slide down animation |
| Loading State | 0.5s | Pulse effect, skeleton loading |

### 6.2 Animation Guidelines
- **Easing Function:** Cubic-bezier(0.4, 0, 0.2, 1) - Material Design standard
- **Motion Limits:** Respect user preference for reduced motion
- **Performance:** Use CSS transforms for animations, avoid layout thrashing

---

## 7. ACCESSIBILITY SPECIFICATION

### 7.1 WCAG 2.1 AA Compliance
**Visual:**
- Color contrast ratios minimum 4.5:1 for normal text, 3:1 for large text
- Focus indicators with 2px outline and high contrast
- Minimum touch target size of 44x44px

**Interactive:**
- Keyboard navigation support for all interactive elements
- Screen reader announcements for state changes
- ARIA labels for icon-only buttons
- Focus management for modal dialogs and notifications

**Cognitive:**
- Clear information hierarchy with semantic HTML
- Consistent navigation patterns across devices
- Help text and error messages with clear guidance

### 7.2 High-Contrast Mode Support
- Automatic detection based on system settings
- Color inversion with semantic adjustments
- Enhanced readability for text and UI elements
- Maintained brand identity with high contrast variants

---

## 8. INTERNATIONALIZATION SUPPORT

### 8.1 Language Support
| Language | RTL/LTR | Font Loading |
|----------|---------|--------------|
| Bahasa Indonesia | LTR | System font fallback |
| English | LTR | System font fallback |

### 8.2 Text Direction
- All text is Left-to-Right (LTR)
- Right-to-Left languages ready for future expansion
- Arabic and Hebrew text direction support prepared

---

## 9. PERFORMANCE OPTIMIZATION

### 9.1 Core Web Vitals Targets
| Metric | Target | Method |
|--------|--------|--------|
| LCP (Largest Contentful Paint) | < 2.5s | Optimized asset loading |
| FID (First Input Delay) | < 100ms | Lightweight JavaScript |
| CLS (Cumulative Layout Shift) | < 0.1 | Fixed element dimensions |

### 9.2 Optimization Techniques
- **Image Optimization:** Next.js Image component with automatic compression
- **Font Optimization:** Subset font loading with web fonts
- **Bundle Size:** Tree-shaking unused code, code splitting
- **Caching:** Strategic CDN and browser caching

---

## 10. TESTING & VALIDATION

### 10.1 Visual Regression Testing
- Automated screenshot comparisons
- Cross-device layout validation
- Breakpoint-specific testing

### 10.2 Usability Testing
- Mobile usability scoring
- Keyboard navigation testing
- Screen reader testing with actual devices

### 10.3 Performance Testing
- Lighthouse CI integration
- Bundle size analysis
- Core Web Vitals monitoring

---

## 11. COMPONENT IMPLEMENTATION GUIDELINES

### 11.1 Tailwind CSS Configuration
```css
/* Design system custom utilities */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: theme(colors.gray.300) transparent;
}

.custom-scroll-dark {
  scrollbar-width: thin;
  scrollbar-color: theme(colors.gray.600) transparent;
}

.map-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 300px;
}

.interactive-element {
  @apply transition-all duration-200 ease-in-out;
  @apply focus:outline-none focus:ring-2 focus:ring-primary-500;
}
```

### 11.2 Component State Management
Each component should support:
- **Default State:** Normal visual appearance
- **Hover State:** User interaction feedback
- **Active State:** Button press feedback
- **Focus State:** Keyboard navigation
- **Disabled State:** Non-interactive, informative
- **Error State:** Validation feedback
- **Loading State:** Asynchronous operation

---

## 12. COMPONENT ARCHITECTURE

### 12.1 Atomic Design Structure
**Atoms:**
- Button components with variants
- Form inputs with validation states
- Icon components with accessibility
- Badge and label components

**Molecules:**
- Search bar with autocomplete
- Destination card with actions
- Vehicle selection card
- Pricing card with details
- Navigation patterns

**Organisms:**
- Booking flow container
- Itinerary builder panel
- Map control panel
- User profile section

**Templates:**
- Main layout with header, navigation, content
- Booking page template
- Itinerary page template
- Destination page template

**Pages:**
- Homepage (landing page)
- Booking page (multi-step)
- Itinerary builder page
- Profile page
- Admin dashboard

---

## 13. MOBILE-FIRST BREAKPOINT IMPLEMENTATION

### 13.1 Progressive Enhancement
1. Start with mobile design and functionality
2. Add tablet enhancements at 768px
3. Add desktop improvements at 1024px
4. Add large desktop optimizations at 1920px

### 13.2 Responsive Design Patterns
- **Grid System:** Tailwind's responsive grid classes
- **Flexbox Layout:** For navigation and content arrangement
- **CSS Container Query:** For component-level responsiveness
- **CSS Clamp:** For fluid typography scaling

---

## 14. QUALITY GATE

### 14.1 Design Review Checklist
- [ ] All components follow design tokens
- [ ] Accessibility compliance verified
- [ ] Cross-device layout tested
- [ ] Performance targets met
- [ ] Mobile interaction patterns validated
- [ ] Dark mode support implemented
- [ ] Animation performance optimized

### 14.2 Code Review Standards
- [ ] Tailwind utility classes used appropriately
- [ ] Custom CSS minimized for performance
- [ ] Semantic HTML structure maintained
- [ ] Component naming follows Atomic Design conventions
- [ ] Dark mode variants implemented
- [ ] Accessibility attributes included

---

## 15. DEVELOPMENT ENVIRONMENT SETUP

### 15.1 Local Development
```bash
# Install dependencies
pnpm install

# Start development server with Tailwind CSS
pnpm dev

# Build for production
pnpm build

# Run linting and type checking
pnpm lint
pnpm typecheck

# Run visual tests
pnpm test:visual
```

### 15.2 Component Testing
```typescript
// Component test example
it('renders correctly on mobile', () => {
  render(<DestinationCard {...props} />);
  expect(screen.getByTestId('destination-card'))
    .toHaveClass('flex-col');
});

it('handles keyboard navigation', () => {
  render(<Navigation />);
  fireEvent.keyDown(document, { key: 'Tab' });
  expect(document.activeElement).toHaveFocus();
});
```

---

## 16. DOCUMENTATION STANDARDS

### 16.1 Component Documentation
Each component should have:
- **Description:** Purpose and usage guidelines
- **Examples:** Default, variant, and state examples
- **Props:** Component API documentation
- **Accessibility:** WCAG compliance notes
- **Best Practices:** Recommended usage patterns

### 16.2 Design Tokens Documentation
- Color palette usage examples
- Typography scale documentation
- Spacing and layout guidelines
- Component variant documentation

---

## 17. MAINTENANCE AND UPDATES

### 17.1 Design System Governance
- Design token updates require review by Chief Architect
- New components follow Atomic Design principles
- Component removal requires approval from UI/UX Agent
- Version bump for design system changes

### 17.2 Component Migration
- Component version numbering with breaking changes
- Migration guides for major updates
- Backward compatibility considerations
- Deprecation warnings for legacy components

---

## 18. SUCCESS METRICS

### 18.1 Design Quality Metrics
| Metric | Target | Measurement |
|--------|--------|-------------|
| Component Coverage | 100% | Storybook component count |
| Accessibility Score | > 90% | Axe accessibility testing |
| Performance Score | > 90% | Lighthouse CI scores |
| User Testing Satisfaction | > 85% | User testing results |
| Design System Adoption | 100% | Component usage in codebase |

### 18.2 Business Impact
- **User Satisfaction:** Improved mobile and desktop experience
- **Conversion Rate:** Optimized booking flows
- **Performance:** Faster load times and interactions
- **Support Tickets:** Reduced UI-related issues

---

**END OF UI/UX SPECIFICATION**

*Design system for production-ready, accessible, and performant Bali Car Charter platform with comprehensive adaptive UI/UX patterns*
