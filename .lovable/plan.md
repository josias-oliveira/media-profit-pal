

# Modal for Mathematical Proof Display

## Overview

Transform the ValidationBadge component from a hover tooltip to a clickable element that opens a centered modal dialog with a dark overlay background displaying the mathematical proof data.

## Current Behavior

- ValidationBadge uses a Tooltip component
- Mathematical proof appears on hover
- Small tooltip with limited space

## Proposed Behavior

- Clicking the badge opens a Dialog (modal)
- Dark overlay (black mask) covers the background
- Mathematical proof data displayed centered on screen
- Modal can be closed by clicking the X button or clicking outside

## Technical Implementation

### File: `src/components/calculator/ValidationBadge.tsx`

**Changes required:**

1. Replace Tooltip import with Dialog components from `@/components/ui/dialog`
2. Add `useState` hook to control modal open/close state
3. Convert the badge to a clickable `DialogTrigger`
4. Move the mathematical proof content into a `DialogContent` component
5. Style the dialog with centered content and proper formatting

**New component structure:**

```text
ValidationBadge
├── Dialog (controlled by open state)
│   ├── DialogTrigger (the badge itself)
│   └── DialogContent
│       ├── DialogHeader
│       │   └── DialogTitle ("MATHEMATICAL PROOF")
│       └── Content (budget, CPM, impressions, validator)
```

**Key styling:**

- Use existing Dialog overlay (already has dark background `bg-black/80`)
- Center content using Dialog's default positioning
- Apply similar styling from current tooltip content
- Add proper spacing and font sizing for modal view

### Code Changes Summary

| Component | Change |
|-----------|--------|
| Imports | Add Dialog components, add useState |
| Badge element | Wrap with DialogTrigger |
| Tooltip | Remove completely |
| DialogContent | Add with centered mathematical proof table |

## Visual Result

- User clicks on "Math Check OK" badge
- Dark overlay appears covering the entire screen
- Centered white/card modal displays:
  - Header: "MATHEMATICAL PROOF"
  - Table with BUDGET, CPM VENDAS, IMPRESSOES, IMPRESSIONS (MEDIA), VALIDATOR
  - Close button (X) in top-right corner

