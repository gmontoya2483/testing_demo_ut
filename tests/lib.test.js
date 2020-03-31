const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

describe( 'absolute', () => {
    it('Should return a positive number if input is positive',() => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });

    it('Should return a positive number if input is negative',() => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });

    test('Should return o number if input is o',() => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
} );

describe('greet', () => {
    it('should return the greeting message', () => {
        const result = lib.greet('Mosh');
        expect(result).toMatch(/Mosh/);
        expect(result).toContain("Mosh");
    });
});

describe('getCurrencies', () => {
   it('it should return supported currencies', () =>{
       const result = lib.getCurrencies();

       //Too general - useless tests
       expect(result).toBeDefined();
       expect(result).not.toBeNull();

       //Too Specific
       expect(result[0]).toBe('USD');
       expect(result[1]).toBe('AUD');
       expect(result[2]).toBe('EUR');
       expect(result.length).toBe(3);

       // Proper way
       expect(result).toContain('USD');
       expect(result).toContain('AUD');
       expect(result).toContain('EUR');

       // Ideal way
       expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']));
   });
});

describe('getProduct', () => {
    it('should return a product with a given id', () => {
        const result = lib.getProduct(1);

        //Too Specific
        expect(result).toEqual( {id: 1, price: 10, category: 'a'}); //Should have exactly and be exactly

        // Proper way
        expect(result).toMatchObject( {id: 1, price: 10});
        expect(result).toHaveProperty('id', 1);
    });
});

describe('registerUser', () => {
   it('should throw an exception if username is falsy', () => {
       const args = [null, undefined, NaN, '', 0, false];
       args.forEach((value) => {
           expect(() => { lib.registerUser(value) }).toThrow();
       });
   });

   it('should return a user object if valid username is passed', () => {
       const result = lib.registerUser('name');
       expect(result).toHaveProperty('username', 'name');
       expect(result.id).toBeGreaterThan(0);

   })

});


describe('applyDiscount', () => {
    it('should apply 10% discount if customer has more than 10 points', ()=>{

        db.getCustomerSync = function(customerId) {
            console.log ('Fake reading customer...');
            return { id: customerId, points: 11};
        };

        const order = {customerId: 1, totalPrice: 10};
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9)
    });

});

describe('notifyCustomer', () =>{
   it('should send an email to the customer', () => {
       db.getCustomerSync = function(customerId){
         return {email: 'a'}
       };

       let mailSent = false;
       mail.send = function(email, subject){
           mailSent = true;
       };

       lib.notifyCustomer({customerId: 1});
       expect(mailSent).toBe(true);
   });
});



