import dotenv from 'dotenv';
import path from 'path';
import { no } from 'zod/v4/locales';

dotenv.config({path: path.join(process.cwd(), '.env')});


const config = {
	port: process.env.PORT || 5000,
	database_url: process.env.DATABASE_URL,
	better_auth: {
		secret: process.env.BETTER_AUTH_SECRET,
		url: process.env.BETTER_AUTH_URL,
		app_url: process.env.APP_URL,
	},
	nodemailer: {
		email: process.env.NODEMAILER_EMAIL,
		email_pass: process.env.NODEMAILER_EMAIL_PASS,
	},
};

export default config;