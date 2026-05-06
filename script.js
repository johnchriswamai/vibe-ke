// ===== MOOD RECOMMENDATIONS DATA =====
const recommendations = {
  happy:    { title: "Nairobi Half Life",   type: "Kenyan Movie",         genre: "Comedy / Drama",      description: "A feel-good story about chasing dreams in Nairobi!" },
  sad:      { title: "Disconnect",          type: "Kenyan Movie",         genre: "Drama",               description: "A deep emotional story about modern Kenyan relationships." },
  hype:     { title: "Attack on Titan",     type: "Anime",                genre: "Action / Hype",       description: "The most intense anime ever made. Your heart will race!" },
  chill:    { title: "Your Name",           type: "Anime",                genre: "Romance / Chill",     description: "A beautiful calming anime about two strangers connected across time." },
  bored:    { title: "Money Heist",         type: "International Series", genre: "Thriller / Adventure","description": "The most binge-worthy series ever. You won't be bored!" },
  romantic: { title: "Crazy Rich Asians",   type: "International Movie",  genre: "Romance / Comedy",    description: "A fun romantic movie perfect for date night!" }
};

// ===== MOOD BUTTONS =====
document.querySelectorAll('.mood-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {

    // remove active from all buttons then add to clicked one
    document.querySelectorAll('.mood-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');

    // get mood and show recommendation
    const mood = btn.getAttribute('data-mood');
    const rec  = recommendations[mood];
    const box  = document.getElementById('result-box');

    box.innerHTML = `
      <h3>${rec.title}</h3>
      <p>${rec.description}</p>
      <p class="result-type">${rec.type} &bull; ${rec.genre}</p>
    `;
    box.style.display = 'block';
  });
});

// ===== GET SUBMISSIONS FROM LOCALSTORAGE =====
function getSubmissions() {
  return JSON.parse(localStorage.getItem('vibeKESubmissions')) || [];
}

// ===== BUILD A CARD =====
function buildCard(item) {
  return `
    <div class="card">
      <div class="card-badge">${item.category}</div>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <span class="card-tag">Added by ${item.author || 'Anonymous'}</span>
    </div>
  `;
}

// ===== LOAD COMMUNITY PICKS — HOME PAGE =====
const communityGrid = document.getElementById('community-grid');
if (communityGrid) {
  const submissions = getSubmissions();
  if (submissions.length === 0) {
    communityGrid.innerHTML = '<p style="color:gray">No community picks yet. Be the first!</p>';
  } else {
    submissions.slice(-3).reverse().forEach(function(item) {
      communityGrid.innerHTML += buildCard(item);
    });
  }
}

// ===== LOAD ALL RECOMMENDATIONS — HUB PAGE =====
const hubGrid = document.getElementById('community-recommendations');
if (hubGrid) {
  const submissions = getSubmissions();
  if (submissions.length === 0) {
    hubGrid.innerHTML = '<p style="color:gray">No recommendations yet. <a href="add.html" style="color:orangered">Add one!</a></p>';
  } else {
    submissions.slice().reverse().forEach(function(item) {
      hubGrid.innerHTML += buildCard(item);
    });
  }
}

// ===== SUBMIT FORM — ADD PAGE =====
const submitBtn = document.getElementById('submit-btn');
if (submitBtn) {
  submitBtn.addEventListener('click', function() {

    const title       = document.getElementById('title').value;
    const category    = document.getElementById('category').value;
    const genre       = document.getElementById('genre').value;
    const description = document.getElementById('description').value;
    const author      = document.getElementById('author').value;
    const errorMsg    = document.getElementById('error-msg');
    const successMsg  = document.getElementById('success-msg');

    // hide previous messages
    errorMsg.style.display   = 'none';
    successMsg.style.display = 'none';

    // validation
    if (!title || !category || !genre || !description) {
      errorMsg.textContent   = 'Please fill in all required fields!';
      errorMsg.style.display = 'block';
      return;
    }

    // save to localStorage
    const submissions = getSubmissions();
    submissions.push({
      title       : title,
      category    : category,
      genre       : genre,
      description : description,
      author      : author || 'Anonymous',
      date        : new Date().toLocaleDateString()
    });
    localStorage.setItem('vibeKESubmissions', JSON.stringify(submissions));

    // show success and clear form
    successMsg.style.display = 'block';
    document.getElementById('title').value       = '';
    document.getElementById('category').value    = '';
    document.getElementById('genre').value       = '';
    document.getElementById('description').value = '';
    document.getElementById('author').value      = '';

    loadMySubmissions();
  });
}

// ===== LOAD MY SUBMISSIONS — ADD PAGE =====
const mySubmissions = document.getElementById('my-submissions');

function loadMySubmissions() {
  if (!mySubmissions) return;
  const submissions = getSubmissions();

  if (submissions.length === 0) {
    mySubmissions.innerHTML = '<p style="color:gray">You have not added anything yet!</p>';
    return;
  }

  mySubmissions.innerHTML = '';
  submissions.slice().reverse().forEach(function(item) {
    mySubmissions.innerHTML += `
      <div class="submission-card">
        <h4>${item.title}</h4>
        <p>${item.category} &bull; ${item.genre}</p>
        <p>${item.description}</p>
        <p style="color:gray; font-size:12px; margin-top:8px">Added by ${item.author} on ${item.date}</p>
      </div>
    `;
  });
}

loadMySubmissions();

// ===== CLEAR ALL SUBMISSIONS =====
const clearBtn = document.getElementById('clear-btn');
if (clearBtn) {
  clearBtn.addEventListener('click', function() {
    if (confirm('Are you sure you want to clear all submissions?')) {
      localStorage.removeItem('vibeKESubmissions');
      loadMySubmissions();
    }
  });
}