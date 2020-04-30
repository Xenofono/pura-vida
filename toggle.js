/* fabrik för menytoggel, argumenten den tar är elementet som ska döljas/visas
elementet som ska toggla menyn till och från
vid vilken bredd på skärmen koden ska köras
frivillig container, default är navelementet
frivillig boolean om target så läggas först eller sist
frivillig text för elementet som ska toggla
frivillig ihopfälld höjd på menyn
frivillig utfälld höjd på menyn*/



const toggleFactory = ({
  toToggle,
  target,
  toggleWidth,
  container = document.querySelector("nav"),
  prepend = false,
  targetText = "MENY",
  containerHeight = 75,
  containerHeightExpanded = 240,
}) => {
  let show = true;
  const toggelFunc = () => {
    const toggleLargeScreen = window.innerWidth >= toggleWidth;
    //boolean show kontrollerar om ändringen redan har triggats, optimering för att
    //undvika onödiga tilldeningar
    if (!show && toggleLargeScreen) {
      toToggle.style.display = "block";
      show = !show;
      container.removeChild(target);
    } else if (show && !toggleLargeScreen) {
      toToggle.style.display = "none";
      show = !show;
      prepend ? container.prepend(target) : container.append(target)
    }
  };
  containerSetup(container, containerHeight, containerHeightExpanded);

  setup(toToggle, target, container, targetText, toggelFunc);
  return toggelFunc;
};

const setup = (toToggle, target, container, targetText, toggelFunc) => {
  target.innerText = targetText;
  target.addEventListener("click", () => {
    //klass för att animera height transition på container
    container.classList.toggle("expanded");

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

const containerSetup = (container, containerHeight, containerHeightExpanded) => {
  container.style.maxHeight = `${containerHeight}px`;
  container.style.transitionDuration = "0.3s";
  container.style.transitionProperty = "max-height";
  container.style.transitionTimingFunction = "linear";
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = `.expanded {max-height: ${containerHeightExpanded}px !important;}`;
  container.appendChild(style);
};
