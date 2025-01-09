import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Slider, 
  FormControl, 
  FormLabel,
  Switch,
  FormControlLabel
} from '@mui/material';
import { useSettings } from '../contexts/SettingsContext';

export default function UserSettings() {
  const { settings, updateSettings } = useSettings();

  const handleCardSizeChange = (event, newValue) => {
    const sizes = ['small', 'medium', 'large'];
    updateSettings({ ...settings, cardSize: sizes[newValue - 1] });
  };

  const handleFontSizeChange = (event, newValue) => {
    const sizes = ['small', 'medium', 'large'];
    updateSettings({ ...settings, fontSize: sizes[newValue - 1] });
  };

  const handleThemeChange = (event) => {
    updateSettings({ ...settings, theme: event.target.checked ? 'dark' : 'light' });
  };

  const sizeToValue = (size) => {
    const sizes = ['small', 'medium', 'large'];
    return sizes.indexOf(size) + 1;
  };

  return (
    <Paper elevation={3} sx={{ p: 3, m: 2 }}>
      <Typography variant="h5" gutterBottom>
        Ayarlar
      </Typography>

      <Box sx={{ my: 4 }}>
        <FormControl fullWidth>
          <FormLabel>Kart Boyutu</FormLabel>
          <Slider
            value={sizeToValue(settings.cardSize)}
            min={1}
            max={3}
            step={1}
            marks={[
              { value: 1, label: 'Küçük' },
              { value: 2, label: 'Orta' },
              { value: 3, label: 'Büyük' },
            ]}
            onChange={handleCardSizeChange}
          />
        </FormControl>
      </Box>

      <Box sx={{ my: 4 }}>
        <FormControl fullWidth>
          <FormLabel>Yazı Boyutu</FormLabel>
          <Slider
            value={sizeToValue(settings.fontSize)}
            min={1}
            max={3}
            step={1}
            marks={[
              { value: 1, label: 'Küçük' },
              { value: 2, label: 'Orta' },
              { value: 3, label: 'Büyük' },
            ]}
            onChange={handleFontSizeChange}
          />
        </FormControl>
      </Box>

      <Box sx={{ my: 4 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.theme === 'dark'}
              onChange={handleThemeChange}
            />
          }
          label="Koyu Tema"
        />
      </Box>
    </Paper>
  );
}
