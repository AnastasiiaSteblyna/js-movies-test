import { refs } from '../index';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderGallery(data) {
  let lightbox = null;
  lightbox && lightbox.destroy();
  const markup = data
    .map(
      hit =>
        `<div class="photo-card">
      <a class="photo" href=${hit.largeImageURL} >
      <img  src=${hit.webformatURL} alt="${hit.tags}" loading="lazy" title="${hit.tags}"/></a>
      <div class="info">  
      <p class="info-name">
      Film name ${hit.views}</p>
      <p class="info-genre-year"> Genre ${hit.comments} | Year <span class="info-rating">${hit.downloads} </span></p>
      
      </div>
        </div>`
    )
    .join('');
  refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
  });
}
