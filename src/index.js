import ApiService from './js/fetch-gallery';
import { renderGallery } from './js/render-gallery';

export const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const apiService = new ApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  refs.galleryContainer.innerHTML = '';

  apiService.query = e.currentTarget.elements.searchQuery.value.trim();
  apiService.resetPage();
  apiService
    .fetchGallery()
    .then(renderGallery)
    .catch(error => console.log(error));

  refs.searchForm.reset();
}

function onLoadMore() {
  apiService
    .fetchGallery()
    .then(renderGallery)
    .catch(error => console.log(error));
}
