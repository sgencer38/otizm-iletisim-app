import React from 'react';
import { Card as MuiCard, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useSettings } from '../contexts/SettingsContext';

const CARD_SIZES = {
  small: 120,
  medium: 160,
  large: 200
};

const FONT_SIZES = {
  small: '0.875rem',
  medium: '1rem',
  large: '1.25rem'
};

export default function Card({ item, onSelect, isFavorite, onToggleFavorite }) {
  const { settings, toggleFavorite } = useSettings();
  const cardSize = CARD_SIZES[settings.cardSize];
  const fontSize = FONT_SIZES[settings.fontSize];

  const handleClick = () => {
    if (onSelect) {
      onSelect(item);
    }
    const utterance = new SpeechSynthesisUtterance(item.name);
    utterance.lang = 'tr-TR';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <MuiCard 
      sx={{ 
        width: cardSize * 1.5,
        cursor: 'pointer',
        position: 'relative',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.05)',
        }
      }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        height={cardSize}
        image={item.image}
        alt={item.name}
        sx={{ 
          objectFit: 'cover',
          borderRadius: '8px 8px 0 0'
        }}
      />
      <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
        <Typography 
          gutterBottom 
          variant="h6" 
          component="div"
          align="center"
          sx={{ 
            fontSize: fontSize,
            mb: 0
          }}
        >
          {item.name}
        </Typography>
      </CardContent>
      {onToggleFavorite && (
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.9)',
            }
          }}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(item.id);
          }}
        >
          {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
        </IconButton>
      )}
    </MuiCard>
  );
}
