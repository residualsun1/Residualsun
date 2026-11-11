(() => {
  const footnotes = document.querySelector("#single > .content > .footnotes");
  if (!footnotes) return;

  // Keep Hugo's original notes and anchors intact at every viewport width.
  const notes = [...footnotes.querySelectorAll(":scope > ol > li")].map(note => {
    const hash = note.querySelector("a.footnote-backref")?.hash;
    const ref = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
    return { note, ref };
  });
  if (!notes.length || notes.some(({ ref }) => !ref)) return;

  const desktop = matchMedia("(min-width: 1281px)");
  footnotes.classList.add("footnotes-in-margin");

  function layout() {
    if (!desktop.matches) return;
    const origin = footnotes.getBoundingClientRect().top;
    let bottom = -Infinity;

    for (const { note, ref } of notes) {
      const top = Math.max(ref.getBoundingClientRect().top - origin, bottom + 16);
      note.style.setProperty("--sidenote-top", `${top}px`);
      bottom = top + note.offsetHeight;
    }

    // Long notes can extend past the text; keep their last line above comments.
    footnotes.style.setProperty("--sidenote-space", `${Math.max(0, bottom)}px`);
  }

  const observer = new ResizeObserver(layout);
  observer.observe(footnotes.parentElement);
  notes.forEach(({ note }) => observer.observe(note));
  desktop.addEventListener("change", layout);
  document.fonts?.ready.then(layout);
  layout();
})();
