// Gadopis landing page: live download counter and the dictation demo.
"use strict";

const REPO = "szydlo84/gadopis-pobierz";
const CACHE_KEY = "gadopis-releases-v1";
const CACHE_MS = 10 * 60 * 1000;
// Below this many downloads the page invites early testers instead of a number.
const MIN_COUNT = 1;
// Downloads of older releases, which are hidden as drafts and so no longer in
// the public API: 0.1.0 (6) and 0.1.2 (3), frozen when they were hidden.
const HIDDEN_DOWNLOADS = 9;

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

// ---------- downloads (GitHub releases) ----------

async function loadReleases() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
    if (cached && Date.now() - cached.at < CACHE_MS) return cached.data;
  } catch {
    // Storage can be blocked; fetch instead.
  }
  const response = await fetch(
    `https://api.github.com/repos/${REPO}/releases?per_page=100`,
    { headers: { Accept: "application/vnd.github+json" } },
  );
  if (!response.ok) throw new Error(`GitHub ${response.status}`);
  const data = (await response.json()).map((release) => ({
    name: release.name || release.tag_name,
    tag: release.tag_name,
    draft: release.draft,
    prerelease: release.prerelease,
    published: release.published_at,
    assets: release.assets.map((asset) => ({
      name: asset.name,
      size: asset.size,
      count: asset.download_count,
    })),
  }));
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
  } catch {
    // Not critical.
  }
  return data;
}

function formatSize(bytes) {
  if (bytes >= 1024 ** 3) {
    const gb = bytes / 1024 ** 3;
    return `${gb.toLocaleString("pl-PL", { maximumFractionDigits: 1 })} GB`;
  }
  return `${Math.max(1, Math.round(bytes / 1024 ** 2))} MB`;
}

function showReleases(releases) {
  const published = releases.filter((release) => !release.draft);
  const latest =
    published.find((release) => !release.prerelease) || published[0];

  if (latest) {
    const version = latest.name.replace(/^Gadopis\s*/i, "");
    const date = new Date(latest.published).toLocaleDateString("pl-PL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const releaseEl = document.querySelector("[data-release]");
    if (releaseEl) releaseEl.textContent = `Wersja ${version} · ${date}`;
    for (const el of document.querySelectorAll("[data-size]")) {
      const asset = latest.assets.find((a) => a.name === el.dataset.size);
      if (asset) el.textContent = formatSize(asset.size);
    }
  }

  const total = published
    .flatMap((release) => release.assets)
    .filter((asset) => !asset.name.endsWith(".txt"))
    .reduce((sum, asset) => sum + asset.count, HIDDEN_DOWNLOADS);
  const counterEl = document.querySelector("[data-counter]");
  if (!counterEl) return;
  counterEl.textContent = "";
  if (total >= MIN_COUNT) {
    const number = document.createElement("strong");
    number.textContent = total.toLocaleString("pl-PL");
    counterEl.append("Pobrano już ", number, total === 1 ? " raz" : " razy");
  } else {
    counterEl.textContent = "Świeża beta: bądź jednym z pierwszych";
  }
  counterEl.hidden = false;
}

loadReleases()
  .then(showReleases)
  .catch(() => {
    // Offline or rate-limited: the page works without the numbers.
  });

// ---------- dictation demo ----------

const SENTENCES = [
  "Cześć Kasiu, przesuwamy spotkanie na czwartek na 15:00. Plan wyślę Ci wieczorem.",
  "Proszę o fakturę na firmę i potwierdzenie terminu dostawy.",
  "Zażółć gęślą jaźń. Polskie znaki wychodzą bez poprawiania.",
];

function wordsLabel(n) {
  const lastTwo = n % 100;
  const last = n % 10;
  if (n === 1) return "słowo";
  if (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)) return "słowa";
  return "słów";
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function startDemo() {
  const pill = document.querySelector("[data-demo-pill]");
  const label = document.querySelector("[data-demo-label]");
  const side = document.querySelector("[data-demo-side]");
  const text = document.querySelector("[data-demo-text]");
  const body = text && text.closest(".note-body");
  if (!pill || !label || !side || !text || !body) return;
  const bars = [...pill.querySelectorAll(".pill-bars i")];

  const setState = (state) => {
    pill.dataset.state = state;
  };

  const paste = (sentence) => {
    const span = document.createElement("span");
    span.className = "pasted";
    span.textContent = (text.textContent ? " " : "") + sentence;
    text.append(span);
    setTimeout(() => span.classList.add("settled"), 900);
  };

  if (reducedMotion) {
    paste(SENTENCES[0]);
    setState("done");
    const n = SENTENCES[0].split(/\s+/).length;
    label.textContent = `Wklejono ${n} ${wordsLabel(n)}`;
    side.textContent = "Ctrl+Z";
    return;
  }

  let levelTimer = 0;
  const animateBars = (on) => {
    clearInterval(levelTimer);
    if (!on) return;
    levelTimer = setInterval(() => {
      bars.forEach((bar, i) => {
        // Louder in the middle, like the app's mirrored levels.
        const centre = 1 - Math.abs(i - (bars.length - 1) / 2) / bars.length;
        const h = 2 + Math.round(Math.random() * 20 * (0.35 + centre * 0.65));
        bar.style.setProperty("--h", `${h}px`);
      });
    }, 120);
  };

  const run = async () => {
    for (let i = 0; ; i = (i + 1) % SENTENCES.length) {
      const sentence = SENTENCES[i];
      const words = sentence.split(/\s+/).length;

      setState("recording");
      animateBars(true);
      for (let s = 0; s <= 3; s++) {
        side.textContent = `0:0${s}`;
        await sleep(s === 3 ? 400 : 1000);
      }
      animateBars(false);

      label.textContent = "Zapisuję…";
      side.textContent = "lokalnie";
      setState("working");
      await sleep(1100);

      paste(sentence);
      label.textContent = `Wklejono ${words} ${wordsLabel(words)}`;
      side.textContent = "Ctrl+Z";
      setState("done");
      await sleep(2200);

      setState("idle");
      await sleep(1800);
      if (i === SENTENCES.length - 1 || text.textContent.length > 120) {
        body.classList.add("clearing");
        await sleep(450);
        text.textContent = "";
        body.classList.remove("clearing");
        await sleep(500);
      }
    }
  };
  run();
}

startDemo();

// ---------- F8 animation ----------

// The loop plays only while it is on screen. For reduced motion it starts
// paused on its poster, and the button plays it.
function startFilm() {
  const video = document.querySelector("[data-film]");
  const toggle = document.querySelector("[data-film-toggle]");
  if (!video || !toggle) return;

  // Without JavaScript the browser's own controls stay.
  video.controls = false;
  toggle.hidden = false;

  let wanted = !reducedMotion;
  let visible = false;

  const update = () => {
    if (wanted && visible) {
      video.play().catch(() => {
        // Autoplay can be blocked (e.g. iOS Low Power Mode); the button plays it.
      });
    } else {
      video.pause();
    }
  };

  const showState = () => {
    const playing = !video.paused;
    toggle.dataset.state = playing ? "playing" : "paused";
    toggle.setAttribute(
      "aria-label",
      playing ? "Zatrzymaj animację" : "Odtwórz animację",
    );
  };
  video.addEventListener("play", showState);
  video.addEventListener("pause", showState);
  showState();

  toggle.addEventListener("click", () => {
    wanted = video.paused;
    update();
  });

  new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      update();
    },
    { rootMargin: "200px 0px" },
  ).observe(video);
}

startFilm();
