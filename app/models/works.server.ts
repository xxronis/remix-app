export async function getAllWorks() {
    return await fetch(`https://api.medium.com/v1/users/`)
}

export async function getWork(slug: string) {
    return await fetch(`https://api.medium.com/v1/work/${slug}`)
}