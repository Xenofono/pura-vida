const toggle = document.querySelector("#links i");

//adds click event to the change theme icon which fires the anonymous function on every click
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

//send in toggleRecipe as a parameter to setup the toggle and immediately invoke the returned function
toggleFactory(toggleRecipe)();

/* jQuery to hide the contact form at start and slideToggle it when the button is clicked.
jQuery .click sets up an event listener on the click event and fires the anonymous function within
every time a click event is detected */
$("#contact-form").hide();
$("#form-btn").click(() => {
  $("#contact-form").slideToggle();
});

//prevent page from reloading and form from submitting if any input field is incorrect
//if no field is incorrect the form is allowed to submit
$("#contact-form").submit((e) => {
  for (let i = 0; i < e.target.length - 1; i++) {
    if (!validateForm(e.target[i])) {
      e.preventDefault();
      break;
    }
  }
});

function validateForm({ name, value }) {
  switch (name) {
    //check if name contains numbers
    case "name":
      const pattern = new RegExp("\\d");
      if (pattern.test(value)) {
        alert("Namn kan bara innehålla bokstäver tyvärr");
        return false;
      }
      break;
    //check if date is in the future
    case "date":
      if (Date.now() >= Date.parse(value)) {
        alert("Datum måste vara i framtiden");
        return false;
      }
      break;
    //currently handled by HTML input type email
    case "email":
      break;
    //check if the message is shorter than 10 characters
    case "message":
      if (value.length < 10) {
        alert("Meddelandet måste vara över 10 tecken");
        return false;
      }
      break;
    //fallback
    default:
      alert("Du gjorde något mycket konstigt med formuläret");
      return false;
  }
  return true;
}
