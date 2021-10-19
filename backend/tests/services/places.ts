import axios from 'axios'

import PlacesService from '../../src/services/places'

const getFakeData = async () => {
  const fake = await import('./fake.json')
  return { data: fake }
}

describe('Places Service', () => {
  beforeEach(() => {
    jest.spyOn(axios, 'get').mockImplementation(getFakeData)
  })

  it('should get all places', async () => {
    const result = await PlacesService.getAll()

    expect(result.meta.page).toEqual(null)
    expect(result.meta.limit).toEqual(null)
    expect(result.meta.count).toEqual('2303')
    expect(result.data.length).toBe(7)
    expect(result.data[0].name.fi).toEqual('fake')
  })

  it('should paginate places response', async () => {
    const result1 = await PlacesService.getAll(1, 4)
    const result2 = await PlacesService.getAll(3, 2)
    expect(result1.meta.count).toEqual('2303')

    expect(result1.meta.page).toEqual(1)
    expect(result1.meta.limit).toEqual(4)
    expect(result1.data.length).toBe(4)
    expect(result1.data[0].name.fi).toEqual('fake')
    expect(result1.data[3].name.fi).toEqual('fake 2')

    expect(result2.meta.page).toEqual(3)
    expect(result2.meta.limit).toEqual(2)
    expect(result2.data.length).toBe(2)
    expect(result2.data[0].name.fi).toEqual('fake 3')
    expect(result2.data[1].name.fi).toEqual('fake 4')
  })
})
