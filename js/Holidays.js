module.exports = class Holiday {
    constructor() {
       this.FIXED_HOLIDAYS = {
            "NewYearsDay" : "1-1",
            "Epiphany" :  "1-6",
            "MayDay" : "5-1",
            "NationalDay" : "6-6",
            "ChristmasEve" : "12-24",
            "ChristmasDay" : "12-25",
            "2ndDayOfChristmas" : "12-26"
        }
    }

    getFixedHolidays() {
        return this.FIXED_HOLIDAYS
    }
    
    getMidsummer(year) {
        let day = 19;
        for(var i=19; i<26; i++){
            if(new Date(year, 5, i).getDay() == 5){
                day = i
                break
            }
        }
        return "6-" + day
    }
    
    isHoliday(date) {
        let monthAndDay = this.getMonthAndDay(date)
        let year = date.getFullYear()
        if(date.getMonth() == 6) {
            return true
        } 
        for (let holiday of Object.values(this.FIXED_HOLIDAYS)){
            if (holiday == monthAndDay)
                return true
        }

        if(monthAndDay == this.getMidsummer(year)) {
            return true
        }
        let easterArray = getEaster(year)
        let easterMonth = easterArray[0] - 1
        let easterDay = easterArray[1]
        let easterDate = new Date(Date.UTC(year, easterMonth, easterDay))
        let easterMonday = new Date(Date.UTC(year, easterMonth, easterDay))
        easterMonday.setDate(easterDate.getUTCDate() + 1)
        let goodFriday = new Date(Date.UTC(year, easterMonth, easterDay))
        goodFriday.setDate(easterDate.getUTCDate() - 2)
        let ascensionDay = new Date((year, easterMonth, easterArray[1]))
        ascensionDay.setDate(easterDate.getUTCDate() + 39)
        if((monthAndDay == this.getMonthAndDay(easterMonday)) || 
            (monthAndDay == this.getMonthAndDay(goodFriday)) ||
            (monthAndDay == this.getMonthAndDay(ascensionDay)))
            return true
        return false
    }

    getMonthAndDay(date) {
        return (date.getMonth() + 1) + "-" + date.getDate()
    }
}

/**
 * @author https://gist.github.com/johndyer/0dffbdd98c2046f41180c051f378f343
* Calculates Easter in the Gregorian/Western (Catholic and Protestant) calendar 
* based on the algorithm by Oudin (1940) from http://www.tondering.dk/claus/cal/easter.php
* @returns {array} [int month, int day]
*/
function getEaster(year) {
    var f = Math.floor,
        // Golden Number - 1
        G = year % 19,
        C = f(year / 100),
        // related to Epact
        H = (C - f(C / 4) - f((8 * C + 13)/25) + 19 * G + 15) % 30,
        // number of days from 21 March to the Paschal full moon
        I = H - f(H/28) * (1 - f(29/(H + 1)) * f((21-G)/11)),
        // weekday for the Paschal full moon
        J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
        // number of days from 21 March to the Sunday on or before the Paschal full moon
        L = I - J,
        month = 3 + f((L + 40)/44),
        day = L + 28 - 31 * f(month / 4);

    return [month,day];
}