const now = new Date();
const getYear = now.getFullYear();
const getMonth = now.getMonth();
const meetingForm = document.querySelector('form');
const appointments = [];

const monthNames = [
  'Gennaio',
  'Febbraio',
  'Marzio',
  'Aprile',
  'Maggio',
  'Giugno',
  'Luglio',
  'Agosto',
  'Settembre',
  'Ottobre',
  'Novembre',
  'Dicembre',
];

const dayNames = [
  'Domenica',
  'Lunedì',
  'Martedì',
  'Mercoledì',
  'Giovedì',
  'Venerdì',
  'Sabato',
];

document.addEventListener('load', init());

function init() {
  printCurrentMonth();
  dayInThisMonth();
  createDays(dayInThisMonth());
  const nowDate = now.getDate();
  if (appointments[nowDate].length > 0) {
    showAppointments(nowDate);
  } else {
    const appointmentsDiv = document.getElementById('appointments');
    appointmentsDiv.style.display = 'none';
  }
}

//Stampo il nome del Mese nella pagina
function printCurrentMonth() {
  const title = document.querySelector('h1');
  const currentMonth = monthNames[getMonth];
  title.innerText = currentMonth;
}

//calcolo il numero di giorni per griglia e array
function dayInThisMonth() {
  const lastDayInTheMonth = new Date(getYear, getMonth + 1, 0); //il giorno 0 del mese successivo non esiste,
  //quindi è l'ultimo giorno del mese in corso
  const numberOfDays = lastDayInTheMonth.getDate();
  console.log(lastDayInTheMonth);
  console.log(numberOfDays);
  return numberOfDays;
}

function createDays(daysNumber) {
  const calendarDiv = document.getElementById('calendar');
  for (let i = 0; i < daysNumber; i++) {
    appointments.push([]); //popolo l'array degli appuntamenti con un numero di array vuoti corrispondendi al numero
    //dei giorni del mese

    //Creo la griglia
    //div dei giorni
    const dayCellDiv = document.createElement('div');
    dayCellDiv.classList.add('day');

    //Rendiamo le celle cliccabili
    dayCellDiv.addEventListener('click', function () {
      unselectAllDays(); // servirà per deselezionare un giorno eventualmente già selezionato
      dayCellDiv.classList.add('selected');
      changeMeetingSection(i);
      if (appointments[i].length > 0) {
        showAppointments(i);
      } else {
        const appointmentsDiv = document.getElementById('appointments');
        appointmentsDiv.style.display = 'none';
      }
    });

    //numero del Giorno
    const cellValue = document.createElement('h3');
    const thisDate = i + 1;
    if (thisDate == now.getDate()) {
      dayCellDiv.classList.add('currentDay');
    }

    //Domeniche in rosso
    let thisDay = new Date(now.getFullYear(), now.getMonth(), thisDate);
    if (thisDay.getDay() === 0) {
      cellValue.classList.add('sunday');
    }

    //nome del giorno
    let dayNumber = thisDay.getDay();
    let dayName = dayNames[dayNumber];
    cellValue.innerText = `${dayName} ${i + 1}`;

    //creazione griglia
    dayCellDiv.appendChild(cellValue);
    calendarDiv.appendChild(dayCellDiv);
  }
}

function unselectAllDays() {
  const previousSelected = document.querySelector('.selected');
  if (previousSelected) {
    previousSelected.classList.remove('selected');
  }
}

function changeMeetingSection(dayDate) {
  const newMeetingDay = document.getElementById('newMeetingDay');
  newMeetingDay.innerText = dayDate + 1;
  newMeetingDay.classList.add('hasDay');
}

function showAppointments(dayDate) {
  const dayAppointments = appointments[dayDate];
  const appointmentsList = document.querySelector('#appointments ul');
  appointmentsList.innerHTML = '';
  dayAppointments.forEach((appointment) => {
    const newLi = document.createElement('li');
    newLi.innerText = appointment;
    appointmentsList.appendChild(newLi);
  });
  const appointmentsDiv = document.getElementById('appointments');
  appointmentsDiv.style.display = 'block';
}

meetingForm.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();
  const selectedDay = document.getElementById('newMeetingDay').innerText;
  const meetingTime = document.getElementById('newMeetingTime').value;
  const meetingName = document.getElementById('newMeetingName').value;
  const meetingString = `${meetingTime} - ${meetingName}`;
  const dayIndex = parseInt(selectedDay) - 1;

  appointments[dayIndex].push(meetingString);
  meetingForm.reset();
  showAppointments(dayIndex);

  const dot = document.createElement('span');
  dot.classList.add('dot');
  const selectedCell = document.querySelector('.selected');
  if (!selectedCell.querySelector('dot')) {
    selectedCell.appendChild(dot);
  }
}
