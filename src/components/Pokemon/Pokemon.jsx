function Pokemon({name, image, id}){

return(
    <>
<div>
    {name}
</div>
<div>
    <img src={image} alt="" />
</div>
    </>
)

}

export default Pokemon