import Mailer from "../../../src/utility/common_services/mailer.mjs";

describe('Test Mailer Services', () => {
    it.skip('test send mail', async ()=> {
        const mailer = new Mailer('noreply@ecofy.co.in', 'rkrishnan@ecofy.co.in', 'Test mail');
        mailer.setCcAddress('rkrishnan@ecofy.co.in');
        mailer.setBody(`<html>
        <body>
        <p><b>Hello Team,</b></p>
        <p>This is test mail.</p>
        </body>
        </html>`)
        const result = await mailer.send();
        expect(result).toBe(true)
    })

    it.skip('test send mail failed', async ()=> {
        const mailer = new Mailer('noreply@ecofy.co.in', '', 'Test mail');
        mailer.setCcAddress('rkrishnan@ecofy.co.in');
        mailer.setBody(`<html>
        <body>
        <p><b>Hello Team,</b></p>
        <p>This is test mail.</p>
        </body>
        </html>`)
        const result = await mailer.send();
        expect(result).toBe(false)
    })
})