import {myShares, aShare} from '~/mocks/items/my-shares'

export async function getMyShares() {
    return await new Promise((resolve) => setTimeout(() => resolve(myShares), 2500))
    // return fetch(`https://api/v1/my-shares/`)
}
export async function getShare(guid: string) {
    return await new Promise((resolve) => setTimeout(() => resolve(aShare), 3000)); 
    // fetch(`https://api.medium.com/v1/my-shares/${guid}`)
}