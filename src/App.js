import React from 'react';
import './index.css';
import { Card } from './Components/Card/Card';
import { Table } from './Components/Table/Table';

function App() {
  const [allCards, setAllCards] = React.useState([]);
  const [cards, setCards] = React.useState([]);
  const [memorized, setMemorized] = React.useState([]);
  const [listMemorization,setListMemorization] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [finishGame, setFinish] = React.useState(false);
  const [showMemory, setShowMemory] = React.useState(false);
  const [showTable, setShowTable] = React.useState(false);
  const [randomIndex, setRandomIndex] = React.useState(0);
  const [stepMix, setStepMix] = React.useState(0);

  // localStorage.clear()
  React.useEffect(() => {
    if (localStorage.getItem('cards')) {
      const renderCards = JSON.parse(localStorage.getItem('cards'));

      setCards(renderCards.cards)
      setAllCards(renderCards.cards)
      setMemorized(renderCards.memorized)
      setListMemorization(renderCards.cardsForMemory)
      setIsLoading(false)

      checkLocal()
    } else {
      fetch('/data.json')
      .then(res => res.json())
      .then(json => {
        setCards(json)
        setAllCards(json)

        localStorage.setItem('cards', JSON.stringify({'cards': json, 'memorized':[], 'cardsForMemory':[]}))
      })
      .catch(err => console.warn('err'))
      .finally(()=>setIsLoading(false))
    }
  }, []);

  React.useEffect(() => {
    if (!showMemory) {
        const index = getRandom(cards);
        setRandomIndex(index)
    }
  }, [cards]);


  function saveToLocal(result, param) {
    const updateCards = JSON.parse(localStorage.getItem('cards'));
    updateCards[`${param}`] = result;

    checkLocal()
    localStorage.setItem('cards', JSON.stringify(updateCards));
  }

  function getRandom(el) {
    let num = Math.floor(Math.random() * (el.length - 1));
    return num < 0 ? 0 : num;
  }

  function checkLocal() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    cards.cards.length === 0 && setFinish(true)
  }
 
  function clearStats() {
    localStorage.clear()
    window.location.reload();
  }

  return (
    <div class='App'>
      <header class='header'>
        <h1 class='header__title'>English words</h1>
      </header>
      <div class='content'>
        {isLoading ?
          (<h1>Loading...</h1>)
          : (<>
            {finishGame ?
              <h2>KONEC</h2>
              :
              <Card
                saveToLocal={saveToLocal}
                allCards={allCards}
                listMemorization={listMemorization}
                setListMemorization={setListMemorization}
                setStepMix={setStepMix}
                stepMix={stepMix}
                getRandom={getRandom}
                setRandomIndex={setRandomIndex}
                randomIndex={randomIndex}
                showMemory={showMemory}
                setShowMemory={setShowMemory}
                setMemorized={setMemorized}
                memorized={memorized}
                setFinish={setFinish}
                setCards={setCards}
                cards={cards}
            />
            }
            </>
          ) 
        }  
        <button onClick={() => clearStats()} class="button-clear">Clear</button>
        <button onClick={() => setShowTable(true)} class="button-table">Table</button>
        <Table
          listMemorization={listMemorization}
          memorized={memorized}
          allCards={allCards}
          setShowTable={setShowTable}
          showTable={showTable}
        />
      </div>
    </div>
  );
}

export default App;
