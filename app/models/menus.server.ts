import { mainMenu, sharesMenu } from "../mocks/items/menu-items";

export async function getAllMenus() {
    // return await fetch(`https://api/v1/menu/`)
    return await new Promise((resolve) => setTimeout(() => resolve(mainMenu), 500));
}

export async function getSharesMenu() {
    // return await fetch(`https://api/v1/menu/1`)
    return await new Promise((resolve) => setTimeout(() => resolve(sharesMenu), 1000));
}
