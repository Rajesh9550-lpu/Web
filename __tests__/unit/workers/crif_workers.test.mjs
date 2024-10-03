import crif_workers from "../../../src/workers/crif_api_workers.mjs";

describe('Test CRIF workers', () => {
    beforeAll(()=> {
        process.env.Stage = 'test';
        process.env.securityKey = 'By3lwX52fWLC6tWHqe1Ewy18oRlZjqVlJq9hJDzDa3Q=';
    })
    it.skip('test issue request', async ()=> {   
        const requestBody = issueRequest();     
        const req = {
            body: requestBody
        }
        const res = { 
            body: '',
            statusCode: '',
            status: function(input) { 
                this.statusCode = input;
                return this;
            },
            json: function(res){
                this.body = res;
                return this;
            } 
        };      
        const response = await crif_workers.issue(req, res);      
        console.log(JSON.stringify(response));  
        expect(1).toBe(1)
      })

      it.skip('test issue status request', async ()=> {      
        const req = {
            body: {
                "INQUIRY-UNIQUE-REF-NO": "ECODY_LLMS_030520231349897",
                "REQUEST-DT-TM": "12-02-2024",
                "REPORT-ID": "ACCR240212CR377834387"
            }
        }
        const res = { 
            body: '',
            statusCode: '',
            status: function(input) { 
                this.statusCode = input;
                return this;
            },
            json: function(res){
                this.body = res;
                return this;
            } 
        };
      
        const response = await crif_workers.issueStatus(req, res);      
        console.log(JSON.stringify(response));  
        expect(1).toBe(1)
      })

      function issueRequest() {
        return {
            "COMM-APPLICANT-SEGMENT": {
              "BORROWER-NAME": "GSR KKR EDUCATIONAL SOCIETY",
              "BORROWER-SHORT-NAME": "GSR KKR EDUCATIONAL SOCIETY",
              "LEGAL-CONSTITUTION": "30",
              "IDS": {
                "ID": {
                  "TYPE": "ID07",
                  "VALUE": "NUACS3974G"
                }
              },
              "CLASS-OF-ACTIVITY-1": "OTHER COMMUNITY, SOCIAL AND PERSONAL SERVICE ACTIVITIES",
              "PHONES": {
                "PHONE": {
                  "TELE-NO": "8779198603",
                  "TELE-NO-TYPE": "P01"
                }
              }
            },
            "COMM-ADDRESS-SEGMENT": {
              "ADDRESS": {
                "TYPE": "D01",
                "ADDRESS-LINE": "DNO 3 28 18 49A PADMAVATHI ARCADE4THLANE BRINDAVAN GARDENSGUNTURGUNTUR GUNTUR 522006",
                "CITY": "GUNTUR",
                "STATE": "AP",
                "PIN": "522006"
              }
            },
            "APPLICATION-SEGMENT": {
              "INQUIRY-UNIQUE-REF-NO": "ECODY_LLMS_030520231349897",
              "CREDT-INQ-PURPS-TYP": "ACCT-ORIG",
              "CREDT-INQ-PURPS-TYP-DESC": "Application for loan",
              "CREDIT-INQUIRY-STAGE": "PRE_DISB",
              "CREDT-RPT-ID": "d71b2ba0-6b38-4fa1-b2ca-8db6c2f34b9d",
              "REPORT-ID": "ECOFY 230503CR524395812",
              "CREDT-REQ-TYP": "INDV",
              "MBR-ID": 'NBF0003223',
              "LOS-APP-ID": "LLMS",
              "LOAN-TYPE": "9999",
              "LOAN-AMOUNT": "400000"
            }
          };
      }
})