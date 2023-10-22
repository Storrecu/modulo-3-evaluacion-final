/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import '../styles/App.scss';
import callToApi from '../services/callToApi';
import Header from './common/Header';
import Footer from './common/Footer';
import Landing from './Landing';
import MovieSceneList from './movies/MovieSceneList';
import Filters from './filters/Filters';
import MovieSceneDetails from './movies/MovieSceneDetail';

// import ls from '../services/localStorage';
//import { useLocation, matchPath } from "react-router";
//import { useParams } from "react-router-dom";

function App() {
  //states
  const [filmList, setFilmList] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [selectYear, setSelectYear] = useState('');

  //effects
  useEffect(() => {
    callToApi().then((response) => {
      setFilmList(response);
    });
  }, []);

  // handlers from events
  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  const handleSelectYear = (value) => {
    setSelectYear(value);
  };

  // renders & other functions
  const filteredFilmList = filmList
    .filter((eachFilm) =>
      eachFilm.movie.toLowerCase().includes(filterValue.toLowerCase())
    )
    .filter((eachFilm) => {
      if (selectYear === '') {
        return true;
      } else {
        return selectYear === String(eachFilm.year);
      }
    });

  const yearsOfScenes = filmList.map((film) => film.year);

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/movies"
            element={
              <>
                <Filters
                  filterValue={filterValue}
                  filterChange={handleFilterChange}
                  selectYear={selectYear}
                  selectChange={handleSelectYear}
                  yearsOfScenes={yearsOfScenes}
                />
                <MovieSceneList filmList={filteredFilmList} />
              </>
            }
          />
          <Route path="/movies/:id" element={<MovieSceneDetails />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
