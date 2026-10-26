import React from 'react';
import { Box, Alert, AlertTitle, Button, Typography } from '@mui/material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidUpdate(prevProps) {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false, error: null, errorInfo: null });
    }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary capturou erro:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 3 }}>
          <Alert severity="error">
            <AlertTitle>Erro ao carregar o componente</AlertTitle>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {this.props.message || 'Ocorreu um erro ao carregar esta página.'}
            </Typography>
            {this.state.error && (
              <Typography variant="caption" component="pre" sx={{ whiteSpace: 'pre-wrap', bgcolor: '#fff', p: 1, borderRadius: 1 }}>
                {this.state.error.toString()}
                {'\n\n'}
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </Typography>
            )}
            <Button
              onClick={() => {
                this.setState({ hasError: false, error: null, errorInfo: null });
                window.location.reload();
              }}
              variant="contained"
              sx={{ mt: 2 }}
            >
              Recarregar Página
            </Button>
          </Alert>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
