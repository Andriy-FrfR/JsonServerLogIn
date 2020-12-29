'use strict';

// Requests

const logInButton = document.querySelector('.log-in-button');
const signUpButton = document.querySelector('.sign-up-button');

let user;

signUpButton.addEventListener('click', () => {
  if (!localStorage.getItem('check')) return;

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
            password: document.querySelector('.password-input').value,
            score: 0
          })
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        user = data;
        localStorage.setItem('user', JSON.stringify(user));

        window.location.href = 'clicker.html';

        score.innerHTML = 0;
        console.log(data);
      });
    }

    console.log(data);
  })
})

logInButton.addEventListener('click', () => {
  if (!localStorage.getItem('check')) return;

  fetch(`http://localhost:3000/users/?email=${document.querySelector('.email-input').value}&password=${document.querySelector('.password-input').value}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    if (data.length === 0) {
      alert('Wrong email or password');
    } else {
      user = data[0];
      localStorage.setItem('user', JSON.stringify(user));

      window.location.href = 'clicker.html';
    }
    
    console.log(data);
  })
})