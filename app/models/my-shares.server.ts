import {myShares} from '~/mocks/items/my-shares'

export async function getMyShares() {
    await new Promise(resolve => setTimeout(resolve, 2000))
    return myShares
    // return fetch(`https://api.medium.com/v1/my-shares/`)
}
export async function getShare(guid: string) {
    return await fetch(`https://api.medium.com/v1/my-shares/${guid}`)
}