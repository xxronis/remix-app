import { rest } from 'msw'

export const handlers = [
    // Handles a POST /login request
    // rest.post('/login', null),
    // Handles a GET /work request
    rest.get('https://api.medium.com/v1/users/', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                works: [
                  {
                    slug: "my-first-post-how-the-fuck",
                    title: "My First Post",
                    image: "/gio-work1.jpg"
                  },
                  {
                    slug: "90s-mixtape",
                    title: "A Mixtape I Made Just For You",
                    image: "/gio-work2.jpg"
                  },
                ],
              }),
        )
    }),

    rest.get('https://api.medium.com/v1/work/:slug', (req, res, ctx) => {
      const { slug } = req.params
      console.log(slug)
      return res(
          // ctx.status(200),
          ctx.json({
              slug: "my-first-post-how-the-fuck",
              title: "My First Post",
              image: "/gio-work1.jpg"
            }),
          )
      })
  ]
