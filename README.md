# 🕑 Clock Date Time Picker for Bootstrap

A beautiful, material-style **Clock Time Picker** and **Calendar Date Picker** built for **Bootstrap 5+**.  
Supports **theme customization**, **dark mode**, and more — all in one lightweight, dependency-free module.

---

## 🚀 Features

- 🕒 Intuitive **clock-face time selection** (hour + minute)
- 📅 Interactive **calendar-style date selection**
- 🌙 **Dark mode** & custom themes via CSS variables
- 🎨 Easy **theme switching** with the `theme` attribute
- 🧩 **Modular UI** with a consistent modal layout for both time and date
- ⚙ **No dependencies** beyond Bootstrap 5
- 📦 Lightweight & framework-agnostic (works in any HTML/CSS/JS project)
---

## 📦 Installation

### 🔧 Option 1: Install via NPM

bash
npm install clock-date-timepicker


Include the assets in your HTML:

html
<!-- Clock Date Time Picker CSS -->
<link href="node_modules/bootstrap-date-clock-timepicker/dist/clock-date-timepicker.css" rel="stylesheet">

<!-- Clock Date Time Picker JS -->
<script src="node_modules/bootstrap-date-clock-timepicker/dist/clock-date-timepicker.js"></script>


---

### 🌐 Option 2: Use via CDN

html
<!-- Bootstrap 5 CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Clock Date Time Picker CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap-date-clock-timepicker@2.0.0/dist/clock-date-timepicker.css" rel="stylesheet">

<!-- Bootstrap 5 JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

<!-- Clock Date Time Picker JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap-date-clock-timepicker@2.0.0/dist/clock-date-timepicker.js"></script>


---

## 🛠 Usage

### 🧩 Basic HTML Example
⏰ Time Picker Example

```html
<div class="input-group">
  <input type="text" id="timeInput" class="form-control" readonly placeholder="Pick time" theme="orange">
  <button class="btn btn-outline-secondary" onclick="ClockTimePicker('#timeInput')">🕑</button>
</div>
```

### 🧪 JavaScript

js
ClockTimePicker('#timeInput');


This opens the clock picker and updates the input field when a time is selected.

📅 Date Picker Example

```html
<div class="input-group">
  <input type="text" id="dateInput" class="form-control" readonly placeholder="Pick date" theme="green">
  <button class="btn btn-outline-secondary" onclick="DatePicker('#dateInput')">📅</button>
</div>
```

### 🧪 JavaScript

js
DatePicker('#dateInput');


This opens the date picker and updates the input field when a date is selected.
---

## 🎨 Available Themes

Add a theme attribute to your <input> field to change the look:

| Theme Name | Attribute Example                     |
|------------|----------------------------------------|
| Default    | `<input theme="primary">` or no attribute |
| Dark       | `<input theme="dark">`                |
| Orange     | `<input theme="orange">`              |
| Purple     | `<input theme="purple">`              |
| Green      | `<input theme="green">`               |
| Red        | `<input theme="red">`                 |
| Yellow     | `<input theme="yellow">`              |

> The time and date pickers will apply the selected theme automatically.

---

## 🎛 Theme Customization (CSS Variables)

You can customize any theme or create your own by overriding CSS variables.

### ✨ Example Custom Theme

css
:root {
  --picker-primary: #009688;
  --picker-primary-text: #ffffff;
  --picker-hover: #b2dfdb;
  --picker-background: #e0f2f1;
  --picker-face: #b2dfdb;
  --picker-text: #000000;
}


> Define your custom theme styles in your main stylesheet.

---

## 📁 File Structure


clock-date-timepicker/
├── dist/
│   ├── clock-date-timepicker.css
│   └── clock-date-timepicker.js
├── src/
│   ├── index.js
│   └── style.css
├── demo/
│   └── index.html
├── LICENSE
├── README.md
└── package.json


---

## 🤝 Dependencies

- ✅ [Bootstrap 5.3+](https://getbootstrap.com/)
- ❌ No jQuery required
- ❌ No external libraries needed

---

## 📸 Demo

> ✅ Live demo coming soon

For now, clone the repo and open demo/index.html in your browser to test both the time and date pickers.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).


MIT License

Copyright (c) 2025 Nuwan Wijeweera

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.



---

## 🙌 Contributing

Feel free to submit pull requests, report issues, or request features.

---

## 🏷 Tags

bootstrap · timepicker · datepicker · calendar · clock · material · date-time-picker · modal · dark-mode · css-variables
```