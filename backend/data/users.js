import bcrypt from 'bcryptjs';
const users = [
	{
		name: 'Admin user',
		email: 'admin@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true
	},
	{
		name: 'John Smith',
		email: 'johnsmith@example.com',
		password: bcrypt.hashSync('123456', 10)
	},
	{
		name: 'John Cole',
		email: 'johncole@example.com',
		password: bcrypt.hashSync('123456', 10)
	}
];
export default users;
