export const Collection = ({ name, photo, year, description, rating, setIsFilm, setId,id}) => {
    
    const sliceDesc = description.split(' ').slice(0, 20).join(' ') + '...';
    return (
        <li onClick={() => {setIsFilm(true); setId(id)}}>
                <div className='collection'>
                    <h1>{name}</h1>
                    <img src={photo} alt="photo"/>
                    <div className='container-info'>
                        <h4>{year}</h4>
                    <p>Rating:{rating}</p>
                    </div>
                    <p>{sliceDesc}</p>
                </div>
            </li>
    )
}