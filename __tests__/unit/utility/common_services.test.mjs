import { common_services } from "../../../src/utility/common_services/common_services.mjs"

describe('Test Common Services', () => {
    it('test json to xml', ()=> {
        const result = common_services.convertJSON2XML({
            "status": "success",
            "statusCode": "200"
        })

        const exptectedResult = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<root>
  <status>success</status>
  <statusCode>200</statusCode>
</root>`;
        expect(result).toBeDefined();  
        expect(result).toBe(exptectedResult);          
    })

    it('test xml to json', async()=> {
        const sampleXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><root><status>success</status><statusCode>200</statusCode></root>`;
        
        const result = await common_services.convertXML2JSON(sampleXml)   
        const resultString = JSON.stringify(result);
        expect(result).toBeDefined();
        expect(resultString).toBe('{"root":{"status":"success","statusCode":"200"}}');            
    })

    it('test fetch request error', async()=> {
        const result = await common_services.sendRequest('example.com', '', '');

        expect(result).toBeFalsy();
    })

    it('test fetch request success', async()=> {
        const result = await common_services.sendRequest(
            'https://accretivecleantech-uat.onefin.in/api/v1/client/loan/78c55479-1ae3-400a-be06-a720273d553f/', { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }               
          }, 'text');

        expect(result).toBeDefined();
    })

})