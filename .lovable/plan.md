

# BMS Theme Toggle Implementation Plan

## Overview

Create a theme toggle that allows users to switch between the current dark "Fintech" theme and a new light "BMS" theme that matches the BMS visual identity shown in the reference image.

## BMS Visual Identity Analysis

Based on the screenshot, the BMS design includes:
- **Light background**: White/light gray (#F5F7FA or similar)
- **Primary blue accent**: #1976D2 (BMS brand blue)
- **Clean borders**: Light gray borders (#E0E0E0)
- **Minimal shadows**: Subtle or no shadows
- **Simple professional look**: Less gradients, more solid colors
- **Blue accent on active states**: Sidebar items, buttons

---

## Implementation Steps

### 1. Add BMS Theme CSS Variables

Update `src/index.css` to add a new `.bms-theme` class with light mode colors:

```text
BMS Theme Colors:
- Background: Light gray (#F5F7FA)
- Card: White (#FFFFFF)
- Primary: BMS Blue (#1976D2)
- Text: Dark gray (#1A1A2E)
- Borders: Light gray (#E0E0E0)
- Muted: Gray tones for secondary text
```

### 2. Create Theme Toggle Component

Create a new component `src/components/calculator/ThemeToggle.tsx`:

- Switch component with label "BMS Theme"
- Toggles between default dark theme and BMS light theme
- Uses the existing Switch component from shadcn/ui
- Positioned in the header next to other controls

### 3. Update Index Page

Modify `src/pages/Index.tsx`:

- Add `isBmsTheme` state
- Apply `bms-theme` class to root div when enabled
- Pass theme state to components that need conditional styling

### 4. Update Component Styles

Some components may need conditional classes for proper contrast in light mode:

- **MetricCard**: Adjust gradient overlays for light theme
- **BudgetChart**: Ensure legend text is readable
- **InputField**: Adjust input background colors

---

## Technical Details

### CSS Variables for BMS Theme

```css
.bms-theme {
  --background: 210 20% 97%;      /* Light gray */
  --foreground: 222 47% 11%;      /* Dark text */
  --card: 0 0% 100%;              /* White cards */
  --primary: 211 100% 46%;        /* BMS Blue #1976D2 */
  --border: 220 13% 88%;          /* Light borders */
  --muted: 220 14% 94%;           /* Light muted */
  --muted-foreground: 220 9% 46%; /* Gray text */
  /* ... more variables */
}
```

### Theme Toggle Component Structure

```text
+-------------------------------------------+
| [BMS Theme] [===O] Switch                 |
+-------------------------------------------+
```

- Label shows "BMS Theme" or "Default Theme"
- Toggle icon indicates current state
- Smooth transition when switching themes

### Files to Create/Modify

| File | Action |
|------|--------|
| `src/index.css` | Add `.bms-theme` CSS variables |
| `src/components/calculator/ThemeToggle.tsx` | New component |
| `src/pages/Index.tsx` | Add theme state and toggle |
| `src/components/calculator/MetricCard.tsx` | Conditional gradient classes |

---

## User Experience

1. Toggle is placed in the header for easy access
2. Theme change applies instantly with smooth transitions
3. All text remains readable in both themes
4. Charts and colors adapt appropriately
5. BMS theme provides a clean, professional light appearance

