  const out = document.getElementById("output");
    function addStep(text, arr, highlight = [], sortedUpTo = -1) {
      const step = document.createElement("div");
      step.className = "step";
      const desc = document.createElement("div");
      desc.className = "desc";
      desc.textContent = text;
      step.appendChild(desc);
      const row = document.createElement("div");
      row.className = "row";
      const open = document.createElement("span");
      open.className = "br";
      open.textContent = "["; 
      row.appendChild(open);
      arr.forEach((v, idx) => {
        const box = document.createElement("div");
        box.className = "box";
        if (highlight.includes(idx)) box.classList.add("cmp");
        else if (idx <= sortedUpTo) box.classList.add("sorted");
        box.textContent = v;
        row.appendChild(box);
      });
      const close = document.createElement("span");
      close.className = "br";
      close.textContent = "]";
      row.appendChild(close);
      step.appendChild(row);
      out.appendChild(step);
    }
    function insertionSort(arr) {
      let compareCount = 0;
      addStep("المصفوفة الأصلية (حسب الإدخال)", arr, [], 0);
      for (let i = 1; i < arr.length; i++) {
        const key = arr[i];
        addStep(`الجولة ${i}: العنصر ${key} سيُقارن بالعناصر التي قبله`, arr, [i], i - 1);
        let j = i;
        while (j > 0) {
          const prev = arr[j - 1];
          compareCount++;
          if (prev < arr[j]) {
            [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
            addStep(
              `مقارنة ${compareCount}: ${key} مع ${prev} ← ${key} أكبر، يتقدم للأمام`,
              arr, [j - 1, j], i
            );
            j--;
          } else {
            addStep(
              `مقارنة ${compareCount}: ${key} مع ${prev} ← ${key} أصغر أو يساويه، مكانه صحيح`,
              arr, [j - 1, j], i
            );
            break;
          }
        }
      }
      return compareCount;
    }
    function run() {
      out.innerHTML = "";
      const input = document.getElementById("years").value;
      const years = input
        .split(/[\s,،]+/)
        .filter(s => s !== "")
        .map(Number);
      if (years.length === 0 || years.some(isNaN)) {
        out.textContent = "من فضلك أدخل أرقاماً صحيحة فقط.";
        return;
      }
      const comparisons = insertionSort(years);
      addStep(`النتيجة النهائية (من الأكبر للأصغر) — عدد المقارنات: ${comparisons}`, years, [], years.length - 1);
    }