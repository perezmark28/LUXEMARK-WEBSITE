import React from 'react';
import styled from 'styled-components';
import { X, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10000;
  display: ${props => props.isOpen ? 'flex' : 'none'};
  justify-content: flex-end;
  backdrop-filter: blur(5px);
`;

const CartContainer = styled.div`
  background: white;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  overflow-y: auto;
  box-shadow: -5px 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease;
`;

const CartHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #1a1a1a 0%, #2c3e50 100%);
  color: white;
`;

const CartTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
  }
`;

const CartContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #666;
`;

const EmptyCartIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.3;
`;

const CartItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  background: #fafafa;
  border-radius: 10px;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f0f0f0;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ItemName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
`;

const ItemPrice = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
  background: linear-gradient(45deg, #ffd700, #d4af37);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: auto;
`;

const QuantityButton = styled.button`
  background: linear-gradient(45deg, #ffd700, #d4af37);
  color: #1a1a1a;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 3px 10px rgba(255, 215, 0, 0.4);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const Quantity = styled.span`
  font-weight: 600;
  min-width: 20px;
  text-align: center;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ff6b6b;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 107, 107, 0.1);
    transform: scale(1.1);
  }
`;

const CartFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #eee;
  background: white;
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 10px;
`;

const TotalLabel = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
`;

const TotalAmount = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(45deg, #ffd700, #d4af37);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const CheckoutButton = styled.button`
  width: 100%;
  background: linear-gradient(45deg, #ffd700, #d4af37);
  color: #1a1a1a;
  border: none;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(255, 215, 0, 0.4);
  }
`;

const Cart = () => {
  const { 
    isOpen, 
    items, 
    setCartOpen, 
    updateQuantity, 
    removeFromCart, 
    getTotalPrice, 
    clearCart 
  } = useCart();

  const handleCheckout = () => {
    alert('Proceeding to checkout... (Demo)');
    // In a real app, this would redirect to checkout page
  };

  return (
    <CartOverlay isOpen={isOpen} onClick={() => setCartOpen(false)}>
      <CartContainer isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <CartHeader>
          <CartTitle>
            <ShoppingBag size={20} />
            Shopping Cart ({items.length})
          </CartTitle>
          <CloseButton onClick={() => setCartOpen(false)} className="interactive">
            <X size={20} />
          </CloseButton>
        </CartHeader>

        <CartContent>
          {items.length === 0 ? (
            <EmptyCart>
              <EmptyCartIcon>🛍️</EmptyCartIcon>
              <h3>Your cart is empty</h3>
              <p>Add some luxury watches to get started!</p>
            </EmptyCart>
          ) : (
            items.map(item => (
              <CartItem key={item.id}>
                <ItemImage src={item.image} alt={item.name} className="product-image" />
                <ItemDetails>
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>${item.price.toLocaleString()}</ItemPrice>
                  <QuantityControls>
                    <QuantityButton
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="interactive"
                    >
                      <Minus size={12} />
                    </QuantityButton>
                    <Quantity>{item.quantity}</Quantity>
                    <QuantityButton
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="interactive"
                    >
                      <Plus size={12} />
                    </QuantityButton>
                    <RemoveButton
                      onClick={() => removeFromCart(item.id)}
                      title="Remove item"
                      className="interactive"
                    >
                      <X size={16} />
                    </RemoveButton>
                  </QuantityControls>
                </ItemDetails>
              </CartItem>
            ))
          )}
        </CartContent>

        {items.length > 0 && (
          <CartFooter>
            <TotalContainer>
              <TotalLabel>Total:</TotalLabel>
              <TotalAmount>${getTotalPrice().toLocaleString()}</TotalAmount>
            </TotalContainer>
            <CheckoutButton onClick={handleCheckout} className="buy-button">
              <CreditCard size={20} />
              Proceed to Checkout
            </CheckoutButton>
          </CartFooter>
        )}
      </CartContainer>
    </CartOverlay>
  );
};

export default Cart;