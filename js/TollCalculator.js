let Holidays = require('./Holidays')
let TollFreeVehicles = require('./TollFreeVehicles')
let holidays = new Holidays()

module.exports = class TollCalculator {
    getTollFee(vehicle, ...dates) {
        let intervalStart = dates[0]
        let totalFee = 0;
        for (let date of dates) {
            let nextFee = this.calculateTollFee(date, vehicle)
            let tempFee = this.calculateTollFee(intervalStart, vehicle)
            let diffInMillies = date.getTime() - intervalStart.getTime()
            if (diffInMillies <= 3600000) {
                if (totalFee > 0) {
                    totalFee -= tempFee
                }
                if (nextFee >= tempFee) {
                    tempFee = nextFee
                }
                totalFee += tempFee
            } else {
                intervalStart = date
                totalFee += nextFee;
            }
            if (totalFee >= 60) {
                totalFee = 60
                break
            }
        }
        return totalFee
    }

    calculateTollFee(date,vehicle){
        if (this.isTollFreeDate(date)){
            return 0
        }
        if (TollFreeVehicles.tollFreeVehicles.has(vehicle.getType())) {
            return 0
        }
        return this.getTollFeeActual(date)
    }

    getTollFeeActual(date) {
        let hour = date.getHours()
        let minute = date.getMinutes()
        if (hour == 6 && minute >= 0 && minute <= 29) return 8;
        else if (hour == 6 && minute >= 30 && minute <= 59) return 13;
        else if (hour == 7 && minute >= 0 && minute <= 59) return 18;
        else if (hour == 8 && minute >= 0 && minute <= 29) return 13;
        else if (hour >= 8 && hour <= 14 && minute >= 30 && minute <= 59) return 8; 
        else if (hour == 15 && minute >= 0 && minute <= 29) return 13;
        else if (hour == 15 && minute >= 0 || hour == 16 && minute <= 59) return 18;
        else if (hour == 17 && minute >= 0 && minute <= 59) return 13;
        else if (hour == 18 && minute >= 0 && minute <= 29) return 8;
        else return 0;
    }

    isTollFreeDate(date) {
        if(this.isWeekend(date)){
            return true
        }
        if(holidays.isHoliday(date)) {
            return true
        }
        return false
    }

    isWeekend(date) {
        return (date.getDay() == 0) || (date.getDay() == 6)
    }
}