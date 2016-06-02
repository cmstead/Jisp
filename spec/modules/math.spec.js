var j = require('../../dist/jfp');

describe('JFP math', function () {
    
    describe('arithmetic', function () {
        
        it('should add two numbers with a standard call', function () {
            expect(j.add(5, 6)).toBe(11);
        });
        
        it('should subtract two numbers second when called normally', function () {
            expect(j.subtract(5, 6)).toBe(-1);
        });

        it('should multiply two numbers as a standard function call', function () {
            expect(j.multiply(5, 6)).toBe(30);
        });

        it('should divide first by second when called in standard fashion', function () {
            expect(j.divide(6, 3)).toBe(2);
        });
        
        it('should take mod of first by second when called in standard fashion', function () {
            expect(j.mod(5, 2)).toBe(1);
        });
        
    });
    
    describe('curried arithmetic', function () {
        
        it('should add two numbers with a standard call', function () {
            expect(j.addBy(5)(6)).toBe(11);
        });
        
        it('should subtract two numbers second when called normally', function () {
            expect(j.subtractBy(5)(6)).toBe(1);
        });

        it('should multiply two numbers as a standard function call', function () {
            expect(j.multiplyBy(5)(6)).toBe(30);
        });

        it('should divide first by second when called in standard fashion', function () {
            expect(j.divideBy(3)(6)).toBe(2);
        });
        
        it('should take mod of first by second when called in standard fashion', function () {
            expect(j.modBy(5)(2)).toBe(2);
        });
        
    });
    
    describe('range', function () {
        
        it('should produce a range from 1 to n', function () {
            expect(JSON.stringify(j.range(1)(5))).toBe('[1,2,3,4,5]');
        });
        
        it('should produce a range from -5 to n', function () {
            expect(JSON.stringify(j.range(-5)(5))).toBe('[-5,-4,-3,-2,-1,0,1,2,3,4,5]');
        });
        
        it('should produce a range with an interval', function () {
            expect(JSON.stringify(j.range(1, 2)(5))).toBe('[1,3,5]');
        });
        
    });
    
    describe('', function () {
        
    });
    
});