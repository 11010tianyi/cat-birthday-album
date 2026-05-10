async function loadYears() {
  const timeline = document.querySelector("[data-years]");
  if (!timeline) return;

  try {
    const response = await fetch("years/index.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const years = await response.json();
    timeline.innerHTML = years
      .map(
        (item) => `
          <a class="year-card year-card-${item.year}" href="${item.href}" aria-label="打开 ${item.year} 年主题页">
            <img src="${item.cover}" alt="${item.title}">
            <div class="year-meta">
              <div class="year-number">${item.year}</div>
              <h3>${item.title}</h3>
              <p>${item.subtitle}</p>
            </div>
            <span class="year-status">${item.theme}</span>
          </a>
        `,
      )
      .join("");
  } catch (error) {
    timeline.innerHTML = `
      <p class="lede">年份索引暂时没有加载出来，可以直接进入 <a href="years/2026/">2026 主题页</a>。</p>
    `;
    console.error(error);
  }
}

loadYears();
