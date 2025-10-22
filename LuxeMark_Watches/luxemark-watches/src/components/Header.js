import React, { useState } from 'react';
import styled from 'styled-components';
import { ShoppingBag, Search, Menu, X, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import logo from '../logo.svg';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #1a1a1a 0%, #2c3e50 100%);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  img {
    height: 40px;
    width: auto;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #1a1a1a 0%, #2c3e50 100%);
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  }
`;

const NavLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    color: #ffd700;
    transform: translateY(-2px);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #ffd700, #d4af37);
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 215, 0, 0.3);
  transition: all 0.3s ease;
  
  &:focus-within {
    background: rgba(255, 255, 255, 0.15);
    border-color: #ffd700;
    box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  background: none;
  border: none;
  outline: none;
  color: #ffffff;
  margin-left: 0.5rem;
  width: 200px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    background: rgba(255, 215, 0, 0.2);
    color: #ffd700;
    transform: scale(1.1);
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: linear-gradient(45deg, #ff6b6b, #ffd700);
  color: #1a1a1a;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
  animation: pulse 2s infinite;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 0.5rem;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getTotalItems, toggleCart } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo className="interactive">
          <img src={logo} alt="LuxeMark Watches" />
        </Logo>
        
        <Nav isOpen={isMenuOpen}>
          <NavLink href="#home" className="interactive">Home</NavLink>
          <NavLink href="#collection" className="interactive">Collection</NavLink>
          <NavLink href="#about" className="interactive">About</NavLink>
          <NavLink href="#contact" className="interactive">Contact</NavLink>
        </Nav>
        
        <SearchContainer>
          <Search size={18} color="#ffd700" />
          <SearchInput
            type="text"
            placeholder="Search luxury watches..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>
        
        <IconsContainer>
          <IconButton className="interactive" title="Wishlist">
            <Heart size={20} />
          </IconButton>
          
          <IconButton className="interactive buy-button" onClick={toggleCart} title="Shopping Cart">
            <ShoppingBag size={20} />
            {getTotalItems() > 0 && (
              <CartBadge>{getTotalItems()}</CartBadge>
            )}
          </IconButton>
          
          <MobileMenuButton onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </MobileMenuButton>
        </IconsContainer>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;