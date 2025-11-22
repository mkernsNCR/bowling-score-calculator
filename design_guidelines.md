# Bowling Score Tutor - Design Guidelines

## Design Approach
**System-Based Approach** with Material Design principles, optimized for educational utility and data visualization. This application prioritizes clarity, learnability, and efficient interaction over aesthetic flourishes.

## Typography System

**Font Family:** 
- Primary: Inter (Google Fonts) - for UI, labels, explanations
- Monospace: JetBrains Mono (Google Fonts) - for scores and frame numbers

**Hierarchy:**
- Page Title: text-3xl font-bold
- Section Headers: text-xl font-semibold
- Frame Labels: text-sm font-medium uppercase tracking-wide
- Score Display: text-4xl font-bold (monospace)
- Roll Numbers: text-2xl font-semibold (monospace)
- Body Text (explanations): text-base leading-relaxed
- Helper Text: text-sm
- Buttons: text-sm font-medium uppercase tracking-wide

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, and 8 exclusively
- Micro spacing: p-2, gap-2
- Component spacing: p-4, gap-4, m-4
- Section spacing: p-6, gap-6, py-8
- Large spacing: p-8, gap-8

**Container Strategy:**
- Max width: max-w-6xl mx-auto
- Page padding: px-4 md:px-6
- Card/panel padding: p-6
- Mobile-first responsive design

**Grid System:**
- Scoreboard: 10-column grid (one per frame) on desktop, scrollable horizontal on mobile
- Pin selector: 4-column grid for pins 1-10
- Responsive breakpoints: sm (640px), md (768px), lg (1024px)

## Component Library

### Core Components

**Scoreboard Frame Cell:**
- Border-based separation between frames
- Two-row structure: top for rolls, bottom for total score
- 10th frame gets 1.5x width for triple-roll display
- Strike indicator: Large "X" centered
- Spare indicator: "/" after first roll number
- Current frame highlight with elevated appearance

**Pin Selector (Input Interface):**
- Bowling pin visualization: 10 circular buttons arranged in triangle formation
- Large touch targets (min-height h-12, min-width w-12)
- Number labels: 0-10 with clear typography
- Disabled state for impossible selections (e.g., can't knock down 11 pins)
- Active roll indicator showing which roll you're entering

**Explanation Panel:**
- Collapsible accordion-style component
- Header: Frame number + summary (e.g., "Frame 5: Strike!")
- Expandable content area with generous padding (p-6)
- Breakdown sections with visual dividers
- Calculation display: "10 + next 2 rolls (8 + 1) = 19"
- Icon indicators for strike/spare/open frame

**Score Display Card:**
- Prominent running total in large monospace font
- Label: "Current Score" or "Final Score"
- Elevated card with subtle depth
- Positioned prominently above or beside scoreboard

**Action Buttons:**
- Primary: "Submit Roll" (prominent, full-width on mobile)
- Secondary: "New Game" (outlined style)
- Tertiary: "Reset Frame" (text-only button)
- Min-height: h-12 for touch-friendly interactions

### Navigation & Structure

**App Header:**
- Title: "Bowling Score Tutor" with bowling ball icon (from icon library)
- Score summary badge showing current frame and total
- New Game button in header on desktop

**Main Layout:**
- Vertical stacking on mobile: Header → Score Summary → Scoreboard → Pin Input → Explanation Panel
- Two-column on desktop (lg): Left (Scoreboard + Explanations) / Right (Pin Input + Controls)

### Educational Elements

**Info Tooltips:**
- Question mark icon next to technical terms
- Hover/tap reveals brief definitions
- Use popover pattern from Headless UI or similar

**Tutorial Hints:**
- First-time user: Highlight input area with subtle pulse animation
- Contextual hints appear when relevant (e.g., "This is the 10th frame - you can roll 3 times!")

**Explanation Structure:**
- Icon header (strike/spare/open indicator)
- Bold summary sentence
- Bulleted breakdown of calculation
- "Learn More" expandable section for detailed rules

## Interactive Patterns

**Roll Input Flow:**
1. Pin selector displays available options
2. User taps pin count
3. Immediate visual feedback (selected state)
4. Score updates with smooth number transition
5. Explanation panel auto-expands for 3 seconds
6. Next roll input becomes active

**Frame Progression:**
- Completed frames show dimmed/locked state
- Active frame has elevated appearance
- Future frames show placeholder state

**Responsive Behavior:**
- Mobile: Vertical scroll with sticky header
- Desktop: Fixed scoreboard visible while scrolling explanations
- Tablet: Hybrid approach with collapsible panels

## Visual Hierarchy

**Information Priority:**
1. Current score (largest, most prominent)
2. Active frame input (elevated, highlighted)
3. Scoreboard overview (grid layout)
4. Explanations (expandable, secondary)
5. Controls (persistent but not dominant)

## Accessibility Standards

- Minimum touch target: 44x44px (h-12 w-12 minimum)
- Keyboard navigation support throughout
- Focus indicators on all interactive elements (ring-2 ring-offset-2)
- ARIA labels on icon-only buttons
- Screen reader announcements for score updates
- High contrast ratios for all text elements
- Form inputs with clear labels and error states

## Icons

**Icon Library:** Heroicons (outline style)
- Bowling ball: custom placeholder or circle icon
- Question mark: for tooltips
- Chevron down/up: for expandable panels
- Check mark: for completed frames
- X mark: for strike indicator
- Refresh: for new game
- Information: for help sections

## Images

**No hero images needed** - This is a utility application focused on function over visual marketing. All visuals should be icons, illustrations of bowling pins/frames, or data visualization elements.