// Funzione per ottenere i dati dai libro dall'endpoint e creare le card
async function getBooks() {
  try {
    const response = await fetch("https://striveschool-api.herokuapp.com/books");
    const data = await response.json();

    const bookRow = document.getElementById("bookRow");

    data.forEach((book) => {
      const col = document.createElement("div");
      col.classList.add("col", "mb-4");
      const card = document.createElement("div");
      card.classList.add("card");
      col.appendChild(card);
      bookRow.appendChild(col);

      const img = document.createElement("img");
      img.src = book.img;
      img.classList.add("card-img-top");
      card.appendChild(img);

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      card.appendChild(cardBody);

      const title = document.createElement("h5");
      title.classList.add("card-title");
      title.textContent = book.title;
      cardBody.appendChild(title);

      const price = document.createElement("p");
      price.classList.add("card-text");
      price.textContent = `Prezzo: ${book.price}`;
      cardBody.appendChild(price);

      const removeBtn = document.createElement("button");
      removeBtn.classList.add("btn", "btn-danger", "mt-3");
      removeBtn.textContent = "Scarta";
      removeBtn.addEventListener("click", () => {
        card.remove();
      });
      cardBody.appendChild(removeBtn);

      const addToCartBtn = document.createElement("button");
      addToCartBtn.classList.add("btn", "btn-primary", "mt-2", "me-2");
      addToCartBtn.textContent = "Aggiungi al carrello";
      addToCartBtn.addEventListener("click", () => {
        const cartList = document.getElementById("cartList");
        const cartItem = document.createElement("li");
        cartItem.textContent = book.title;
        cartList.appendChild(cartItem);
        saveToStorage(book);
      });
      cardBody.appendChild(addToCartBtn);
    });
  } catch (error) {
    console.error(error);
  }
}

// Funzione per salvare il libro nel carrello nello storage del browser
function saveToStorage(book) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(book);
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Funzione per caricare i libri dal carrello salvato nello storage
function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartList = document.getElementById("cartList");
  cart.forEach((book) => {
    const cartItem = document.createElement("li");
    cartItem.textContent = book.title;
    cartList.appendChild(cartItem);
  });
}

getBooks();
loadCart();
