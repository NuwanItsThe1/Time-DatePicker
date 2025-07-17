(function () {
  function ClockTimePicker(targetInputSelector) {
    const oldModal = document.getElementById("clockTimeModal");
    if (oldModal) oldModal.remove();

    const modalHTML = `
      <div class="modal fade time-picker-modal" id="clockTimeModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content text-center">
            <div class="time-header">
              <span class="time-part text-white" id="selectedHour">12</span>:
              <span class="time-part text-white" id="selectedMinute">00</span>
              <div class="ampm-toggle mt-2">
                <button class="btn" id="amBtn">AM</button>
                <button class="btn" id="pmBtn">PM</button>
              </div>
            </div>
            <div class="modal-body">
              <div class="clock-face" id="clockFace">
                <div class="clock-dot"></div>
                <div class="clock-hand" id="clockHand"></div>
              </div>
              <div class="d-flex justify-content-between px-3 mt-3">
                <button class="btn btn-outline-danger" id="clearClockBtn">Clear</button>
                <div>
                  <button class="btn btn-secondary me-2" data-bs-dismiss="modal">Cancel</button>
                  <button class="btn theme-btn" id="confirmClockBtn">OK</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;

    document.body.insertAdjacentHTML("beforeend", modalHTML);

    const modalEl = document.getElementById("clockTimeModal");
    const inputEl = document.querySelector(targetInputSelector);
    const hourEl = document.getElementById("selectedHour");
    const minuteEl = document.getElementById("selectedMinute");
    const clockFace = document.getElementById("clockFace");
    const clockHand = document.getElementById("clockHand");
    const amBtn = document.getElementById("amBtn");
    const pmBtn = document.getElementById("pmBtn");
    const confirmBtn = document.getElementById("confirmClockBtn");
    const clearBtn = document.getElementById("clearClockBtn");

    const themeAttr = inputEl.getAttribute('theme')?.toLowerCase();
    const validThemes = ['dark', 'orange', 'purple', 'green', 'red', 'yellow', 'primary'];
    const allThemes = ['theme-dark', 'theme-orange', 'theme-purple', 'theme-green', 'theme-red', 'theme-yellow'];
    document.body.classList.remove(...allThemes);
    if (validThemes.includes(themeAttr) && themeAttr !== 'primary') {
      document.body.classList.add(`theme-${themeAttr}`);
    }

    let picking = "hour";
    let selectedHour = 12;
    let selectedMinute = 0;
    let isPM = false;

    function loadTimeFromInput() {
      const val = inputEl.value.trim();
      if (!val) return;

      const match = val.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
      if (match) {
        selectedHour = parseInt(match[1]);
        selectedMinute = parseInt(match[2]);
        isPM = match[3].toUpperCase() === "PM";
      }
    }

    function setAmPmButtons() {
      amBtn.classList.remove("btn-active");
      pmBtn.classList.remove("btn-active");
      (isPM ? pmBtn : amBtn).classList.add("btn-active");
    }

    function createClockNumbers(count, step = 1) {
      clockFace.querySelectorAll(".clock-number").forEach(n => n.remove());
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * 360;
        const num = i * step;
        const label = num === 0 ? "00" : (num < 10 ? "0" + num : num);
        const el = document.createElement("div");
        el.className = "clock-number";
        el.style.top = `${50 - 40 * Math.cos(angle * Math.PI / 180)}%`;
        el.style.left = `${50 + 40 * Math.sin(angle * Math.PI / 180)}%`;
        el.textContent = picking === "hour" && num === 0 ? 12 : label;
        el.onclick = () => {
          if (picking === "hour") {
            selectedHour = num === 0 ? 12 : num;
            hourEl.textContent = selectedHour < 10 ? "0" + selectedHour : selectedHour;
            picking = "minute";
            drawClock();
          } else {
            selectedMinute = num;
            minuteEl.textContent = selectedMinute < 10 ? "0" + selectedMinute : selectedMinute;
            updateClockHand();
          }
        };
        clockFace.appendChild(el);
      }
    }

    function updateClockHand() {
      const value = picking === "hour" ? selectedHour % 12 : selectedMinute / 5;
      const angle = (value / 12) * 360;
      clockHand.style.transform = `translateX(-50%) rotate(${angle}deg)`;
    }

    function drawClock() {
      createClockNumbers(12, picking === "hour" ? 1 : 5);
      updateClockHand();
      hourEl.classList.toggle("active", picking === "hour");
      minuteEl.classList.toggle("active", picking === "minute");
    }

    hourEl.onclick = () => {
      picking = "hour";
      drawClock();
    };

    minuteEl.onclick = () => {
      picking = "minute";
      drawClock();
    };

    amBtn.onclick = () => {
      isPM = false;
      setAmPmButtons();
    };

    pmBtn.onclick = () => {
      isPM = true;
      setAmPmButtons();
    };

    confirmBtn.onclick = () => {
      document.activeElement?.blur();
      const hourStr = (selectedHour < 10 ? "0" : "") + selectedHour;
      const minStr = (selectedMinute < 10 ? "0" : "") + selectedMinute;
      const ampm = isPM ? "PM" : "AM";
      inputEl.value = `${hourStr}:${minStr} ${ampm}`;
      bootstrap.Modal.getInstance(modalEl).hide();
    };

    clearBtn.onclick = () => {
      inputEl.value = "";
      selectedHour = 12;
      selectedMinute = 0;
      isPM = false;

      hourEl.textContent = "12";
      minuteEl.textContent = "00";
      setAmPmButtons();
      picking = "hour";
      drawClock();
    };

    modalEl.addEventListener("hide.bs.modal", () => {
      if (document.activeElement && modalEl.contains(document.activeElement)) {
        document.activeElement.blur();
      }
    });

    loadTimeFromInput();
    hourEl.textContent = selectedHour < 10 ? "0" + selectedHour : selectedHour;
    minuteEl.textContent = selectedMinute < 10 ? "0" + selectedMinute : selectedMinute;
    setAmPmButtons();
    drawClock();

    new bootstrap.Modal(modalEl).show();
  }

  function DatePicker(targetInputSelector) {
    const oldModal = document.getElementById("clockTimeModal");
    if (oldModal) oldModal.remove();

    const modalHTML = `
      <div class="modal fade date-picker-modal" id="clockTimeModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content text-center">
            <div class="date-header">
              <span class="time-part" id="yearPart"></span> /
              <span class="time-part" id="monthPart"></span> /
              <span class="time-part" id="dayPart"></span>
            </div>
            <div class="modal-body p-0">
              <div id="yearNav" style="display: none;" class="mt-2 px-3">
                <button class="btn btn-sm btn-outline-secondary" id="prevYears">&laquo;</button>
                <button class="btn btn-sm btn-outline-secondary" id="nextYears">&raquo;</button>
              </div>
              <div id="dayNav" class="mt-2 px-3">
                <button class="btn btn-sm btn-outline-secondary" id="prevMonth">&laquo;</button>
                <button class="btn btn-sm btn-outline-secondary" id="nextMonth">&raquo;</button>
              </div>
              <div class="calendar-grid view-day" id="calendarGrid"></div>
            </div>
            <div class="date-picker-footer d-flex justify-content-between">
              <button class="btn btn-outline-danger" id="clearDateBtn">Clear</button>
              <div>
                <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button class="btn theme-btn" id="confirmDateBtn">OK</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);

    const modalE2 = document.getElementById("clockTimeModal");
    const inputEl = document.querySelector(targetInputSelector);
    const yearPart = document.getElementById("yearPart");
    const monthPart = document.getElementById("monthPart");
    const dayPart = document.getElementById("dayPart");
    const calendarGrid = document.getElementById("calendarGrid");
    const clearBtn = document.getElementById("clearDateBtn");
    const confirmBtn = document.getElementById("confirmDateBtn");
    const prevYearsBtn = document.getElementById("prevYears");
    const nextYearsBtn = document.getElementById("nextYears");
    const yearNav = document.getElementById("yearNav");
    const prevMonthBtn = document.getElementById("prevMonth");
    const nextMonthBtn = document.getElementById("nextMonth");
    const dayNav = document.getElementById("dayNav");

    const themeAttr = inputEl.getAttribute("theme")?.toLowerCase();
    const validThemes = ['dark', 'orange', 'purple', 'green', 'red', 'yellow', 'primary'];
    const allThemes = ['theme-dark', 'theme-orange', 'theme-purple', 'theme-green', 'theme-red', 'theme-yellow'];
    document.body.classList.remove(...allThemes);
    if (validThemes.includes(themeAttr) && themeAttr !== 'primary') {
      document.body.classList.add(`theme-${themeAttr}`);
    }

    let selectedDate = inputEl.value ? new Date(inputEl.value) : new Date();
    let currentView = "day";
    let yearRangeStart = selectedDate.getFullYear() - 15;

    function renderCalendar(date) {
      calendarGrid.innerHTML = '';
      setCalendarView(currentView);
      yearNav.style.display = currentView === 'year' ? 'flex' : 'none';
      dayNav.style.display = currentView === 'day' ? 'flex' : 'none';

      if (currentView === 'year') {
        for (let i = 0; i < 21; i++) {
          const y = yearRangeStart + i;
          const el = document.createElement('div');
          el.className = 'calendar-day';
          el.textContent = y;
          if (y === date.getFullYear()) el.classList.add('selected');
          el.onclick = () => {
            selectedDate.setFullYear(y);
            currentView = 'month';
            renderCalendar(selectedDate);
            updateHeader();
          };
          calendarGrid.appendChild(el);
        }
        return;
      }

      if (currentView === 'month') {
        const months = Array.from({ length: 12 }, (_, i) =>
          new Date(0, i).toLocaleString('default', { month: 'short' })
        );
        months.forEach((m, i) => {
          const el = document.createElement('div');
          el.className = 'calendar-day';
          el.textContent = m;
          if (i === date.getMonth()) el.classList.add('selected');
          el.onclick = () => {
            selectedDate.setMonth(i);
            currentView = 'day';
            renderCalendar(selectedDate);
            updateHeader();
          };
          calendarGrid.appendChild(el);
        });
        return;
      }

      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const lastDate = new Date(year, month + 1, 0).getDate();

      const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
      days.forEach(d => {
        const el = document.createElement('div');
        el.className = 'calendar-day-name';
        el.textContent = d;
        calendarGrid.appendChild(el);
      });

      for (let i = 0; i < firstDay; i++) {
        calendarGrid.appendChild(document.createElement('div'));
      }

      for (let d = 1; d <= lastDate; d++) {
        const el = document.createElement('div');
        el.className = 'calendar-day';
        el.textContent = d;
        if (
          selectedDate.getDate() === d &&
          selectedDate.getMonth() === month &&
          selectedDate.getFullYear() === year
        ) {
          el.classList.add('selected');
        }
        el.onclick = () => {
          selectedDate.setDate(d);
          renderCalendar(selectedDate);
          updateHeader();
        };
        calendarGrid.appendChild(el);
      }
    }

    function updateHeader() {
      yearPart.textContent = selectedDate.getFullYear();
      monthPart.textContent = selectedDate.toLocaleString('default', { month: 'short' });
      dayPart.textContent = String(selectedDate.getDate()).padStart(2, '0');

      yearPart.classList.toggle('active', currentView === 'year');
      monthPart.classList.toggle('active', currentView === 'month');
      dayPart.classList.toggle('active', currentView === 'day');
    }

    function setCalendarView(view) {
      calendarGrid.classList.remove('view-day', 'view-month', 'view-year');
      calendarGrid.classList.add(`view-${view}`);
    }


    yearPart.onclick = () => {
      currentView = 'year';
      renderCalendar(selectedDate);
      updateHeader();
    };

    monthPart.onclick = () => {
      currentView = 'month';
      renderCalendar(selectedDate);
      updateHeader();
    };

    dayPart.onclick = () => {
      currentView = 'day';
      renderCalendar(selectedDate);
      updateHeader();
    };

    prevYearsBtn.onclick = () => { yearRangeStart -= 21; renderCalendar(selectedDate); };
    nextYearsBtn.onclick = () => { yearRangeStart += 21; renderCalendar(selectedDate); };

    prevMonthBtn.onclick = () => {
      selectedDate.setMonth(selectedDate.getMonth() - 1);
      renderCalendar(selectedDate);
      updateHeader();
    };

    nextMonthBtn.onclick = () => {
      selectedDate.setMonth(selectedDate.getMonth() + 1);
      renderCalendar(selectedDate);
      updateHeader();
    };

    clearBtn.onclick = () => {
      inputEl.value = '';
      selectedDate = new Date();
      yearRangeStart = selectedDate.getFullYear() - 15;
      renderCalendar(selectedDate);
      updateHeader();
    };

    confirmBtn.onclick = () => {
      const yyyy = selectedDate.getFullYear();
      const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const dd = String(selectedDate.getDate()).padStart(2, '0');
      inputEl.value = `${yyyy}-${mm}-${dd}`;
      bootstrap.Modal.getInstance(modalE2).hide();
    };

    modalE2.addEventListener("hide.bs.modal", () => {
      if (document.activeElement && modalE2.contains(document.activeElement)) {
        document.activeElement.blur();
      }
    });

    updateHeader();
    renderCalendar(selectedDate);
    new bootstrap.Modal(modalE2).show();
  }

  window.ClockTimePicker = ClockTimePicker;
  window.DatePicker = DatePicker;
})();
