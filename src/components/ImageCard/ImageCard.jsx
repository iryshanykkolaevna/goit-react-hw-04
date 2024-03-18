import css from './ImageCard.module.css'

const ImageCard = ({ alt, src, modalOpen }) => {
  
    return (
      <div
        className={css.hoverImageScale}
        onClick={() => modalOpen(src.regular, alt)}
      >
        <img className={css.imageCard} src={src.small} alt={alt} />
      </div>
    );
}

export default ImageCard