let container;
let box;
let foodImage;
let btn;
let footer;
let foodName;
let description;
let price;
let buyCount = {};
let cartNumber = document.querySelector(".bill h2");
let cart = document.querySelector(".bill");
let ul = document.createElement("ul");
let li;
let p;
let span;
let singlePrice = {};
let cl;
let total = document.querySelector(".bill .total");
let totalPrice = document.querySelector(".bill .totalPrice");
totalPrice.innerText = 0;
let removeBtn;
let thumbnails = {};
fetch("data.json")
  .then((Response) => Response.json())
  .then((json) =>
    json.forEach(function (el) {
      buyCount[`${el["name"]}`] = 0;
      singlePrice[`${el["name"]}`] = `${el["price"].toFixed(2)}`;
      container = document.querySelector(".container");
      box = document.createElement("div");
      box.classList.add("box");
      foodImage = document.createElement("img");
      btn = document.createElement("button");
      btn.classList.add("add");
      btn.innerHTML =
        "<img src=assets/images/icon-add-to-cart.svg />add to cart";
      footer = document.createElement("div");
      footer.classList.add("footer");
      foodName = document.createElement("span");
      description = document.createElement("p");
      price = document.createElement("span");

      box.append(foodName);
      if (window.innerWidth >= 600) foodImage.src = el["image"]["desktop"];
      if (window.innerWidth < 600) foodImage.src = el["image"]["mobile"];
      thumbnails[`${el["name"]}`] = el["image"]["thumbnail"];
      foodName.textContent = el["category"];
      description.textContent = el["name"];
      btn.classList.add(el["name"].replaceAll(" ", ""));
      price.textContent = `$${el["price"].toFixed(2)}`;
      footer.append(btn, foodName, description, price);
      box.append(foodImage, footer);
      container.append(box);
    })
  );

total.style.display = "none";
let Count = 0;
document.addEventListener("click", function (el) {
  if (el.target.classList.contains("add")) {
    Count++;
    let name = el.target.nextSibling.nextSibling.innerText;
    let div = document.createElement("div");
    el.target
      .closest(".box")
      .querySelector(
        "img"
      ).style.cssText += `border:2px solid hsl(14, 86%, 42%)`;
    el.target.innerHTML = `<span class=increase
        style="
          width: 10px;
          height: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-size: cover;
          border-width: 1px;
          border-style: solid;
          border-color: white;
          border-radius: 50%;
          padding: 7px;pointer-events: auto;
        "
      >
        <img src="assets/images/icon-increment-quantity.svg" style=pointer-event:none />
      </span>
      <span class=counter>1</span>
      <span class = decrease
        style="
          width: 10px;
          height: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-size: cover;
          border-width: 1px;
          border-style: solid;
          border-color: white;
          border-radius: 50%;
          padding: 7px;pointer-events: auto;
        "
      >
        <img src="assets/images/icon-decrement-quantity.svg" style=pointer-event:none />
      </span>`;
    cart.querySelector(".image").style.display = "none";
    cart.querySelector(".par").style.display = "none";
    total.style.display = "block";
    ul.style.display = "block";

    li = document.createElement("li");
    p = document.createElement("p");

    p.append(name);
    buyCount[name]++;

    Sprice = document.createElement("span");
    Sprice.innerText = `@$${singlePrice[name]}`;
    Mprice = document.createElement("span");
    Mprice.classList.add("mprice");
    Mprice.innerText = `$${(singlePrice[name] * buyCount[name]).toFixed(2)}`;

    removeBtn = document.createElement("img");
    removeBtn.classList.add("remove");
    removeBtn.src = "assets/images/icon-remove-item.svg";
    removeBtn.style.cssText =
      "border: 1px solid black;border-radius: 50%;padding: 1px;";

    totalPrice.innerText = (
      parseFloat(totalPrice.innerText) +
      parseFloat(Sprice.innerText.replace("@$", ""))
    ).toFixed(2);

    span = document.createElement("span");
    span.innerText = `x1`;
    cl = name.replaceAll(" ", "");
    span.classList.add(cl);

    div.append(p, span, Sprice, Mprice);
    li.append(div);
    removeBtn.setAttribute("name", cl);
    li.append(removeBtn);
    ul.append(li);

    cartNumber.after(ul);
    el.target.style.cssText =
      "pointer-events: none;;background-color:hsl(14, 86%, 42%);justify-content:space-between;color:white";
    el.preventDefault();
  }

  //remove btn
  if (el.target.classList.contains("remove")) {
    buyCount[el.target.previousSibling.querySelector("p").innerText] = 0;
    let z = document.querySelector(`.box .${el.target.getAttribute("name")}`)
      .nextSibling.nextSibling.innerText;
    const btn = document.querySelector(
      `.footer .${el.target.getAttribute("name")}`
    );
    btn.closest(".box").querySelector("img").style.cssText += `border:none`;
    btn.innerHTML = "<img src=assets/images/icon-add-to-cart.svg />add to cart";
    btn.style.cssText = "background-color:white,color:black";

    totalPrice.innerText = (
      parseFloat(totalPrice.innerText) -
      parseFloat(singlePrice[z]) *
        parseFloat(
          document
            .querySelector(`.bill .${el.target.getAttribute("name")}`)
            .innerText.replace("x", "")
        )
    ).toFixed(2);

    Count -= document
      .querySelector(`.bill .${el.target.getAttribute("name")}`)
      .innerText.replace("x", "");
    document
      .querySelector(`.bill .${el.target.getAttribute("name")}`)
      .parentElement.parentElement.remove();
    cartNumber.innerText = `Your Cart (${Count})`;
    if (Count == 0) {
      cart.querySelector(".image").style.display = "block";
      ul.style.display = "none";
      cart.querySelector(".par").style.display = "block";
      total.style.display = "none";
    }
  }

  let s = el.target.closest(".box").querySelector(".counter");
  let z = el.target.closest(".footer").querySelector("p");
  let elem = document.querySelector(`.bill .${z.innerText.replaceAll(" ", "")}`)
    .nextSibling.nextSibling;

  if (el.target.classList.contains("increase")) {
    cart.querySelector(".image").style.display = "none";
    ul.style.display = "block";
    cart.querySelector(".par").style.display = "none";
    const item = el.target.closest(".box");
    const counter = item.querySelector(".counter");

    counter.innerText = parseInt(counter.innerText) + 1;
    Count++;
    buyCount[z.innerText]++;
    elem.innerText = `$${(
      singlePrice[z.innerText] * buyCount[z.innerText]
    ).toFixed(2)}`;

    totalPrice.innerText = (
      parseFloat(totalPrice.innerText) + parseFloat(singlePrice[z.innerText])
    ).toFixed(2);

    document.querySelector(
      `.bill .${z.innerText.replaceAll(" ", "")}`
    ).innerText = `x${buyCount[z.innerText]}`;
  }

  if (el.target.classList.contains("decrease") && s.innerText == 1) {
    const btn = el.target.closest(".add");
    btn.innerHTML = "<img src=assets/images/icon-add-to-cart.svg />add to cart";
    btn.style.cssText = "background-color:white,color:black";
    btn.closest(".box").querySelector("img").style.cssText += `border:none`;

    document
      .querySelector(`.bill .${z.innerText.replaceAll(" ", "")}`)
      .parentElement.parentElement.remove();
    Count--;
    buyCount[z.innerText]--;
    totalPrice.innerText = (
      parseFloat(totalPrice.innerText) - parseFloat(singlePrice[z.innerText])
    ).toFixed(2);
  }

  if (el.target.classList.contains("decrease") && s.innerText > 1) {
    cart.querySelector(".image").style.display = "none";
    ul.style.display = "block";
    cart.querySelector(".par").style.display = "none";
    const item = el.target.closest(".box");
    const counter = item.querySelector(".counter");
    counter.innerText = parseInt(counter.innerText) - 1;
    Count--;
    buyCount[z.innerText]--;

    let current = parseFloat(elem.innerText.replace("$", ""));
    let subtract = parseFloat(singlePrice[z.innerText]);

    elem.innerText = `$${(current - subtract).toFixed(2)}`;

    totalPrice.innerText = (
      parseFloat(totalPrice.innerText) - parseFloat(singlePrice[z.innerText])
    ).toFixed(2);

    document.querySelector(
      `.bill .${z.innerText.replaceAll(" ", "")}`
    ).innerText = `x${buyCount[z.innerText]}`;
  }
  if (Count == 0) {
    cart.querySelector(".image").style.display = "block";
    ul.style.display = "none";
    cart.querySelector(".par").style.display = "block";
    total.style.display = "none";
  }

  cartNumber.innerText = `Your Cart (${Count})`;
});

