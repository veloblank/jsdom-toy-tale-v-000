let addToy = false

document.addEventListener("DOMContentLoaded", () => {
  getToyData();

  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })


})

function getToyData() {
  fetch('http://localhost:3000/toys')
    .then(function (response) {
      return response.json();
    })
    .then(function (toyObjects) {
      for (const toy of toyObjects) {
        makeToyCard(toy);
      }
      addBtnListeners();
    })
}

/*
needs considerable refactor
a function that has object and array of attributes to 
build the card
*/
function makeToyCard(toyObj) {
  let card = document.createElement('div');
  let h2Tag = document.createElement('h2');
  let imgTag = document.createElement('img');
  let pTag = document.createElement('p');
  let btnTag = document.createElement('button');
  h2Tag.innerHTML = toyObj['name']
  imgTag.src = toyObj['image']
  imgTag.classList.add('toy-avatar')
  pTag.innerHTML = toyObj['likes']
  btnTag.classList.add('like-btn')
  btnTag.textContent = "Like <3"
  card.appendChild(h2Tag)
  card.appendChild(imgTag)
  card.appendChild(pTag)
  card.appendChild(btnTag)
  card.setAttribute('id', toyObj.id)
  card.classList.add('card')
  appendToToyCollection(card)
}

function appendToToyCollection(toyCard) {
  let toyCollection = document.getElementById("toy-collection")
  toyCollection.appendChild(toyCard)
}

function addBtnListeners() {
  let likeBtns = document.getElementsByClassName("like-btn")
  for (let btn of likeBtns) {
    btn.addEventListener('click', function () {
      let likes = parseInt(btn.previousElementSibling.innerText) + 1;
      updateLikes(btn, likes);
      btn.previousElementSibling.innerText = likes
    })
  }
}

function updateLikes(btn, likes) {
  let toyId = btn.parentElement.id;
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": likes
    })
  })
    .then(function (response) {
      return response.json();
    })
    .catch(function (error) {
      console.log(error.message);
    })
};


