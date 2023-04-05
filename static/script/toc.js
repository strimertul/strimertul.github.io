const toc = document.getElementById("TableOfContents");

const getHeaderId = (el) => {
  do {
    if (el.nodeName === "H1" || el.nodeName === "H2" || el.nodeName === "H3") {
      const id = el.getAttribute("id");
      if (id) {
        return id;
      }
    }
    el = el.previousElementSibling;
  } while (el);
};
if (toc) {
  if (toc.children.length < 1) {
    toc.parentElement.remove();
  } else {
    const observer = new IntersectionObserver((entries) => {
      const filtered = entries.filter(
        (i) => getHeaderId(i.target) && i.intersectionRatio > 0
      );
      if (filtered.length > 0) {
        toc
          .querySelectorAll(`li.active`)
          .forEach((entry) => entry.classList.remove("active"));

        filtered.forEach((entry) => {
          const id = getHeaderId(entry.target);
          toc
            .querySelector(`li a[href="#${id}"]`)
            .parentElement.classList.add("active");
        });
      }
    });

    // Track all sections that have an `id` applied
    document.querySelectorAll(".copy *").forEach((section) => {
      observer.observe(section);
    });
  }
}
