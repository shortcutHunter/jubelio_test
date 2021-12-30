import ProductObj from "./models/models";
import ItemList from "./components/ItemList";
import AddItem from "./components/AddItem";

function Product() {
  const productObj = new ProductObj();
  return (
    <div>
      <AddItem product={productObj} />
      <ItemList product={productObj} />
    </div>
  );
}

export default Product;
