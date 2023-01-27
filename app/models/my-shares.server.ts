export async function getMyShares() {
    return await fetch(`https://api.medium.com/v1/my-shares/`)
}
export async function getShare(guid: string) {
    return await fetch(`https://api.medium.com/v1/my-shares/${guid}`)
}