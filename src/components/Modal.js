import React, { useState, useEffect } from "react";

const Modal = ({ isOpen, onClose, onSave, setCustomizations }) => {
  const [sauce, setSauce] = useState("");
  const [cheese, setCheese] = useState("");
  const [veggies, setVeggies] = useState([]);

  useEffect(() => {
    if (setCustomizations) {
      setCustomizations({
        sauce: sauce || null,
        cheese: cheese || null,
        veggies: veggies.length > 0 ? veggies : null
      });
    }
  }, [sauce, cheese, veggies, setCustomizations]);

  const handleSave = () => {
    onSave({
      sauce: sauce || null,
      cheese: cheese || null,
      veggies: veggies.length > 0 ? veggies : null
    });
    onClose();
  };

  const handleVeggieChange = (event) => {
    const value = event.target.value;
    setVeggies((prevVeggies) =>
      prevVeggies.includes(value)
        ? prevVeggies.filter((v) => v !== value)
        : [...prevVeggies, value]
    );
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 id="modal-title" className="text-2xl font-bold mb-4">
          Customize Your Pizza
        </h2>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Sauce</label>
          <select
            value={sauce}
            onChange={(e) => setSauce(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Sauce</option>
            <option value="tomato">Tomato</option>
            <option value="pesto">Pesto</option>
            <option value="alfredo">Alfredo</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Cheese</label>
          <select
            value={cheese}
            onChange={(e) => setCheese(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Cheese</option>
            <option value="mozzarella">Mozzarella</option>
            <option value="cheddar">Cheddar</option>
            <option value="parmesan">Parmesan</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Veggies</label>
          <div className="flex flex-wrap">
            {["Tomatoes", "Onions", "Peppers", "Olives", "Mushrooms"].map(
              (veggie) => (
                <label key={veggie} className="mr-4">
                  <input
                    type="checkbox"
                    value={veggie.toLowerCase()}
                    checked={veggies.includes(veggie.toLowerCase())}
                    onChange={handleVeggieChange}
                    className="mr-2"
                    aria-checked={veggies.includes(veggie.toLowerCase())}
                  />
                  {veggie}
                </label>
              )
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#FFB74D] text-white rounded-lg hover:bg-[#FFA726] transition duration-300"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
