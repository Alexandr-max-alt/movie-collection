import React from "react";
import './style-card.css';

export const Card = ({ saveToLocal, allCards, setListMemorization, stepMix, setStepMix, getRandom, setRandomIndex, randomIndex, cards, setCards, setFinish , setMemorized, memorized, setShowMemory, showMemory}) => {
    const [showResult, setShowResult] = React.useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    function checkSteps(Cards) {
        if (stepMix > 3) {
            setShowMemory(true);
            setRandomIndex(getRandom(memorized));

            setStepMix(0);
        } else {
            setRandomIndex(getRandom(Cards));
            setShowMemory(false);
        };
    }

    function handleShowNextCard(id) { 
        setStepMix(++stepMix);

        setMemorized(memorized => {
            const updateCards = [...memorized, cards.filter(obj => obj.id === id)].flat();

            saveToLocal(updateCards, 'memorized');
            return updateCards;
        });

        setCards(cards => {
            const updateCards = cards.filter(obj => obj.id !== id);
            updateCards.length > 0 ? checkSteps(updateCards) : setFinish(true);

            saveToLocal(updateCards, 'cards')
            return updateCards;
        });
    }

    function handleShowResult(id) {
        setShowResult(true);
        setIsButtonDisabled(true);

        setTimeout(() => {
            setShowResult(false);
            setIsButtonDisabled(false);

                    setListMemorization(list => {
                        const updateList = [...new Set([...list, allCards.filter(obj => obj.id === id)].flat())];
                        
                        saveToLocal(updateList, 'cardsForMemory');
                        return updateList;
                    });

                    setMemorized(memorizedCards => {
                        const updateCards = memorizedCards.filter(obj => obj.id !== id);

                        saveToLocal(updateCards, 'memorized');
                        return updateCards;
                    });
                    setShowMemory(false);

                    const newIndex = getRandom(cards);
                    setRandomIndex(newIndex);

        }, 5000);
    }

    const card = cards[randomIndex];
    const memoriedCard = memorized[randomIndex];

    return (
        <div key= {showMemory? memoriedCard?.id : card.id} id={showMemory? memoriedCard?.id : card.id}  class="card">
            <h1 class="card-name">{showMemory? memoriedCard?.name : card.name}</h1>
            <h1 class={`card-translation ${showResult && 'show-answer'}`}>{showMemory? memoriedCard?.translation : card.translation}</h1>
            <div class="card-buttons">
                <button
                    onClick={() => handleShowNextCard(showMemory? memoriedCard?.id : card.id)}
                    class="card-button-yes"
                    disabled={isButtonDisabled}
                >I know
                </button>
                <button
                    onClick={() => handleShowResult(showMemory ? memoriedCard?.id : card.id)}
                    class="card-button-no"
                    disabled={isButtonDisabled}
                >Don't know
                </button>
            </div>
        </div>
    )
}