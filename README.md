# VibeKE 🎬

## Description
VibeKE is a Kenyan entertainment discovery platform that helps users find the right movie, anime or creator based on their mood. It also showcases the best of Kenyan movies, creators and artists in one place.

## Problem Statement
Kenyan youth waste time scrolling endlessly trying to decide what to watch. There is no single platform that combines local Kenyan content with personalized entertainment recommendations.

## How It Solves The Problem
VibeKE lets users pick their mood and instantly get a recommendation. It also has a community hub where users can discover and add Kenyan entertainment picks that are saved and shared across pages using localStorage.

## Author
John Chris Wamai
Moringa School — Final Project 2026
GitHub: [github.com/johnchriswamai](https://github.com/johnchriswamai)

## Technologies Used
- HTML5
- CSS3
- JavaScript

## Pages
- `index.html` — Home page with mood recommender and community picks
- `hub.html` — Kenyan entertainment hub with search and filter
- `add.html` — Add a recommendation form with localStorage persistence

## Setup Instructions
1. Clone the repository:
git clone git@github.com:johnchriswamai/vibe-ke.git
2. Open `index.html` in your browser
3. Or visit the live site below

## Live Site
https://johnchriswamai.github.io/vibe-ke/

## BDD (Behavior Driven Development)

| Behavior | Input | Output |
|---|---|---|
| User selects a mood | Clicks Happy button | Gets a movie recommendation |
| User searches for content | Types "Nairobi" in search | Shows matching results |
| User adds a recommendation | Fills form and submits | Saved to hub page via localStorage |
| User submits empty form | Clicks submit with empty fields | Error message shown |
| User visits hub page | Page loads | Community recommendations load from localStorage |

## Known Bugs
- None currently known

## License
MIT License — 2026 John Chris Wamai