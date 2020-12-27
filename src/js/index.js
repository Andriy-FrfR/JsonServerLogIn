'use strict';

// Requests

const logInButton = document.getElementById('log-in-button');
let user;

const signUpButton = document.getElementById('sign-up-button');

signUpButton.addEventListener('click', () => {
  fetch(`http://localhost:3000/users/?email=${document.querySelector('.email-input').value}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    if (data.length !== 0) {
      alert('Account with the email you typed already exists!')
      return;
    } else {
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
        user = data;
        score.innerHTML = 0;
        console.log(data);
      });
    }
    console.log(data);
  })
  .catch(() => {
    alert('Error');
  })
})

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
      score.innerHTML = user.score || 0;
    }
    
    console.log(data);
  })
  .catch(() => {
    alert('Error');
  })
})

// Score

const scoreButton = document.getElementById('score-button'),
    score = document.getElementById('score');

const scorePatch = () => {
  if (!user) {
    alert('Log in or Sign up, please!');
    return;
  }
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

scoreButton.addEventListener('click', () => {
  score.innerHTML = +score.innerHTML + 1;
  scorePatch();
})