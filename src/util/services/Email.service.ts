import * as nodemailer from 'nodemailer'
import LoggingService from '../logging/Logging.service'
import { devMode } from '../globals'
import { validateEmail } from './Validation.service'
import { IEmailContent } from '../../types/interfaces/Email.interface'

import * as key from '../../../email-key.json'

let miloTransports = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 0,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        serviceClient: key.client_id,
        privateKey: key.private_key,
    }
})

export const sendConfirmationEmail = async(code: string, recipient: string): Promise<boolean> => {
    if(!validateEmail(recipient)){
        LoggingService.warn(`Confirmation email failed to send because ${recipient} was invalid`)
    }

    // need a dev version without service client

    try{
        let content: IEmailContent = {
            from: process.env.EMAIL_USER,
            to: recipient,
            subject: `Sideqst Account Confirmation`,
            text: `An account has been registered on sideqst.com with this email address. To verify this email address 
            belongs to you, enter the code below on the email verification page: ${code} | This code will expire in 6 hours. If you did not create this account you can ignore this message as no account will be created without verification.`,
            html: `
            <h3>Verify your Sideqst email address</h3>
            <p>An account has been registered on <a href={"https://sideqst.com"}>Sideqst</a> with this email address. To verify this email address belongs to you, enter the code below on the email verification page:</p>
            <h4>${code}</h4>
            <p>This code will expire in 6 hours.</p>
            <p>If you did not create this account you can ignore this message as no account will be created without verification.</p>`
        }

        let output = await miloTransports.sendMail(content)
        LoggingService.info(`Confirmation email sent for ${recipient} with code: ${code}`)
        return true
    }
    catch(err){
        LoggingService.error(`Error while sending confirmation email: ${err}`)
        return false
    }

}

export const sendMailingListAddEmail = async(recipient: string): Promise<boolean> => {
    if(!validateEmail(recipient)){
        LoggingService.warn(`Failed to send mailing list add email to ${recipient} because email is invalid`)
    }

    try{
        let content: IEmailContent = {
            from: process.env.EMAIL_USER,
            to: recipient,
            subject: `Sideqst Info`,
            text: `Thank you for signing up to hear more about Sideqst - The platform for 'Internety' jobs. Our mission is to provide a place for people to pursue jobs and careers in the ever-growing world of 'internet' culture. Much like how Twitch, Youtube, Reddit, and Twitter provide content and communities surrounding games, art, music, or whatever hobby or interest. Sideqst seeks to provide a place where you can hire or be hired in whatever community, from the niche to the mainstream. Our goal is provide a place where people can turn their hobbies, passions, or quirks into a meaningful career.`,
            html: `
            <h3>Thank you signing up to hear more about Sideqst - The platform for 'Internety' jobs.</h3>
            <p>Our mission is to provide a place for people to pursue jobs and careers in the ever-growing world of 'internet' culture. Much like how Twitch, Youtube, Reddit, and Twitter provide content and communities surrounding games, art, music, or whatever hobby or interest. Sideqst seeks to provide a place where you can hire or be hired in whatever community, from the niche to the mainstream. Our goal is provide a place where people can turn their hobbies, passions, or quirks into a meaningful career.</p>
            <br/>
            <p>We looking to bring our platform into beta in the coming months and would love to see you there.</p>
            <p>-Milo (Founder)</p>
            `
        }
    
        let output = await miloTransports.sendMail(content);
        LoggingService.info(`Mailing list add email send to ${recipient}`);
        return true
    }
    catch(err){
        LoggingService.error(`Error whilst sending mailing list add email: ${err}`)
        return false
    }
    
}