import './css/styles.css';
import { fetchCatByBreed, fetchBreeds } from './cat-api';

const breedSelectRef = document.querySelector('.breed-select');
const catInfoRef = document.querySelector('.cat-info');
const loaderRef = document.querySelector('.loader');
const errorRef = document.querySelector('.error');

loaderRef.classList.add('hidden');
errorRef.classList.add('hidden');
catInfoRef.classList.add('hidden');
let breedId = '';

function showCatByBreed(event) {
  hideCatInfo();
  breedId = event.target.value;

  fetchCatByBreed(breedId)
    .then(markupCurrentBreed)
    .catch(error => {
      loaderRef.classList.add('hidden');
      errorRef.classList.remove('hidden');
    });
}

breedSelectRef.addEventListener('change', showCatByBreed);

function showBreeds() {
  hideCatInfo();

  fetchBreeds()
    .then(markupBreedsSelect)
    .catch(error => {
      loaderRef.classList.add('hidden');
      errorRef.classList.remove('hidden');
    });
}

showBreeds();

function markupCurrentBreed(data) {
  const markup = el => {
    return ` 
 <img class="cat-img" src="${el.url}" alt="${el.breeds[0].name}" >
 <div class="cat-text">
 <h1 class="cat-header">${el.breeds[0].name}</h1>
 <p>${el.breeds[0].description}</p>
 <p><span><b>Temperament: </b></span>${el.breeds[0].temperament}</p>
 </div>`;
  };

  catInfoRef.innerHTML = markup(data[0]);
  loaderRef.classList.add('hidden');
  errorRef.classList.add('hidden');
  catInfoRef.classList.remove('hidden');
}

function markupBreedsSelect(data) {
  const markup = data
    .map(el => {
      breedId = el.id;
      return `<option value=${el.id}>${el.name}</option>`;
    })
    .join('');
  breedSelectRef.insertAdjacentHTML('beforeend', markup);
  loaderRef.classList.add('hidden');
}

function hideCatInfo() {
  if (!catInfoRef.classList.contains('hidden')) {
    catInfoRef.classList.add('hidden');
  }
  loaderRef.classList.remove('hidden');
}
