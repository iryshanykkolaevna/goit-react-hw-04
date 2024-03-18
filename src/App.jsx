import { useState, useEffect } from 'react';
import './App.css';
import { getPhotos } from './apiService/photos';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ImageModal from './components/ImageModal/ImageModal';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';


function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { results, total_pages } = await getPhotos(query, page);
        if (results.length === 0) {
          setIsEmpty(true);
          return;
        }
        setImages(prevState => [...prevState, ...results]);
        setIsVisible(page < total_pages);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [query, page]);

  const handleSubmit = value => {
    setQuery(value);
    setImages([]);
    setPage(1);
    setIsEmpty(false);
    setError(false);
    setIsVisible(false);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  }

  const handleOpen = (url, alt) => {
    setIsOpen(true);
    setModalUrl(url);
    setModalAlt(alt);
  };

  const handleClose = () => {
    setIsOpen(false);
    setModalUrl('');
    setModalAlt('');
  }

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} modalOpen={handleOpen} />
      )}
      {isVisible && (
        <LoadMoreBtn onClick={loadMore} disabled={isLoading}>
          {isLoading ? 'Loading' : 'Load more'}
        </LoadMoreBtn>
      )}
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {isEmpty && <p>Sorry. There are no images ...</p>}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={handleClose}
        src={modalUrl}
        alt={modalAlt}
      />
    </div>
  );
}

export default App;