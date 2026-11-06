---
title: "Why I Built My Own React Project Generator"
slug: "why-i-built-my-own-react-project-generator"
date: "2026-11-06"
description: "A small engineering problem that turned into a tool to save developers from repetitive setup work."
tags: ["React", "TypeScript", "Developer Experience"]
published: true
---

# Why I Built My Own React Project Generator

Every craftsman prepares his tools before beginning his work. But a craftsman should not have to forge the same tools every morning.

I faced a similar problem while developing React applications.

Every new project required almost the same work: installing dependencies, configuring TypeScript, setting up Tailwind, preparing ESLint, configuring aliases, routing, API services, and arranging folders.

Sometimes, I spent 40–70 minutes just preparing the project before writing actual application code.

I thought, why should I repeat something I've already done so many times?

So I decided to build my own solution.

## The Idea

I started building `create-modern-react`, a CLI tool that prepares a complete React development environment with a single command.

```bash
npx create-modern-react my-app
```

It generates a project with React, TypeScript strict mode, Vite, SWC, Tailwind CSS, shadcn/ui, routing, Axios, reusable hooks, error boundaries, and development configurations.

The goal was not simply to generate folders and install packages. I wanted every project to begin with a proper engineering foundation.

## What I Learned

One important lesson I learned during this work is that developers should not confuse repeated effort with productivity.

If you are solving the same problem in every project, perhaps the problem is not your speed. Perhaps your process needs improvement.

Good engineering is not only about writing better code. It is also about building better systems around the code.

## The Final Result

What previously required around 40–70 minutes of manual configuration can now be completed in approximately 15 seconds.

A single command, a consistent architecture, and more time to focus on actual product development.

As an old craftsman would say:

*Do not spend every morning sharpening the same blade. Build a workshop where your tools are always ready.*

**GitHub:** https://github.com/rohitbytecode

---

*Rohit More - Software Engineer. Building tools, improving workflows, and automating the work that should never be repeated.*