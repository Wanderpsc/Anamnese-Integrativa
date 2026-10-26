/**
 * Sistema de Notificações e Templates para Agendamentos
 * 
 * Este módulo fornece templates de mensagens profissionais para:
 * - Confirmação de agendamento
 * - Lembretes automáticos (24h, 3h antes)
 * - Reagendamento
 * - Cancelamento
 * - Pós-consulta (feedback)
 */

// Informações do terapeuta
const THERAPIST_INFO = {
  name: 'Wander Pires Silva Coelho',
  title: 'Terapeuta Integrativo Funcional',
  specialties: 'Naturopatia e Iridologia',
  registration: 'CRTH-BR 17821',
  address: 'Consulte para obter endereço',
  phone: '(00) 0000-0000',
  whatsapp: '(00) 00000-0000'
};

// Templates de mensagens
export const MESSAGE_TEMPLATES = {
  confirmation: (appointment) => `
Olá, ${appointment.patientName}! 👋

✅ *AGENDAMENTO CONFIRMADO*

Seu atendimento foi agendado com sucesso:

📅 *Data:* ${formatDate(appointment.date)}
🕐 *Horário:* ${appointment.time}
⏱️ *Duração:* ${appointment.duration} minutos
📋 *Tipo:* ${appointment.type}

📍 *Local:* ${THERAPIST_INFO.address}

${appointment.notes ? `📝 *Observações:* ${appointment.notes}\n\n` : ''}
Por favor, chegue com 10 minutos de antecedência.

Para confirmar sua presença, responda com *CONFIRMO*.
Para reagendar, responda com *REAGENDAR*.

Atenciosamente,
${THERAPIST_INFO.name}
${THERAPIST_INFO.title}
${THERAPIST_INFO.specialties}
${THERAPIST_INFO.registration}
${THERAPIST_INFO.whatsapp}
  `.trim(),

  reminder24h: (appointment) => `
Olá, ${appointment.patientName}! 👋

⏰ *LEMBRETE DE CONSULTA*

Sua consulta está agendada para *amanhã*:

📅 *Data:* ${formatDate(appointment.date)}
🕐 *Horário:* ${appointment.time}
📋 *Tipo:* ${appointment.type}
📍 *Local:* ${THERAPIST_INFO.address}

*Importante:*
• Chegue com 10 minutos de antecedência
• Traga documentos e exames anteriores
• Em caso de impossibilidade, avise com antecedência

Para confirmar, responda com *CONFIRMO*.

Até breve!
${THERAPIST_INFO.name}
${THERAPIST_INFO.registration}
  `.trim(),

  reminder3h: (appointment) => `
Olá, ${appointment.patientName}! 👋

🔔 *LEMBRETE - CONSULTA EM BREVE*

Sua consulta está agendada para *hoje* às *${appointment.time}*.

📍 *Local:* ${THERAPIST_INFO.address}

Estamos te esperando!

${THERAPIST_INFO.name}
${THERAPIST_INFO.registration}
  `.trim(),

  reschedule: (appointment, newDate, newTime) => `
Olá, ${appointment.patientName}! 👋

📅 *REAGENDAMENTO CONFIRMADO*

Sua consulta foi reagendada:

*Anterior:*
📅 ${formatDate(appointment.date)} às ${appointment.time}

*Novo agendamento:*
📅 ${formatDate(newDate)} às ${newTime}
📋 ${appointment.type}
⏱️ ${appointment.duration} minutos

📍 *Local:* ${THERAPIST_INFO.address}

Obrigado pela compreensão!

${THERAPIST_INFO.name}
${THERAPIST_INFO.registration}
  `.trim(),

  cancellation: (appointment, reason = '') => `
Olá, ${appointment.patientName}! 👋

❌ *CANCELAMENTO DE CONSULTA*

Informamos que a consulta foi cancelada:

📅 Data: ${formatDate(appointment.date)} às ${appointment.time}
📋 Tipo: ${appointment.type}

${reason ? `Motivo: ${reason}\n\n` : ''}
Para reagendar, entre em contato:
📱 WhatsApp: ${THERAPIST_INFO.whatsapp}
☎️ Telefone: ${THERAPIST_INFO.phone}

Atenciosamente,
${THERAPIST_INFO.name}
${THERAPIST_INFO.registration}
  `.trim(),

  postConsultation: (appointment) => `
Olá, ${appointment.patientName}! 👋

Obrigado por comparecer à consulta de hoje! 🙏

📋 *Acompanhamento Pós-Consulta*

Como você está se sentindo após o atendimento?
Alguma dúvida sobre as orientações ou tratamento?

*Próximos passos:*
• Siga as orientações conforme a Sugestão Terapêutica
• Anote qualquer reação ou sintoma
• Entre em contato em caso de dúvidas

*Retorno:*
Recomenda-se retorno em [período] para avaliação.
Para agendar, responda esta mensagem ou ligue.

Conte sempre comigo para sua jornada de saúde! 💚

${THERAPIST_INFO.name}
${THERAPIST_INFO.title}
${THERAPIST_INFO.registration}
${THERAPIST_INFO.whatsapp}
  `.trim(),

  followUpRequest: (patientName, lastConsultation) => `
Olá, ${patientName}! 👋

Espero que esteja bem! 🌟

Já faz algum tempo desde sua última consulta (${formatDate(lastConsultation)}).

*Como você está se sentindo?*
• O tratamento tem ajudado?
• Surgiram novas questões de saúde?
• Gostaria de agendar uma avaliação?

Estou à disposição para continuar auxiliando no seu bem-estar.

Para agendar retorno, responda esta mensagem ou ligue:
📱 WhatsApp: ${THERAPIST_INFO.whatsapp}

Abraço fraterno,
${THERAPIST_INFO.name}
${THERAPIST_INFO.registration}
  `.trim(),

  thankYouFeedback: (patientName) => `
Olá, ${patientName}! 👋

Obrigado pelo feedback! 🙏💙

Sua opinião é muito importante para continuar melhorando o atendimento e proporcionar a melhor experiência terapêutica.

Conte sempre comigo na sua jornada de saúde e bem-estar!

Até breve,
${THERAPIST_INFO.name}
${THERAPIST_INFO.title}
${THERAPIST_INFO.registration}
  `.trim(),

  birthdayGreeting: (patientName, age) => `
🎉🎂 *FELIZ ANIVERSÁRIO!* 🎂🎉

Olá, ${patientName}!

Parabéns pelos seus ${age} anos! 🎈

Que este novo ciclo seja repleto de:
✨ Saúde
💚 Paz
🌟 Realizações
🙏 Bem-estar

Obrigado por confiar no meu trabalho!

Um abraço especial,
${THERAPIST_INFO.name}
${THERAPIST_INFO.registration}
  `.trim()
};

