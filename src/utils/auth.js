import Storage from "./storage"
export const TokenKey = "token"
export const RoleKey = "roles"
export const NameKey = "name"
export const AvatarKey = "avatar"
export const PermissionKey = "permission"
export const OrginKey = "orgid"
export const SavePasswordKey = "savePassword"
export const PasswordKey = "password"

export function getToken() {
    return Storage.get(TokenKey)
}

export function setToken(token) {
    return Storage.set(TokenKey, token)
}

export function removeToken() {
    return Storage.remove(TokenKey)
}

export function getRoles() {
    return Storage.get(RoleKey)
}

export function setRoles(role) {
    return Storage.set(RoleKey, role)
}

export function removeRoles() {
    return Storage.remove(RoleKey)
}

export function getPermission() {
    return Storage.get(PermissionKey)
}

export function setPermission(permission) {
    return Storage.set(PermissionKey, permission)
}

export function reomvePermission() {
    return Storage.remove(PermissionKey)
}

export function getName() {
    return Storage.get(NameKey)
}

export function setName(name) {
    return Storage.set(NameKey, name)
}

export function removeName() {
    return Storage.remove(NameKey)
}

export function getAvatar() {
    return Storage.get(AvatarKey)
}

export function setAvatar(avatar) {
    return Storage.set(AvatarKey, avatar)
}

export function removeAvatar() {
    return Storage.remove(AvatarKey)
}
export function getOrgid() {
    return Storage.get(OrginKey)
}

export function setOrgid(orgid) {
    return Storage.set(OrginKey, orgid)
}

export function removeOrgid() {
    return Storage.remove(OrginKey)
}
export function getSavePassword() {
    return Storage.get(SavePasswordKey)
}

export function setSavePassword(SavePassword) {
    return Storage.set(SavePasswordKey, SavePassword)
}

export function removeSavePassword() {
    return Storage.remove(SavePasswordKey)
}
export function getPassword() {
    return Storage.get(PasswordKey)
}

export function setPassword(password) {
    return Storage.set(PasswordKey, password)
}

export function removePassword() {
    return Storage.remove(PasswordKey)
}
