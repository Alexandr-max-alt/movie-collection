import React from "react";

export const Rating = ({id,onChangeRating,collection}) => {

    function changeRating(num) {
        onChangeRating(id, num);
    }

    return <div className='rating' data-total-value={collection[id-1].rating}>
                <div onClick={()=>changeRating(5)} className='rating__item'>★</div>
                <div onClick={()=>changeRating(4)} className='rating__item'>★</div>
                <div onClick={()=>changeRating(3)} className='rating__item'>★</div>
                <div onClick={()=>changeRating(2)} className='rating__item'>★</div>
                <div onClick={()=>changeRating(1)} className='rating__item'>★</div>
            </div>
}