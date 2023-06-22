const BASE_URL = 'https://api.thecatapi.com/v1/';
const api_key =
  'api_key=live_p8nsGb3J9AZLPoxFirODYuWRNe7n6m6N1cXzskCCWzp7GkCvYQEz8vWOGjrnc5rg';

export function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}images/search?breed_ids=${breedId}&${api_key}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

export function fetchBreeds() {
  return fetch(`${BASE_URL}breeds?${api_key}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
