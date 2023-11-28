import './index.css';
import React from 'react';
import { Collection } from './Components/Collection';
import { Film } from './Components/Film';
import { years, country, rating }  from './Components/Options';
import Select from 'react-select';

function App() {
  const [collection, setCollection] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');
  const [isFilm, setIsFilm] = React.useState(false);
  const [id, setId] = React.useState(null);

  const [currentYear,setCurrentYear] = React.useState('');
  const [currentCountry,setCurrentCountry] = React.useState('');
  const [currentRating, setCurrentRating] = React.useState('');

  React.useEffect(() => {
    if (localStorage.getItem('films')) {
      setCollection(JSON.parse(localStorage.getItem('films')))
      setIsLoading(false)
    } else {
      fetch('https://65573e73bd4bcef8b6124ef7.mockapi.io/films')
      .then(res => res.json())
        .then(json => {
          setCollection(json)
         localStorage.setItem('films', JSON.stringify(json))
      }).catch(err => {
        console.warn('err')
      }).finally(()=>setIsLoading(false))
    }
  }, []);
  
  function handleRatingChange(id, newRating) {
    setCollection(collection => {
      const updateCollection = [...collection];
      updateCollection[id-1].rating = newRating;

      saveToLocal(updateCollection);
      return updateCollection;
    });
  }

  function handleCommentsAdd(id,comment) {
    setCollection(collection => {
      const updateCollection = [...collection];
      updateCollection[id-1].comments = [...updateCollection[id-1].comments, { name: "user", text: comment }];

      saveToLocal(updateCollection);
      return updateCollection;
    });
  }

  function deleteComment(id, ind) { 
    setCollection(collection.map(el => {
      if (el.id === id) {
        el.comments = el.comments.filter((_, i) => i !== ind);
        return el
      }
      return el
    }));
    saveToLocal(collection)
  }

  function saveToLocal(res) {
    localStorage.setItem('films', JSON.stringify(res));
  }

  function reloadPage() {
    window.location.reload()
  }

  function getValue(currentValue,options) {
    return currentValue ? options.find(c=>c.value === currentValue) : ''
  }

  function onChange(newValue,setCurrentValue) {
    setCurrentValue(newValue.value)
  }

  return (
    <div className='App'>
          <div className='header'>
          <h1 className='header__title' onClick={reloadPage}>Movie collection</h1>
          <div className='w-134 flex gap-5 basis-3/5 justify-end'>
          <Select
              classNamePrefix='custom-select'
              onChange={(newValue)=>onChange(newValue,setCurrentYear)}
              value={getValue(currentYear,years)}
              placeholder='Choice year...'
              options={years}
            />
          <Select
              classNamePrefix='custom-select'
              onChange={(newValue)=>onChange(newValue,setCurrentCountry)}
              value={getValue(currentCountry,country)}
              placeholder='Choice country...'
              options={country}
            />
          <Select
              classNamePrefix='custom-select'
              onChange={(newValue)=>onChange(newValue,setCurrentRating)}
              value={getValue(currentRating,rating)}
              placeholder='Choice rating...'
              options={rating}
            />
          </div>
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder='Search name...'
            >
            </input>
      </div>
      {isFilm ? (
        <Film
          deleteComment={deleteComment}
          key={id}
          addComment={handleCommentsAdd}
          onChangeRating={handleRatingChange}
          id={id}
          collection={collection}
          reloadPage={reloadPage}
        />
      ) : (<ul className='content'>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (collection
              .filter(obj => obj.name.toLowerCase().includes(searchValue.toLowerCase().trim()))
              .filter(obj => currentYear ? currentYear.includes(obj.year) : obj)
              .filter(obj => currentCountry ? currentCountry.includes(obj.country) : obj)
              .filter(obj => currentRating ? currentRating.includes(obj.rating) : obj)
          .map((obj, index) => (
            <Collection
              key={obj.id}
              saveToLocal={saveToLocal}
              setIsFilm={setIsFilm}
              {...obj}
              setId={setId}
              index={index}
            />
          ))
        )}
      </ul>)}
    </div>
  );
}

export default App;
