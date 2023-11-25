import Menu from "../../Components/Menu";
import SectionTitle from "../../Components/SectionTitle";
import LoadMenuData from "../../hooks/LoadMenuData";

const MenuItems = () => {

    const [menu] = LoadMenuData();
    const popularMenus = menu?.filter(item=>item.category==="popular");
    
    return (

        
        <div className="mb-10">
            <SectionTitle subheading="---Check it out---" heading="FROM OUR MENU"></SectionTitle>
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
            {
               popularMenus?.map(item=><Menu key={item._id} item={item}></Menu>)
            }
            </div>
        </div>
    );
};

export default MenuItems;