const filters = document.querySelectorAll(".filter");
const careers = document.querySelectorAll(".map-career");

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(item => item.classList.remove("active"));
    filter.classList.add("active");

    const selected = filter.dataset.filter;

    careers.forEach(career => {
      if (selected === "todos" || career.dataset.category.includes(selected)) {
        career.classList.remove("hide");
      } else {
        career.classList.add("hide");
      }
    });
  });
});
