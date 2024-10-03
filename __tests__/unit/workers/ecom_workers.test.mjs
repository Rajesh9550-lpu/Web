import ecom_api_worker from "../../../src/workers/ecom_api_workers.mjs";

describe('Test Eeom workers', () => {
    beforeAll(()=> {
        process.env.Stage = 'test';
        process.env.securityKey = 'By3lwX52fWLC6tWHqe1Ewy18oRlZjqVlJq9hJDzDa3Q=';
    })

    it.skip('test NDR API', async ()=> {
        const requestParams = {
            httpMethod: 'POST',
            operation: 'ndr-resolutions',
            queryStringParameters: null,
            body: '{"data": [{"awb": "706602997","comments": "today","instruction": "RTO"}]}'
          }
        const event = buildRestRequest(requestParams);
        
        const response = await ecom_api_worker.call(JSON.parse(event));

        console.log("Response: "+ JSON.stringify(response));
        expect(1).toBe(1)
    })

    it.skip('test manifest API', async ()=> {
        const requestParams = {
            httpMethod: 'POST',
            operation: 'edr-manifest',
            queryStringParameters: null,
            body: `[
                {
                  "AWB_NUMBER": "",
                  "ORDER_NUMBER": "DCON-12345",
                  "PRODUCT": "EDS",
                  "CONSIGNEE": "Rakesh Sareen",
                  "CONSIGNEE_ADDRESS1": "H. No. 3047",
                  "CONSIGNEE_ADDRESS2": "Block-E",
                  "CONSIGNEE_ADDRESS3": "Sector 59",
                  "CONSIGNEE_ADDRESS4": "Near Cyber Park",
                  "COLLECTABLE_VALUE": "0",
                  "DESTINATION_CITY": "DELHI",
                  "PINCODE": "111111",
                  "STATE": "DL",
                  "MOBILE": "9999999999",
                  "TELEPHONE": "0124000000",
                  "ITEM_DESCRIPTION": "<EKYC and Document collection>",
                  "DROP_VENDOR_CODE": "Ecom-Delhi",
                  "DROP_NAME": "Drop Name 1",
                  "DROP_ADDRESS_LINE1": "Drop Address 1",
                  "DROP_ADDRESS_LINE2": "Drop Address 2",
                  "DROP_ADDRESS_LINE3": "Drop Address 3",
                  "DROP_ADDRESS_LINE4": "Drop Address 4",
                  "DROP_PINCODE": "111111",
                  "DROP_MOBILE": "9999999999",
                  "ACTIVITIES": [
                    {
                      "CODE": "AC_EKYC",
                      "DOCUMENT_REF_NUMBER": "",
                      "REMARKS": "",
                      "OPTIONAL": ""
                    },
                    {
                      "CODE": "DC_NACH_FORM",
                      "DOCUMENT_REF_NUMBER": "",
                      "REMARKS": "FORM DELIVERY",
                      "OPTIONAL": ""
                    }
                  ],
                  "ADDITIONAL_INFORMATION": {
                    "DATE": "2018-12-30",
                    "TIMESLOT": "2",
                    "FORM_PRINT": "http://xxxxx.xxxxxx.in/kyc/get_single_barcode/1000001071.pdf"
                  }
                }
              ]`
          }
        const event = buildRestRequest(requestParams);
        
        const response = await ecom_api_worker.call(JSON.parse(event));

        console.log("Response: "+ JSON.stringify(response));
        expect(1).toBe(1)
    })

    it.skip('test UAT API', async ()=> {

          
      const response = await ecom_api_worker.callEcofyNatch();
      console.log("Response: "+ JSON.stringify(response));
      expect(1).toBe(1)
    })

    function buildRestRequest(requestParams) {
        const eventRequest = {
          "body": requestParams.body,
          "headers": {
            "Host": "localhost:3000"
          },
          "httpMethod": requestParams.httpMethod,
          "isBase64Encoded": false,
          "path": `/${requestParams.operation}`,
          "pathParameters": {
            "operation": requestParams.operation
          },
          "queryStringParameters": requestParams.queryStringParameters
        }
        return JSON.stringify(eventRequest);
      }
})