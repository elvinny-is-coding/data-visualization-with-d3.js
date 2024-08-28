function toggleSidebar() {
  var sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
  if (!sidebar.classList.contains("active")) {
    setTimeout(() => {
      sidebar.style.display = "none";
    }, 300);
  } else {
    sidebar.style.display = "block";
  }
}

function closeSidebar(event) {
  var sidebar = document.getElementById("sidebar");
  if (sidebar.classList.contains("active") && !sidebar.contains(event.target)) {
    sidebar.classList.remove("active");
    setTimeout(() => {
      sidebar.style.display = "none";
    }, 300);
  }
}

function toggleAccordion(element) {
  var content = element.nextElementSibling;
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    closeAllAccordions();
    content.style.maxHeight = content.scrollHeight + "px";
  }
}

function closeAllAccordions() {
  var contents = document.querySelectorAll(".accordion-content");
  contents.forEach(function (content) {
    content.style.maxHeight = null;
  });
}
