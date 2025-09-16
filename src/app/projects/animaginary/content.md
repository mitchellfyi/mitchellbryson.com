---
title: "Animaginary"
description: "High performance web animation library, hand-written in optimized WASM."
author: "Mitchell Bryson"
link:
  href: "https://github.com/animaginary"
  label: "github.com/animaginary"
---

High performance web animation library, hand-written in optimized WASM.

## Overview

Animaginary is a cutting-edge web animation library that pushes the boundaries of what's possible in browser-based animations. By leveraging WebAssembly (WASM), we've created a library that delivers desktop-quality animations with minimal performance impact.

## Key Features

- **WASM-Powered**: Hand-written WebAssembly for maximum performance
- **60fps Animations**: Smooth, consistent frame rates across all devices
- **Minimal Bundle Size**: Optimized for production with tree-shaking support
- **Cross-Platform**: Works seamlessly across all modern browsers
- **TypeScript Support**: Full type safety and excellent developer experience

## Performance Benchmarks

Our WASM implementation delivers:

- **3x faster** than traditional JavaScript animations
- **50% smaller** bundle size compared to similar libraries
- **Consistent 60fps** on mobile devices
- **Zero garbage collection** during animation loops

## API Design

```javascript
import { Animaginary } from 'animaginary'

const animation = new Animaginary({
  duration: 1000,
  easing: 'ease-in-out',
  onUpdate: (progress) => {
    element.style.transform = `translateX(${progress * 100}px)`
  }
})

animation.play()
```

## Use Cases

- **Data Visualizations**: Smooth, interactive charts and graphs
- **UI Animations**: Micro-interactions and page transitions
- **Games**: Browser-based games requiring high performance
- **Creative Coding**: Artistic animations and generative art

## Community

Join thousands of developers using Animaginary to create stunning web experiences. Our community is active on GitHub, Discord, and Twitter.
