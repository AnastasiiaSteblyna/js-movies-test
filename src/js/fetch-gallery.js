import { refs } from '../index';
import Notiflix from 'notiflix';
const axios = require('axios').default;

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalPage = 1;
  }

  async fetchGallery() {
    try {
      const data = await axios.get(
        `https://pixabay.com/api/?key=30799489-f6e21edc3306eb9c86baf04e6&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
      );

      if (data.data.total === 0 || this.searchQuery === '') {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      } else {
        if (this.page === 1) {
          Notiflix.Notify.info(`Hooray! We found ${data.data.total} images.`);
        }

        this.totalPage = Math.ceil(data.data.totalHits / 40);

        if (this.page < this.totalPage) {
          refs.loadMoreBtn.classList.remove('is-hidden');
        } else {
          refs.loadMoreBtn.classList.add('is-hidden');
        }

        if (this.page === this.totalPage && this.totalPage > 1) {
          Notiflix.Notify.warning(
            "We're sorry, but you've reached the end of search results."
          );
          refs.loadMoreBtn.classList.add('is-hidden');
        }

        this.page += 1;

        return data.data.hits;
      }
    } catch {
      error => console.log(error);
    }
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  resetPage() {
    this.page = 1;
  }
}
