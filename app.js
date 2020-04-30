const toggle = document.querySelector("#links i");

toggle.addEventListener("click", () => {
  const doc = document.documentElement;
  const currentColor = doc.getAttribute("theme");
  doc.setAttribute("theme", currentColor === "dark" ? "light" : "dark");
});

const toggleRecipe = {
  toToggle: document.querySelector("#links"),
  target: document.createElement("button"),
  toggleWidth: 850,
};

toggleFactory(toggleRecipe)();


const toggleForm = {
  toToggle: document.querySelector("#contact-form"),
  target: document.createElement("button"),
  toggleWidth: 9999,
  container: document.querySelector("#form-container"),
  targetText: "VISA FORMULÄR",
  prepend: true
}
toggleFactory(toggleForm)();