// Templates de Email
export const EMAIL_TEMPLATES = {
  confirmation: (appointment) => ({
    subject: `Confirmação de Consulta - ${formatDate(appointment.date)}`,
    body: `
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
    .info-box { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #1976d2; }
    .footer { text-align: center; margin-top: 20px; padding: 20px; color: #666; font-size: 12px; }
    .button { display: inline-block; padding: 12px 24px; background: #1976d2; color: white; text-decoration: none; border-radius: 4px; margin: 10px 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✅ Agendamento Confirmado</h1>
    </div>
    <div class="content">
      <p>Olá, <strong>${appointment.patientName}</strong>!</p>
      
      <p>Seu atendimento foi agendado com sucesso. Seguem os detalhes:</p>
      
      <div class="info-box">
        <p><strong>📅 Data:</strong> ${formatDateLong(appointment.date)}</p>
        <p><strong>🕐 Horário:</strong> ${appointment.time}</p>
        <p><strong>⏱️ Duração:</strong> ${appointment.duration} minutos</p>
        <p><strong>📋 Tipo:</strong> ${appointment.type}</p>
      </div>
      
      <div class="info-box">
        <p><strong>📍 Local:</strong><br>${THERAPIST_INFO.address}</p>
      </div>
      
      ${appointment.notes ? `<p><strong>📝 Observações:</strong> ${appointment.notes}</p>` : ''}
      
      <p><strong>Importante:</strong></p>
      <ul>
        <li>Chegue com 10 minutos de antecedência</li>
        <li>Traga documentos e exames anteriores</li>
        <li>Em caso de impossibilidade, avise com antecedência</li>
      </ul>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="tel:${THERAPIST_INFO.whatsapp}" class="button">📱 Ligar</a>
        <a href="https://wa.me/55${THERAPIST_INFO.whatsapp.replace(/\D/g, '')}" class="button">💬 WhatsApp</a>
      </div>
    </div>
    <div class="footer">
      <p><strong>${THERAPIST_INFO.name}</strong><br>
      ${THERAPIST_INFO.title}<br>
      ${THERAPIST_INFO.specialties}<br>
      ${THERAPIST_INFO.registration}</p>
      <p>📱 ${THERAPIST_INFO.whatsapp} | ☎️ ${THERAPIST_INFO.phone}</p>
    </div>
  </div>
</body>
</html>
    `.trim()
  })
};

