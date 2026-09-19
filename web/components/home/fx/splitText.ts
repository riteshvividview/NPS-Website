/**
 * Minimal text splitter (no SplitText plugin dependency). Walks the
 * element's text nodes — recursing into inline children like <em> and
 * skipping <br> — and wraps each word (and, for "chars", each character)
 * in spans so they can be animated individually. Each word is its own
 * nowrap inline-block so line wrapping still happens between words, not
 * mid-word. The original text is preserved for assistive tech in a
 * visually-hidden span, and the animated spans are aria-hidden.
 */
export function splitText(el: HTMLElement, mode: "chars" | "words"): HTMLElement[] {
  const original = el.textContent ?? "";
  const targets: HTMLElement[] = [];

  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent ?? "";
        if (!text.trim()) return;
        const frag = document.createDocumentFragment();
        text.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
            return;
          }
          const word = document.createElement("span");
          word.className = "fx-word";
          word.setAttribute("aria-hidden", "true");
          if (mode === "chars") {
            Array.from(part).forEach((ch) => {
              const c = document.createElement("span");
              c.className = "fx-char";
              c.textContent = ch;
              word.appendChild(c);
              targets.push(c);
            });
          } else {
            word.classList.add("fx-mask");
            const inner = document.createElement("span");
            inner.className = "fx-word-inner";
            inner.textContent = part;
            word.appendChild(inner);
            targets.push(inner);
          }
          frag.appendChild(word);
        });
        child.replaceWith(frag);
      } else if (
        child.nodeType === Node.ELEMENT_NODE &&
        (child as Element).tagName !== "BR"
      ) {
        walk(child);
      }
    });
  };

  walk(el);

  const sr = document.createElement("span");
  sr.className = "sr-only";
  sr.textContent = original;
  el.insertBefore(sr, el.firstChild);

  return targets;
}
