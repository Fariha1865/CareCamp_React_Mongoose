import CategoryCards from "../../Components/CategoryCards";

const OrderCategory = ({ category }) => {
    return (
        <div>
            <div className="grid lg:grid-cols-3 gap-5 p-20">
                {
                    category?.map(item => <CategoryCards key={item._id} item={item}></CategoryCards>)
                }
            </div>
        </div>
    );
};

export default OrderCategory;