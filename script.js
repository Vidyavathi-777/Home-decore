
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
