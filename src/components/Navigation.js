import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Box,
  Button,
  useTheme,
  Avatar,
  Chip,
  Stack
} from '@mui/material';
import {
  Favorite,
  Settings,
  Home,
  VolumeUp,
  Logout,
  Login,
  ArrowBack,
  Clear
} from '@mui/icons-material';
import { auth } from '../services/firebase';
import { signOut } from 'firebase/auth';
import { useSettings } from '../contexts/SettingsContext';

export default function Navigation({ onNavigate, selectedItems = [], user, onLoginClick, onBack, onSelect }) {
  const theme = useTheme();
  const { settings } = useSettings();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Çıkış yapılırken hata oluştu:', error);
    }
  };

  const handleReadSelected = () => {
    if (selectedItems.length > 0) {
      const readText = selectedItems.map(item => item.name).join(', ');
      const utterance = new SpeechSynthesisUtterance(readText);
      utterance.lang = 'tr-TR';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ flexDirection: 'column' }}>
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', mb: selectedItems.length > 0 ? 1 : 0 }}>
          {onBack ? (
            <IconButton
              color="inherit"
              onClick={onBack}
              sx={{ mr: 1 }}
            >
              <ArrowBack />
            </IconButton>
          ) : (
            <IconButton
              color="inherit"
              onClick={() => onNavigate('home')}
            >
              <Home />
            </IconButton>
          )}

          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontSize: settings.fontSize === 'large' ? '1.5rem' : 
                       settings.fontSize === 'medium' ? '1.25rem' : '1rem'
            }}
          >
            İletişim Kartları
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <IconButton
              color="inherit"
              onClick={() => onNavigate('favorites')}
              title={user ? 'Favorilerim' : 'Favoriler için giriş yapın'}
            >
              <Favorite />
            </IconButton>

            <IconButton
              color="inherit"
              onClick={() => onNavigate('settings')}
            >
              <Settings />
            </IconButton>

            {user ? (
              <IconButton
                color="inherit"
                onClick={handleSignOut}
                title="Çıkış Yap"
              >
                <Logout />
              </IconButton>
            ) : (
              <IconButton
                color="inherit"
                onClick={onLoginClick}
                title="Giriş Yap"
              >
                <Login />
              </IconButton>
            )}
          </Box>
        </Box>

        {selectedItems.length > 0 && (
          <Box sx={{ 
            width: '100%', 
            display: 'flex', 
            alignItems: 'center',
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 1,
            p: 1
          }}>
            <Stack 
              direction="row" 
              spacing={1} 
              sx={{ 
                flexGrow: 1, 
                overflowX: 'auto',
                '&::-webkit-scrollbar': {
                  height: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: '4px',
                },
              }}
            >
              {selectedItems.map((item, index) => (
                <Chip
                  key={item.id}
                  avatar={<Avatar src={item.image} alt={item.name} />}
                  label={item.name}
                  sx={{ 
                    color: 'white',
                    '& .MuiChip-avatar': {
                      width: 24,
                      height: 24,
                    }
                  }}
                />
              ))}
            </Stack>
            
            <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
              <Button
                variant="contained"
                startIcon={<VolumeUp />}
                onClick={handleReadSelected}
                sx={{ 
                  bgcolor: 'success.main',
                  '&:hover': {
                    bgcolor: 'success.dark',
                  }
                }}
              >
                Oku
              </Button>
              
              <Button
                variant="contained"
                startIcon={<Clear />}
                onClick={() => onSelect([])}
                sx={{ 
                  bgcolor: 'error.main',
                  '&:hover': {
                    bgcolor: 'error.dark',
                  }
                }}
              >
                Temizle
              </Button>
            </Box>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
