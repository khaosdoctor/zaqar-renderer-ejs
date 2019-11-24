import ejs from 'ejs'

export class EJSRendererError extends Error {
  constructor (message: string) {
    super(`[Zaqar renderer error - EJS]: ${message}`)
  }
}

async function renderFunction (text: string, data: any = {}, renderer: typeof ejs = ejs): Promise<string> {
  try {
    return renderer.render(text, data)
  } catch (error) {
    throw new EJSRendererError(error.message)
  }
}

const rendererObj = {
  name: 'ejs',
  fn: renderFunction,
  errClass: EJSRendererError
}

export default rendererObj
module.exports = rendererObj
