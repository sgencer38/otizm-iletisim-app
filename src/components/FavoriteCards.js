import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import Card from './Card';
import { useSettings } from '../contexts/SettingsContext';
import { categories } from '../data/categories';

export default function FavoriteCards({ onCardSelect }) {
  const { settings } = useSettings();

  // Tüm kategorilerden favori kartları bulma
  const favoriteItems = categories
    .flatMap(category => category.items)
    .filter(item => settings.favorites.includes(item.id));

  if (favoriteItems.length === 0) {
    return (
      <Paper elevation={2} sx={{ m: 2, p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Henüz favori kart eklemediniz
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={2} sx={{ m: 2, p: 2 }}>
      <Typography 
        variant="h5" 
        component="h2" 
        gutterBottom
        sx={{ 
          fontSize: settings.fontSize === 'large' ? '1.8rem' : 
                   settings.fontSize === 'medium' ? '1.5rem' : '1.2rem'
        }}
      >
        Favori Kartlarım
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} justifyContent="center">
          {favoriteItems.map((item) => (
            <Grid item key={item.id}>
              <Card
                item={item}
                onSelect={onCardSelect}
                isFavorite={true}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
}
