import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
var htmlToPdf = require('html-pdf-node-generator');
@Injectable()
export class SendMailService {
    constructor(private mailerService: MailerService) { }
    async sendMail(_data: any) {
      
        let options = { format: 'A4'};
        let file = {content:`<html>
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
                <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data[0].firstName+" "+_data[0].lastName}</td>
            </tr>
            <tr style="margin: 20px; text-align: left;">
                <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                    Email:
                </th>
                <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data[0].email}</td>
            </tr>
            <tr style="margin: 20px; text-align: left;">
                <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                    Phone No:
                </th>
                <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data[0].phone}</td>
            </tr>
            <tr style="margin: 20px; text-align: left;">
                <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                    Institute:
              </th>
                <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data[0].institute["name"]}</td>
            </tr>
            <tr style="margin: 20px; text-align: left;">
                <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                    Graduation Date:
                </th>
                <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data[0].date}</td>
            </tr>
            <tr style="margin: 20px; text-align: left;">
                <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                    Ceremony Time:
                </th>
                <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data[0].time}</td>
            </tr>
            <tr style="margin: 20px; text-align: left;">
                <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                    Graduated From:
                </th>
                <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data[0].graduated}</td>
            </tr>
            <tr style="margin: 20px; text-align: left;">
                <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                    Location:
                </th>
                <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data[0].location}</td>
            </tr>
            <tr style="margin: 20px; text-align: left;">
                <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                    Graduated Year:
                </th>
                <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data[0].year}</td>
            </tr>
            <tr style="margin: 20px; text-align: left;">
                <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                    Faculty:
                </th>
                <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data[0].faculty}</td>
            </tr>
            <tr style="margin: 20px; text-align: left;">
                <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                    Qualification:
                </th>
                <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data[0].qualification}</td>
            </tr>
            <tr style="margin: 20px; text-align: left;">
                <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                    Height:
                </th>
                <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;"> ${_data[0].size+" "+_data[0].height}</td>
            </tr>
            <tr style="margin: 20px; text-align: left;">
                <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                    Order Number:
                </th>
                <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data[0].orderNumber}</td>
            </tr>
          </table>
        </body>
    </html>`};
      let bufferPdf=await htmlToPdf.generatePdf(file, options).then((pdfbuffer)=>{
          return pdfbuffer
        })

    
        const setmail = await this.mailerService.sendMail({
            to: "rahulrnsharma@gmail.com",
            from: 'rahulrnsharma@gmail.com',
            subject: 'Response Of Phelanconan',
            attachments: [{
                filename:`${_data[0].firstName+"_"+_data[0].lastName}_Gown_doc.pdf` ,  
                content: bufferPdf
            }]
        }) 
        
        return { success: true }
    }
}

