

const Menu = ({ item }) => {

    const { image, name, price, recipe} = item;
    return (
        <div>
            <div className="flex items-center gap-5">
                <img src={image} style={{ borderRadius: "0px 200px 200px 200px" }} className="w-[100px]"></img>
                <div className="text-[#737373]">
                    <h1 className="mb-2 text-xl">{name} --------------</h1>
                    <p>{recipe}</p>
                </div>
                <p className="text-[#BB8506]">${price}</p>
            </div>
        </div>
    );
};

export default Menu;