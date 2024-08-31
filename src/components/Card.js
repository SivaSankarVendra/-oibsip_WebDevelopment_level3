import React, { useState } from "react";
import Modal from "./Modal";
import { useDispatch} from "./ContentReducer";
import Alert from "./Alert";

const Card = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customizations, setCustomizations] = useState({});
  const [alert, setAlert] = useState(null); 
  const dispatch = useDispatch();
  console.log(customizations)

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleAddToCart = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSave = async (customizations) => {
    const options = props.options[0];
    const priceStr = options[selectedSize];
    const price = parseFloat(priceStr);
    const finalPrice = quantity * (isNaN(price) ? 0 : price);

    try {
      await dispatch({
        type: "ADD",
        _id: props._id,
        name: props.name,
        price: finalPrice,
        size: selectedSize,
        quantity: quantity,
        img: props.img,
        customizations: customizations,
      });
      setAlert({ message: "Item added to cart successfully!", type: "success" });
      setTimeout(() => {
        setAlert(null);
      }, 1000);
      
    } catch (error) {
      setAlert({ message: "Failed to add item to cart.", type: "error" });
      setTimeout(() => {
        setAlert(null);
      }, 1000);
    }
    setIsModalOpen(false);
  };

  const options = props.options[0];
  const priceStr = options[selectedSize];
  const price = parseFloat(priceStr);
  const finalPrice = quantity * (isNaN(price) ? 0 : price);

  return (
    <div className="w-[290px] bg-[#F9F9F9] border border-gray-200 shadow-lg rounded-lg overflow-hidden mx-auto my-4 p-4">
      <img
        src={props.img}
        alt="Pizza"
        className="w-full h-40 object-contain"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{props.name}</h2>

        <div className="flex justify-between">
          <div className="mb-4">
            <select
              value={selectedSize}
              onChange={handleSizeChange}
              className="block w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="Regular">Regular</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
          <div className="mb-4 flex items-center space-x-2">
            <button
              onClick={handleDecrease}
              disabled={quantity === 1}
              className={`px-2 py-[2px] bg-gray-200 text-gray-800 rounded-lg ${
                quantity === 1
                  ? "cursor-not-allowed"
                  : "hover:bg-gray-300"
              }`}
            >
              -
            </button>
            <span className="text-lg">{quantity}</span>
            <button
              onClick={handleIncrease}
              className="px-2 py-[2px] bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="text-lg font-semibold text-gray-900 mt-2 mb-2">
            ₹ {finalPrice.toFixed(2)}
          </p>
          <button
            onClick={handleAddToCart}
            className="px-3 py-2 bg-[#FFB74D] text-white rounded-lg hover:bg-[#FFA726] transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleModalSave}
        setCustomizations={setCustomizations}
      />

      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
        />
      )}
    </div>
  );
};

export default Card;
