// =============================================
// TIL 폼 등록 기능
// =============================================
const tilForm = document.querySelector("#til-form");
const tilList = document.querySelector("#til-list");

tilForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const date = document.querySelector("#til-date").value;
  const title = document.querySelector("#til-title").value;
  const content = document.querySelector("#til-content").value;

  // DOM 요소를 안전하게 생성 (innerHTML 대신 textContent 사용 → XSS 방지)
  const article = document.createElement("article");
  article.className = "til-item";

  const time = document.createElement("time");
  time.textContent = date;

  const h3 = document.createElement("h3");
  h3.textContent = title;

  const p = document.createElement("p");
  p.textContent = content;

  article.appendChild(time);
  article.appendChild(h3);
  article.appendChild(p);

  // 최신 항목이 위에 오도록 prepend
  tilList.prepend(article);

  tilForm.reset();
});

// =============================================
// 다크 모드 토글 (보너스)
// =============================================
const nav = document.querySelector(".top-nav");

const darkToggle = document.createElement("button");
darkToggle.className = "dark-toggle";
darkToggle.textContent = "🌙";
darkToggle.setAttribute("aria-label", "다크 모드 토글");
nav.appendChild(darkToggle);

darkToggle.addEventListener("click", function () {
  const isDark = document.body.classList.toggle("dark-mode");
  darkToggle.textContent = isDark ? "☀️" : "🌙";
});

// =============================================
// 갤러리 이미지 클릭 시 확대 (보너스)
// =============================================

// 오버레이 요소 동적 생성
const overlay = document.createElement("div");
overlay.id = "gallery-overlay";

const overlayImg = document.createElement("img");
overlayImg.alt = "확대된 갤러리 이미지";
overlay.appendChild(overlayImg);

document.body.appendChild(overlay);

// 갤러리 이미지 각각에 클릭 이벤트 등록
const galleryImages = document.querySelectorAll(".gallery-grid img");

galleryImages.forEach(function (img) {
  img.addEventListener("click", function () {
    overlayImg.src = img.src;
    overlayImg.alt = img.alt;
    overlay.classList.add("active");
  });
});

// 오버레이 클릭 시 닫기
overlay.addEventListener("click", function () {
  overlay.classList.remove("active");
});

// ESC 키로도 닫기
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    overlay.classList.remove("active");
  }
});
