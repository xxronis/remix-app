import { rest } from 'msw'
import {aShare, myShares} from './items/my-shares'

export const handlers = [

      rest.get('https://api.medium.com/v1/menu/', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                items: [
                  {
                    path: "/shared-with-me",
                    title: "Shared with me"
                  },
                  {
                    path: "/my-shares",
                    title: "My Shares"
                  },
                  {
                    path: "/cloud-provider",
                    title: "Cloud Provider"
                  },
                  {
                    path: "/auditing",
                    title: "Auditing"
                  }
                ],
              }),
        )
    }),

    rest.get('https://api.medium.com/v1/my-shares/', (req, res, ctx) => {
      return res(
          // ctx.delay(2000),
          ctx.status(200),
          ctx.json(myShares),
      )
  }),
  rest.get('https://api.medium.com/v1/my-shares/:guid', (req, res, ctx) => {
    return res(
        ctx.status(200),
        ctx.json(aShare),
    )
}),
]
