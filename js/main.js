//Template per il mio handlebars
var source = $("#calendar-template").html();
var template = Handlebars.compile(source);

var thisHour = moment().format('LL, LT'); //Ora e giorno correnti
$('.hour').text(thisHour);

var thisStartMonth = moment('2018-01-01'); //Ho il mio mese, giorno e anno di partenza
var from = thisStartMonth.fromNow();
$('.years-ago small').text('  Questo calendario risale a ' + from);// Questo calendario risale a...
var monthNumber = thisStartMonth.format('M') - 1; //Trovo il numero del mese
dayCalendar(thisStartMonth);//Mese di partenza
holidays(monthNumber);//Porto il numero del mese

//Mese successivo
$('.next').click(function(){
   thisStartMonth.add(1, 'month'); //aggiungo un mese ad ogni click
   var monthNumber = thisStartMonth.format('M') - 1; //Trovo il numero del mese
   dayCalendar(thisStartMonth);
   holidays(monthNumber);
});

//Mese precedente
$('.prev').click(function(){
   thisStartMonth.add(-1, 'month'); //aggiungo un mese ad ogni click
   var monthNumber = thisStartMonth.format('M') - 1; //Trovo il numero del mese
   dayCalendar(thisStartMonth);
   holidays(monthNumber);
});

//Funzione al click
function dayCalendar(thisMonth){
    $('#day-after-day').empty()//.html('');
    var standardDay = thisStartMonth.clone(); //clone
    var thisMonthMonths = thisMonth.daysInMonth(); //Trovo il numero di giorni che ha il mio numero
    var monthName = thisMonth.format('MMMM'); //Trovo il nome del mese
    $('#nome-mese').text(monthName); //Metto il nome del mese corrispondente ad ogni click
    var yearName = wrongYear(thisMonth);//Richiamo funzione per l'anno sbagliato, e richiamo il .formato('YYYY') per lo step sotto
    $('#anno').text(yearName);//Metto il numero dell'anno corrispondente

    /*
    //ALTERNATIVA 2 ALLA FUNZIONE PER L'ANNO SBAGLIATO
    var yearName = thisMonth.format('YYYY'); //Richiamo qui il .format('YYYY') da mettere sotto
    wrongYear(yearName); //Creo una funzione
    $('#anno').text(yearName);
    */

    for (var i = 1; i <= thisMonthMonths; i++) {
        var dayInCalendar = {
           day:i + '  ' + monthName.slice(0,3), //Solo le prime 2 parole
           dayDate: standardDay.format('YYYY-MM-DD')
        }
        var templateFinale = template(dayInCalendar);//popolo template con handlebars
        $('#day-after-day').append(templateFinale);
        standardDay.add(1, 'day');
    }
};

//Anno fuori dall'API (2018)
function wrongYear(thisMonth){
    var year = thisMonth.format('YYYY');
    if (year == 2019) {
        alert ('2019');
    } else if (year == 2017) {
        alert('2017');
    }
    return year;
}

/*
//RICHIAMO ALTERNATIVA 2 ALLA FUNZIONE PER L'ANNO SBAGLIATO
function wrongYear(year){
    if (year == 2019) {
        alert ('2019');
    } else if (year == 2017) {
        alert('2017');
    }
    return year; //Ritorno il risultato alla funzione sopra
};
*/

function holidays(monthNumber){
    $.ajax({
        url:'https://flynn.boolean.careers/exercises/api/holidays',
        data: {
            year:2018,
            month: monthNumber //ho il mio numero che cambia tramite la variabile monthNumber
        },
        method: 'GET',
        success: function(myCalendar){
            var giorniFestivi = myCalendar.response; //Estrapolo i giorni
            for (var i = 0; i < giorniFestivi.length; i++) {
            var giornoFestivo = giorniFestivi[i]; //Estrapolo un girono singolo
            var nameHoliday = giornoFestivo.name; //Estrapolo nome festività
            var dateHoliday = giornoFestivo.date; //Estrapolo data festività
            $('#day-after-day li[data-day="' + dateHoliday + '"]').addClass('festivo').append(' - ' + nameHoliday);
        }
    },
        error: function(){
                 alert('errore');
            }
    })
};
//
// function daysInMonth(month) {
//     var count =  moment().month(month).daysInMonth();
//     var days = [];
//     for (var i = 1; i < count; i++) {
//       days.push(moment().month(month).date(i).format('dddd'));
//     }
//     return days;
//   }
