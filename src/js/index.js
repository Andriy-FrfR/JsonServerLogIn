'use strict';

// Requests

const logInButton = document.getElementById('log-in-button');
let user

logInButton.addEventListener('click', () => {
  fetch(`http://localhost:3000/users/?email=${document.querySelector('.email-input').value}&password=${document.querySelector('.password-input').value}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    if (data.length === 0) {
      alert('Wrong email or password');
    } else {
      user = data[0];
    }
    
    console.log(data);
  })
  .catch(() => {
    alert('Error');
  })
})

const signUpButton = document.getElementById('sign-up-button');

signUpButton.addEventListener('click', () => {
    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: document.querySelector('.email-input').value,
          password: document.querySelector('.password-input').value
        })
    })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });
})

// Score

const scoreButton = document.getElementById('score-button'),
    score = document.getElementById('score');

const scorePatch = () => {
  fetch(`http://localhost:3000/users/${2}`, {
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

scoreButton.addEventListener('click', () => {
  score.innerHTML = +score.innerHTML + 1;
  scorePatch();
})