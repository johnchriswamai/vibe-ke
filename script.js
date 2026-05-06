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
// ===== NEWSLETTER SIGNUP =====
const newsletterBtn = document.getElementById('newsletter-btn');

if (newsletterBtn) {
  newsletterBtn.addEventListener('click', function() {

    const name    = document.getElementById('newsletter-name').value;
    const email   = document.getElementById('newsletter-email').value;
    const success = document.getElementById('newsletter-success');
    const error   = document.getElementById('newsletter-error');

    // hide previous messages
    success.style.display = 'none';
    error.style.display   = 'none';

    // validation
    if (!name || !email) {
      error.textContent   = 'Please fill in both your name and email!';
      error.style.display = 'block';
      return;
    }

    // simple email check
    if (!email.includes('@')) {
      error.textContent   = 'Please enter a valid email address!';
      error.style.display = 'block';
      return;
    }

    // save to localStorage
    const subscribers = JSON.parse(localStorage.getItem('vibeKESubscribers')) || [];
    subscribers.push({ name: name, email: email });
    localStorage.setItem('vibeKESubscribers', JSON.stringify(subscribers));

    // show success and clear form
    success.style.display = 'block';
    document.getElementById('newsletter-name').value  = '';
    document.getElementById('newsletter-email').value = '';
  });
}

// ===== SEARCH FILTER — HUB PAGE =====
// All searchable content
const allContent = [
  { title: "Nairobi Half Life",  category: "movie",   description: "A young man chases his acting dreams in the streets of Nairobi",          tag: "🇰🇪 Kenyan Film",    badge: "Comedy"   },
  { title: "Disconnect",         category: "movie",   description: "A story about modern Kenyan relationships and social media addiction",     tag: "🇰🇪 Kenyan Film",    badge: "Drama"    },
  { title: "Crime and Justice",  category: "movie",   description: "Kenya's first crime drama series tackling real urban issues",             tag: "🇰🇪 Kenyan Series",  badge: "Action"   },
  { title: "Churchill Show",     category: "creator", description: "Kenya's biggest comedy platform showcasing local talent",                 tag: "📺 YouTube",         badge: "Comedy"   },
  { title: "Moringa School",     category: "creator", description: "Teaching Africans how to code and build tech careers",                   tag: "💻 Education",       badge: "Tech"     },
  { title: "Wanjiru Njiru",      category: "creator", description: "Kenyan lifestyle and culture content creator",                           tag: "📱 Instagram",       badge: "Lifestyle"},
  { title: "Sauti Sol",          category: "artist",  description: "Kenya's biggest afro-pop band known across Africa",                      tag: "🎵 Music",           badge: "Music"    },
  { title: "Cyrus Kabiru",       category: "artist",  description: "World renowned Kenyan visual artist and sculptor",                       tag: "🎨 Visual Art",      badge: "Visual Art"},
  { title: "Bien",               category: "artist",  description: "Solo artist and Sauti Sol member pushing Kenyan music globally",         tag: "🎵 Music",           badge: "Music"    },
];

const searchBtn   = document.getElementById('search-btn');
const resetBtn    = document.getElementById('reset-btn');

if (searchBtn) {
  searchBtn.addEventListener('click', function() {

    const keyword  = document.getElementById('search-input').value.toLowerCase();
    const category = document.getElementById('filter-category').value;
    const results  = document.getElementById('search-results');

    // filter content based on keyword and category
    const filtered = allContent.filter(function(item) {
      const matchKeyword  = item.title.toLowerCase().includes(keyword) ||
                            item.description.toLowerCase().includes(keyword);
      const matchCategory = category === 'all' || item.category === category;
      return matchKeyword && matchCategory;
    });

    // show results
    if (filtered.length === 0) {
      results.innerHTML = '<p style="color:gray">No results found. Try a different search!</p>';
      return;
    }

    results.innerHTML = '<div class="cards-grid">';
    filtered.forEach(function(item) {
      results.innerHTML += `
        <div class="card">
          <div class="card-badge">${item.badge}</div>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <span class="card-tag">${item.tag}</span>
        </div>
      `;
    });
    results.innerHTML += '</div>';
  });
}

if (resetBtn) {
  resetBtn.addEventListener('click', function() {
    document.getElementById('search-input').value    = '';
    document.getElementById('filter-category').value = 'all';
    document.getElementById('search-results').innerHTML = '';
  });
}
