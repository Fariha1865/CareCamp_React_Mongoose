import { Helmet } from "react-helmet";
import PageCovers from "../../Components/PageCovers";
import banner from "../../assets/shop/banner2.jpg"

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from "react";
import LoadMenuData from "../../hooks/LoadMenuData";
import OrderCategory from "./OrderCategory";
import { useParams } from "react-router-dom";


const Order = () => {

    const categories = ["pizza","soup","dessert","salad","drinks"];
    const {category} = useParams();

    console.log(category)
    const initialIndex = categories.indexOf(category);

    const [tabIndex, setTabIndex] = useState(initialIndex);

   
    const [menu] = LoadMenuData();
    const drinksMenus = menu?.filter(item => item.category === "drinks");
    const pizzaMenus = menu?.filter(item => item.category === "pizza");
    const soupMenus = menu?.filter(item => item.category === "soup");
    const dessertMenus = menu?.filter(item => item.category === "dessert");
    const saladMenus = menu?.filter(item => item.category === "salad");

    return (
        <div>
            <Helmet>
                <title>Bistro Boss || Shop</title>
            </Helmet>
            <PageCovers image={banner} title="OUR SHOP" subTitle="Would you like to try a dish?"></PageCovers>
            <div className="max-w-6xl mx-auto">
                <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList className="flex justify-center">
                        <Tab>Pizza</Tab>
                        <Tab>Soup</Tab>
                        <Tab>Dessert</Tab>
                        <Tab>Salad</Tab>
                        <Tab>Drinks</Tab>
                    </TabList>

                    <TabPanel>
                        <OrderCategory category={pizzaMenus}></OrderCategory>
                    </TabPanel>
                    <TabPanel>
                        <OrderCategory category={soupMenus}></OrderCategory>
                    </TabPanel>
                    <TabPanel>
                        <OrderCategory category={dessertMenus}></OrderCategory>
                    </TabPanel>
                    <TabPanel>
                        <OrderCategory category={saladMenus}></OrderCategory>
                    </TabPanel>
                    <TabPanel>
                        <OrderCategory category={drinksMenus}></OrderCategory>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default Order;