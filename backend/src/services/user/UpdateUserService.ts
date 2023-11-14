import prismaClient from "../../prisma";
import {hash} from 'bcryptjs';

interface UpdateUser {
    mobile?: string;
    password?: string;
    user_id: string;
}

class UpdateUserService {
    async execute({user_id, mobile, password}: UpdateUser) {

        if(password) {
            password = await hash(password, 16)
        }

        const updateUser = await prismaClient.costumer.update({
            where: {
                id: user_id
            },
            data: {
                mobile: mobile,
                password: password
            }
        })

        return updateUser;
    }
}

export default UpdateUserService;