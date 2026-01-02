import { prisma } from "../lib/prisma";
import { UserRole } from "../middleware/auth";

async function seedAdmin() {
    try {
		console.log("***** Admin Seeding Started..... *****");
        //! must put in env
        const adminData = {
            name: "Syed Mohiuddin Meshal",
            email: "syedmohiuddinmeshal@gmail.com",
            password: "12345678",
            role: UserRole.ADMIN,
            emailVerified: true,
        };

		console.log("***** Check Admin Exist or Not..... *****");
        // check if the user exist or not
        const existingUser = await prisma.user.findUnique({
            where: {
                email: adminData.email,
            },
        });
        if (existingUser) {
            throw new Error("User already exist");
        }

		console.log("***** Create Admin..... *****");
        const signupAdmin = await fetch(
            "http://localhost:5000/api/auth/sign-up/email",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(adminData),
            }
        );
		if(signupAdmin.ok){
			console.log("***** Admin Created..... *****");
			await prisma.user.update({
				where: {
					email: adminData.email,
				},
				data: {
					emailVerified: true
				}
			})

			console.log("***** Email Verification Status Updated..... *****");
		}

		console.log("***** Admin Seeding Completed..... *****");
    } catch (error: any) {
        console.error("Error:", error);
    }
}

seedAdmin();