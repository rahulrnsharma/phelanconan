import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
var htmlToPdf = require('html-pdf-node-generator');
@Injectable()
export class SendMailService {
    constructor(private mailerService: MailerService) { }
    async getBufferPDF(_data: any,type:string) {
        let options = { format: 'A4'};
        var file = null;
        if (type=="staff") {
            file = {content:`<html>
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
                    <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data.firstName+" "+_data.lastName}</td>
                </tr>
                <tr style="margin: 20px; text-align: left;">
                    <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                        Email:
                    </th>
                    <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data.email}</td>
                </tr>
                <tr style="margin: 20px; text-align: left;">
                    <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                        Phone No:
                    </th>
                    <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data.phone}</td>
                </tr>
                <tr style="margin: 20px; text-align: left;">
                    <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                        Institute:
                  </th>
                    <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data.institute["name"]}</td>
                </tr>
                <tr style="margin: 20px; text-align: left;">
                <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                        Graduation Date:
                    </th>
                    <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data.date}</td>
                </tr>
                <tr style="margin: 20px; text-align: left;">
                    <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                        Ceremony Time:
                    </th>
                    <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data.time}</td>
                </tr>
                <tr style="margin: 20px; text-align: left;">
                    <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                        Graduated From:
                    </th>
                    <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data.graduated}</td>
                </tr>
                <tr style="margin: 20px; text-align: left;">
                    <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                        Location:
                    </th>
                    <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data.location}</td>
                </tr>
                <tr style="margin: 20px; text-align: left;">
                    <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                        Graduated Year:
                    </th>
                    <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data.year}</td>
                </tr>
                <tr style="margin: 20px; text-align: left;">
                    <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                        Faculty:
                    </th>
                    <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data.faculty}</td>
                </tr>
                <tr style="margin: 20px; text-align: left;">
                    <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                        Qualification:
                    </th>
                    <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data.qualification}</td>
                </tr>
                <tr style="margin: 20px; text-align: left;">
                    <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                        Height:
                    </th>
                    <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;"> ${_data.size+" "+_data.height}</td>
                </tr>
                <tr style="margin: 20px; text-align: left;">
                    <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                        Order Number:
                    </th>
                    <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data.orderNumber}</td>
                </tr>
              </table>
            </body>
        </html>`};
        }
        else if(type == "student"){
            file ={content:`<html>
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
                    <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data.firstName+" "+_data.lastName}</td>
                </tr>
                <tr style="margin: 20px; text-align: left;">
                    <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                        Email:
                    </th>
                    <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data.email}</td>
                </tr>
                <tr style="margin: 20px; text-align: left;">
                    <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                        Phone No:
                    </th>
                    <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data.phone}</td>
                </tr>
                <tr style="margin: 20px; text-align: left;">
                    <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                        Institute:
                  </th>
                    <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data.institute["name"]}</td>
                </tr>
                <tr style="margin: 20px; text-align: left;">
                    <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                        Faculty:
                  </th>
                    <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data.faculty["name"]}</td>
                </tr>
                <tr style="margin: 20px; text-align: left;">
                    <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                        Course:
                  </th>
                    <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data.course["name"]}</td>
                </tr>
                <tr style="margin: 20px; text-align: left;">
                    <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                        Price:
                  </th>
                    <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data.price}</td>
                </tr>
                <tr style="margin: 20px; text-align: left;">
                    <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                        Graduation Date:
                    </th>
                    <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data.date}</td>
                </tr>
                <tr style="margin: 20px; text-align: left;">
                    <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                        Ceremony Time:
                    </th>
                    <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data.time}</td>
                </tr>
                <tr style="margin: 20px; text-align: left;">
                    <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                        Height:
                    </th>
                    <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;"> ${_data.size+" "+_data.height}</td>
                </tr>
                <tr style="margin: 20px; text-align: left;">
                    <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                    Special Requirements:
                  </th>
                    <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data.requirement}</td>
                </tr>
                <tr style="margin: 20px; text-align: left;">
                    <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                        Order Number:
                    </th>
                    <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data.orderNumber}</td>
                </tr>
                <tr style="margin: 20px; text-align: left;">
                    <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                        Address:
                  </th>
                    <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data.addressLine}</td>
                </tr>
                <tr style="margin: 20px; text-align: left;">
                    <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                        Zip code:
                  </th>
                    <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data.zipcode}</td>
                </tr>
                <tr style="margin: 20px; text-align: left;">
                <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                   City:
              </th>
                <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data.city}</td>
            </tr>
            <tr style="margin: 20px; text-align: left;">
            <th style="padding:15px ; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                Country:
          </th>
            <td style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;padding:15px ;">${_data.country}</td>
        </tr>
        
              </table>
            </body>
        </html>`}
        }
      

      return htmlToPdf.generatePdf(file, options).then((pdfbuffer)=>{
        return pdfbuffer
      })
    //   mailOpt = {
    //     to: "rahulrnsharma@gmail.com",
    //     from: 'rahulrnsharma@gmail.com',
    //     subject: 'Response Of Phelanconan',
    //     attachments: [{
    //         filename:`${_data.firstName+"_"+_data.lastName}_Gown_doc.pdf` ,  
    //         content: bufferPdf
    //     }]
    
    }


    async mailsend(to:any[],subject:string,body?:any,attachment?:any[]){
     let mailOpt ={
            to: to,
            from: 'rahulrnsharma@gmail.com',
            subject: subject,
            text: body,
            attachments: attachment
        }
        const setmail = await this.mailerService.sendMail(mailOpt)  ;
    }
}

