// Highlight the active nav link
(function () {
  const path = window.location.pathname.split("/").pop() || "index.html";
  const hash = window.location.hash;
  const links = document.querySelectorAll(".nav-link");

  links.forEach((link) => {
    const target = link.getAttribute("data-nav");
    let isActive = false;

    if (target === "about") {
      isActive = (path === "" || path === "index.html") && hash === "#about";
    } else if (target === "services") {
      isActive = path === "services.html";
    } else if (target === "contact") {
      isActive = path === "contact.html";
    }

    link.classList.toggle("active", isActive);
  });
})();

// Contact form: build a mailto: link from the fields and open the visitor's email client
(function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("senderEmail");
  const phoneInput = document.getElementById("phone");
  const messageInput = document.getElementById("message");
  const errorEl = document.getElementById("form-error");
  const statusOkEl = document.getElementById("form-status-ok");
  const statusFailEl = document.getElementById("form-status-fail");
  const sendButton = document.getElementById("send-button");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const senderEmail = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const message = messageInput.value.trim();

    errorEl.hidden = true;
    statusOkEl.hidden = true;
    statusFailEl.hidden = true;

    if (!senderEmail && !phone) {
      errorEl.textContent = "Please provide at least an email or a phone number.";
      errorEl.hidden = false;
      return;
    }

    const bodyLines = [
      `Name: ${name || "Website Visitor"}`,
      `Email: ${senderEmail || "N/A"}`,
      `Phone: ${phone || "N/A"}`,
      "",
      message || "",
    ];

    const mailto =
      "mailto:Info@thp215.com" +
      "?subject=" + encodeURIComponent(`New inquiry from ${name || "Website Visitor"}`) +
      "&body=" + encodeURIComponent(bodyLines.join("\n"));

    try {
      window.location.href = mailto;
      statusOkEl.hidden = false;
    } catch (err) {
      statusFailEl.hidden = false;
    }
  });
})();
