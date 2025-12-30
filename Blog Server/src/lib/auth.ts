import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import config from "../config";
import nodemailer from "nodemailer";
import { th } from "zod/v4/locales";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use true for port 465, false for port 587
    auth: {
        user: config.nodemailer.email,
        pass: config.nodemailer.email_pass,
    },
});

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    trustedOrigins: [config.better_auth.app_url!],
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "USER",
                required: false,
            },
            phone: {
                type: "string",
                required: false,
            },
            status: {
                type: "string",
                defaultValue: "ACTIVE",
                required: false,
            },
        },
    },
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: true,
    },
    emailVerification: {
        sendOnSignUp: true,
        sendVerificationEmail: async ({ user, url, token }, request) => {
            try {
                const verificationURL =
                    config.better_auth.app_url + `/verify-email?token=${token}`;
                const info = await transporter.sendMail({
                    from: '"Prisma Blog" <prismablog@ph.com>',
                    to: "syedmohiuddinmeshal24@gmail.com",
                    subject: "Please verify your email address",
                    html: `
                <div style="
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    max-width: 600px;
                    margin: auto;
                    padding: 24px;
                    border: 1px solid #eee;
                    border-radius: 8px;
                    background-color: #ffffff;
                ">
                    <h2 style="color: #333; text-align: center;">
                    Verify Your Email Address
                    </h2>

                    <p>Dear ${user?.name || "User"},</p>

                    <p>
                    Thank you for creating an account on <strong>Prisma Blog</strong>.
                    To complete your registration, please verify your email address by clicking the button below.
                    </p>

                    <div style="text-align: center; margin: 30px 0;">
                    <a
                        href="${verificationURL}"
                        style="
                        display: inline-block;
                        padding: 12px 24px;
                        background-color: #0d6efd;
                        color: #ffffff;
                        text-decoration: none;
                        font-weight: bold;
                        border-radius: 6px;
                        "
                    >
                        Verify Email
                    </a>
                    </div>

                    <p style="color: #555;">
                    If the button above does not work, copy and paste the following link into your browser:
                    </p>

                    <p style="word-break: break-all; color: #0d6efd;">
                    ${verificationURL}
                    </p>

                    <p style="color: #555;">
                    For security reasons, this verification link may expire.
                    </p>

                    <p>
                    If you did not create an account, you can safely ignore this email.
                    </p>

                    <p style="margin-top: 24px;">
                    Team Prisma Blog
                    </p>
                </div>
                `,
                });
            } catch (error: any) {
                console.log(error)
                throw new Error("Failed to send verification email");
            }
        },
    },
});
