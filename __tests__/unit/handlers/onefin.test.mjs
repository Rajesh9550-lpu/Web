import {onefin} from '../../../src/handlers/onefin-api.mjs'
import { common_services } from '../../../src/utility/common_services/common_services.mjs';
import sinon from 'sinon';
import { common_responses } from '../../utility/common_responses.mjs';

describe('Test onefin handler', () => { 
  const headers = { 
    'Content-Type': 'application/json',
    'Authorization': 'Basic dGVzdC1jbGllbnQtaWQ6dGVzdC1jbGllbnQtc2VjcmV0' 
  };   
  let mock;

  beforeAll(()=> {
      process.env.Stage = 'test';
      process.env.securityKey = 'By3lwX52fWLC6tWHqe1Ewy18oRlZjqVlJq9hJDzDa3Q=';
  })

  beforeEach(()=> {
    mock = sinon.mock(common_services);  
  })

  it('onefin - get loan details', async() => {
      mock.expects("sendRequest").withArgs(
        'https://accretivecleantech-uat.onefin.in/api/v1/client/loan/123456/', 
        { 
          method: 'GET',
          headers: headers               
        },
        'text').once().returns(mockSuccessResponse());
      
      const requestParams = {
        httpMethod: 'GET',
        operation: 'loan-booking',
        queryStringParameters: {
          "leadId": "123456"
        },
        body: null,
        isMultipartRequest: false
      }
      const event = buildRestRequest(requestParams);
      const response = await onefin(JSON.parse(event))
    
      expect(response.statusCode).toBe(200);
      expect(response.body).toBe("{\"is_success\":true,\"data\":{}}")
      mock.verify();
  })

  it('onefin - create loan booking', async() => {
      mock.expects("sendRequest").withArgs(
        'https://accretivecleantech-uat.onefin.in/api/v1/client/loan/', 
        { 
          method: 'POST',
          headers: headers,
          body: '{"kyc":[]}' 
        },
        'text').once().returns(mockSuccessResponse());
      
      const requestParams = {
        httpMethod: 'POST',
        operation: 'loan-booking',
        queryStringParameters: null,
        body: '{"data":{"kyc": []}}',
        isMultipartRequest: false
      }
      const event = buildRestRequest(requestParams);
      const response = await onefin(JSON.parse(event))
    
      expect(response.statusCode).toBe(200);
      expect(response.body).toBe("{\"is_success\":true,\"data\":{}}")
      mock.verify();
  })

  it('onefin - update loan booking', async() => {
    mock.expects("sendRequest").withArgs(
      'https://accretivecleantech-uat.onefin.in/api/v1/client/loan/123456/', 
      { 
        method: 'PUT',
        headers: headers,
        body: '{"kyc":[]}' 
      },
      'text').once().returns(mockSuccessResponse());
    
    const requestParams = {
      httpMethod: 'PUT',
      operation: 'loan-booking',
      queryStringParameters: null,
      body: '{"leadId": "123456","data":{"kyc": []}}',
      isMultipartRequest: false
    }
    const event = buildRestRequest(requestParams);
    const response = await onefin(JSON.parse(event))
  
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe("{\"is_success\":true,\"data\":{}}")
    mock.verify();
  })

  it('onefin - loan-detail', async() => {
    mock.expects("sendRequest").withArgs(
      'https://accretivecleantech-uat.onefin.in/api/v2/call/api/loan-detail/', 
      { 
        method: 'POST',
        headers: headers,
        body: '{"leadId":"123456"}' 
      },
      'text').once().returns(mockSuccessResponse());
    
    const requestParams = {
      httpMethod: 'POST',
      operation: 'loan-detail',
      queryStringParameters: null,
      body: '{"data":{"leadId": "123456"}}',
      isMultipartRequest: false
    }
    const event = buildRestRequest(requestParams);
    const response = await onefin(JSON.parse(event))
  
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe("{\"is_success\":true,\"data\":{}}")
    mock.verify();
  })

  it('onefin - loan-listing', async() => {
    mock.expects("sendRequest").withArgs(
      'https://accretivecleantech-uat.onefin.in/api/v2/call/api/loan-listing-v2/', 
      { 
        method: 'POST',
        headers: headers,
        body: '{"mobile":"9322133231"}' 
      },
      'text').once().returns(mockSuccessResponse());
    
    const requestParams = {
      httpMethod: 'POST',
      operation: 'loan-listing',
      queryStringParameters: null,
      body: '{"data":{"mobile":"9322133231"}}',
      isMultipartRequest: false
    }
    const event = buildRestRequest(requestParams);
    const response = await onefin(JSON.parse(event))
  
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe("{\"is_success\":true,\"data\":{}}")
    mock.verify();
  })

  it('onefin - pending-document-list', async() => {
    mock.expects("sendRequest").withArgs(
      'https://accretivecleantech-uat.onefin.in/api/v2/call/api/pending-document-list/', 
      { 
        method: 'POST',
        headers: headers,
        body: '{"loan_request_id":"123456"}' 
      },
      'text').once().returns(mockSuccessResponse());
    
    const requestParams = {
      httpMethod: 'POST',
      operation: 'pending-document-list',
      queryStringParameters: null,
      body: '{"data":{"loan_request_id":"123456"}}',
      isMultipartRequest: false
    }
    const event = buildRestRequest(requestParams);
    const response = await onefin(JSON.parse(event))
  
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe("{\"is_success\":true,\"data\":{}}")
    mock.verify();
  })

  it('onefin - loan request document', async() => {
    mock.expects("sendRequest").once().returns(mockSuccessResponse());
    
    const requestParams = {
      httpMethod: 'POST',
      operation: 'loan-request-document',
      queryStringParameters: null,
      body: 'LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLTg4MDUwNTcxNTk4MzMxMjE5MzkyNTQ5NQ0KQ29udGVudC1EaXNwb3NpdGlvbjogZm9ybS1kYXRhOyBuYW1lPSJkb2N1bWVudF90eXBlIg0KDQphYWRoYXJfZG9jDQotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tODgwNTA1NzE1OTgzMzEyMTkzOTI1NDk1DQpDb250ZW50LURpc3Bvc2l0aW9uOiBmb3JtLWRhdGE7IG5hbWU9ImNvbW1lbnQiDQoNCjk1NjYzMTE4OTgNCi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS04ODA1MDU3MTU5ODMzMTIxOTM5MjU0OTUNCkNvbnRlbnQtRGlzcG9zaXRpb246IGZvcm0tZGF0YTsgbmFtZT0ibGVhZElkIg0KDQo2Mzg2YTc3YS0zOGNiLTQzYzYtYWEzMC0yZDQ0OTlhYTAyOGINCi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS04ODA1MDU3MTU5ODMzMTIxOTM5MjU0OTUNCkNvbnRlbnQtRGlzcG9zaXRpb246IGZvcm0tZGF0YTsgbmFtZT0iYWFkaGFyX2RvYyI7IGZpbGVuYW1lPSJoZWxsby50eHQiDQpDb250ZW50LVR5cGU6IHRleHQvcGxhaW4NCg0KaGVsbG8NCi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS04ODA1MDU3MTU5ODMzMTIxOTM5MjU0OTUtLQ0K',
      isMultipartRequest: true    
    }
    const event = buildRestRequest(requestParams);
    const response = await onefin(JSON.parse(event))
  
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe("{\"is_success\":true,\"data\":{}}")
    mock.verify();
  })

  it('onfin - generate document', async() => {
      mock.expects("sendRequest")
      .withArgs(
        'https://accretivecleantech-uat.onefin.in/api/v1/client/loan/123456/generate-document/', 
        { 
          method: 'POST',
          headers: headers,
          body: '{"doc_type":"sanction_letter"}' 
        }, 
        'text')
        .once().returns(mockGenerateDocumentResponse());  
      const requestParams = {
        httpMethod: 'POST',
        operation: 'generate-document',
        queryStringParameters: null,
        body: '{"leadId": "123456","data":{"doc_type": "sanction_letter"}}',
        isMultipartRequest: false
      }
      const event = buildRestRequest(requestParams);
      const response = await onefin(JSON.parse(event))
      
      expect(response.statusCode).toBe(200);
      mock.verify();
  })

  it('onfin - invalid operation', async() => {      
    const requestParams = {
      httpMethod: 'POST',
      operation: 'generate-documents',
      queryStringParameters: null,
      body: '{"leadId": "123456","data":{"doc_type": "sanction_letter"}}',
      isMultipartRequest: false
    }
    const event = buildRestRequest(requestParams);
    const response = await onefin(JSON.parse(event))

    expect(response.statusCode).toBe(500);
    expect(response.body).toBe('{"error":"Internal Server Error","message":"The server encountered an unexpected condition."}')
    mock.verify();
  })

  it('onefin - 400 bad response', async() => {
    mock.expects("sendRequest").withArgs(
      'https://accretivecleantech-uat.onefin.in/api/v2/call/api/loan-detail/', 
      { 
        method: 'POST',
        headers: headers,
        body: '{"leadId":"123456"}' 
      },
      'text').once().returns(common_responses.badRequestResponse());
    
    const requestParams = {
      httpMethod: 'POST',
      operation: 'loan-detail',
      queryStringParameters: null,
      body: '{"data":{"leadId": "123456"}}',
      isMultipartRequest: false
    }
    const event = buildRestRequest(requestParams);
    const response = await onefin(JSON.parse(event))
  
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe("Bad Request")
    mock.verify();
  })

  it('onefin - UnAuthorized', async() => {
    mock.expects("sendRequest").withArgs(
      'https://accretivecleantech-uat.onefin.in/api/v2/call/api/loan-detail/', 
      { 
        method: 'POST',
        headers: headers,
        body: '{"leadId":"123456"}' 
      },
      'text').once().returns(common_responses.unAuthorizedResponse());
    
    const requestParams = {
      httpMethod: 'POST',
      operation: 'loan-detail',
      queryStringParameters: null,
      body: '{"data":{"leadId": "123456"}}',
      isMultipartRequest: false
    }
    const event = buildRestRequest(requestParams);
    const response = await onefin(JSON.parse(event))
  
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe('{"error":"Bad Request","message":"Mandatory fields are missing / invalid"}')
    mock.verify();
  })

  it('onefin - upload document', async() => {
    mock.expects("sendRequest").once().returns(mockSuccessResponse());
    
    const requestParams = `{
      "body": "LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLTE4NDc5MDYxMjA5NDU0Njk4ODkzOTA1MQ0KQ29udGVudC1EaXNwb3NpdGlvbjogZm9ybS1kYXRhOyBuYW1lPSJkb2N1bWVudF9pZCINCg0KY3JlZGl0X3JlcG9ydA0KLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLTE4NDc5MDYxMjA5NDU0Njk4ODkzOTA1MQ0KQ29udGVudC1EaXNwb3NpdGlvbjogZm9ybS1kYXRhOyBuYW1lPSJsZWFkSWQiDQoNCjc4YzU1NDc5LTFhZTMtNDAwYS1iZTA2LWE3MjAyNzNkNTUzZg0KLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLTE4NDc5MDYxMjA5NDU0Njk4ODkzOTA1MQ0KQ29udGVudC1EaXNwb3NpdGlvbjogZm9ybS1kYXRhOyBuYW1lPSJkb2N1bWVudCI7IGZpbGVuYW1lPSJoZWxsby50eHQiDQpDb250ZW50LVR5cGU6IHRleHQvcGxhaW4NCg0KaA0KLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLTE4NDc5MDYxMjA5NDU0Njk4ODkzOTA1MS0tDQo=",
      "headers": {
        "Content-Length": "476",
        "Content-Type": "multipart/form-data; boundary=--------------------------184790612094546988939051",
        "Host": "localhost:3000"
      },
      "httpMethod": "POST",
      "isBase64Encoded": true,
      "multiValueQueryStringParameters": null,
      "path": "/onefin/upload-document",
      "pathParameters": {
        "operation": "upload-document"
      },
      "queryStringParameters": null
    }`;
    const response = await onefin(JSON.parse(requestParams))
  
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe("{\"is_success\":true,\"data\":{}}")
    mock.verify();
  })
  
  const mockSuccessResponse = () => {
    const response = JSON.stringify({
      "is_success": true,
      "data": {}
    })
    return [
        200,
        response
    ];
  }

  const mockGenerateDocumentResponse = () => {
    const response = JSON.stringify({
      "is_success": true,
      "data": "https://ecofy-private.s3.amazonaws.com/fd205b03-bbac-4330-8ab6-40c7d014deaa/user-data/AMIT-KUMAR-CHUGH-7259826009/others/sanction_letter-/tmp/tmp3hyd9t5k/file-output-12-10-2023-09-33-50-0178-12485.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVJ4VH4PFTIZBVP6F%2F20231012%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20231012T093350Z&X-Amz-Expires=7200&X-Amz-SignedHeaders=host&X-Amz-Signature=0537c7fc1fa15337a8ffba82ddd6ce34c46dd8ebb54537abccc256a997ae4808"
    })
    return [
        200,
        response
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
      "path": `/onefin/${requestParams.operation}`,
      "pathParameters": {
        "operation": requestParams.operation
      },
      "queryStringParameters": requestParams.queryStringParameters
    }
    if(requestParams.isMultipartRequest) {
      eventRequest.headers["Content-Type"] = "multipart/form-data; boundary=--------------------------880505715983312193925495";
      eventRequest['isBase64Encoded'] = true;
    }
    return JSON.stringify(eventRequest);
  }
})