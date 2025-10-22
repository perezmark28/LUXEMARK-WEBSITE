import React, { useState } from 'react';
import styled from 'styled-components';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Card = styled.div`
  background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #ffd700, #d4af37, #b8860b);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  margin-bottom: 1rem;
  height: 250px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255, 215, 0, 0.1), rgba(212, 175, 55, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  
  ${Card}:hover & {
    opacity: 1;
  }
`;

const OverlayButton = styled.button`
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: #ffd700;
    color: #1a1a1a;
    transform: scale(1.1);
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: ${props => props.type === 'sale' ? 'linear-gradient(45deg, #ff6b6b, #ff8e8e)' : 'linear-gradient(45deg, #4ecdc4, #44a08d)'};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
`;

const WishlistButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${props => props.isWishlisted ? '#ff6b6b' : '#666'};
  
  &:hover {
    background: #fff;
    transform: scale(1.1);
    color: #ff6b6b;
  }
`;

const ProductInfo = styled.div`
  text-align: center;
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2c3e50;
`;

const ProductBrand = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Price = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(45deg, #ffd700, #d4af37);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const OriginalPrice = styled.span`
  font-size: 1rem;
  color: #999;
  text-decoration: line-through;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  margin-bottom: 1rem;
`;

const RatingStars = styled.div`
  display: flex;
  gap: 2px;
`;

const RatingText = styled.span`
  font-size: 0.85rem;
  color: #666;
  margin-left: 0.5rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
`;

const AddToCartButton = styled.button`
  background: linear-gradient(45deg, #ffd700, #d4af37);
  color: #1a1a1a;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  justify-content: center;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const QuickViewButton = styled.button`
  background: rgba(44, 62, 80, 0.1);
  color: #2c3e50;
  border: 2px solid #2c3e50;
  padding: 0.75rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #2c3e50;
    color: white;
    transform: scale(1.1);
  }
`;

const StockStatus = styled.div`
  font-size: 0.8rem;
  color: ${props => props.inStock ? '#4ecdc4' : '#ff6b6b'};
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ProductCard = ({ product, onQuickView }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart, getItemQuantity } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={14} fill="#ffd700" color="#ffd700" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" size={14} fill="url(#halfStar)" color="#ffd700" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={14} color="#ddd" />);
    }

    return stars;
  };

  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <Card>
      <ImageContainer>
        <ProductImage 
          src={product.image} 
          alt={product.name}
          className="product-image"
        />
        
        <ImageOverlay>
          <OverlayButton 
            onClick={() => onQuickView && onQuickView(product)}
            title="Quick View"
            className="interactive"
          >
            <Eye size={18} />
          </OverlayButton>
          <OverlayButton 
            onClick={toggleWishlist}
            title="Add to Wishlist"
            className="interactive"
          >
            <Heart size={18} fill={isWishlisted ? '#ff6b6b' : 'none'} />
          </OverlayButton>
        </ImageOverlay>
        
        {discount > 0 && (
          <Badge type="sale">-{discount}%</Badge>
        )}
        
        <WishlistButton 
          isWishlisted={isWishlisted} 
          onClick={toggleWishlist}
          className="interactive"
        >
          <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
        </WishlistButton>
      </ImageContainer>
      
      <ProductInfo>
        <ProductBrand>{product.brand}</ProductBrand>
        <ProductName>{product.name}</ProductName>
        
        <Rating>
          <RatingStars>
            {renderStars(product.rating)}
          </RatingStars>
          <RatingText>({product.reviews})</RatingText>
        </Rating>
        
        <PriceContainer>
          <Price>${product.price.toLocaleString()}</Price>
          {product.originalPrice && (
            <OriginalPrice>${product.originalPrice.toLocaleString()}</OriginalPrice>
          )}
        </PriceContainer>
        
        <StockStatus inStock={product.inStock}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </StockStatus>
        
        <ActionButtons>
          <AddToCartButton 
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="buy-button"
          >
            <ShoppingCart size={18} />
            {getItemQuantity(product.id) > 0 ? `In Cart (${getItemQuantity(product.id)})` : 'Add to Cart'}
          </AddToCartButton>
          
          <QuickViewButton 
            onClick={() => onQuickView && onQuickView(product)}
            className="interactive"
          >
            <Eye size={18} />
          </QuickViewButton>
        </ActionButtons>
      </ProductInfo>
    </Card>
  );
};

export default ProductCard;