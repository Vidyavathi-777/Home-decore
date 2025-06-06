document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navbar = document.getElementById("navbar");
  const userIcon = document.getElementById("user-icon");
  const userDropdown = document.getElementById("user-dropdown");

  let isLoggedIn = !!localStorage.getItem("token");
  let username = localStorage.getItem("name") || "JohnDoe";

  hamburger.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });

  function updateUserMenu() {
    userDropdown.innerHTML = "";

    if (isLoggedIn) {
      const usernameDisplay = document.createElement("div");
      usernameDisplay.className = "username-display";
      usernameDisplay.innerHTML = `<i class="fa-solid fa-circle-user"></i>${username}`;
      userDropdown.appendChild(usernameDisplay);

      const divider = document.createElement("hr");
      userDropdown.appendChild(divider);

      const logoutLink = document.createElement("a");
      logoutLink.href = "#";
      logoutLink.innerHTML =
        '<i class="fa-solid fa-right-from-bracket"></i>Logout';
      logoutLink.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        sessionStorage.clear();

        isLoggedIn = false;
        updateUserMenu();
        userDropdown.classList.add("hidden");
        alert("You have been logged out");

        window.location.href = "/index.html";
      });
      userDropdown.appendChild(logoutLink);
    } else {
      const loginLink = document.createElement("a");
      loginLink.href = "/login.html";
      loginLink.innerHTML =
        '<i class="fa-solid fa-right-to-bracket"></i>Login';
      userDropdown.appendChild(loginLink);

      const registerLink = document.createElement("a");
      registerLink.href = "/register.html";
      registerLink.innerHTML =
        '<i class="fa-solid fa-user-plus"></i>Register';
      userDropdown.appendChild(registerLink);
    }
  }
  updateUserMenu();

  userIcon.addEventListener("click", function () {
    updateUserMenu();
    userDropdown.classList.toggle("hidden");
  });

  document.addEventListener("click", function (event) {
    if (
      !userDropdown.contains(event.target) &&
      event.target !== userIcon
    ) {
      userDropdown.classList.add("hidden");
    }
  });

  updateUserMenu();
});
const imageMap = {
    "1":"https://cdn.shopify.com/s/files/1/0438/1069/files/Laurel_Bed_Low_Footboard_Oat_Maple_5.jpg?v=1715117126?format=webp&width=600",
    "2":"https://cdn.shopify.com/s/files/1/0438/1069/products/Prisha_Linen_Pillow_Charcoal_Grey_7.jpg?v=1743087098?format=webp&width=600",
    "3":"https://audocph.com/cdn/shop/products/MENU_Brasilia_Lounge_Chair_Brasilia_Ottoman_Houkime_Rug_bfe1701e-559d-4e81-b1f2-8e8fdbed4ff5.jpg?v=1630946307",
    "4":"https://m.media-amazon.com/images/I/51RmY1GpWsL._SR480,440_.jpg",
    "5":"https://audocph.com/cdn/shop/products/MENU_Offset_Sofa_Plinth_Grand_Plinth_Tall_Reverse_Table_Lamp_Triptych_Bowl.jpg?v=1679060428",
    "6":"https://audocph.com/cdn/shop/files/Audo_Tearoom_Club_Chair_Swivel_Androgyne_Side_Table_Reverse_Table_Lamp_Portable_1_cefb4595-c921-4dad-a474-09b09553e71e.jpg?v=1740735488&width=1500"
}

async function loadCategories() {
    try {
      const res = await fetch("https://home-decor-tqze.onrender.com/categories");
      const data = await res.json();
      console.log(data)

      const categoryList = document.querySelector(".category-list");
      categoryList.innerHTML = ""; 

      data.forEach(category => {
        const card = document.createElement("div");
        card.className = "category-card";

        const imageSrc = imageMap[category.id.toString()]

        card.innerHTML = `
          <img src="${imageSrc}" alt="${category.name}" width="400px" height="450px" />
          <div class="category-overlay">
            <h3>${category.name}</h3>
          </div>
        `;
        card.onclick = () =>{
            window.location.href = `/category.html?id=${category.id}`
          }

        categoryList.appendChild(card);
      });
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  }


  
 

  document.addEventListener("DOMContentLoaded", loadCategories);
