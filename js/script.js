const STORAGE_KEY = "agenda-clara-compromissos";
const form = document.querySelector("#appointment-form");
const descriptionInput = document.querySelector("#description");
const dateInput = document.querySelector("#date");
const timeInput = document.querySelector("#time");
const detailsInput = document.querySelector("#details");
const list = document.querySelector("#appointments-list");
const searchInput = document.querySelector("#search-input");
const filterSelect = document.querySelector("#filter-select");
const toast = document.querySelector("#toast");
let appointments = loadAppointments();
let toastTimer;

function localDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function loadAppointments() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved.filter((item) => item && item.id && item.description && item.date && item.time) : [];
  } catch {
    return [];
  }
}

function saveAppointments() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
    return true;
  } catch {
    showToast("Não foi possível salvar neste navegador.");
    return false;
  }
}

function formatDate(dateString, options = { weekday: "short", day: "numeric", month: "short" }) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Intl.DateTimeFormat("pt-BR", options).format(new Date(year, month - 1, day));
}

function updateHeader() {
  const today = new Date();
  document.querySelector("#today-label").textContent = new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "short" }).format(today);
  document.querySelector("#date-day").textContent = String(today.getDate()).padStart(2, "0");
  document.querySelector("#date-month").textContent = new Intl.DateTimeFormat("pt-BR", { month: "short" }).format(today).replace(".", "");
  const hour = today.getHours();
  document.querySelector("#greeting").textContent = hour < 12 ? "BOM DIA, SEU TEMPO É SEU" : hour < 18 ? "BOA TARDE, SEU TEMPO É SEU" : "BOA NOITE, SEU TEMPO É SEU";
  dateInput.min = localDateString();
}

function getSortedAppointments() {
  return [...appointments].sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`));
}

function updateSummary(sorted) {
  const today = localDateString();
  const future = sorted.filter((item) => item.date >= today);
  const todayItems = sorted.filter((item) => item.date === today);
  document.querySelector("#total-count").textContent = appointments.length;
  document.querySelector("#today-count").textContent = todayItems.length;
  document.querySelector("#visible-count").textContent = `${appointments.length} ${appointments.length === 1 ? "item" : "itens"}`;
  const nextTitle = document.querySelector("#next-event");
  const nextDetail = document.querySelector("#next-detail");
  if (future.length) {
    const next = future[0];
    nextTitle.textContent = next.description;
    nextTitle.title = next.description;
    nextDetail.textContent = `${next.date === today ? "Hoje" : formatDate(next.date)} · ${next.time}`;
  } else {
    nextTitle.textContent = "Tudo livre";
    nextTitle.title = "Tudo livre";
    nextDetail.textContent = "Aproveite seu tempo";
  }
}

function createAppointmentRow(appointment) {
  const row = document.createElement("article");
  row.className = "appointment-row";
  const timeColumn = document.createElement("div");
  const time = document.createElement("div");
  time.className = "appointment-time";
  time.textContent = appointment.time;
  timeColumn.append(time);
  const date = document.createElement("div");
  date.className = "appointment-date";
  date.textContent = formatDate(appointment.date);
  timeColumn.append(date);
  const main = document.createElement("div");
  main.className = "appointment-main";
  const title = document.createElement("div");
  title.className = "appointment-title";
  title.textContent = appointment.description;
  main.append(title);
  if (appointment.details) {
    const note = document.createElement("div");
    note.className = "appointment-note";
    note.textContent = appointment.details;
    main.append(note);
  }
  const today = localDateString();
  if (appointment.date === today) {
    const badge = document.createElement("span");
    badge.className = "appointment-badge";
    badge.textContent = "HOJE";
    main.append(badge);
  }
  const removeButton = document.createElement("button");
  removeButton.className = "remove-button";
  removeButton.type = "button";
  removeButton.setAttribute("aria-label", `Remover ${appointment.description}`);
  removeButton.title = "Remover compromisso";
  removeButton.textContent = "×";
  removeButton.addEventListener("click", () => removeAppointment(appointment.id));
  row.append(timeColumn, main, removeButton);
  return row;
}

function renderAppointments() {
  const sorted = getSortedAppointments();
  updateSummary(sorted);
  const query = searchInput.value.trim().toLocaleLowerCase("pt-BR");
  const filter = filterSelect.value;
  const today = localDateString();
  const filtered = sorted.filter((item) => {
    const matchesText = `${item.description} ${item.details || ""}`.toLocaleLowerCase("pt-BR").includes(query);
    const matchesDate = filter === "today" ? item.date === today : filter === "upcoming" ? item.date >= today : true;
    return matchesText && matchesDate;
  });
  list.replaceChildren();
  if (filtered.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    const icon = document.createElement("span");
    icon.className = "empty-icon";
    icon.textContent = query || filter !== "all" ? "⌕" : "✳";
    const title = document.createElement("strong");
    title.textContent = query || filter !== "all" ? "Nenhum resultado por aqui" : "Sua agenda está aberta";
    const message = document.createElement("p");
    message.textContent = query || filter !== "all" ? "Tente mudar a busca ou o filtro." : "Adicione um compromisso para começar a organizar seu dia.";
    empty.append(icon, title, message);
    list.append(empty);
    return;
  }
  filtered.forEach((appointment) => list.append(createAppointmentRow(appointment)));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function removeAppointment(id) {
  const removed = appointments.find((item) => item.id === id);
  appointments = appointments.filter((item) => item.id !== id);
  saveAppointments();
  renderAppointments();
  if (removed) showToast("Compromisso removido da agenda.");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const description = descriptionInput.value.trim();
  if (!description || !dateInput.value || !timeInput.value) {
    showToast("Preencha a descrição, a data e o horário.");
    return;
  }
  const appointment = {
    id: window.crypto?.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    description,
    date: dateInput.value,
    time: timeInput.value,
    details: detailsInput.value.trim(),
  };
  appointments.push(appointment);
  saveAppointments();
  form.reset();
  dateInput.min = localDateString();
  filterSelect.value = "all";
  searchInput.value = "";
  renderAppointments();
  showToast("Compromisso adicionado à agenda.");
  descriptionInput.focus();
});

searchInput.addEventListener("input", renderAppointments);
filterSelect.addEventListener("change", renderAppointments);
updateHeader();
renderAppointments();



const THEME_KEY = "agenda-clara-tema";
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon");

function applyTheme(theme) {
  const darkMode = theme === "dark";
  document.documentElement.dataset.theme = darkMode ? "dark" : "light";
  themeIcon.textContent = darkMode ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", darkMode ? "Ativar modo claro" : "Ativar modo noturno");
  themeToggle.title = darkMode ? "Ativar modo claro" : "Ativar modo noturno";
  themeToggle.querySelector(".theme-toggle-label").textContent = darkMode ? "Modo claro" : "Modo noturno";
}

function toggleTheme() {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  try {
    localStorage.setItem(THEME_KEY, nextTheme);
  } catch {
    showToast("A preferência de tema não pôde ser salva.");
  }
}

let savedTheme = "light";
try {
  savedTheme = localStorage.getItem(THEME_KEY) || "light";
} catch {
  savedTheme = "light";
}
applyTheme(savedTheme);
themeToggle.addEventListener("click", toggleTheme);
