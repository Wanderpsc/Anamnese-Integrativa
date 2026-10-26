import { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Badge,
  IconButton,
  Divider,
  Alert
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  WhatsApp as WhatsAppIcon,
  Email as EmailIcon,
  Cake as CakeIcon,
  Event as EventIcon,
  PersonAdd as PersonAddIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { reminderSystem, MESSAGE_TEMPLATES } from '../lib/appointmentNotifications';

export default function ReminderPanel({ open, onClose }) {
  const [reminders, setReminders] = useState([]);
  const [birthdays, setBirthdays] = useState([]);
  const [followUps, setFollowUps] = useState([]);

  useEffect(() => {
    if (open) {
      loadNotifications();
    }
  }, [open]);

  const loadNotifications = () => {
    // Carregar lembretes de agendamentos
    const appointmentReminders = reminderSystem.checkReminders();
    setReminders(appointmentReminders);

    // Carregar aniversariantes
    const birthdaysToday = reminderSystem.getBirthdaysToday();
    setBirthdays(birthdaysToday);

    // Carregar follow-ups necessários (30 dias)
    const followUpNeeded = reminderSystem.getFollowUpNeeded(30);
    setFollowUps(followUpNeeded);
  };

  const sendReminder = (reminder, channel) => {
    const appointment = reminder.appointment;
    const message = reminder.message;

    if (channel === 'whatsapp') {
      const whatsappUrl = `https://wa.me/55${appointment.patientPhone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } else if (channel === 'email') {
      const emailUrl = `mailto:${appointment.patientEmail}?subject=${encodeURIComponent('Lembrete de Consulta')}&body=${encodeURIComponent(message)}`;
      window.open(emailUrl, '_blank');
    }

    // Marcar lembrete como enviado
    reminderSystem.markReminderSent(appointment.id, reminder.type);
    loadNotifications();
  };

  const sendBirthdayGreeting = (patient, channel) => {
    const age = calculateAge(patient.data_nasc || patient.q02_data_nasc);
    const message = MESSAGE_TEMPLATES.birthdayGreeting(patient.nome, age);

    if (channel === 'whatsapp') {
      const phone = patient.telefone || patient.celular;
      const whatsappUrl = `https://wa.me/55${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const sendFollowUpMessage = (followUp, channel) => {
    const message = MESSAGE_TEMPLATES.followUpRequest(
      followUp.patient.nome,
      followUp.lastAppointment.date
    );

    if (channel === 'whatsapp') {
      const phone = followUp.patient.telefone || followUp.patient.celular;
      const whatsappUrl = `https://wa.me/55${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const totalNotifications = reminders.length + birthdays.length + followUps.length;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Badge badgeContent={totalNotifications} color="error">
            <NotificationsIcon />
          </Badge>
          <Typography variant="h6">Central de Notificações</Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {totalNotifications === 0 ? (
          <Alert severity="info">
            Nenhuma notificação pendente no momento! ✨
          </Alert>
        ) : (
          <>
            {/* Lembretes de Agendamentos */}
            {reminders.length > 0 && (
              <>
                <Typography variant="h6" sx={{ mb: 2, color: '#1976d2' }}>
                  ⏰ Lembretes de Consultas ({reminders.length})
                </Typography>
                <List>
                  {reminders.map((reminder, idx) => (
                    <ListItem 
                      key={idx}
                      sx={{ 
                        backgroundColor: '#f5f5f5', 
                        mb: 1, 
                        borderRadius: 1,
                        border: '1px solid #e0e0e0'
                      }}
                    >
                      <ListItemIcon>
                        <EventIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={reminder.appointment.patientName}
                        secondary={
                          <>
                            {reminder.type === '24h' ? '24 horas antes' : '3 horas antes'} -{' '}
                            {new Date(reminder.appointment.date).toLocaleDateString('pt-BR')} às {reminder.appointment.time}
                          </>
                        }
                      />
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          color="success"
                          onClick={() => sendReminder(reminder, 'whatsapp')}
                          title="Enviar WhatsApp"
                        >
                          <WhatsAppIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => sendReminder(reminder, 'email')}
                          title="Enviar Email"
                        >
                          <EmailIcon />
                        </IconButton>
                      </Box>
                    </ListItem>
                  ))}
                </List>
                <Divider sx={{ my: 2 }} />
              </>
            )}

            {/* Aniversariantes */}
            {birthdays.length > 0 && (
              <>
                <Typography variant="h6" sx={{ mb: 2, color: '#9c27b0' }}>
                  🎂 Aniversariantes de Hoje ({birthdays.length})
                </Typography>
                <List>
                  {birthdays.map((patient, idx) => {
                    const age = calculateAge(patient.data_nasc || patient.q02_data_nasc);
                    return (
                      <ListItem 
                        key={idx}
                        sx={{ 
                          backgroundColor: '#f3e5f5', 
                          mb: 1, 
                          borderRadius: 1,
                          border: '1px solid #e1bee7'
                        }}
                      >
                        <ListItemIcon>
                          <CakeIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={patient.nome}
                          secondary={`${age} anos hoje! 🎉`}
                        />
                        <IconButton
                          size="small"
                          color="success"
                          onClick={() => sendBirthdayGreeting(patient, 'whatsapp')}
                          title="Enviar parabéns"
                        >
                          <WhatsAppIcon />
                        </IconButton>
                      </ListItem>
                    );
                  })}
                </List>
                <Divider sx={{ my: 2 }} />
              </>
            )}

            {/* Follow-ups Necessários */}
            {followUps.length > 0 && (
              <>
                <Typography variant="h6" sx={{ mb: 2, color: '#f57c00' }}>
                  📞 Follow-ups Sugeridos ({followUps.length})
                </Typography>
                <List>
                  {followUps.map((followUp, idx) => (
                    <ListItem 
                      key={idx}
                      sx={{ 
                        backgroundColor: '#fff3e0', 
                        mb: 1, 
                        borderRadius: 1,
                        border: '1px solid #ffe0b2'
                      }}
                    >
                      <ListItemIcon>
                        <PersonAddIcon color="warning" />
                      </ListItemIcon>
                      <ListItemText
                        primary={followUp.patient.nome}
                        secondary={`Última consulta: ${followUp.daysSinceLastVisit} dias atrás`}
                      />
                      <IconButton
                        size="small"
                        color="success"
                        onClick={() => sendFollowUpMessage(followUp, 'whatsapp')}
                        title="Enviar convite para retorno"
                      >
                        <WhatsAppIcon />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
        <Button variant="contained" onClick={loadNotifications}>
          Atualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
