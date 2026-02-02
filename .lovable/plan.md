

# BMS Theme Header Customization

## Overview

Update the header to match the BMS visual identity when the BMS theme is enabled:
1. Apply the dark navy blue background color (#0A1F44) to the header
2. Replace the Calculator icon with the BMS cube logo

---

## Implementation Steps

### 1. Copy BMS Logo to Project Assets

Copy the uploaded BMS cube logo to the project's assets folder:
- Source: `user-uploads://e33a7d128086c386.png`
- Destination: `src/assets/bms-logo.png`

### 2. Add Header CSS Variables for BMS Theme

Update `src/index.css` to add a specific header background color for BMS theme:

```css
.bms-theme {
  /* Add header-specific variable */
  --header-background: 220 65% 15%;  /* Dark navy blue #0A1F44 */
  --header-foreground: 0 0% 100%;    /* White text for contrast */
}
```

### 3. Update Header in Index.tsx

Modify the header section to:
- Apply conditional background color when BMS theme is active
- Import and display the BMS logo instead of Calculator icon when BMS theme is active

```text
Changes to header element:
- Add conditional class: isBmsTheme ? 'bg-[#0A1F44]' : 'bg-background/80'
- Import BMS logo: import bmsLogo from "@/assets/bms-logo.png"
- Conditional icon rendering:
  - BMS Theme: <img src={bmsLogo} /> 
  - Default Theme: <Calculator icon />
```

---

## Technical Details

### Header Background Color
The BMS header uses a dark navy blue: `#0A1F44` (approximately `hsl(220, 65%, 15%)`)

### Logo Display
- Logo dimensions: approximately 32x32 pixels to match the current icon size
- Remove the gradient background wrapper when showing BMS logo (clean look)
- Keep the gradient wrapper for the default dark theme with Calculator icon

### Files to Modify

| File | Changes |
|------|---------|
| `src/assets/bms-logo.png` | Copy logo from upload |
| `src/pages/Index.tsx` | Conditional header styling and logo |
| `src/index.css` | Add header-specific CSS variables |

---

## Visual Result

**Default Dark Theme:**
```text
+--[gradient bg]--+
|  Calculator     |  Programmatic Sales Estimator
|     icon        |  Media Investment & Margin Calculator
+-----------------+
```

**BMS Theme:**
```text
+--[dark navy blue background]------------------+
|  [BMS cube logo]  Programmatic Sales Estimator
|                   Media Investment & Margin Calculator
+-----------------------------------------------+
```

