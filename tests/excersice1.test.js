const lib = require('../exercise1');

describe('fizzBuzz', () => {
   it('it should throw an exception if the input is not a  number', () => {

       const args = [null, undefined, 'a',  {}, true, false];
       args.forEach((value) => {
           expect(() => { lib.fizzBuzz(value) }).toThrow();
       });
   });

   it('it should return FizzBuzz if input is divisible by 3 and 5', () => {
        const result = lib.fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    });

    it('it should return Fizz if input is divisible by 3', () => {
        const result = lib.fizzBuzz(3);
        expect(result).toBe('Fizz');
    });

    it('it should return Fizz if input is divisible by 5', () => {
        const result = lib.fizzBuzz(5);
        expect(result).toBe('Buzz');
    });

    it('it should return the number if input is neither divisible by 3 nor 5', () => {
        const result = lib.fizzBuzz(1 );
        expect(result).toBe(1);
    });
});
