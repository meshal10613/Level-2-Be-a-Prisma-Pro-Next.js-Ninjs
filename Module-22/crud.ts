import { prisma } from "./lib/prisma";

const createUser = async() => {
	// const user = await prisma.user.create({
	// 	data: {
	// 		name: "Syed Mohiuddin Meshal",
	// 		email: "syedmohiuddinmeshal24@gmail.com",
	// 		role: "Admin"
	// 	}
	// })

	// console.log("Created User", user)

	// const post = await prisma.post.create({
	// 	data: {
	// 		title: "This is title",
	// 		content: "This is content",
	// 		authorId: 1
	// 	}
	// })

	// console.log("Created Post", post)

	// const profile = await prisma.profile.create({
	// 	data: {
	// 		bio: "I like to code",
	// 		userId: 1,
	// 	}
	// });
	// console.log("Created Profile", profile)

	// const users = await prisma.user.findMany({
	// 	include: {
	// 		posts: true,
	// 		profiles: true
	// 	}
	// });
	// console.dir(users, {depth: Infinity})

	//? update user data
	// const update = await prisma.profile.update({
	// 	where: {
	// 		userId: 1
	// 	},
	// 	data: {
	// 		bio: "Web developer & mentor"
	// 	}
	// })

	// console.log("Updated user", update)

	//? upsert
	const upsertUser = await prisma.user.upsert({
		where: {
			email: "syedmohiuddinmeshal@gmail.com"
		},
		update: {
			name: "Meshal"
		}, 
		create: {
			name: "Meshal",
			email: "syedmohiuddinmeshal@gmail.com",
			role: "Admin"
		}
	})

	console.log(upsertUser)
};

createUser();