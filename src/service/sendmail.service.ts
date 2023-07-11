import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { generatePdf } from "html-pdf-node";
@Injectable()
export class SendMailService {
    constructor(private mailerService: MailerService) { }
    async studentGownBooking(data: any) {
        const subject = `Order Confirmation ${data.orderNumber} `

        const body = `Dear ${data.firstName},
        Thank you for booking your Academic robes with Phelan Conan Limited.
        Your order reference no is ${data.orderNumber}
        Please keep this reference number safe, as you will need to bring this number with you on the day of the graduation you are attending to collect your robes.
        Your Robes will be available for collection in the Staff Robing area at least 1 hour before the graduation commences.
        When collecting your robes please go directly to the area marked "ACADEMIC STAFF ROBES".

        Thanks,
        Phelan Conan Limited,
        44 Fashion City,
        Ballymount,
        Dublin 24,
        Ireland
        Phone: +353 1 429 5300
        Fax: +353 1 4295791
        Email: info@phelanconan.com `

        let _html = `<html>
<body style="background-color: #f7f7f7; padding: 20px;">
    <div style="display: flex; margin: 0px auto; width: 50%; align-items: center; ">
    <h2>Phelan Conan Ltd.</h2>
</div>
<h1 style="text-align: center;">Gown Hire  Details for Graduated Ceremony</h1>

  <table style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; padding: 20px; margin: 0px auto;">
    <tr style="margin: 20px; text-align: left;">
        <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
            Name:
        </th>
        <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${data.firstName + " " + data.lastName || ''}</td>
    </tr>
    <tr style="margin: 20px; text-align: left;">
        <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
            Email:
        </th>
        <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${data.email}</td>
    </tr>
    <tr style="margin: 20px; text-align: left;">
        <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
            Phone No:
        </th>
        <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${data.phone}</td>
    </tr>
    <tr style="margin: 20px; text-align: left;">
        <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
            Institute:
      </th>
        <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${data.institute["name"]}</td>
    </tr>
    <tr style="margin: 20px; text-align: left;">
        <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
            Faculty:
      </th>
        <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${data.faculty["name"]}</td>
    </tr>
    <tr style="margin: 20px; text-align: left;">
        <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
            Course:
      </th>
        <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${data.course["name"]}</td>
    </tr>
    <tr style="margin: 20px; text-align: left;">
        <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
            Price:
      </th>
        <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${data.price}</td>
    </tr>
    <tr style="margin: 20px; text-align: left;">
        <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
            Graduation Date:
        </th>
        <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${data.date}</td>
    </tr>
    <tr style="margin: 20px; text-align: left;">
        <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
            Ceremony Time:
        </th>
        <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${data.time}</td>
    </tr>
    <tr style="margin: 20px; text-align: left;">
        <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
            Height:
        </th>
        <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;"> ${data.size + " " + data.height}</td>
    </tr>
    <tr style="margin: 20px; text-align: left;">
        <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
        Special Requirements:
      </th>
        <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${data.requirement}</td>
    </tr>
    <tr style="margin: 20px; text-align: left;">
        <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
            Order Number:
        </th>
        <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${data.orderNumber}</td>
    </tr>
    <tr style="margin: 20px; text-align: left;">
        <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
            Address:
      </th>
        <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${data.addressLine}</td>
    </tr>
    <tr style="margin: 20px; text-align: left;">
        <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
            Zip code:
      </th>
        <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${data.zipcode}</td>
    </tr>
    <tr style="margin: 20px; text-align: left;">
    <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
       City:
  </th>
    <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${data.city}</td>
</tr>
<tr style="margin: 20px; text-align: left;">
<th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
    Country:
</th>
<td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${data.country}</td>
</tr>

  </table>
</body>
</html>`
        let _pdf = await generatePdf({ content: _html }, { format: 'A4' })
        this.send([data.email], subject, body, [{ filename: `booking.pdf`, content: _pdf }], false);
    }
    async staffGownBooking(data: any) {
        const subject = `Order Confirmation ${data.orderNumber} `
        const body = `Dear ${data.firstName},
        Thank you for booking your Academic robes with Phelan Conan Limited.
        Your order reference no is ${data.orderNumber}
        Please keep this reference number safe, as you will need to bring this number with you on the day of the graduation you are attending to collect your robes.
        Your Robes will be available for collection in the Staff Robing area at least 1 hour before the graduation commences.
        When collecting your robes please go directly to the area marked "ACADEMIC STAFF ROBES".

        Thanks,
        Phelan Conan Limited,
        44 Fashion City,
        Ballymount,
        Dublin 24,
        Ireland
        Phone: +353 1 429 5300
        Fax: +353 1 4295791
        Email: info@phelanconan.com `
        
        let _html = `<html>
        <body style="background-color: #f7f7f7; padding: 20px;">
            <div style="display: flex; margin: 0px auto; width: 50%; align-items: center; ">
            <img src="C:\Users\ADMIN\Downloads\cropped-logo.webp" alt="" style="text-align: center; width: 15%; ; ">
            <h2>Phelan Conan Ltd.</h2>
        </div>
        <h1 style="text-align: center;">Gown Hire  Details for Graduated Ceremony</h1>
   
          <table style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; padding: 20px; margin: 0px auto;">
            <tr style="margin: 20px; text-align: left;">
                <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                    Name:
                </th>
                <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${data.firstName + " " + data.lastName || ""}</td>
            </tr>
            <tr style="margin: 20px; text-align: left;">
                <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                    Email:
                </th>
                <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${data.email}</td>
            </tr>
            <tr style="margin: 20px; text-align: left;">
                <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                    Phone No:
                </th>
                <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${data.phone}</td>
            </tr>
            <tr style="margin: 20px; text-align: left;">
                <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                    Institute:
              </th>
                <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${data.institute["name"]}</td>
            </tr>
            <tr style="margin: 20px; text-align: left;">
            <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                    Graduation Date:
                </th>
                <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${data.date}</td>
            </tr>
            <tr style="margin: 20px; text-align: left;">
                <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                    Ceremony Time:
                </th>
                <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${data.time}</td>
            </tr>
            <tr style="margin: 20px; text-align: left;">
                <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                    Graduated From:
                </th>
                <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${data.graduated}</td>
            </tr>
            <tr style="margin: 20px; text-align: left;">
                <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                    Location:
                </th>
                <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${data.location}</td>
            </tr>
            <tr style="margin: 20px; text-align: left;">
                <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                    Graduated Year:
                </th>
                <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${data.year}</td>
            </tr>
            <tr style="margin: 20px; text-align: left;">
                <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                    Faculty:
                </th>
                <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${data.faculty}</td>
            </tr>
            <tr style="margin: 20px; text-align: left;">
                <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                    Qualification:
                </th>
                <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${data.qualification}</td>
            </tr>
            <tr style="margin: 20px; text-align: left;">
                <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                    Height:
                </th>
                <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;"> ${data.size + " " + data.height}</td>
            </tr>
            <tr style="margin: 20px; text-align: left;">
                <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                    Order Number:
                </th>
                <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${data.orderNumber}</td>
            </tr>
          </table>
        </body>
    </html>`
        let _pdf = await generatePdf({ content: _html }, { format: 'A4' })
        this.send([data.email], subject,body, [{ filename: `booking.pdf`, content: _pdf }], false);
    }
    async staffRegister(data: any) {
        this.send([data.email], "Registration successfuly.", "Your registration has been done and under review.", [], false);
    }
    private async send(to: string[], subject: string, body: string, attachment: any[], bodyIsHtml: boolean = false) {
        let mailOption: any = {
            to: to,
            from: {name: 'Phelanconan', address: 'rahulrnsharma@gmail.com'},
            subject: subject,
            attachments: attachment,
        
        }
        if (bodyIsHtml)
            mailOption['html'] = body;
        else
            mailOption['text'] = body;
        await this.mailerService.sendMail(mailOption);
    }
}

