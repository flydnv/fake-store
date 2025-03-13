const section = document.querySelector(".products");

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((products) => {
    products.map((product) => {
      const box = document.createElement("div");
      box.classList.add("product");
      const image = document.createElement("img");
      console.log(product);
      image.setAttribute("src", product.image);
      const h3 = document.createElement("h3");
      h3.textContent = product.title;
      const h4 = document.createElement("h4");
      h4.textContent = `$${product.price}`;

      box.append(image, h3,h4);
      section.append(box);
    });
  });
