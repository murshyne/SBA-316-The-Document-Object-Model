const log = console.log.bind(console);

// --------------Form--------------------
// Select =s the html form by ID and prevents form default submission
document.getElementById("nameform")
  .addEventListener("submit", function (event) {
    event.preventDefault(); 

// Collects user name and appending it to a custome welcome message
    const userName = document.getElementById("nameInput").value;
    const welcomeMessage = document.getElementById("welcome-message");
    const overlay = document.getElementById("overlay");

 // Removes Overlay after user form input and Displays the welcome message
    if (userName) {
      welcomeMessage.textContent = `${userName}, welcome to RTT-43 Restaurant!`;
      welcomeMessage.style.display = "block";
      overlay.style.display = "none";
    }
  });

//-----Navbar-----Menu & SubMenu links-----structure-----
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

// Set Main El background color with CSS variable and centering class content with flexbox
mainEl.style.backgroundColor = "var(--main-bg)";
mainEl.innerHTML = "";
mainEl.classList.add("flex-ctr");

// Create main menu, set height, background color and using flexbox to even link space
let topMenuEl = document.getElementById("top-menu");
topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
topMenuEl.classList.add("flex-around");

// create and add menu links to topmenu 
menuLinks.forEach((link) => {
  let newLink = document.createElement("a");
  newLink.setAttribute("href", link.href);
  newLink.textContent = link.text;
  topMenuEl.appendChild(newLink);
});

// ----------SubMenu NavBar----------

let subMenuEl = document.getElementById("sub-menu");

// Set SubMenu El background color with CSS variable and set height, background color and using flexbox to even link space and centering class content.
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
subMenuEl.classList.add("flex-around");
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";

// Get all top menu links for interaction handling
let topMenuLinks = topMenuEl.querySelectorAll("a");

// Add an event listener to the top menu for click events and prevents default behaviour.
topMenuEl.addEventListener("click", function (event) {
  event.preventDefault();

  // Exit if the clicked target is not an anchor
  if (event.target.tagName !== "A") {
    return;
  }

  // // Finds the link object and gets the clicked link in the menuLinks array to see if link is already active.
  let clickedLinkText = event.target.textContent.trim();
  let clickedLink = menuLinks.find((link) => link.text === clickedLinkText);
  let isActive = event.target.classList.contains("active");

  // Remove the active class from all top menu links clear any existing submenu content
  topMenuLinks.forEach((link) => link.classList.remove("active"));
  subMenuEl.innerHTML = "";

  // Remove active class if the link was already active add active class to the clicked link
  if (isActive) {
    event.target.classList.remove("active");
    subMenuEl.style.top = "0";
  } else {
    event.target.classList.add("active");

    // Check if the clicked link has sub-links, create a new sub-link, set the link & text for the sub-link and append it below the Submenu.
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

// Add an event listener to the submenu for click events, prevents the default behaviour and exit id the clicked area is not a link
subMenuEl.addEventListener("click", function (event) {
  event.preventDefault();
  if (event.target.tagName !== "A") {
    return;
  }
  subMenuEl.style.top = "0";
  topMenuLinks.forEach((link) => link.classList.remove("active"));
});



