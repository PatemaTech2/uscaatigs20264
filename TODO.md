# TODO - Dark Theme Fix

## Task
Fix all errors with the dark theme - background color and text don't look the same in dark mode

## Issues Identified
1. Body tag has hardcoded background gradient (`from-[#F8F8F5] via-[#FAFAF7] to-[#F8F8F5]`) and text color (`text-[#1A1A1A]`)
2. Many elements have hardcoded colors like `text-[#1A1A1A]`, `bg-white`, `bg-gray-200`
3. Some sections have hardcoded gradients that don't adapt to dark mode

## Fix Plan
- [ ] Fix body tag background and text colors for dark mode
- [ ] Fix navbar colors for dark mode
- [ ] Fix hero section colors for dark mode
- [ ] Fix video section colors for dark mode
- [ ] Fix about section colors for dark mode
- [ ] Fix why-attend section colors for dark mode
- [ ] Fix opportunities section colors for dark mode
- [ ] Fix footer colors for dark mode
- [ ] Fix hardcoded gradients in various sections

## Progress
- [ ] Read and analyze existing files (styles.css, index.html, script.js)
- [ ] Update index.html - remove hardcoded colors from body tag
- [ ] Update styles.css - add comprehensive dark mode overrides
- [ ] Test dark mode functionality
