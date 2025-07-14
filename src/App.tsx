import { useState } from 'react';
import {
  Container,
  Paper,
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Alert,
} from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import { urlApi } from './api';

function App() {
  const [url, setUrl] = useState('');
  const [urls, setUrls] = useState<Array<{ originalUrl: string; shortCode: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!url.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const result = await urlApi.shortenUrl({ url });
      const shortCode = result.shortLink.split('/').pop() || '';
      setUrls(prev => [{ originalUrl: url, shortCode }, ...prev]);
      setUrl('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (shortCode: string) => {
    navigator.clipboard.writeText(`http://localhost:3001/${shortCode}`);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        URL Shortener
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Enter URL to shorten"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading || !url.trim()}
          >
            Shorten
          </Button>
        </Box>
        
        {error && <Alert severity="error">{error}</Alert>}
      </Paper>

      {urls.length > 0 && (
        <Paper>
          <Typography variant="h6" sx={{ p: 2 }}>
            Your Shortened URLs
          </Typography>
          <List>
            {urls.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`http://localhost:3001/${item.shortCode}`}
                  secondary={item.originalUrl}
                />
                <IconButton onClick={() => copyToClipboard(item.shortCode)}>
                  <ContentCopy />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Container>
  );
}

export default App;
