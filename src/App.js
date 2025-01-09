import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Container, Box, Dialog, Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { auth } from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { lightTheme, darkTheme } from './styles/theme';
import { SettingsProvider, useSettings } from './contexts/SettingsContext';
import Navigation from './components/Navigation';
import Login from './components/Login';
import CategoryGrid from './components/CategoryGrid';
import FavoriteCards from './components/FavoriteCards';
import UserSettings from './components/UserSettings';
import { categories } from './data/categories';

function CategoryCard({ category, onClick }) {
  const { settings } = useSettings();
  const cardSize = settings.cardSize === 'large' ? 200 : 
                  settings.cardSize === 'medium' ? 160 : 120;

  return (
    <Card 
      sx={{ 
        width: cardSize * 1.5, 
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.05)',
        }
      }}
      onClick={() => onClick(category)}
    >
      <CardMedia
        component="img"
        height={cardSize}
        image={category.icon}
        alt={category.title}
        sx={{ objectFit: 'contain', p: 1 }}
      />
      <CardContent>
        <Typography 
          gutterBottom 
          variant="h6" 
          component="div"
          align="center"
          sx={{ 
            fontSize: settings.fontSize === 'large' ? '1.5rem' : 
                     settings.fontSize === 'medium' ? '1.25rem' : '1rem'
          }}
        >
          {category.title}
        </Typography>
      </CardContent>
    </Card>
  );
}

function AppContent() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loginOpen, setLoginOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { settings } = useSettings();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleCardSelect = (item) => {
    setSelectedItems(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.filter(i => i.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const handleSetSelectedItems = (items) => {
    setSelectedItems(items);
  };

  const handleLoginClick = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  return (
    <ThemeProvider theme={settings.theme === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navigation 
          onNavigate={setCurrentView} 
          selectedItems={selectedItems}
          onSelect={handleSetSelectedItems}
          user={user}
          onLoginClick={handleLoginClick}
          onBack={selectedCategory ? handleBackToCategories : undefined}
        />
        
        <Container sx={{ flexGrow: 1, py: 2 }}>
          {currentView === 'home' && !selectedCategory && (
            <Grid container spacing={3} justifyContent="center">
              {categories.map(category => (
                <Grid item key={category.id}>
                  <CategoryCard 
                    category={category}
                    onClick={handleCategoryClick}
                  />
                </Grid>
              ))}
            </Grid>
          )}

          {currentView === 'home' && selectedCategory && (
            <CategoryGrid
              category={selectedCategory}
              onCardSelect={handleCardSelect}
              onBack={handleBackToCategories}
            />
          )}
          
          {currentView === 'favorites' && (
            user ? (
              <FavoriteCards onCardSelect={handleCardSelect} />
            ) : (
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                Favorileri görmek için giriş yapmalısınız
              </Box>
            )
          )}
          
          {currentView === 'settings' && <UserSettings />}
        </Container>

        <Dialog open={loginOpen} onClose={handleLoginClose}>
          <Login onSuccess={handleLoginClose} />
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}
