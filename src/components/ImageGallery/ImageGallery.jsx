import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, modalOpen }) => {
  return (
    <ul className={css.gallery}>
      {images.map(({ id, alt_description, urls }) => (
        <ImageCard
          key={id}
          alt={alt_description}
          src={urls}
          modalOpen={modalOpen}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;