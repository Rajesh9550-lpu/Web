import { crypto_services } from "../../../src/utility/crypto_services/crypto_services.mjs";

describe('Test Crypto Services', () => {
    it('test AES encrypt', ()=> {
        const result = crypto_services.AES.encrypt('client id test', 'base64', 'By3lwX52fWLC6tWHqe1Ewy18oRlZjqVlJq9hJDzDa3Q=');

        expect(result).toBe("GSY4ABpOmSxOao/EzSzX2g==")
    })

    it('test AES encrypt - invalid value', ()=> {
        expect(() => crypto_services.AES.encrypt('client id test', '', null)).toThrow('Some arguments missed to encrypt the string using AES');
    })

    it('test AES decrypt', ()=> {
        const result = crypto_services.AES.decrypt('GSY4ABpOmSxOao/EzSzX2g==', 'By3lwX52fWLC6tWHqe1Ewy18oRlZjqVlJq9hJDzDa3Q=');

        expect(result).toBe('client id test')
    })

    it('test AES decrypt - invalid value', ()=> {
        expect(() => crypto_services.AES.decrypt('client id test', null)).toThrow('Some arguments missed to decrypt the string usinh AES');
    })

    it('test get randombyte', ()=> {
        const result = crypto_services.getRandomBytes(2);
        expect(result).toBeDefined();
    })

    it('test get randombyte', ()=> {
        const result = crypto_services.getRandomBytes();
        expect(result).toBeFalsy();
    })

    it('test generate RSA keys', ()=> {
       const result = crypto_services.RSA.generateKeys();
        
        expect(result).toBeDefined();
    })

    it('test RSA encrypt - invalid input', ()=> {
        expect(() => {crypto_services.RSA.encrypt('client id test', null, null)}).toThrow('Some arguments missed to encrypt the string using RSA');
    })

    it('test RSA decrypt - invalid input', ()=> {
        expect(() => {crypto_services.RSA.decrypt('client id test', null)}).toThrow('Some arguments missed to decrypt the string using RSA');
    })
})