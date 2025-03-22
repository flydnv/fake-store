const section = document.querySelector(".products");
const pagination = document.querySelector("#pagination");
const recordPerPageSelection = document.querySelector("#recordPerPage");
let products = [];
let recordPerPage = 1;
let activePage = 1;
let totalPageCount = 0;
const showProducts = (start, end) => {
  section.innerHTML = "";
  products.slice(start, end).map((product) => {
    const box = document.createElement("div");
    box.classList.add("product");
    const image = document.createElement("img");
    image.setAttribute("src", product.image);
    const h3 = document.createElement("h3");
    h3.textContent = product.title;
    const h4 = document.createElement("h4");
    h4.textContent = `$${product.price}`;
    box.append(image, h3, h4);
    section.append(box);
  });
};

const generatePages = () => {
  pagination.innerHTML = "";
  let start = activePage - 3 > 0 ? activePage - 3 : 1;
  let end = activePage + 3;

  if (activePage > 1) {
    let prevPage = document.createElement("li");
    prevPage.setAttribute("id", "prev");
    prevPage.addEventListener("click", () => {
      activePage--;
      start = (activePage - 1) * recordPerPage;
      end = start + recordPerPage;
      generatePages();
      showProducts(start, end);
    });
    prevPage.textContent = "<<";
    pagination.append(prevPage);
  }

  for (let i = start; i <= end && i <= totalPageCount; i++) {
    const li = document.createElement("li");
    li.classList.add("pageNumb");
    li.textContent = i;
    pagination.append(li);
    li.addEventListener("click", () => {
      document.querySelector("li.active").classList.remove("active");
      li.classList.add("active");
      activePage = i;
      start = (activePage - 1) * recordPerPage;
      end = start + recordPerPage;
      showProducts(start, end);
      generatePages();
    });

    if (activePage === i) {
      li.classList.add("active");
    }
  }
  if (activePage < totalPageCount) {
    let nextPage = document.createElement("li");
    nextPage.setAttribute("id", "next");
    nextPage.textContent = ">>";
    pagination.append(nextPage);
    nextPage.addEventListener("click", () => {
      activePage++;
      start = (activePage - 1) * recordPerPage;
      end = start + recordPerPage;
      generatePages();
      showProducts(start, end);
    });
  }
};

const getProducts = async () => {
  products = await fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      totalPageCount = Math.ceil(data.length / recordPerPage);
      if (activePage > totalPageCount) {
        activePage = totalPageCount;
      }
      generatePages();
      // console.log('bu emeliyyat 1.dir');
      return data;
    });
};
getProducts().then(() => {
  start = (activePage - 1) * recordPerPage;
  end = start + recordPerPage;
  showProducts(start, end);
});

recordPerPageSelection.addEventListener("change", (e) => {
  recordPerPage = +e.target.value;
  getProducts().then(() => {
    start = (activePage - 1) * recordPerPage;
    end = start + recordPerPage;
    showProducts(start, end);
  });
});
