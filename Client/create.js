const addBtn = document.querySelector("#add-btn");
const jokeArea = document.querySelector("#dadJoke");

async function updateList() {
  try {
    const response = await fetch("http://localhost:3000/create", {
      method: "POST",
      body: JSON.stringify({
        Title: titleInput.value,
        description: descInput.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (response.ok) {
      fetchDataAndCreateList();
      ideaCounter();
    } else {
      // Handle error cases if needed
      console.error("Error adding idea:", response.statusText);
    }
  } catch (error) {
    console.error("Error adding idea:", error);
  }
}
//ADD BUTTON
addBtn.addEventListener("click", () => {
  updateList();
  location.reload();
});

const joker = async () => {
  const response = await fetch("https://api.chucknorris.io/jokes/random", {
    method: "GET",
    headers: {
      Accept: "text/plain",
    },
  });
  
  const data = await response.text();
  console.log(data);
  jokeArea.textContent = data;
};

const jokeButton = document.querySelector("#newJoke");

jokeButton.addEventListener("click", () => {
  joker();
});

joker();