document.addEventListener("click", function (el) {
  if (el.target.classList.contains("confirm")) {
    const confirmBox = document.createElement("div");
    confirmBox.innerHTML = `<img src="assets/images/icon-order-confirmed.svg" />
        <h2 style="margin: 10px 0; font-size: 1.5rem;">Order Confirmed</h2>
        <span style="color: gray;">We hope you enjoy your food!</span>`;
    confirmBox.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
        width: 400px;
        max-width: 95%;
        margin: 100px auto;
        z-index: 9999;
        position: relative;
      "`;
    ul.childNodes.forEach(function (el) {
      const [nameEl, countEl, unitPriceEl, totalEl] = el.firstChild.children;
      confirmBox.innerHTML += `
      <div style=display:flex;justify-content:space-between;align-items:center>
        <div style="text-align: left; margin-top: 20px;">
          <img src="${thumbnails[nameEl.innerText]}"/> 
            <div>
              <p style=margin:0>${nameEl.innerHTML}</p>
              <span>${countEl.innerHTML}</span>
              <span>${unitPriceEl.innerHTML}</span>
            </div>
        </div>
        <span>${totalEl.innerText}</span>
      </div>
    `;
    });
    confirmBox.innerHTML += `  <div style="display: flex; justify-content: space-between; margin-top: 20px; font-weight: bold;">
          <span>Order Total</span>
          <span>$${totalPrice.innerText}</span>
        </div>
          <button 
        ">Start New Order</button>`;
    confirmBox.classList.add("confirmBox");

    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9998;
    `;
    overlay.append(confirmBox);

    document.body.append(overlay);
    if (confirmBox.offsetHeight > 533)
      confirmBox.style.cssText += `height:500px;overflow-y:auto`;

    confirmBox.querySelector("button").addEventListener("click", function () {
      location.reload();
    });
  }
});
