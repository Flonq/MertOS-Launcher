const projects = [
  {
    title: "Scoovi",
    description: "Alışveriş deneyimini kolaylaştırmaya yönelik geliştirilen tarayıcı eklentisi projesi.",
    logo: "assets/icons/scoovi-icon.png",
    status: "Active",
    category: "web",
    links: [
      { label: "Website", url: "https://scoovi.app" },
      { label: "GitHub", url: "https://github.com/Flonq" }
    ]
  },
  {
    title: "MertOS Dashboard",
    description: "Kişisel tarayıcı başlangıç paneli. Saat, odak, todo ve pomodoro içerir.",
    logo: "assets/icons/mertos.svg",
    status: "Live",
    category: "web",
    links: [
      { label: "Live", url: "https://flonq.github.io/MertOS-Dashboard/" },
      { label: "Repo", url: "https://github.com/Flonq/MertOS-Dashboard" }
    ]
  },
  {
    title: "AI NPC Dialogue",
    description: "Unity üzerinde geliştirilen yapay zeka destekli NPC diyalog sistemi.",
    logo: "assets/icons/ai-npc.svg",
    status: "In Dev",
    category: "game",
    links: [
      { label: "Repo", url: "https://github.com/Flonq/ai-npc-dialogue-system" }
    ]
  },
  {
    title: "AR Balık Müzesi",
    description: "Mobil AR teknolojisi ile geliştirilen eğitici balık müzesi deneyimi.",
    logo: "assets/icons/ar-fish.svg",
    status: "In Dev",
    category: "game",
    links: [
      { label: "Repo", url: "https://github.com/BBaglars/fish_museum_automation" }
    ]
  },
  {
    title: "Backend Sandbox",
    description: "FastAPI, Node.js ve API testleri için kişisel backend çalışma alanı.",
    logo: "assets/icons/backend.svg",
    status: "Draft",
    category: "backend",
    links: [
      { label: "GitHub", url: "https://github.com/Flonq" }
    ]
  }
];

const tools = [
  {
    title: "GitHub",
    logo: "assets/icons/github.svg",
    category: "tool",
    url: "https://github.com/Flonq"
  },
  {
    title: "ChatGPT",
    logo: "assets/icons/chatgpt.svg",
    category: "tool",
    url: "https://chatgpt.com"
  },
  {
    title: "Scoovi",
    logo: "assets/icons/scoovi-icon.png",
    category: "tool",
    url: "https://scoovi.app"
  },
  {
    title: "Google Cloud",
    logo: "assets/icons/google-cloud.svg",
    category: "tool",
    url: "https://console.cloud.google.com"
  },
  {
    title: "Cloudflare",
    logo: "assets/icons/cloudflare.svg",
    category: "tool",
    url: "https://dash.cloudflare.com"
  },
  {
    title: "Firebase",
    logo: "assets/icons/firebase.svg",
    category: "tool",
    url: "https://console.firebase.google.com"
  },
  {
    title: "YouTube",
    logo: "assets/icons/youtube.svg",
    category: "tool",
    url: "https://youtube.com"
  },
  {
    title: "Gmail",
    logo: "assets/icons/gmail.svg",
    category: "tool",
    url: "https://mail.google.com"
  }
];

const projectGrid = document.getElementById("projectGrid");
const toolGrid = document.getElementById("toolGrid");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");

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