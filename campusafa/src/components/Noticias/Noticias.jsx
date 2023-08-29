import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Noticias.css';

export function Noticias() {
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const apiKey = 'be98c7bca9a54d5cae7defd7b7cb2192';
    const pageSize = 3;

    const combinedSearch = searchTerm || 'fútbol, argentina';

    axios
      .get('https://newsapi.org/v2/everything', {
        params: {
          q: combinedSearch,
          language: 'es',
          pageSize: pageSize,
          page: currentPage,
          sortBy: 'publishedAt',
          apiKey: apiKey,
        },
      })
      .then(response => {
        setNews(response.data.articles);
        setTotalResults(response.data.totalResults);
      })
      .catch(error => {
        console.error(error);
      });
  }, [searchTerm, currentPage]);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset currentPage when search term changes
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <main>
      <section className="noticias">
        <div className="noticia-t">
          <h1>NOTICIAS</h1>
        </div>
      </section>
      <input className='notiimp'
        type="text"
        placeholder="Buscar noticias..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="news-container">
        {news.map(article => (
          <div key={article.title} className="news-item">
            <h2>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </h2>
            {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
            <p>{article.description}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Página Anterior</button>
        <button onClick={handleNextPage} disabled={news.length === 0 || (currentPage * 3) >= totalResults}>Siguiente Página</button>
        <p>
          Mostrando {news.length} de {totalResults} resultados
        </p>
      </div>
    </main>
  );
}
 