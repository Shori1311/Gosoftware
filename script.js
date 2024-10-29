document.addEventListener("DOMContentLoaded", () => {
  const coffeeTypeSelect = document.getElementById("coffee-type");
  const widthSelect = document.getElementById("width");
  const customWidthInput = document.getElementById("custom-width");
  const showImageCheckbox = document.getElementById("show-image");
  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const modal = document.getElementById("modal");
  const generatedCode = document.getElementById("generated-code");

  // Initialize steps
  document.getElementById("step1").style.display = "block";

  // Fetch coffee types and populate select
  async function loadCoffeeTypes() {
    let hotCoffee = await fetch("https://api.sampleapis.com/coffee/hot").then(res => res.json());
    let icedCoffee = await fetch("https://api.sampleapis.com/coffee/iced").then(res => res.json());
    const coffeeOptions = [...hotCoffee, ...icedCoffee];

    coffeeOptions.forEach(coffee => {
      const option = document.createElement("option");
      option.value = coffee.title;
      option.textContent = coffee.title;
      coffeeTypeSelect.appendChild(option);
    });
    coffeeTypeSelect.disabled = false;
  }

  loadCoffeeTypes();

  // Step 1: Enable Step 2
  document.getElementById("next1").addEventListener("click", () => {
    document.getElementById("step2").style.display = "block";
    document.getElementById("step1").style.display = "none";
  });

  // Step 2: Custom Width and Enable Step 3
  widthSelect.addEventListener("change", () => {
    customWidthInput.style.display = widthSelect.value === "custom" ? "block" : "none";
  });

  document.getElementById("next2").addEventListener("click", () => {
    document.getElementById("step3").style.display = "block";
    document.getElementById("step2").style.display = "none";
  });

  // Generate Banner HTML
  function generateBannerHTML() {
    const width = widthSelect.value === "custom" ? `${customWidthInput.value}px` : widthSelect.value;
    const showImage = showImageCheckbox.checked;
    return `
      <div style="width: ${width}; border: 1px solid #ddd; padding: 20px;">
        ${showImage ? `<img src="https://via.placeholder.com/100" alt="Coffee Image">` : ""}
        <h1>${titleInput.value}</h1>
        <p>${descriptionInput.value}</p>
      </div>
    `;
  }

  // Show modal with generated code
  document.getElementById("view-and-copy").addEventListener("click", () => {
    generatedCode.textContent = generateBannerHTML();
    modal.style.display = "block";
  });

  // Copy to clipboard
  document.getElementById("copy").addEventListener("click", () => {
    navigator.clipboard.writeText(generatedCode.textContent);
    alert("Copied to clipboard!");
  });

  // Close modal
  document.querySelector(".close").addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Start over
  document.getElementById("start-over").addEventListener("click", () => {
    titleInput.value = "";
    descriptionInput.value = "";
    showImageCheckbox.checked = false;
    widthSelect.value = "300px";
    customWidthInput.value = "";
    document.getElementById("step1").style.display = "block";
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "none";
  });
});
