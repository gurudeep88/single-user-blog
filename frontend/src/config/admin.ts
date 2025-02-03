import { isAuth } from "@/api/auth"
import { ROLE } from "@/constant"

export const isAdmin = () => {
    return isAuth() && isAuth().role === ROLE.Admin
}