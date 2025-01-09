import React, { useState } from 'react';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Container, 
  Paper,
  Switch,
  FormControlLabel,
  IconButton
} from '@mui/material';
import { Close } from '@mui/icons-material';

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      let errorMessage = 'Bir hata oluştu';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Bu e-posta adresi zaten kullanımda';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Geçersiz e-posta adresi';
          break;
        case 'auth/weak-password':
          errorMessage = 'Şifre en az 6 karakter olmalıdır';
          break;
        case 'auth/user-not-found':
          errorMessage = 'Kullanıcı bulunamadı';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Hatalı şifre';
          break;
      }
      setError(errorMessage);
    }
  };

  return (
    <Paper sx={{ position: 'relative', p: 4, maxWidth: 400 }}>
      <IconButton
        sx={{ position: 'absolute', right: 8, top: 8 }}
        onClick={onSuccess}
      >
        <Close />
      </IconButton>

      <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
        {isSignUp ? 'Kayıt Ol' : 'Giriş Yap'}
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="E-posta Adresi"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <TextField
          margin="normal"
          required
          fullWidth
          label="Şifre"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {isSignUp ? 'Kayıt Ol' : 'Giriş Yap'}
        </Button>

        <FormControlLabel
          control={
            <Switch
              checked={isSignUp}
              onChange={(e) => setIsSignUp(e.target.checked)}
            />
          }
          label={isSignUp ? 'Zaten hesabınız var mı? Giriş yapın' : 'Hesabınız yok mu? Kayıt olun'}
        />
      </Box>
    </Paper>
  );
}
