You are a senior frontend engineer.

I have an existing HTML comic viewer (pure HTML + CSS + vanilla JS).
I want to enhance **mobile experience only** by adding **swipe page navigation with a page-flip animation**, similar to reading apps.

---

## 🎯 REQUIREMENTS

### 1. KEEP EXISTING LOGIC

* Do NOT break or rewrite existing logic
* Keep:

  * `loadImages()`
  * `updateNavigation()`
  * `currentChapterIndex`
  * button navigation (prev/next)
  * select dropdown
* Only EXTEND functionality

---

### 2. MOBILE ONLY FEATURE

Apply ONLY when:

```js
window.innerWidth <= 768
```

Desktop must remain unchanged.

---

### 3. SWIPE DETECTION

Implement touch events:

* swipe right → go to **previous chapter**
* swipe left → go to **next chapter**

Use:

* `touchstart`
* `touchmove`
* `touchend`

Add threshold:

* minimum swipe distance: ~50px
* ignore vertical scroll

---

### 4. PAGE FLIP ANIMATION

Before changing chapter:

* add a **page flip animation effect**

Requirements:

* smooth (300ms–500ms)
* use CSS transform (not heavy libraries)
* GPU friendly:

  * `transform`
  * `opacity`
* no external libraries

Suggested effect:

* current content slides + slight rotateY (like page flip)
* next content fades in

---

### 5. IMPLEMENTATION STRATEGY

* Wrap `#images` inside a container:

```html
<div id="reader">
    <div id="images"></div>
</div>
```

* Apply animation class on `#reader`:

  * `.flip-next`
  * `.flip-prev`

---

### 6. NAVIGATION INTEGRATION

When swipe detected:

Instead of duplicating logic:
👉 trigger existing buttons

Example:

```js
nextBtn.click()
prevBtn.click()
```

---

### 7. PERFORMANCE

* Do NOT preload all chapters
* Keep lazy loading images
* Animation must not lag on mobile

---

### 8. CODE STYLE

* Clean, readable
* No frameworks
* No TypeScript
* No external dependencies

---

## 🎁 OUTPUT FORMAT

Return FULL updated code sections:

1. HTML changes (if any)
2. CSS (new styles only)
3. JS (new code only, clearly marked)

Do NOT rewrite the entire file.

Add comments like:

```js
// ===== SWIPE FEATURE START =====
```

---

## 🎯 GOAL

User can:

* swipe left/right to change chapter
* see smooth page transition
* still use buttons normally
* works well on mobile devices

---

Here is my current HTML file: file index.html 
