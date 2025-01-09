import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import Card from './Card';
import { useSettings } from '../contexts/SettingsContext';

export default function CategoryGrid({ category, onCardSelect }) {
  const { settings } = useSettings();

  return (
    <Paper elevation={2} sx={{ m: 2, p: 2 }}>
      <Typography 
        variant="h5" 
        component="h2" 
        gutterBottom
        sx={{ 
          fontSize: settings.fontSize === 'large' ? '1.8rem' : 
                   settings.fontSize === 'medium' ? '1.5rem' : '1.2rem',
          mb: 3
        }}
      >
        {category.title}
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} justifyContent="center">
          {category.items.map((item) => (
            <Grid item key={item.id}>
              <Card
                item={item}
                onSelect={onCardSelect}
                isFavorite={settings.favorites.includes(item.id)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
}
