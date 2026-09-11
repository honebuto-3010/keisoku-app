// ===============================
// 汎用：入力 → 結果表示
// ===============================
function bindInputConverter(inputId, resultId, formula) {
    const input = document.getElementById(inputId);
    const result = document.getElementById(resultId);

    if (!input || !result) return;

    input.addEventListener("input", () => {
        if (input.value === "") {
            result.textContent = "";
            return;
        }
        result.textContent = formula(Number(input.value));
    });
}

// ===============================
// 3. 長さ（cm → m / inch / yard）
// ===============================
const cmInput = document.getElementById("cmInput");
const cmMode = document.getElementById("cmMode");
const cmResult = document.getElementById("cmResult");

function convertCm() {
    const v = Number(cmInput.value);
    if (!v) {
        cmResult.textContent = "";
        return;
    }

    let result = "";

    switch (cmMode.value) {
        case "m":
            result = (v / 100).toFixed(2) + " m";
            break;

        case "inch":
            result = (v / 2.54).toFixed(2) + " inch";
            break;

        case "yard":
            result = (v / 91.44).toFixed(3) + " yd";
            break;
    }

    cmResult.textContent = result;
}

cmInput.addEventListener("input", convertCm);
cmMode.addEventListener("change", convertCm);

// ===============================
// 1. 重さ（g → kg）
// ===============================
const gInput = document.getElementById("gInput");
const gResult = document.getElementById("gResult");

function convertGram() {
    const v = Number(gInput.value);
    if (!v) {
        gResult.textContent = "";
        return;
    }
    gResult.textContent = (v / 1000).toFixed(3) + " kg";
}

gInput.addEventListener("input", convertGram);


// ===============================
// 2. 容量（L → gal / bbl / lb）
// ===============================
const literInput = document.getElementById("literInput");
const literMode = document.getElementById("literMode");
const literResult = document.getElementById("literResult");

function convertLiter() {
    const v = Number(literInput.value);
    if (!v) {
        literResult.textContent = "";
        return;
    }

    let result = "";

    switch (literMode.value) {
        case "gal":
            result = (v * 0.264172).toFixed(3) + " gal";
            break;

        case "bbl":
            result = (v / 158.987).toFixed(4) + " bbl";
            break;

        case "lb":
            // 水換算：1L ≒ 1kg → 1kg = 2.20462 lb
            result = (v * 2.20462).toFixed(2) + " lb";
            break;
    }

    literResult.textContent = result;
}

literInput.addEventListener("input", convertLiter);
literMode.addEventListener("change", convertLiter);

// ===============================
// 3. 温度（℃ → ℉）
// ===============================
bindInputConverter("cInput", "cResult", v => `${(v * 9/5 + 32).toFixed(1)} ℉`);


// ===============================
// 4. 用紙サイズ（選択 → 表示）
// ===============================
const paperSelect = document.getElementById("paperSelect");
const paperResult = document.getElementById("paperResult");

paperSelect.addEventListener("change", () => {
    paperResult.textContent = paperSelect.value;
});


// ===============================
// 5. 封筒サイズ（選択 → 表示）
// ===============================
const envelopeSelect = document.getElementById("envelopeSelect");
const envelopeResult = document.getElementById("envelopeResult");

envelopeSelect.addEventListener("change", () => {
    envelopeResult.textContent = envelopeSelect.value;
});


// ===============================
// 6. 本のサイズ（選択 → 表示）
// ===============================
const bookSelect = document.getElementById("bookSelect");
const bookResult = document.getElementById("bookResult");

bookSelect.addEventListener("change", () => {
    bookResult.textContent = bookSelect.value;
});


// ===============================
// 7. 写真サイズ（選択 → 表示）
// ===============================
const photoSelect = document.getElementById("photoSelect");
const photoResult = document.getElementById("photoResult");

photoSelect.addEventListener("change", () => {
    photoResult.textContent = photoSelect.value;
});


// ===============================
// 8. 靴のサイズ（cm → inch）
// ===============================
bindInputConverter("shoeInput", "shoeResult", v => `${(v / 2.54).toFixed(2)} inch`);


// ===============================
// 9. 画面サイズ（inch → mm）
// ===============================
bindInputConverter("screenInput", "screenResult", v => `${(v * 25.4).toFixed(1)} mm`);


// ===============================
// 10. 郵便料金（封筒サイズ → 料金）
// ===============================
const postSelect = document.getElementById("postSelect");
const postResult = document.getElementById("postResult");

const postFee = {
    "長形3号": "84円（定形）",
    "長形4号": "84円（定形）",
    "角形2号": "120円〜（定形外）",
    "洋形2号": "84円（定形）"
};

postSelect.addEventListener("change", () => {
    const key = postSelect.value;
    postResult.textContent = key ? postFee[key] : "";
});

document.querySelectorAll(".unit-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
        const content = btn.nextElementSibling;
        content.style.display = content.style.display === "block" ? "none" : "block";
    });
});
// ★ 巨大シャボン玉を増やす（5〜7個）
const area = document.querySelector('.bubble-area');
const bubbleCount = 6; // ←ここで数を調整できる

for (let i = 0; i < bubbleCount; i++) {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');

  // ★ 超巨大サイズ（400〜600px）
  const size = Math.random() * 250 + 125; // 60〜180px
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;

  // ランダム位置（左右）
  bubble.style.left = `${Math.random() * 80}%`;

  // ゆっくりめの速度
  bubble.style.animationDuration = `${24 + Math.random() * 14}s`;

  area.appendChild(bubble);
}
