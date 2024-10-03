import ecom_nach_workers from "../../../src/workers/ecom_nach_workers.mjs";

describe('Test Eeom workers', () => {
    beforeAll(()=> {
        process.env.Stage = 'test';
        process.env.securityKey = 'By3lwX52fWLC6tWHqe1Ewy18oRlZjqVlJq9hJDzDa3Q=';
    })
    it.skip('test UAT API', async ()=> {      
      const response = await ecom_nach_workers.readFile();
      console.log("Response: "+ JSON.stringify(response));
      expect(1).toBe(1)
    })    
})