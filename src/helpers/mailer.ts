// DOMAIN.com/verifyToken/aljflkalfjfldjfj // this type grab the token use through server side
// DOMAIN.com/verifyToken?token=ajdfafdafda // this type grab the token use through client side.

import nodemailer from 'nodemailer'
import User from '@/models/user.model'
import bcryptjs from 'bcryptjs'

export const sendMail = async ({ email, emailType, userId }: any) => {
    try {
        //create hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        //update the user model: update verifyToken if email is verified otherwise reset

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyExpireToken: Date.now() + 3600000 //after 24 hour
            })
        } else if(emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpire: Date.now() + 3600000 //after 24 hour
            })
        }
        

        //create nodemailer or transporter
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "f17e3a7f958f4b",
              pass: "75811bd77c5e43"
            }
          });

        //mail options
        const mailOptions = {
           from: 'rahullohra13042000@gamil.com',
           to: email,
           subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
           html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyEmail" : "resetPassword"}?token=${hashedToken}">Here</a> to ${emailType === "VERIFY" ? "Verify your email" : "Reset your email"} or copy and paste the link below in your browser <br> ${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyEmail" : "resetPassword"}?token=${hashedToken}</p>` //
        }

        //send email with mail options:

        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;

        
    } catch (error: any) {
        throw new Error(error.message)
    }
}

