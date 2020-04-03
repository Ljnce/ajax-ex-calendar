//Template per il mio handlebars
var source = $("#calendar-template").html();
var template = Handlebars.compile(source);

var thisMonth = moment('2018-01-01'); //Ho il mio mese, giorno e anno di partenza
dayCalendar(thisMonth);//Mese di partenza

$('.mese-succ').click(function(){
   thisMonth.add(1, 'month'); //aggiungo un mese ad ogni click
   dayCalendar(thisMonth);
   holidays()
});

//Funzione al click
function dayCalendar(thisMonth){
    $('#day-after-day').empty()//.html('');
    var standardDay = thisMonth.clone(); //Clono
    var thisMonthMonths = thisMonth.daysInMonth(); //Trovo il numero di giorni che ha il mio numero
    var monthName = thisMonth.format('MMMM'); //Trovo il nome del mese
    $('#nome-mese').text(monthName); //Metto il nome del mese corrispondente ad ogni click

    for (var i = 1; i <= thisMonthMonths; i++) {
        var dayInCalendar = {
           day:i + '' + monthName
        }
       var templateFinale = template(dayInCalendar);//popolo template con handlebars
       $('#day-after-day').append(templateFinale);
    }
};

function holidays(){
    $.ajax({
        url:'https://flynn.boolean.careers/exercises/api/holidays',
        data: {
            year:2018,
            month:0
        },
        method: 'GET',
        success: function(data){
            var giorniFestivi = data.response; //Estrapolo i giorni
            for (var i = 0; i < giorniFestivi.length; i++) {
            var giornoFestivo = giorniFestivi[i]; //Estrapolo un girono singolo

            var nomeFestivo = giornoFestivo.name; //Estrapolo nome festività
            var dataFestivo = giornoFestivo.date; //Estrapolo data festività
            }
        }
    })
};
