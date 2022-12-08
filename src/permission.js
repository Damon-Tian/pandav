import router from "./router"
import { getToken } from "./utils/auth"
const whiteList = ["/login"]
router.beforeEach(async (to, from, next) => {
    // determine whether the user has logged in
    const hasToken = getToken()
    if (hasToken) {
        next()
    } else {
        if (whiteList.includes(to.path)) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next({ path: "/login" })
        }
    }
})

