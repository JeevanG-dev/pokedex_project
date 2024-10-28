
import './pokemon.css'


function Pokemon({name, image}){

return(
    <>
<div className='pokemon'>
    {name}
</div>
<div>
    <img src={image} alt="" />
</div>
    </>
)

}

export default Pokemon