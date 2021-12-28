import Product from "./models/Product";
import ItemList from "./components/ItemList";
import AddItem from "./components/AddItem";
import "./App.css";

function App() {
  const product = new Product();
  return (
    <div className="App">
      <AddItem product={product} />
      <ItemList product={product} />
    </div>
  );
}

export default App;
