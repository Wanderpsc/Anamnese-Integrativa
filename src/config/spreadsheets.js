/* eslint-disable unicode-bom */
// Only the five specific sheets requested by the user. Each entry keeps id/gid/url and an export CSV URL
// so clinicians can open the sheet or import its CSV when needed from the Anamnese form.
const SPREADSHEETS = [
  {
    id: '1cNI7ZK9MhC4ng5SmgOF1snoHLZ5FAsNZm7yrMDHJO7I',
    gid: '885644964',
    label: 'FITOTERAPIA',
    url: 'https://docs.google.com/spreadsheets/d/1cNI7ZK9MhC4ng5SmgOF1snoHLZ5FAsNZm7yrMDHJO7I/edit?gid=885644964#gid=885644964',
    exportCsv: 'https://docs.google.com/spreadsheets/d/1cNI7ZK9MhC4ng5SmgOF1snoHLZ5FAsNZm7yrMDHJO7I/export?format=csv&gid=885644964',
    targetPage: 'anamnese',
  },
  {
    id: '1xpvzP2tLFN-a36_JDVf4VfqojoI384Qn-YNh_jQsWRM',
    gid: '1361985379',
    label: 'SINTOMAS',
    url: 'https://docs.google.com/spreadsheets/d/1xpvzP2tLFN-a36_JDVf4VfqojoI384Qn-YNh_jQsWRM/edit?gid=1361985379#gid=1361985379',
    exportCsv: 'https://docs.google.com/spreadsheets/d/1xpvzP2tLFN-a36_JDVf4VfqojoI384Qn-YNh_jQsWRM/export?format=csv&gid=1361985379',
    targetPage: 'anamnese',
  },
  {
    id: '1eaQx1EHLQBVC1L5IXdqiKF1495mjhMaLqOVIfxuZj0w',
    gid: '1483529421',
    label: 'ANAMNESE INTEGRATIVA',
    url: 'https://docs.google.com/spreadsheets/d/1eaQx1EHLQBVC1L5IXdqiKF1495mjhMaLqOVIfxuZj0w/edit?gid=1483529421#gid=1483529421',
    exportCsv: 'https://docs.google.com/spreadsheets/d/1eaQx1EHLQBVC1L5IXdqiKF1495mjhMaLqOVIfxuZj0w/export?format=csv&gid=1483529421',
    targetPage: 'anamnese',
  },
  {
    id: '1VdbZZjnnpXDf-eiErpDIrJ_cWViI0sy3',
    gid: '548303679',
    label: 'QUESTIONÁRIO FEMININO',
    url: 'https://docs.google.com/spreadsheets/d/1VdbZZjnnpXDf-eiErpDIrJ_cWViI0sy3/edit?gid=548303679#gid=548303679',
    exportCsv: 'https://docs.google.com/spreadsheets/d/1VdbZZjnnpXDf-eiErpDIrJ_cWViI0sy3/export?format=csv&gid=548303679',
    targetPage: 'anamnese',
  },
  {
    id: '1IY1KETGtT9RizEh_uiHQleSTeJP9EZc6',
    gid: '1822857619',
    label: 'QUESTIONÁRIO MASCULINO',
    url: 'https://docs.google.com/spreadsheets/d/1IY1KETGtT9RizEh_uiHQleSTeJP9EZc6/edit?gid=1822857619#gid=1822857619',
    exportCsv: 'https://docs.google.com/spreadsheets/d/1IY1KETGtT9RizEh_uiHQleSTeJP9EZc6/export?format=csv&gid=1822857619',
    targetPage: 'anamnese',
  },
];

export default SPREADSHEETS;

