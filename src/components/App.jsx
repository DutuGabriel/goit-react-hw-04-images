import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import './styles.css';

const ModalContext = createContext();
const API_KEY = '47264641-139baa2dc360fe62b105390da';
const BASE_URL = 'https://pixabay.com/api/';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [modalImage, setModalImage] = useState(null);

  const fetchImages = async (query, page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      setImages(prevImages => [...prevImages, ...response.data.hits]);
    } catch (error) {
      console.error('Error fetching images', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (query) fetchImages(query, page);
  }, [query, page]);

  const handleSearch = newQuery => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <ModalContext.Provider value={{ modalImage, setModalImage, closeModal }}>
      <div>
        <Searchbar onSubmit={handleSearch} />
        <ImageGallery images={images} onImageClick={setModalImage} />
        {loading && <Loader />}
        {images.length > 0 && !loading && <Button onClick={handleLoadMore} />}
        {modalImage && <ModalWrapper />}
      </div>
    </ModalContext.Provider>
  );
};

const ModalWrapper = () => {
  const { modalImage, closeModal } = useContext(ModalContext);

  return <Modal image={modalImage} onClose={closeModal} />;
};
//
