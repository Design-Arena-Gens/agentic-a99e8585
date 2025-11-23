const tracker = document.getElementById("session-tracker");
const rpeButtons = document.querySelectorAll("#rpe-scale button");
const rpeOutput = document.getElementById("rpe-output");

const STORAGE_KEY_TRACKER = "agentic-training-tracker";
const STORAGE_KEY_RPE = "agentic-training-rpe";

const sessionState = JSON.parse(localStorage.getItem(STORAGE_KEY_TRACKER) || "{}");

if (tracker) {
  tracker.querySelectorAll("li").forEach((day) => {
    const dayName = day.dataset.day;
    if (sessionState[dayName]) {
      day.classList.add("active");
    }
    day.addEventListener("click", () => {
      const isActive = day.classList.toggle("active");
      sessionState[dayName] = isActive;
      localStorage.setItem(STORAGE_KEY_TRACKER, JSON.stringify(sessionState));
    });
  });
}

const savedRpe = localStorage.getItem(STORAGE_KEY_RPE);

if (savedRpe) {
  setActiveRpe(savedRpe);
}

rpeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.rpe;
    setActiveRpe(value);
    localStorage.setItem(STORAGE_KEY_RPE, value);
  });
});

function setActiveRpe(value) {
  rpeButtons.forEach((btn) => {
    btn.dataset.active = String(btn.dataset.rpe === value);
  });

  const effortNotes = {
    "1": "Regroup day — add tempo, slow the negatives.",
    "2": "Still fresh — consider a fourth round next time.",
    "3": "Right on target. Solid stimulus, recover well.",
    "4": "Strong push. Prioritize sleep and protein tonight.",
    "5": "Maxed out. Extend rests or drop reps next session."
  };

  rpeOutput.textContent = `Logged RPE ${value}: ${effortNotes[value]}`;
}
