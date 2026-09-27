const menu = document.querySelector(".menu");
const nav = document.querySelector(".nav");
menu?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  menu?.setAttribute("aria-expanded","false");
}));

document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("partner-form-el");
const status = document.getElementById("form-status");
const getData = () => Object.fromEntries(new FormData(form).entries());

function buildMessage(d) {
  return `Eco Solutions Investor / Partner Enquiry

Name: ${d.name}
Organisation: ${d.organisation || "Not provided"}
Email: ${d.email}
Phone / WhatsApp: ${d.phone}
Area of interest: ${d.interest}

Message:
${d.message}`;
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const d = getData();
  const subject = encodeURIComponent("Eco Solutions Investor / Partner Enquiry");
  const body = encodeURIComponent(buildMessage(d));
  window.location.href = `mailto:projects@lifefoundation.co.ls?subject=${subject}&body=${body}`;
  status.textContent = "Your email application should now open in your email client.";
});

document.getElementById("whatsapp-form")?.addEventListener("click", () => {
  if (!form.reportValidity()) return;
  const d = getData();
  const message = encodeURIComponent(buildMessage(d));
  const first = window.open(`https://wa.me/26662004222?text=${message}`, "_blank");
  const second = window.open(`https://wa.me/26657428997?text=${message}`, "_blank");
  status.textContent = (!first || !second)
    ? "Your browser may have blocked one WhatsApp window. Use the two floating/contact buttons if needed."
    : "WhatsApp chats opened with your enquiry prepared. Please review and press Send.";
});
