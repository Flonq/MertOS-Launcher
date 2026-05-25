const projectGrid = document.getElementById("projectGrid");
const toolGrid = document.getElementById("toolGrid");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");

const { projects, tools } = window.launcherData;

let activeFilter = "all";

function createProjectCard(project) {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.category = project.category;
  card.dataset.title = project.title.toLowerCase();

  card.innerHTML = `
    <span class="badge">${project.status}</span>
    <div class="logo-box project-logo">
      ${
        project.logo
          ? `<img src="${project.logo}" alt="${project.title} logo" />`
          : `<span>${project.icon}</span>`
      }
    </div>
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    <div class="actions">
      ${project.links
        .map(
          (link) => `
            <a href="${link.url}" target="_blank" rel="noopener noreferrer">
              ${link.label}
            </a>
          `
        )
        .join("")}
    </div>
  `;

  return card;
}

function createToolCard(tool) {
  const card = document.createElement("a");
  card.className = "card tool-card";
  card.href = tool.url;
  card.target = "_blank";
  card.rel = "noopener noreferrer";
  card.dataset.category = tool.category;
  card.dataset.title = tool.title.toLowerCase();

  card.innerHTML = `
    <div class="logo-box">
      ${
        tool.logo
          ? `<img src="${tool.logo}" alt="${tool.title} logo" />`
          : `<span>${tool.icon}</span>`
      }
    </div>
    <h3>${tool.title}</h3>
  `;

  return card;
}

function renderCards() {
  projectGrid.innerHTML = "";
  toolGrid.innerHTML = "";

  projects.forEach((project) => {
    projectGrid.appendChild(createProjectCard(project));
  });

  tools.forEach((tool) => {
    toolGrid.appendChild(createToolCard(tool));
  });

  filterCards();
}

function filterCards() {
  const searchValue = searchInput.value.toLowerCase().trim();
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    const title = card.dataset.title || "";
    const category = card.dataset.category || "";

    const matchesSearch = title.includes(searchValue);
    const matchesFilter = activeFilter === "all" || category === activeFilter;

    card.classList.toggle("hidden", !(matchesSearch && matchesFilter));
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    activeFilter = button.dataset.filter;
    filterCards();
  });
});

searchInput.addEventListener("input", filterCards);

renderCards();