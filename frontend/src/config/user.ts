import { isAuth } from "@/api/auth"
import { ROLE } from "@/constant"

export const isUser = () => {
    return isAuth() && isAuth().role === ROLE.User
}
