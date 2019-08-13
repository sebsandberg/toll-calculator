describe("Holidays", function() {
    var Holidays = require('../Holidays');
  
    beforeEach(function() {
        holidays = new Holidays();
    });
  
    describe("is holidays", function() {
        it("should return true for Good Friday 2019-04-19", function() {
            expect(holidays.isHoliday(new Date(2019,3,19))).toBeTruthy();
        });
        

        it("should return true for National day 2019-06-06", function() {
            expect(holidays.isHoliday(new Date(2019,5,6))).toBeTruthy();
        });
        
        it("should return true for month of july", function (){
            for(let i=1; i<32; i++) {
                expect(holidays.isHoliday(new Date(2019,6,i))).toBeTruthy();
            }
        })
        
        it("should return true for midsummers eve 2019-06-21", function() {
            expect(holidays.isHoliday(new Date(2019,5,21))).toBeTruthy();
        });
        
        it("should return true for christmas eve 2019-12-24", function() {
            expect(holidays.isHoliday(new Date(2019,11,24))).toBeTruthy();
        });

        it("should return true for christmas eve 2019-12-24", function() {
            expect(holidays.isHoliday(new Date(2019,11,24))).toBeTruthy();
        });

        it("should return true for christmas eve 2019-12-24", function() {
            expect(holidays.isHoliday(new Date(2019,11,24))).toBeTruthy();
        });

        it("should return true for christmas day 2019-12-25", function() {
            expect(holidays.isHoliday(new Date(2019,11,25))).toBeTruthy();
        });

        it("should return true for 2nd day of christmas 2019-12-26", function() {
            expect(holidays.isHoliday(new Date(2019,11,26))).toBeTruthy();
        });
    });        
  });
  