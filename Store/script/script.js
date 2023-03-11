let imgs = document.querySelectorAll(".img img");
let addBtn = document.querySelectorAll(".addBtn");
let Mycart = document.querySelector(".add");
let total = document.querySelector(".total");
let ArrCont = [];

if (localStorage.getItem("ArrCont")) {
  ArrCont = JSON.parse(localStorage.getItem("ArrCont"));
  displayProuducts();
}

// when click on add products
addBtn.forEach(function (ele) {
  ele.onclick = function () {
    var product = {};
    let im = ele.parentElement.previousElementSibling.src;
    product.imgSrc = im;
    let pr = ele.previousElementSibling.textContent;
    product.price = pr;
    ArrCont.push(product);
    localStorage.setItem("ArrCont", JSON.stringify(ArrCont));
    displayProuducts();
  };
});

// this function display products in cart
function displayProuducts() {
  let blackBox = "";
  for (let i = 0; i < ArrCont.length; i++) {
    blackBox =
      blackBox +
      ` 
      <div class="items ind${i}">
        <div class="img">
            <img src="${ArrCont[i].imgSrc}" alt="">
        </div>
        <div class="price  pr${i}">${ArrCont[i].price}$</div>
        <div class="Quantity">
            <input type="number" class="num${i}" onchange="updateTotal(${i})" name="number" id="num">
            <span onclick="removeProduct(${i})" class="remove"> Remove</span>
        </div>
        </div>
        `;
  }
  Mycart.innerHTML = blackBox;
  TotalPrice();
}

// this function remove products
function removeProduct(index) {
  ArrCont.splice(index, 1);
  let items = document.querySelector(".ind" + index);
  items.style.cssText = `transform: translateX(100%) scale(0.3)`;
  setTimeout(() => {
    displayProuducts();
  }, 400);
  localStorage.setItem("ArrCont", JSON.stringify(ArrCont));
}

// this function update price of product on the change of its number
function updateTotal(index) {
  let numOf = document.querySelector(".num" + index).value;
  let newPr = document.querySelector(".pr" + index);
  let newPrice = ArrCont[index].price * parseInt(numOf);
  newPr.innerHTML = newPrice + "$";
}

// this function update total price of prouducts
function TotalPrice() {
  let count = 0;
  for (let i = 0; i < ArrCont.length; i++) {
    count = count + parseInt(ArrCont[i].price);
  }
  total.innerHTML = "Your Total Is " + count + "$";
}
