document.addEventListener("DOMContentLoaded", () => {
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});
document.querySelectorAll(".nav-link").forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  }
});
window.addEventListener("scroll", () => {
  document.querySelector(".navbar")
    .classList.toggle("navbar-scrolled", window.scrollY > 50);
});
