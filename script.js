const log = console.log.bind(console);
// Navbar Menu structure
var menuLinks = [
  { text: "about", href: "/about" },

  {
    text: "menu",
    href: "#",
    subLinks: [
      { text: "drink", href: "/menu/drink" },
      { text: "appetizers", href: "/menu/appetizers" },
      { text: "main course", href: "/menu/main course" },
      { text: "dessert", href: "/menu/dessert" },
    ],
  },
  {
    text: "online order",
    href: "#",
    subLinks: [
      { text: "new order", href: "/online order/new" },
      { text: "pending order", href: "/online order/pending" },
      { text: "order history", href: "/online order/history" },
    ],
  },
  {
    text: "account",
    href: "#",
    subLinks: [
      { text: "profile", href: "/account/profile" },
      { text: "sign in", href: "/account/signin" },
    ],
  },
];

let mainEl = document.querySelector("main");

mainEl.style.backgroundColor = "var(--main-bg)";

mainEl.innerHTML = "<h1> </h1>";

mainEl.classList.add("flex-ctr");

let topMenuEl = document.getElementById("top-menu");

topMenuEl.style.height = "100%";

topMenuEl.style.backgroundColor = "var(--top-menu-bg)";

topMenuEl.classList.add("flex-around");

menuLinks.forEach((link) => {
  let newLink = document.createElement("a");

  newLink.setAttribute("href", link.href);

  newLink.textContent = link.text;

  topMenuEl.appendChild(newLink);
});
// -------------------------------------------

let subMenuEl = document.getElementById("sub-menu");

subMenuEl.style.height = "100%";

subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";

subMenuEl.classList.add("flex-around");

subMenuEl.style.position = "absolute";

subMenuEl.style.top = "0";

let topMenuLinks = topMenuEl.querySelectorAll("a");

topMenuEl.addEventListener("click", function (event) {
  event.preventDefault();

  if (event.target.tagName !== "A") {
    return;
  }

  let clickedLinkText = event.target.textContent.trim();
  let clickedLink = menuLinks.find((link) => link.text === clickedLinkText);

  let isActive = event.target.classList.contains("active");

  topMenuLinks.forEach((link) => link.classList.remove("active"));

  subMenuEl.innerHTML = "";

  if (isActive) {
    event.target.classList.remove("active");

    subMenuEl.style.top = "0";
  } else {
    event.target.classList.add("active");

    if (
      clickedLink &&
      clickedLink.subLinks &&
      clickedLink.subLinks.length > 0
    ) {
      subMenuEl.innerHTML = "";

      clickedLink.subLinks.forEach((subLink) => {
        let subLinkElement = document.createElement("a");

        subLinkElement.setAttribute("href", subLink.href);

        subLinkElement.textContent = subLink.text;

        subMenuEl.appendChild(subLinkElement);
      });
      subMenuEl.style.top = "100%";
    } else {
      subMenuEl.style.top = "0";
    }
  }
});

subMenuEl.addEventListener("click", function (event) {
  event.preventDefault();

  if (event.target.tagName !== "A") {
    return;
  }
  subMenuEl.style.top = "0";

  topMenuLinks.forEach((link) => link.classList.remove("active"));
});
