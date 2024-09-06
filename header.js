function injectHTML(filenames, elementId) {
  // Helper function to attempt fetching each file in sequence
  function tryNext(index) {
    if (index >= filenames.length) {
      console.error("No valid file found for", filenames);
      return;
    }

    const filePath = filenames[index];
    fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          // If the file isn't found, move to the next one
          throw new Error("File not found");
        }
        return response.text();
      })
      .then((data) => {
        document.getElementById(elementId).innerHTML = data;
        console.log("Loaded:", filePath);
      })
      .catch(() => {
        // Try the next file in the list
        tryNext(index + 1);
      });
  }

  // Start the chain of attempts with the first file
  tryNext(0);
}

// Example usage:
const fileOptions = ["Homepage/header.html", "header.html"];

injectHTML(fileOptions, "header");

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

document.addEventListener("DOMContentLoaded", () => {
  const labsList = document.getElementById("labs-list");
  const subLabsList = document.getElementById("sub-labs-list");

  const contentMap = {
    "lab-1": ["1.1", "1.2", "1.3"],
    "lab-2": ["2.1", "2.2", "2.3", "2.4"],
    "lab-3": ["3.1", "3.2"],
  };

  const updateSubLabs = (labKey) => {
    const content = contentMap[labKey] || [];

    subLabsList.innerHTML = "";
    content.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `Lab ${item}`;
      li.setAttribute("data-url", `/Data-Visualization/Lab${item}.html`); // Store URL in data attribute
      subLabsList.appendChild(li);
    });
  };

  labsList.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
      const contentKey = event.target.getAttribute("data-content");
      // Update the sub-labs list
      updateSubLabs(contentKey);
    }
  });

  subLabsList.addEventListener("click", (event) => {
    // Check if the click target is an <li> element
    if (event.target.tagName === "LI") {
      const url = event.target.getAttribute("data-url");
      if (url) {
        // Redirect to the URL stored in the data attribute
        window.location.href = url;
      }
    }
  });
});

if (
  window.location.hostname !== "localhost" &&
  window.location.hostname !== "127.0.0.1"
) {
  const base = document.createElement("base");
  base.href = "https://elvinny-is-coding.github.io/Data-Visualization/";
  document.head.appendChild(base);
}
