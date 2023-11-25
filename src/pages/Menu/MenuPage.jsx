import { Helmet } from "react-helmet";
import PageCovers from "../../Components/PageCovers";
import banner from "../../assets/menu/banner3.jpg"
import Menu from "../../Components/Menu";
// import chefService from "../../assets/home/chef-service.jpg"
import slide2 from "../../assets/home/slide2.jpg"
import slide3 from "../../assets/home/slide3.jpg"
import slide4 from "../../assets/home/slide4.jpg"
import LoadMenuData from "../../hooks/LoadMenuData";
import { Link} from "react-router-dom";


const MenuPage = () => {

    const [menu] = LoadMenuData();
    const popularMenus = menu?.filter(item => item.category === "popular");
    const pizzaMenus = menu?.filter(item => item.category === "pizza");
    const soupMenus = menu?.filter(item => item.category === "soup");
    const dessertMenus = menu?.filter(item => item.category === "dessert");
    const saladMenus = menu?.filter(item => item.category === "salad");


    return (
        <div>
            <Helmet>
                <title>Bistro Boss || Menu</title>
            </Helmet>

            <PageCovers image={banner} title="OUR MENU" subTitle="Would you like to try a dish?"></PageCovers>
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 mt-28">
                {
                    popularMenus?.map(item => <Menu key={item._id} item={item}></Menu>)
                }
            </div>

            <div className="flex justify-center mt-10 mb-28">
                <Link to={`/order/pizza`}> <button className="btn btn-outline border-0 border-b-4">ORDER YOUR FAVOURITE FOOD</button></Link>
            </div>

            <div className="max-w-6xl mx-auto">
                <PageCovers image={slide2} title="PIZZA" subTitle="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."></PageCovers>
            </div>
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 mt-28">
                {
                    pizzaMenus?.map(item => <Menu key={item._id} item={item}></Menu>)
                }
            </div>

            <div className="flex justify-center mt-10 mb-28">
                <Link to={`/order/pizza`}> <button className="btn btn-outline border-0 border-b-4">ORDER YOUR FAVOURITE FOOD</button></Link>
            </div>

            <div className="max-w-6xl mx-auto">
                <PageCovers image={slide3} title="SOUPS" subTitle="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."></PageCovers>
            </div>
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 mt-28">
                {
                    soupMenus?.map(item => <Menu key={item._id} item={item}></Menu>)
                }
            </div>

            <div className="flex justify-center mt-10 mb-28">
                <Link to={`/order/soup`}> <button className="btn btn-outline border-0 border-b-4">ORDER YOUR FAVOURITE FOOD</button></Link>
            </div>

            <div className="max-w-6xl mx-auto">
                <PageCovers image={slide4} title="DESSERTS" subTitle="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."></PageCovers>
            </div>
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 mt-28">
                {
                    dessertMenus?.map(item => <Menu key={item._id} item={item}></Menu>)
                }
            </div>

            <div className="flex justify-center mt-10 mb-28">
                <Link to={`/order/dessert`}> <button className="btn btn-outline border-0 border-b-4">ORDER YOUR FAVOURITE FOOD</button></Link>
            </div>

            <div className="max-w-6xl mx-auto">
                <PageCovers image={slide4} title="SALADS" subTitle="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."></PageCovers>
            </div>
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 mt-28">
                {
                    saladMenus?.map(item => <Menu key={item._id} item={item}></Menu>)
                }
            </div>

            <div className="flex justify-center mt-10 mb-28">
                <Link to={`/order/salad`}> <button className="btn btn-outline border-0 border-b-4">ORDER YOUR FAVOURITE FOOD</button></Link>
            </div>

        </div>
    );
};

export default MenuPage;