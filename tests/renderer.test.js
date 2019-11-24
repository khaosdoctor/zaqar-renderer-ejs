const assert = require('assert')
const { describe, it } = require('mocha')
const renderer = require('../dist')


describe('exported object', () => {
  it('should be an object with name and function', () => {
    assert.ok(typeof renderer, 'object')
    assert.ok(renderer.name, 'mustache')
    assert.ok(typeof renderer.fn, 'function')
  })
})

describe('mustache render with no data', () => {
  const simpleTemplate = 'My simple template with no data'
  it('should render template with no errors', async () => {
    const rendered = await renderer.fn(simpleTemplate)
    assert.ok(rendered, simpleTemplate)
  })

  it('should throw an error when rendering template', async () => {
    try {
      await renderer.fn(() => { })
    } catch (error) {
      assert.ok(/\[Zaqar renderer error - EJS\]/.test(error.message))
      assert.ok(error instanceof renderer.errClass)
    }
  })
})

describe('mustache render with data', () => {
  const dataTemplate = 'My name is {{name}}'
  const data = { name: 'Test' }

  it('should render template with no errors', async () => {
    const rendered = await renderer.fn(dataTemplate, data)
    assert.ok(rendered, `My name is ${data.name}`)
  })

  it('should throw an error when rendering template', async () => {
    try {
      await renderer.fn(() => { }, data)
    } catch (error) {
      assert.ok(/\[Zaqar renderer error - EJS\]/.test(error.message))
      assert.ok(error instanceof renderer.errClass)
    }
  })
})
