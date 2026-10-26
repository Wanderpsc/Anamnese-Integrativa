import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Alert
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  LocalDrink as HydroIcon,
  LocalFlorist as PhytoIcon,
  Restaurant as FoodIcon,
  FitnessCenter as HabitIcon,
  Medication as SupplementIcon,
  Info as InfoIcon
} from '@mui/icons-material';

/**
 * Componente para exibir protocolos de tratamento natural do Dr. Daniel Boarim
 */
export default function BoarimProtocol({ protocol }) {
  if (!protocol) return null;

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 2, backgroundColor: '#f9fbe7' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <PhytoIcon sx={{ fontSize: 40, color: '#558b2f', mr: 2 }} />
        <Box>
          <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
            {protocol.condicao}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {protocol.referencia}
          </Typography>
        </Box>
      </Box>

      {/* Hidroterapia */}
      {protocol.hidroterapia && protocol.hidroterapia.length > 0 && (
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <HydroIcon sx={{ mr: 1, color: '#0288d1' }} />
              <Typography variant="h6">Hidroterapia</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {protocol.hidroterapia.map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Chip label={index + 1} size="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Fitoterapia */}
      {protocol.fitoterapia && protocol.fitoterapia.length > 0 && (
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PhytoIcon sx={{ mr: 1, color: '#388e3c' }} />
              <Typography variant="h6">Fitoterapia (Plantas Medicinais)</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {protocol.fitoterapia.map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Chip label={index + 1} size="small" sx={{ backgroundColor: '#81c784' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.split(':')[0]} 
                    secondary={item.split(':')[1] || ''}
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Alimentação */}
      {protocol.alimentacao && protocol.alimentacao.length > 0 && (
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FoodIcon sx={{ mr: 1, color: '#f57c00' }} />
              <Typography variant="h6">Orientações Alimentares</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {protocol.alimentacao.map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Chip label={index + 1} size="small" sx={{ backgroundColor: '#ffb74d' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item}
                    primaryTypographyProps={{
                      color: item.toLowerCase().includes('evitar') ? 'error' : 'text.primary',
                      fontWeight: item.toLowerCase().includes('evitar') ? 'bold' : 'normal'
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Suplementação */}
      {protocol.suplementacao && protocol.suplementacao.length > 0 && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SupplementIcon sx={{ mr: 1, color: '#7b1fa2' }} />
              <Typography variant="h6">Suplementação Natural</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {protocol.suplementacao.map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Chip label={index + 1} size="small" sx={{ backgroundColor: '#ba68c8' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.split(':')[0]} 
                    secondary={item.split(':')[1] || ''}
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Hábitos de Vida */}
      {protocol.habitos && protocol.habitos.length > 0 && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <HabitIcon sx={{ mr: 1, color: '#d32f2f' }} />
              <Typography variant="h6">Hábitos de Vida e Exercícios</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {protocol.habitos.map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Chip label={index + 1} size="small" sx={{ backgroundColor: '#ef5350' }} />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Observações Importantes */}
      {protocol.observacoes && (
        <Alert 
          severity="warning" 
          icon={<InfoIcon />}
          sx={{ mt: 2 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
            Observações Importantes:
          </Typography>
          <Typography variant="body2">
            {protocol.observacoes}
          </Typography>
        </Alert>
      )}

      <Box sx={{ mt: 2, p: 2, backgroundColor: '#fff9c4', borderRadius: 1 }}>
        <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
          ℹ️ Protocolo baseado no Manual Prático de Tratamentos Naturais do Dr. Daniel S. F. Boarim 
          (15ª Edição, 2014). Consulte sempre um profissional de saúde qualificado antes de iniciar 
          qualquer tratamento.
        </Typography>
      </Box>
    </Paper>
  );
}
