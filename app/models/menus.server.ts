export async function getAllMenus() {
    return await fetch(`https://api.medium.com/v1/menu/`)
}
