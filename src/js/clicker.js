'use strict';

let user = JSON.parse( localStorage.getItem('user') );

// Score

const clickerButton = document.querySelector('.clicker-btn'),
    score = document.querySelector('.score');

score.innerHTML = user.score;

const scorePatch = () => {
  fetch(`http://localhost:3000/users/${user.id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        score: +score.innerHTML
      })
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });
}

clickerButton.addEventListener('click', () => {
  score.innerHTML = +score.innerHTML + 1;
  scorePatch();
})

// OnBeforeUnload

window.onbeforeunload = () => {
  localStorage.removeItem('user');
}