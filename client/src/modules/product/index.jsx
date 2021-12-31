import ProductStore from "./ProductStore";
import ItemList from "./components/ItemList";
import ButtonGroup from "./components/ButtonGroup";
import Popup from "./components/Popup";
import Loading from "./components/Loading";

function Product() {
  const productStore = new ProductStore();
  return (
    <div>
      <Loading product={productStore} />
      <ButtonGroup product={productStore} />
      <ItemList product={productStore} />
      <Popup product={productStore} />
    </div>
  );
}

export default Product;
