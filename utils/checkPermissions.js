// Check for authorization
import { unAuthenticatedError } from "../errors/index.js";

const checkPermissions = (requestUser, resourceUserId) => {
    if (requestUser.userId === resourceUserId.toString()) return

    throw new unAuthenticatedError('Not authorize to access this route')
}

export default checkPermissions;