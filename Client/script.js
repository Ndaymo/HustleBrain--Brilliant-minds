const addBtn = document.querySelector('#add-btn');
const titleInput = document.querySelector('#titleInputArea');
const descInput = document.querySelector('#descInputArea');
const ideasContainer = document.querySelector("#ideas");
const errorMsg = document.getElementById('error');



async function getData() {
  const response = await fetch(`http://localhost:3000/`);
  const data = await response.json();
  return data;
}



async function updateList() {
try {
  const response = await fetch("http://localhost:3000/create", {
    method: "POST",
    body: JSON.stringify({
      Title: titleInput.value,
      description: descInput.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  });
  if (response.ok) {
    fetchDataAndCreateList();
    ideaCounter();
  } else {
    // Handle error cases if needed
    console.error('Error adding idea:', response.statusText);
  }
} catch (error) {
  console.error('Error adding idea:', error);
}
}

addBtn.addEventListener('click',()=>{
  updateList();
  location.reload();
}) ; 
  





// Fetching and showing the data
async function fetchDataAndCreateList() {
  try {
    const ideasData = await getData();
    console.log(ideasData);
if (ideasData!=0){
  createList(ideasData);
  deleteFunction();
} 
    
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

//List of all the ideas 

function createList(ideasData) {
  const ideasContainer = document.querySelector('#ideas');

  ideasData.forEach((idea) => {

    const ideaView = `<div class="individualIdea" data-idea-id="${idea.Idea_id}">
    <div class="inputsWrapper">
    <h2><span id="ideaTitleSpan">${idea.Title}</span></h2>
    <span id="ideaDescSpan">${idea.Description}</span>
    </div>
    <button class="Delete"><i class="fa-solid fa-eraser"></i></button>
    </div>`;
    ideasContainer.insertAdjacentHTML('beforeend', ideaView)

  });  
}

//DELETE data

async function deleteFunction(){
  const deletebtn = document.querySelectorAll('.Delete')
  deletebtn.forEach((button)=>{
    button.addEventListener(('click'), async (e)=>{
      button.parentNode.remove();
      const ideaId = e.target.closest('.individualIdea').dataset.ideaId;
            try {
        const response = await fetch(`http://localhost:3000/ideas/${ideaId}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          // If deletion is successful, refresh the page
          location.reload();
        } else {
          // Handle error cases if needed
          console.error('Error deleting idea:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting idea:', error);
      }
    })
  })
}

async function ideaCounter(){
const countValue = document.querySelector('.countValue');
const dataNumber = await getData();
countValue.innerText= dataNumber.length;
}

fetchDataAndCreateList();
ideaCounter();

