describe("TollCalculator", function() {
    var TollCalculator = require('../TollCalculator');
    var Vehicle = require('../Vehicle')
    var tollCalculator;
    var vehicle;
    var date;
  
    beforeEach(function() {
        tollCalculator = new TollCalculator();
    });
  
    describe("On 2019-08-13T06:29", function() {
        beforeEach(function() {
          date = new Date(2019, 7, 13, 6, 29)
        });
        describe("when a cars passes", function() {
            beforeEach(function() {
                vehicle = new Vehicle("Car")
            })
            it("should have a toll of 8", function() {
                expect(tollCalculator.getTollFee(vehicle, date)).toBe(8);
            });
        })
        describe("when a motorbike passes", function() {
            beforeEach(function() {
                vehicle = new Vehicle("Motorbike")
            })
            it("should have a toll of 0", function() {
                expect(tollCalculator.getTollFee(vehicle, date)).toBe(0);
            });
        })
        describe("when a Tractor passes", function() {
          beforeEach(function() {
              vehicle = new Vehicle("Tractor")
          })
          it("should have a toll of 0", function() {
              expect(tollCalculator.getTollFee(vehicle, date)).toBe(0);
          });
        })
        describe("when a Emergency passes", function() {
          beforeEach(function() {
              vehicle = new Vehicle("Emergency")
          })
          it("should have a toll of 0", function() {
              expect(tollCalculator.getTollFee(vehicle, date)).toBe(0);
          });
        })
      describe("when a Diplomat passes", function() {
        beforeEach(function() {
            vehicle = new Vehicle("Diplomat")
        })
        it("should have a toll of 0", function() {
            expect(tollCalculator.getTollFee(vehicle, date)).toBe(0);
        });
      })
      describe("when a Foreign passes", function() {
        beforeEach(function() {
            vehicle = new Vehicle("Foreign")
        })
        it("should have a toll of 0", function() {
            expect(tollCalculator.getTollFee(vehicle, date)).toBe(0);
        });
      })
      describe("when a Military passes", function() {
        beforeEach(function() {
            vehicle = new Vehicle("Military")
        })
        it("should have a toll of 0", function() {
            expect(tollCalculator.getTollFee(vehicle, date)).toBe(0);
        });
      })
    });        

    describe("when a car passes ", function() {
      beforeEach(function() {
        vehicle = new Vehicle("Car")
      });
      describe("on 2019-08-13T06:31", function() {
        it("should have a toll of 13", function() {
            expect(tollCalculator.getTollFee(vehicle, new Date(2019, 7, 13, 6, 31))).toBe(13);
          });
      });         
      describe("on 2019-08-13T07:31", function() {
        it("should have a toll of 18", function() {
            expect(tollCalculator.getTollFee(vehicle, new Date(2019, 7, 13, 7, 31))).toBe(18);
          });
      });
      describe("on 2019-08-13T08:29", function() {
        it("should have a toll of 13", function() {
            expect(tollCalculator.getTollFee(vehicle, new Date(2019, 7, 13, 8, 29))).toBe(13);
          });
      });
      describe("on 2019-08-13T09:31", function() {
        it("should have a toll of 8", function() {
            expect(tollCalculator.getTollFee(vehicle, new Date(2019, 7, 13, 9, 31))).toBe(8);
          });
      }); 
      describe("on 2019-08-13T15:28", function() {
        it("should have a toll of 13", function() {
            expect(tollCalculator.getTollFee(vehicle, new Date(2019, 7, 13, 15, 28))).toBe(13);
          });
      });           

      describe("on 2019-08-13T16:28", function() {
        it("should have a toll of 18", function() {
            expect(tollCalculator.getTollFee(vehicle, new Date(2019, 7, 13, 16, 28))).toBe(18);
          });
      });           

      describe("on 2019-08-13T18:28", function() {
        it("should have a toll of 8", function() {
            expect(tollCalculator.getTollFee(vehicle, new Date(2019, 7, 13, 18, 28))).toBe(8);
          });
      });           

      describe("on 2019-08-13T20:28", function() {
        it("should have a toll of 0", function() {
            expect(tollCalculator.getTollFee(vehicle, new Date(2019, 7, 13, 20, 28))).toBe(0);
          });
      });
      describe("multiple times within an hour", function() {
        it("should return the highest fee", function() {
          expect(tollCalculator.getTollFee(vehicle, new Date(2019, 7, 13, 6, 31), new Date(2019, 7, 13, 7, 31))).toBe(18);
        })
      })
      describe("multiple times in a day", function() {
        it("should return a total", function() {
          expect(tollCalculator.getTollFee(vehicle, new Date(2019, 7, 13, 6, 31), new Date(2019, 7, 13, 15, 28))).toBe(26);
        })
        
        it("should return a maximum of 60", function() {
          expect(tollCalculator.getTollFee(vehicle, new Date(2019, 7, 13, 6, 31), new Date(2019, 7, 13, 8, 31),new Date(2019, 7, 13, 9, 33), new Date(2019, 7, 13, 12, 31),  new Date(2019, 7, 13, 13, 31), new Date(2019, 7, 13, 15, 28), new Date(2019, 7, 13, 16, 29))).toBe(60);
        })
      })            
    });
  });
  