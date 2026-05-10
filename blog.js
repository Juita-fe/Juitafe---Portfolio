// Blog filter
function filterBlog(category) {
  const cards = document.querySelectorAll(".blog-card-full");
  const btns = document.querySelectorAll(".filter-btn");

  btns.forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  cards.forEach((card) => {
    if (category === "all" || card.dataset.category === category) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
}
