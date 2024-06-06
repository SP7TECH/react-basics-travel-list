import { useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item])
  }

  function handleRemoveItem(id) {
    setItems((items) => items.filter(item => item.id !== id))
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItems} />
      <PackingList items={items} onRemoveItem={handleRemoveItem} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItem(newItem);

    setDescription("");
    setQuantity(1);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 🤩 trip?</h3>

      <select onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Item..."
        onChange={(e) => setDescription(e.target.value)}
      />

      <button>Add</button>
    </form>
  );
}

function PackingList({items, onRemoveItem}) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item} onRemoveItem={onRemoveItem} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onRemoveItem }) {  
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onRemoveItem(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have X items on your list, and you already packed X (X %)</em>
    </footer>
  );
}

export default App;
