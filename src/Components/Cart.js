import { FaTrash, FaWhatsapp } from "react-icons/fa";
import "./Cart.css";

const Cart = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Function to handle item removal
  const handleRemoveItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    // Update cart state to trigger re-render
    window.location.reload(); // Consider using React state to re-render the component
  };

  // Calculate total price of items in the cart
  const totalPrice = cart.reduce((total, item) => total + item.newPrice * item.quantity, 0);


  // Function to generate WhatsApp message
  const generateWhatsAppMessage = () => {
    const message = cart.map(item => 
      `Product: ${item.title}\n` +
      `Color: ${item.color}\n` +
      `Size: ${item.size}\n` +
      `Quantity: ${item.quantity}\n` +
      `Price: EGP ${item.newPrice.toFixed()}\n` +
      `---------------------------\n`
    ).join('') +
    `Total Price: EGP ${totalPrice.toFixed(2)}\n\n` +
    `I am interested in purchasing the above order. Please let me know the next steps to complete the order. Thank you!`;

    return `https://wa.me/+201201728706?text=${encodeURIComponent(message)}`;
  };

 
  return (
    <div className="cart-container">
      <h2>Your <span className="color">Cart</span></h2>
      {cart.length === 0 ? (
        <p className="empty">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img
                  src={item.img}
                  alt={item.title}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <button
                    className="remove"
                    onClick={() => handleRemoveItem(index)}
                  >
                    <FaTrash />
                  </button>

                  <h3 className="cart-item-title">{item.title}</h3>
                  <p className="cart-item-details">
                    Color: {item.color} <br />
                    Size: {item.size} <br />
                    Quantity: {item.quantity}
                  </p>
                  <div className="price-container">
                    <span className="old-price">
                      EGP {item.oldPrice.toFixed()}
                    </span>
                    <span className="new-price">
                      <span className="egp">EGP</span> {item.newPrice.toFixed()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="total-price">
            <h3><span className="total">Total Price :</span> EGP {totalPrice.toFixed()}</h3>
          
            <a 
              href={generateWhatsAppMessage()} 
              className='btn btn-success'
              target="_blank" 
              rel="noopener noreferrer"
            >
              Order on WhatsApp <FaWhatsapp />
            </a>
          </div>
        </>
      )}

    </div>
  );
};

export default Cart;
