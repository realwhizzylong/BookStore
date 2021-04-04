import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Wanghao Long',
        email: 'wl4n20@soton.ac.uk',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Xiaoxu Wang',
        email: 'xw2u20@soton.ac.uk',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Da Li',
        email: 'dl6n20@soton.ac.uk',
        password: bcrypt.hashSync('123456', 10),
    }
]

export default users;