import { gupshup } from '../../../src/handlers/gupshup-api.mjs'
import { common_services } from '../../../src/utility/common_services/common_services.mjs';
import sinon from 'sinon';
import https from 'https';
import crypto from 'crypto';
import { common_responses } from '../../utility/common_responses.mjs';

describe('Test gupshup handler', () => {
  let mock;

  beforeAll(()=> {
      process.env.Stage = 'test';
      process.env.securityKey = 'By3lwX52fWLC6tWHqe1Ewy18oRlZjqVlJq9hJDzDa3Q=';
  })

  beforeEach(()=> {
    mock = sinon.mock(common_services);  
  })

  it('gupshup - generate otp details', async() => {
    const httpsAgent = new https.Agent({
      secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT
      });
      mock.expects("sendRequest").once().returns(mockSuccessResponse());
      
      const requestParams = {
        httpMethod: 'GET',
        operation: 'generate-otp',
        queryStringParameters: {
          "v": "1.1",
          "phone_no": "9876543211"
        },
        body: null
      }
      const event = buildRestRequest(requestParams);
      const response = await gupshup(JSON.parse(event))
    
      expect(response.statusCode).toBe(200);
      expect(response.body).toBe("success | 919876543211 | 5013010796508266548 | OTP sent.")
      mock.verify();
  })

  it('gupshup - Verify otp details', async() => {
    const httpsAgent = new https.Agent({
      secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT
      });
      mock.expects("sendRequest").once().returns(mockVerifyResponse());
      
      const requestParams = {
        httpMethod: 'GET',
        operation: 'verify-otp',
        queryStringParameters: {
          "v": "1.1",
          "phone_no": "9876543211",
          "otp_code": "3456"
        },
        body: null
      }
      const event = buildRestRequest(requestParams);
      const response = await gupshup(JSON.parse(event))
    
      expect(response.statusCode).toBe(200);
      expect(response.body).toBe("success | 919566311898 | 5013011694188503042 | OTP matched.")
      mock.verify();
  })

  it('gupshup - 400 bad request', async() => {
    const httpsAgent = new https.Agent({
      secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT
      });
      mock.expects("sendRequest").once().returns(common_responses.badRequestResponse());
      
      const requestParams = {
        httpMethod: 'GET',
        operation: 'verify-otp',
        queryStringParameters: {
          "v": "1.1",
          "phone_no": "9876543211",
          "otp_code": "3456"
        },
        body: null
      }
      const event = buildRestRequest(requestParams);
      const response = await gupshup(JSON.parse(event))
    
      expect(response.statusCode).toBe(400);
      expect(response.body).toBe("Bad Request")
      mock.verify();
  })

  it('gupshup - Un Authorized request', async() => {
    const httpsAgent = new https.Agent({
      secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT
      });
      mock.expects("sendRequest").once().returns(common_responses.unAuthorizedResponse());
      
      const requestParams = {
        httpMethod: 'GET',
        operation: 'verify-otp',
        queryStringParameters: {
          "v": "1.1",
          "phone_no": "9876543211",
          "otp_code": "3456"
        },
        body: null
      }
      const event = buildRestRequest(requestParams);
      const response = await gupshup(JSON.parse(event))
    
      expect(response.statusCode).toBe(400);
      expect(response.body).toBe('{\"error\":\"Bad Request\",\"message\":\"Mandatory fields are missing / invalid\"}')
      mock.verify();
  })

  it('gupshup - invalid operation', async() => {      
    const requestParams = {
      httpMethod: 'POST',
      operation: 'invalid-operation',
      queryStringParameters: null,
      body: null,
      isMultipartRequest: false
    }
    const event = buildRestRequest(requestParams);
    const response = await gupshup(JSON.parse(event))

    expect(response.statusCode).toBe(500);
    expect(response.body).toBe('{"error":"Internal Server Error","message":"The server encountered an unexpected condition."}')
    mock.verify();
  })

  const mockSuccessResponse = () => {
    return [
        200,
        "success | 919876543211 | 5013010796508266548 | OTP sent."
    ];
  }

  const mockVerifyResponse = () => {
    return [
        200,
        "success | 919566311898 | 5013011694188503042 | OTP matched."
    ];
  }

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