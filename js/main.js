//Template per il mio handlebars
var source = $("#calendar-template").html();
var template = Handlebars.compile(source);

var thisHour = moment().format('LL, LT'); //Ora e giorno correnti
$('.hour').text(thisHour);

var thisStartMonth = moment('2018-01-01'); //Ho il mio mese, giorno e anno di partenza
//var from = thisStartMonth.fromNow();
/*
var thisEndMonth = moment('2018-12-31');
var limiteIniziale = moment('2018-01-01');
var limiteFinale = moment('2018-12-01');
*/
//$('.years-ago small').text('  Questo calendario risale a ' + from);// Questo calendario risale a...
var monthNumber = thisStartMonth.format('M') - 1; //Trovo il numero del mese
dayCalendar(thisStartMonth);//Mese di partenza
holidays(monthNumber);//Porto il numero del mese

//Mese successivo
$('.next').click(function(){
    //$('.prev').prop('disabled', false); -----> //Utilizzo isSame con disabled click
   thisStartMonth.add(1, 'month'); //aggiungo un mese ad ogni click
   var monthNumber = thisStartMonth.format('M') - 1; //Trovo il numero del mese
   dayCalendar(thisStartMonth);
   holidays(monthNumber);
   //if(thisStartMonth.isSameOrAfter(limiteFinale)){ ---> //Utilizzo isSame con disabled click
    //   $('.next').prop('disabled', true);
  // }
});

//Mese precedente
$('.prev').click(function(){
    //$('.next').prop('disabled', false); -----> //Utilizzo isSame con disabled click
   thisStartMonth.subtract(1, 'month'); //aggiungo un mese ad ogni click
   var monthNumber = thisStartMonth.format('M') - 1; //Trovo il numero del mese
   dayCalendar(thisStartMonth);
   holidays(monthNumber);
   //if(thisStartMonth.isSameOrBefore(limiteIniziale)){ ---> //Utilizzo isSame con disabled click
    //   $('.prev').prop('disabled', true);
  // }
});

//Funzione al click
function dayCalendar(thisMonth){
    $('#day-after-day').empty()//.html('');
    var standardDay = thisMonth.clone(); //clone
    var thisMonthMonths = thisMonth.daysInMonth(); //Trovo il numero di giorni che ha il mio numero

    var monthName = thisMonth.format('MMMM'); //Trovo il nome del mese
    $('#nome-mese').text(monthName); //Metto il nome del mese corrispondente ad ogni click

    var startMonthDay = thisMonth.format('dddd'); //Trovo il nome del giorno in cui inizia il mese
    console.log(startMonthDay);
    $('.week li:first-of-type').text(startMonthDay);

    var yearName = wrongYear(thisMonth);//Richiamo funzione per l'anno sbagliato

    var yearNameText = thisMonth.format('YYYY');//Trovo l'anno corrispondente
    $('#anno').text(yearNameText);//Metto il numero dell'anno corrispondente

    /*
    //ALTERNATIVA 2 ALLA FUNZIONE PER L'ANNO SBAGLIATO
    var yearName = thisMonth.format('YYYY'); //Richiamo qui il .format('YYYY') da mettere sotto
    wrongYear(yearName); //Creo una funzione
    $('#anno').text(yearName);
    */

    for (var i = 1; i <= thisMonthMonths; i++) {
        console.log(i);
        var dayInCalendar = {
           day:i + '  ' + monthName.slice(0,3), //Solo le prime 2 parole
           dayDate: standardDay.format('YYYY-MM-DD')
        }
        var templateFinale = template(dayInCalendar);//popolo template con handlebars
        $('#day-after-day').append(templateFinale);
        standardDay.add(1, 'day');
    }
};

$('#day-after-day').on('click', '.section', function(){
    $('i.fas.fa-cloud-meatball').show();
    $('i.fas.fa-cloud-sun').hide();
    });
    /*
    var thisMonthi = moment('2018-01-01');
    var thisMonthMonthss = parseInt(thisMonthi.daysInMonth());
    for (var i = 1; i <= thisMonthMonthss; i++) {
    if (i % 2 == 0) { console.log('pari');
        $('i.fas.fa-cloud-meatball').show();
        $('i.fas.fa-cloud-sun').hide();
    } else if (i % 3 == 0) { console.log('dispari');
    $('i.fas.fa-cloud-meatball').hide();
    $('i.fas.fa-cloud-sun').show();
}
}
*/

/*
//Anno fuori dall'API (2018)-----> ALTERNATIVA 1
function wrongYear(thisMonth){
    var year = thisMonth.format('YYYY');
    if (year == 2019) {
        $('#nome-mese').text('Non disponibile').addClass('wrong-year');
        $('#anno').hide();
        $('.weather').hide();
        $('.absolute').addClass('relative');
        $('.main-calendar').hide();
        $('.years-ago, .today').hide();
        $('.next').hide();
        $('.prev').text('Torna indietro');

    } else if (year == 2017) {
        $('#nome-mese').text('Non disponibile').addClass('wrong-year');
        $('.absolute').addClass('relative');
        $('#anno').hide();
        $('.weather').hide();
        $('.main-calendar').hide();
        $('.years-ago, .today').hide();
        $('.prev').hide();
        $('.next').text('Torna indietro');

    } else{
        $('#nome-mese').removeClass('wrong-year');
        $('.absolute').removeClass('relative');
        $('#anno').show();
        $('.weather').show();
        $('.main-calendar').show();
        $('.years-ago, .today').show();
        $('.prev').show();
        $('.next').show();
        $('.next').text('Mese successivo');
        $('.prev').text('Mese precedente');
    }
    return year;
}
*/



//ALTERNATIVA CON SOLO 1 TASTO ------> ALTERNATIVA 2
function wrongYear(thisMonth){
    var year = thisMonth.format('M')- 1;
    if (year == 0) { //Mi mostri solo il next a gennaio
        $('.next').show();
        $('.prev').hide();
    } else if (year == 11) { //Mi mostri solo il prev se arrivi dicembre
        $('.next').hide();
        $('.prev').show();
    } else{ //Me li mostri entrambi
        $('.next').show();
        $('.prev').show();
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
