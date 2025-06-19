import nodemailer from 'nodemailer';
import { ISendMail } from '@/types/types';
import configuration from '@/configuration/configuration';

const { service, auth } = configuration.mailer;

export const sendMail = async ({ to, subject, html }: ISendMail) => {
    const transporter = nodemailer.createTransport({
        service: service,
        auth: {
            user: auth.user,
            pass: auth.pass,
        },
    });

    await transporter.sendMail({
        from: auth.user,
        to,
        subject,
        html,
    });
};
