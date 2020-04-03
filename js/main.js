//Template per il mio handlebars
var source = $("#calendar-template").html();
var template = Handlebars.compile(source);

var thisStartMonth = moment('2018-01-01'); //Ho il mio mese, giorno e anno di partenza
   var monthNumber = parseInt(thisStartMonth.format('M') - 1); //Trovo il numero del mese
   dayCalendar(thisStartMonth);//Mese di partenza
   holidays(monthNumber);//Porto il numero del mese

//Mese successivo
$('.next').click(function(){
   thisStartMonth.add(1, 'month'); //aggiungo un mese ad ogni click
   var monthNumber = parseInt(thisStartMonth.format('M') - 1); //Trovo il numero del mese
   dayCalendar(thisStartMonth);
   holidays(monthNumber);
});

//Mese precedente
$('.prev').click(function(){
   thisStartMonth.add(-1, 'month'); //aggiungo un mese ad ogni click
   var monthNumber = parseInt(thisStartMonth.format('M')); //Trovo il numero del mese
   console.log(monthNumber);
   dayCalendar(thisStartMonth);
   holidays(monthNumber);
});

//Funzione al click
function dayCalendar(thisMonth){
    $('#day-after-day').empty()//.html('');
    var standardDay = thisMonth.clone(); //clone
    var thisMonthMonths = thisMonth.daysInMonth(); //Trovo il numero di giorni che ha il mio numero
    var monthName = thisMonth.format('MMMM'); //Trovo il nome del mese
    $('#nome-mese').text(monthName); //Metto il nome del mese corrispondente ad ogni click

    for (var i = 1; i <= thisMonthMonths; i++) {
        var dayInCalendar = {
           day:i + '' + monthName,
           dayDate: standardDay.format('YYYY-MM-DD')
        }
        var templateFinale = template(dayInCalendar);//popolo template con handlebars
        $('#day-after-day').append(templateFinale);
        standardDay.add(1, 'day');
    }
};

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
            console.log(giorniFestivi);
            for (var i = 0; i < giorniFestivi.length; i++) {
            var giornoFestivo = giorniFestivi[i]; //Estrapolo un girono singolo
            var nameHoliday = giornoFestivo.name; //Estrapolo nome festività
            var dateHoliday = giornoFestivo.date; //Estrapolo data festività
            $('#day-after-day li[data-day="' + dateHoliday + '"]').addClass('festivo').append(' - ' + nameHoliday);
            }
        }
    })
};


//if (dateHoliday == dayDate) {
    //$('#day-after-day).addClass('festivo').append(' - ' + nameHoliday);
//}
