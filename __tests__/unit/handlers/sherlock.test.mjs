import { fraudCheck } from '../../../src/handlers/sherlock-api.mjs'
import { common_services } from '../../../src/utility/common_services/common_services.mjs';
import { common_responses } from '../../utility/common_responses.mjs';
import sinon from 'sinon';

describe('Test Sherlock handler', () => {
  let mock;

  beforeAll(()=> {
    process.env.Stage = 'test';
    process.env.securityKey = 'By3lwX52fWLC6tWHqe1Ewy18oRlZjqVlJq9hJDzDa3Q=';
  })

  beforeEach(()=> {
    mock = sinon.mock(common_services);  
  })

  it('Sherlock - Issue test', async() => {
      mock.expects("sendRequest").once()
      .withArgs(
        'https://test.crifhighmark.com/FraudBoot/webservice/issue',
        {
          "method":"POST","body":"{\"reqXml\":\"<ISSUE-FILE><HEADER-SEGMENT><REQUEST-TYPE>SHERLOCK|SHERLOCK-HTML</REQUEST-TYPE><CUSTOMER-ID>NBF0003223</CUSTOMER-ID><DATE-OF-REQUEST>28-03-2023</DATE-OF-REQUEST><REQUEST-ACTION-TYPE>SUBMIT</REQUEST-ACTION-TYPE><RESPONSE-FORMAT>XML</RESPONSE-FORMAT></HEADER-SEGMENT><INQUIRY><CASE-ID>28551693029</CASE-ID><CIR/></INQUIRY></ISSUE-FILE>\"}","headers":{"username":"test@accreativecleantech.com","password":"test-client-id","customerId":"test-client-id","accessCode":"test-client-secret","requestFormat":"xml","Content-Type":"application/json"}},
          'text')
      .returns(mockAsyncCallSuccessResponse());
      
      const requestParams = {
        httpMethod: 'POST',
        operation: 'issue',
        queryStringParameters: null,
        body: {"data":{"ISSUE-FILE":{"HEADER-SEGMENT":{"REQUEST-TYPE": "SHERLOCK|SHERLOCK-HTML","CUSTOMER-ID": "NBF0003223","DATE-OF-REQUEST": "28-03-2023",           "REQUEST-ACTION-TYPE": "SUBMIT","RESPONSE-FORMAT": "XML"},"INQUIRY": {"CASE-ID": "28551693029","CIR": ""}}}}
      }
      
      const event = buildRestRequest(requestParams);
      const response = await fraudCheck(event)
    
      expect(response.statusCode).toBe(200);
      mock.verify();
  })

  it('Sherlock - async test', async() => {
    mock.expects("sendRequest").withArgs(
      'https://test.crifhighmark.com/FraudBoot/webservice/async',
      {"method":"POST","body":"{\"reqXml\":\"<REQUEST-FILE><HEADER-SEGMENT><REQUEST-TYPE>SHERLOCK|SHERLOCK-HTML</REQUEST-TYPE><DATE-OF-REQUEST>01-02-2023</DATE-OF-REQUEST><REQUEST-ACTION-TYPE>SUBMIT</REQUEST-ACTION-TYPE><RESPONSE-FORMAT>XML</RESPONSE-FORMAT><RES-FOR-FUTURE1/><RES-FOR-FUTURE2/></HEADER-SEGMENT><INQUIRY><PRIORITY>YES</PRIORITY><APPLICATION-SEGMENT><APPLN-ID>CR1579TC002</APPLN-ID><APPLN-DT>14-06-2021</APPLN-DT><BRANCH-ID/><BRANCH-REGION/><ACCT-OPEN-DATE/><APPLN-VALUE>5000000</APPLN-VALUE><LTV/><TERM>36</TERM><APPLN-OFFICER/><APPLN-TYPE>IA99</APPLN-TYPE><OTHER-DESC/><APPLICANT-SEGMENT><APPLICANT><APPLICANT-TYPE>O01</APPLICANT-TYPE><APPLICANT-ID>DEF1</APPLICANT-ID><FRAUD-VICTIM-FLAG/><FRAUD-VICTIM-CLASS/><GENDER>G01</GENDER><AKA/><QUALIFICATION/><APPLICANT-NAME><NAME1>ShivaOmkar</NAME1><NAME2/><NAME3/><NAME4/><NAME5/></APPLICANT-NAME><DOB><DOB-DATE>28-09-1990</DOB-DATE><AGE/><AGE-AS-ON/></DOB><IDS><ID><APPLICANT-ID-TYPE>ID03</APPLICANT-ID-TYPE><APPLICANT-ID-TYPE>ID02</APPLICANT-ID-TYPE><APPLICANT-ID-VALUE/><APPLICANT-ID-VALUE>WRQ6904685</APPLICANT-ID-VALUE></ID></IDS><RELATIONS><RELATION><RELATION-TYPE/><RELATIVE-NAME/></RELATION></RELATIONS><ACC-VERIFICATION><VERIFICATION><ACCT-DOC-TYPE/><ACCT-DOC-NUMBER/><DOC-ISSUE-DATE/><ACCT-DOC-PURPOSE/><PLACE-OF-ISSUE/><ACCT-NUMBER/><BANK_NAME/><BANK-IFSC/><BANK-MICR/></VERIFICATION></ACC-VERIFICATION><EMPLOYMENTS><EMPLOYMENT><OCCUPATION/><JOB-TITLE/><EMPLOYER-NAME/><EMPLOYER-STATUS/><INDUSTRY/><EMPLOYEE-NUMBER/><EMP-START-DATE/><EMP-END-DATE/><INCOME/><INCOME-INDICATOR/></EMPLOYMENT></EMPLOYMENTS><ADDRESSES><ADDRESS><ADDRESS-TYPE>D01</ADDRESS-TYPE><ADDRESS-LINE1>Ghatladki</ADDRESS-LINE1><ADDRESS-LINE2/><ADDRESS-LINE3/><ADDRESS-LINE4/><ADDRESS-LINE5/><CITY>Amravati</CITY><STATE>TN</STATE><PIN>444720</PIN><COUNTRY>IND</COUNTRY><FROM-DATE/><TO-DATE/></ADDRESS></ADDRESSES><PHONES><PHONE><TELE-NO-TYPE>P03</TELE-NO-TYPE><TELE-NO>9766812648</TELE-NO></PHONE></PHONES><E-MAILS><E-MAIL><EMAIL-TYPE>EMT01</EMAIL-TYPE><EMAIL-ID>shiva108@gmail.com</EMAIL-ID></E-MAIL></E-MAILS></APPLICANT></APPLICANT-SEGMENT><COLLATERAL-SEGMENT><COLLATERAL><TYPE-OF-COLLATERAL/><COLLAT-OTHER-DESC/><PROP-OWN-NAME/><TYPE-OF-CHARGE/><COLLATERAL-VALUE/><VALUATION-DATE/><APPRAISER-NAME/><PROP-ADDRESS-TYPE/><PROP-ADDRESS-LINE1/><PROP-ADDRESS-LINE2/><CITY/><STATE/><PIN-CODE/><BUILD-TYPE/><YEAR-OF-MAKE/><DEALER/><REG-NO/><ENG-NO/><CHASSIS-NO/></COLLATERAL></COLLATERAL-SEGMENT><OTHER-ENTITIES><OTHER-ENTITY><REF-TITLE/><REF-NAME1/><REF-NAME2/><REF-NAME3/><REF-AKA/><REF-PHONE1/><REF-PHONE2/><REF-EMAIL1/><REF-EMAIL2/><REF-ADDRESS-LINE1/><REF-ADDRESS-LINE2/><REF-ADDRESS-LINE3/><REF-CITY/><REF-STATE/><REF-PINCODE/><REF-COUNTRY/></OTHER-ENTITY><OTHER-ENTITY><REF-TITLE/><REF-NAME1/><REF-NAME2/><REF-NAME3/><REF-AKA/><REF-PHONE1/><REF-PHONE2/><REF-EMAIL1/><REF-EMAIL2/><REF-ADDRESS-LINE1/><REF-ADDRESS-LINE2/><REF-ADDRESS-LINE3/><REF-CITY/><REF-STATE/><REF-PINCODE/><REF-COUNTRY/></OTHER-ENTITY></OTHER-ENTITIES><BROKER><BRKR-ORG-NAME/><BRKR-NAME/><BRKR-ADD><BRKR-ADDRESS/><BRKR-CITY/><BRKR-STATE/><BRKR-PINCODE/><BRKR-COUNTRY/></BRKR-ADD><BRKR-PHONE/></BROKER></APPLICATION-SEGMENT></INQUIRY></REQUEST-FILE>\"}","headers":{"username":"test@accreativecleantech.com","password":"test-client-id","customerId":"test-client-id","accessCode":"test-client-secret","requestFormat":"xml","Content-Type":"application/json"}},
        'text').once().returns(mockAsyncCallSuccessResponse());
    
    const requestParams = {
      httpMethod: 'POST',
      operation: 'async',
      queryStringParameters: null,
      body: {"data":{"REQUEST-FILE":{"HEADER-SEGMENT":{"REQUEST-TYPE":"SHERLOCK|SHERLOCK-HTML","DATE-OF-REQUEST":"01-02-2023","REQUEST-ACTION-TYPE":"SUBMIT","RESPONSE-FORMAT":"XML","RES-FOR-FUTURE1":"","RES-FOR-FUTURE2":""},"INQUIRY":{"PRIORITY":"YES","APPLICATION-SEGMENT":{"APPLN-ID":"CR1579TC002","APPLN-DT":"14-06-2021","BRANCH-ID":"","BRANCH-REGION":"","ACCT-OPEN-DATE":"","APPLN-VALUE":"5000000","LTV":"","TERM":"36","APPLN-OFFICER":"","APPLN-TYPE":"IA99","OTHER-DESC":"","APPLICANT-SEGMENT":{"APPLICANT":{"APPLICANT-TYPE":"O01","APPLICANT-ID":"DEF1","FRAUD-VICTIM-FLAG":"","FRAUD-VICTIM-CLASS":"","GENDER":"G01","AKA":"","QUALIFICATION":"","APPLICANT-NAME":{"NAME1":"ShivaOmkar","NAME2":"","NAME3":"","NAME4":"","NAME5":""},"DOB":{"DOB-DATE":"28-09-1990","AGE":"","AGE-AS-ON":""},"IDS":{"ID":{"APPLICANT-ID-TYPE":["ID03","ID02"],"APPLICANT-ID-VALUE":["","WRQ6904685"]}},"RELATIONS":{"RELATION":{"RELATION-TYPE":"","RELATIVE-NAME":""}},"ACC-VERIFICATION":{"VERIFICATION":{"ACCT-DOC-TYPE":"","ACCT-DOC-NUMBER":"","DOC-ISSUE-DATE":"","ACCT-DOC-PURPOSE":"","PLACE-OF-ISSUE":"","ACCT-NUMBER":"","BANK_NAME":"","BANK-IFSC":"","BANK-MICR":""}},"EMPLOYMENTS":{"EMPLOYMENT":{"OCCUPATION":"","JOB-TITLE":"","EMPLOYER-NAME":"","EMPLOYER-STATUS":"","INDUSTRY":"","EMPLOYEE-NUMBER":"","EMP-START-DATE":"","EMP-END-DATE":"","INCOME":"","INCOME-INDICATOR":""}},"ADDRESSES":{"ADDRESS":{"ADDRESS-TYPE":"D01","ADDRESS-LINE1":"Ghatladki","ADDRESS-LINE2":"","ADDRESS-LINE3":"","ADDRESS-LINE4":"","ADDRESS-LINE5":"","CITY":"Amravati","STATE":"TN","PIN":"444720","COUNTRY":"IND","FROM-DATE":"","TO-DATE":""}},"PHONES":{"PHONE":{"TELE-NO-TYPE":"P03","TELE-NO":"9766812648"}},"E-MAILS":{"E-MAIL":{"EMAIL-TYPE":"EMT01","EMAIL-ID":"shiva108@gmail.com"}}}},"COLLATERAL-SEGMENT":{"COLLATERAL":{"TYPE-OF-COLLATERAL":"","COLLAT-OTHER-DESC":"","PROP-OWN-NAME":"","TYPE-OF-CHARGE":"","COLLATERAL-VALUE":"","VALUATION-DATE":"","APPRAISER-NAME":"","PROP-ADDRESS-TYPE":"","PROP-ADDRESS-LINE1":"","PROP-ADDRESS-LINE2":"","CITY":"","STATE":"","PIN-CODE":"","BUILD-TYPE":"","YEAR-OF-MAKE":"","DEALER":"","REG-NO":"","ENG-NO":"","CHASSIS-NO":""}},"OTHER-ENTITIES":{"OTHER-ENTITY":[{"REF-TITLE":"","REF-NAME1":"","REF-NAME2":"","REF-NAME3":"","REF-AKA":"","REF-PHONE1":"","REF-PHONE2":"","REF-EMAIL1":"","REF-EMAIL2":"","REF-ADDRESS-LINE1":"","REF-ADDRESS-LINE2":"","REF-ADDRESS-LINE3":"","REF-CITY":"","REF-STATE":"","REF-PINCODE":"","REF-COUNTRY":""},{"REF-TITLE":"","REF-NAME1":"","REF-NAME2":"","REF-NAME3":"","REF-AKA":"","REF-PHONE1":"","REF-PHONE2":"","REF-EMAIL1":"","REF-EMAIL2":"","REF-ADDRESS-LINE1":"","REF-ADDRESS-LINE2":"","REF-ADDRESS-LINE3":"","REF-CITY":"","REF-STATE":"","REF-PINCODE":"","REF-COUNTRY":""}]},"BROKER":{"BRKR-ORG-NAME":"","BRKR-NAME":"","BRKR-ADD":{"BRKR-ADDRESS":"","BRKR-CITY":"","BRKR-STATE":"","BRKR-PINCODE":"","BRKR-COUNTRY":""},"BRKR-PHONE":""}}}}}}
    }
    const event = buildRestRequest(requestParams);
    const response = await fraudCheck(event)
  
    expect(response.statusCode).toBe(200);
    mock.verify();
  })
  
  it('Sherlock - invalid request body', async() => {    
    const requestParams = {
      httpMethod: 'POST',
      operation: 'issue',
      queryStringParameters: null,
      body: null
    }
    const event = buildRestRequest(requestParams);
    event.body = null;
    const response = await fraudCheck(event)
  
    expect(response.statusCode).toBe(500);
    expect(response.body).toBe(`{"error":"Internal Server Error","message":"The server encountered an unexpected condition."}`)
  })

  it('Sherlock - invalid request data', async() => {    
    const requestParams = {
      httpMethod: 'POST',
      operation: 'issue',
      queryStringParameters: null,
      body: {
        "data": null
      }
    }
    const event = buildRestRequest(requestParams);
    const response = await fraudCheck(event)
  
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe(`{\"error\":\"Bad Request\",\"message\":\"Mandatory fields are missing / invalid\"}`)
  })

  it('Sherlock - Un Authorized request', async() => {
    mock.expects("sendRequest").once()
    .withArgs(
      'https://test.crifhighmark.com/FraudBoot/webservice/issue',
      {
        "method":"POST","body":"{\"reqXml\":\"<ISSUE-FILE><HEADER-SEGMENT><REQUEST-TYPE>SHERLOCK|SHERLOCK-HTML</REQUEST-TYPE><CUSTOMER-ID>NBF0003223</CUSTOMER-ID><DATE-OF-REQUEST>28-03-2023</DATE-OF-REQUEST><REQUEST-ACTION-TYPE>SUBMIT</REQUEST-ACTION-TYPE><RESPONSE-FORMAT>XML</RESPONSE-FORMAT></HEADER-SEGMENT><INQUIRY><CASE-ID>28551693029</CASE-ID><CIR/></INQUIRY></ISSUE-FILE>\"}","headers":{"username":"test@accreativecleantech.com","password":"test-client-id","customerId":"test-client-id","accessCode":"test-client-secret","requestFormat":"xml","Content-Type":"application/json"}},
        'text')
    .returns(common_responses.unAuthorizedResponse());
    
    const requestParams = {
      httpMethod: 'POST',
      operation: 'issue',
      queryStringParameters: null,
      body: {"data":{"ISSUE-FILE":{"HEADER-SEGMENT":{"REQUEST-TYPE": "SHERLOCK|SHERLOCK-HTML","CUSTOMER-ID": "NBF0003223","DATE-OF-REQUEST": "28-03-2023",           "REQUEST-ACTION-TYPE": "SUBMIT","RESPONSE-FORMAT": "XML"},"INQUIRY": {"CASE-ID": "28551693029","CIR": ""}}}}
    }
      const event = buildRestRequest(requestParams);
      const response = await fraudCheck(event)
    
      expect(response.statusCode).toBe(500);
      expect(response.body).toBe('{\"error\":\"Internal Server Error\",\"message\":\"The server encountered an unexpected condition.\"}')
      mock.verify();
  })

  const mockAsyncCallSuccessResponse = () => {
    return [
        200,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
         <ACKNOWLEDGEMENT-FILE>
            <INQUIRY-STATUS>
                <INQUIRY>
                    <APPLN-ID>CR1579TC002</APPLN-ID>
                    <DATE-OF-REQUEST>18-10-2023</DATE-OF-REQUEST>
                    <CASE-ID>28551693525</CASE-ID>
                    <RESPONSE-DT>18-10-2023</RESPONSE-DT>
                    <RESPONSE-TYPE>ACKNOWLEDGEMENT</RESPONSE-TYPE>
                </INQUIRY>
            </INQUIRY-STATUS>
         </ACKNOWLEDGEMENT-FILE>`
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
      "path": `/sherlock/${requestParams.operation}`,
      "pathParameters": {
        "operation": requestParams.operation
      },
      "queryStringParameters": requestParams.queryStringParameters
    }
    return eventRequest;
  }
})