import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';
import { watchesData, categories } from './data/watches';
import { Award, Shield, Truck } from 'lucide-react';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
    line-height: 1.6;
    color: #333;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh;
  }
  
  button {
    font-family: inherit;
  }
  
  * {
    scrollbar-width: thin;
    scrollbar-color: #ffd700 #f1f1f1;
  }
  
  *::-webkit-scrollbar {
    width: 8px;
  }
  
  *::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  *::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #ffd700, #d4af37);
    border-radius: 4px;
  }
  
  *::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(45deg, #d4af37, #b8860b);
  }
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.9) 0%, rgba(44, 62, 80, 0.9) 100%),
              url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 6rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 2;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #ffd700, #ffffff, #d4af37);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const HeroButton = styled.button`
  background: linear-gradient(45deg, #ffd700, #d4af37);
  color: #1a1a1a;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(255, 215, 0, 0.4);
  }
`;

const FeaturesSection = styled.section`
  padding: 4rem 0;
  background: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const FeatureCard = styled.div`
  text-align: center;
  padding: 2rem;
  background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #ffd700, #d4af37);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: #1a1a1a;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #2c3e50;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #ffd700, #d4af37);
    border-radius: 2px;
  }
`;

const ProductsSection = styled.section`
  padding: 4rem 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const FilterButton = styled.button`
  background: ${props => props.active ? 'linear-gradient(45deg, #ffd700, #d4af37)' : 'white'};
  color: ${props => props.active ? '#1a1a1a' : '#666'};
  border: 2px solid ${props => props.active ? 'transparent' : '#ddd'};
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  
  &:hover {
    background: linear-gradient(45deg, #ffd700, #d4af37);
    color: #1a1a1a;
    border-color: transparent;
    transform: translateY(-2px);
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredWatches = selectedCategory === 'all' 
    ? watchesData 
    : watchesData.filter(watch => watch.category === selectedCategory);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleQuickView = (product) => {
    // Implement quick view modal
    console.log('Quick view:', product);
  };

  const scrollToCollection = () => {
    document.getElementById('collection').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <CartProvider>
      <GlobalStyle />
      
      <Header />
      
      <HeroSection id="home">
        <HeroContent>
          <HeroTitle>LuxeMark Watches</HeroTitle>
          <HeroSubtitle>Time that Speaks Style</HeroSubtitle>
          <HeroButton 
            onClick={scrollToCollection}
            className="buy-button"
          >
            Explore Collection
          </HeroButton>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <Container>
          <SectionTitle>Why Choose LuxeMark?</SectionTitle>
          <FeaturesGrid>
            <FeatureCard className="interactive">
              <FeatureIcon>
                <Award size={24} />
              </FeatureIcon>
              <h3>Premium Quality</h3>
              <p>Handcrafted with the finest materials and Swiss precision movements for unmatched quality.</p>
            </FeatureCard>
            
            <FeatureCard className="interactive">
              <FeatureIcon>
                <Shield size={24} />
              </FeatureIcon>
              <h3>Lifetime Warranty</h3>
              <p>Every LuxeMark watch comes with comprehensive lifetime warranty and expert service support.</p>
            </FeatureCard>
            
            <FeatureCard className="interactive">
              <FeatureIcon>
                <Truck size={24} />
              </FeatureIcon>
              <h3>Free Shipping</h3>
              <p>Complimentary worldwide shipping with secure packaging and tracking for your peace of mind.</p>
            </FeatureCard>
          </FeaturesGrid>
        </Container>
      </FeaturesSection>

      <ProductsSection id="collection">
        <Container>
          <SectionTitle>Our Collection</SectionTitle>
          
          <FilterContainer>
            {categories.map(category => (
              <FilterButton
                key={category.id}
                active={selectedCategory === category.id}
                onClick={() => handleCategoryChange(category.id)}
                className="interactive"
              >
                {category.name} ({category.count})
              </FilterButton>
            ))}
          </FilterContainer>
          
          <ProductsGrid>
            {filteredWatches.map(watch => (
              <ProductCard
                key={watch.id}
                product={watch}
                onQuickView={handleQuickView}
              />
            ))}
          </ProductsGrid>
        </Container>
      </ProductsSection>
      
      <Cart />
    </CartProvider>
  );
};

export default App;