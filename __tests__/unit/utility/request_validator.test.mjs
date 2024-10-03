import { validateRequest } from '../../../src/utility/common_services/request_validator.mjs' 
import Joi from 'joi'
import kotak_data_sync_worker from '../../../src/workers/kotak_app_data_sync_workers.mjs'

describe('Test validation request', () => {
    it('test success validation', ()=> {
        const reqSchema = { 
            name: Joi.string().alphanum().min(3).max(30).required(),
            birthyear: Joi.number().integer().min(1970).max(2013),
            test: Joi.number().integer().optional()
          };        
          const dataToValidate = { 
            name: 'chris', 
            birthyear: 1971
          }
          const { value, error } = validateRequest(dataToValidate, reqSchema);
          
          expect(error).toBe(undefined);
    })

    it('test error validation', ()=> {
        const reqSchema = { 
            name: Joi.string().alphanum().min(3).max(30).required(),
            birthyear: Joi.number().integer().min(1970).max(2013), 
          };        
          const dataToValidate = {};
          const { value, error } = validateRequest(dataToValidate, reqSchema);
          
          expect(error.message).toBe('"name" is required');
    })

    it('test kotak request validation', ()=> {
          const reqSchema = kotak_data_sync_worker.schema();
          const request = {
            "jobId": 1310813,
            "policyNo": "CD000337",
            "fiName": "ACCRETIVE CLEANTECH FINANCE PRIVATE LIMITED ECOFY",
            "loanID": "HL_015549865B6",
            "coiIssueStatus": "Y",
            "coiNo": "",
            "customerID": "HL_8150H70",
            "borrowerSalutationDesc": "Mr",
            "borrowerFirstName": "Sanket",
            "borrowerSurName": "..",
            "emailID": "test@mail.com",
            "genderDesc": "Male",
            "branchName": "HO",
            "branchCode": "1",
            "regOfficeName": "West",
            "regionId": 0,
            "addressLine1": "AHMEDABAD",
            "addressLine2": "Madhavaram Nagar Colony, Kukatpally,",
            "addressLine3": "Hyderabad",
            "addressLine4": "",
            "addressLine5": "",
            "stateName": "Telangana",
            "pinCode": "500072",
            "nomSalutation": "Mrs",
            "nomFirstName": "Prahal",
            "nomSurname": "SI",
            "nomDOB": "04/06/2000",
            "nomGender": "Female",
            "nomRelation": "Sibling",
            "nomPcnt": 100,
            "appointeeSalutationDesc": "",
            "appointeeFirstName": "",
            "appointeeSurName": "",
            "appointeeGenderDesc": "",
            "appointeeMartialStatusDesc": "",
            "appointeeDOB": "",
            "appointeeID": "",
            "appointeeRelationDesc": "",
            "proposerSalutationDesc": "",
            "proposerFirstName": "",
            "proposerSurName": "",
            "proposerGenderDesc": "",
            "proposerMartialStatusDesc": "",
            "proposerDOB": "",
            "proposerID": "",
            "proposerRelation": "",
            "secSalutationDesc": "",
            "secondaryMemberFirstName": "",
            "secondaryMemberSirName": "",
            "secondaryMemID": "",
            "secCoverAmt": 0,
            "secCOINo": "",
            "secLoanID": "",
            "isDOGHSubmitted": "YES",
            "utrNo": "24052023",
            "remarks": "",
            "loanTypeDesc": "Electric Vehicles",
            "dateOfCommencement": "22/01/2024",
            "dateOfBirth": "01/09/1990",
            "santionAmt": 100000,
            "isFundedBySIB": "No",
            "loanTenureYrs": "3",
            "roleAssociated": "Single Life",
            "secInsuredDOB": "",
            "secondaryGenderDesc": "",
            "secondaryInsAge": 0,
            "secondaryKotakPremium": "0",
            "totalTenure": "3",
            "mobileNo": 9347301244,
            "ageAtCommencement": "24",
            "aadharReferenceNo": ""
          };
          const { value, error } = validateRequest(request, reqSchema);
          
          expect(error).toBe(undefined);
    })
})
