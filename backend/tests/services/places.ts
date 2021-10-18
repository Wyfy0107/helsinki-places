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
    expect(result.meta.count).toEqual('2303')
    expect(result.data.length).toBe(7)
    expect(result.data[0].name.fi).toEqual('fake')
  })
})