// Funções auxiliares
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

function formatDateLong(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}

// Sistema de lembretes automáticos
export class AppointmentReminderSystem {
  constructor() {
    this.appointments = this.loadAppointments();
  }

  loadAppointments() {
    return JSON.parse(localStorage.getItem('appointments') || '[]');
  }

  // Verificar agendamentos que precisam de lembretes
  checkReminders() {
    const now = new Date();
    const reminders = [];

    this.appointments.forEach(appointment => {
      if (appointment.status !== 'scheduled' && appointment.status !== 'confirmed') {
        return;
      }

      const appointmentDate = new Date(`${appointment.date} ${appointment.time}`);
      const diffHours = (appointmentDate - now) / (1000 * 60 * 60);

      // Lembrete 24h antes
      if (diffHours <= 24 && diffHours > 23 && !appointment.reminder24hSent) {
        reminders.push({
          type: '24h',
          appointment,
          message: MESSAGE_TEMPLATES.reminder24h(appointment)
        });
      }

      // Lembrete 3h antes
      if (diffHours <= 3 && diffHours > 2 && !appointment.reminder3hSent) {
        reminders.push({
          type: '3h',
          appointment,
          message: MESSAGE_TEMPLATES.reminder3h(appointment)
        });
      }
    });

    return reminders;
  }

  // Marcar lembrete como enviado
  markReminderSent(appointmentId, reminderType) {
    const appointments = this.loadAppointments();
    const updated = appointments.map(apt => {
      if (apt.id === appointmentId) {
        return {
          ...apt,
          [`reminder${reminderType}Sent`]: true
        };
      }
      return apt;
    });
    localStorage.setItem('appointments', JSON.stringify(updated));
  }

  // Obter aniversariantes do dia
  getBirthdaysToday() {
    const patients = JSON.parse(localStorage.getItem('anamneses') || '[]');
    const today = new Date();
    const todayMonth = today.getMonth() + 1;
    const todayDay = today.getDate();

    return patients.filter(patient => {
      if (!patient.data_nasc && !patient.q02_data_nasc) return false;
      
      const birthDate = new Date(patient.data_nasc || patient.q02_data_nasc);
      return birthDate.getMonth() + 1 === todayMonth && birthDate.getDate() === todayDay;
    });
  }

  // Obter pacientes que precisam de follow-up
  getFollowUpNeeded(daysThreshold = 30) {
    const appointments = this.loadAppointments();
    const patients = JSON.parse(localStorage.getItem('anamneses') || '[]');
    const now = new Date();
    const followUpList = [];

    patients.forEach(patient => {
      const lastAppointment = appointments
        .filter(apt => apt.patientId === patient.id && apt.status === 'completed')
        .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

      if (lastAppointment) {
        const daysSinceLastVisit = (now - new Date(lastAppointment.date)) / (1000 * 60 * 60 * 24);
        
        if (daysSinceLastVisit >= daysThreshold) {
          followUpList.push({
            patient,
            lastAppointment,
            daysSinceLastVisit: Math.floor(daysSinceLastVisit)
          });
        }
      }
    });

    return followUpList;
  }
}

// Exportar instância do sistema de lembretes
export const reminderSystem = new AppointmentReminderSystem();

export default {
  MESSAGE_TEMPLATES,
  EMAIL_TEMPLATES,
  AppointmentReminderSystem,
  reminderSystem,
  THERAPIST_INFO
};
