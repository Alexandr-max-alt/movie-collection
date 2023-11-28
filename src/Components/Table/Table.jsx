import React from 'react';
import './style-table.css';

export const Table = ({ listMemorization, memorized, showTable, setShowTable, allCards }) => {
    const [activeCategoryIndex, setActiveCategoryIndex] = React.useState(0);
    const [resultMap, setResultMap] = React.useState([]);
    const [showScroll,setShowScroll] = React.useState(false);
    const [categories, setCategories] = React.useState([
        { name: "Все слова", active: false },
        { name: "Слова для заучивания", active: false },
        { name: "Выученные слова", active: false },
    ]);

    const showResult = [allCards, listMemorization, memorized];

    React.useEffect(() => {
        setResultMap(showResult[activeCategoryIndex])
    }, [showResult,activeCategoryIndex]);

    React.useEffect(() => {
        setShowScroll(resultMap.length > 0 && resultMap.length * 70 > 500)
    }, [resultMap]);

    React.useEffect(() => {
        if (activeCategoryIndex !== null) {
            const updateList = categories.map((el, index) => ({
                ...el,
                active: index === activeCategoryIndex
            }));
            setCategories(updateList)
        }
    }, [activeCategoryIndex]);

    return <div class={`modal-wrapper ${showTable ? 'open-modal' : ''}`} >
                <div class="modal">
                    <div class="modal-content">
                <button onClick={() => setShowTable(false)} class="modal-button-close">
                        X
                        </button>
                        <ul class="modal-categories">
                            {categories.map((el, index) => {
                                return <li onClick={() => {setActiveCategoryIndex(index)}} class={`modal-category ${el.active? 'active-category' : ''}`} key={index}>{el.name}</li>
                            })}
                        </ul>
                        <ul class={`modal-table ${showScroll ? 'showScroll' : ''}`}>
                            {resultMap.map((el) => {
                                return <li key={el.id}>
                                            <div>{el.name}</div>
                                            <div>{el.translation}</div>
                                        </li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
}