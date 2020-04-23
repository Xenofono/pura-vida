/* fabrik för menytoggel, argumenten den tar är elementet som ska döljas/visas
elementet som ska toggla menyn till och från
vid vilken bredd på skärmen koden ska köras
frivillig text för elementet som ska toggla
frivillig ihopfälld höjd på menyn
frivillig utfälld höjd på menyn*/

const nav = document.querySelector("nav");

const toggleFactory = ({
  toToggle,
  target,
  toggleWidth,
  targetText = "MENY",
  navHeight = 75,
  navHeightExpanded = 240,
}) => {
  let show = true;
  const toggelFunc = () => {
    const toggleLargeScreen = window.innerWidth >= toggleWidth;
    //boolean show kontrollerar om ändringen redan har triggats, optimering för att
    //undvika onödiga tilldeningar
    if (!show && toggleLargeScreen) {
      toToggle.style.display = "block";
      show = !show;
      nav.removeChild(target);
    } else if (show && !toggleLargeScreen) {
      toToggle.style.display = "none";
      show = !show;
      nav.append(target);
    }
  };
  navSetup(navHeight, navHeightExpanded);

  setup(toToggle, target, targetText, toggelFunc);
  return toggelFunc;
};

const setup = (toToggle, target, targetText, toggelFunc) => {
  target.innerText = targetText;
  target.addEventListener("click", () => {
    //klass för att animera height transition på nav
    nav.classList.toggle("expanded");

    if (toToggle.style.display === "none") {
      toToggle.style.display = "flex";
      toToggle.style.flexDirection = "column";
    } else {
      setTimeout(() => {
        toToggle.style.display = "none";
      }, 300);
    }
  });
  window.addEventListener("resize", toggelFunc);
};

const navSetup = (navHeight, navHeightExpanded) => {
  nav.style.maxHeight = `${navHeight}px`;
  nav.style.transitionDuration = "0.3s";
  nav.style.transitionProperty = "max-height";
  nav.style.transitionTimingFunction = "linear";
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = `.expanded {max-height: ${navHeightExpanded}px !important;}`;
  nav.appendChild(style);
};
