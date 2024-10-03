import { getElectricityBill } from '../../../src/handlers/karza-api.mjs'
import { common_services } from '../../../src/utility/common_services/common_services.mjs';
import { common_responses } from '../../utility/common_responses.mjs';
import sinon from 'sinon';

describe('Test karza handler', () => {
  let mock;

  beforeAll(()=> {
    process.env.Stage = 'test';
    process.env.securityKey = 'By3lwX52fWLC6tWHqe1Ewy18oRlZjqVlJq9hJDzDa3Q=';
  })

  beforeEach(()=> {
    mock = sinon.mock(common_services);  
  })

  it('Karza - get electricity bills', async() => {
      mock.expects("sendRequest")
      .once()
      .withArgs(
        'https://testapi.karza.in/v2/elec',
        { 
          method: 'POST',
          body: '{"consumer_id":"85609094585","service_provider":"PGVCL","consent":"Y"}',
          headers:
          { 
            'Content-Type': 'application/json',
            'x-karza-key': 'test-client-id' 
          } 
        }, 'json')
      .returns(mockSuccessResponse());
      
      const requestParams = {
        httpMethod: 'POST',
        operation: 'electricity',
        queryStringParameters: null,
        body: {
          "data": {
              "consumer_id": "85609094585",
              "service_provider": "PGVCL",
              "consent": "Y"
          }
        }
      }
      const event = buildRestRequest(requestParams);
      const response = await getElectricityBill(event)
    
      expect(response.statusCode).toBe(200);
      expect(response.body).toBe(`{"bill_no":"","bill_due_date":"","consumer_number":"85609094585","bill_amount":"Rs. -2.22","bill_issue_date":"","mobile_number":"","amount_payable":"Rs. -2.22","total_amount":"Rs. -2.22","address":"29-JAMNAGAR O&M21-JAMNAGAR CITY-1856-Satrasta","consumer_name":"BHAGVANJIBHAI K BALVA","email_address":"","bill_date":"28-09-2023"}`)
      mock.verify();
  })
  
  it('Karza - invalid request body', async() => {    
    const requestParams = {
      httpMethod: 'POST',
      operation: 'electricity',
      queryStringParameters: null,
      body: {
        "data": {
            "consumer_id": "85609094585",
            "service_provider": "PGVCL",
            "consent": "Y"
        }
      }
    }
    const event = buildRestRequest(requestParams);
    event.body = null;
    const response = await getElectricityBill(event)
  
    expect(response.statusCode).toBe(500);
    expect(response.body).toBe(`{"error":"Internal Server Error","message":"The server encountered an unexpected condition."}`)
  })

  it('Karza - invalid request data', async() => {    
    const requestParams = {
      httpMethod: 'POST',
      operation: 'electricity',
      queryStringParameters: null,
      body: {
        "data": null
      }
    }
    const event = buildRestRequest(requestParams);
    const response = await getElectricityBill(event)
  
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe(`{\"error\":\"Bad Request\",\"message\":\"Mandatory fields are missing / invalid\"}`)
  })

  it('karza - Un Authorized request', async() => {
      mock.expects("sendRequest")
      .once()
      .withArgs(
        'https://testapi.karza.in/v2/elec',
        { 
          method: 'POST',
          body: '{"consumer_id":"85609094585","service_provider":"PGVCL","consent":"Y"}',
          headers:
          { 
            'Content-Type': 'application/json',
            'x-karza-key': 'test-client-id' 
          } 
        }, 'json')
      .returns(common_responses.unAuthorizedResponse());      
      const requestParams = {
        httpMethod: 'POST',
        operation: 'electricity',
        queryStringParameters: null,
        body: {
          "data": {
              "consumer_id": "85609094585",
              "service_provider": "PGVCL",
              "consent": "Y"
          }
        }
      }
      const event = buildRestRequest(requestParams);
      const response = await getElectricityBill(event)
    
      expect(response.statusCode).toBe(400);
      expect(response.body).toBe('{\"error\":\"Bad Request\",\"message\":\"Mandatory fields are missing / invalid\"}')
      mock.verify();
  })

  const mockSuccessResponse = () => {
    return [
        200,
        {
          "status-code": "101",
          "result": {
            "bill_no": "",
            "bill_due_date": "",
            "consumer_number": "85609094585",
            "bill_amount": "Rs. -2.22",
            "bill_issue_date": "",
            "mobile_number": "",
            "amount_payable": "Rs. -2.22",
            "total_amount": "Rs. -2.22",
            "address": "29-JAMNAGAR O&M21-JAMNAGAR CITY-1856-Satrasta",
            "consumer_name": "BHAGVANJIBHAI K BALVA",
            "email_address": "",
            "bill_date": "28-09-2023"
          }
        }
    ];
  }

  function buildRestRequest(requestParams) {
    const eventRequest = {
      "body": JSON.stringify(requestParams.body),
      "headers": {
        "Host": "localhost:3000"
      },
      "httpMethod": requestParams.httpMethod,
      "isBase64Encoded": false,
      "path": `/${requestParams.operation}`,
      "queryStringParameters": requestParams.queryStringParameters
    }
    return eventRequest;
  }
})