/// <reference types="cypress" />
import fake from './fake.json'

describe('My Helsinki Places Website', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should have a heading', () => {
    cy.get('h6').contains('Helsinki Places')
    cy.contains('Map View')
  })

  it('should render the table head', () => {
    cy.get('table').contains('th', 'Name')
    cy.get('table').contains('th', 'Address')
    cy.get('table').contains('th', 'Opening Hours')
    cy.get('table').contains('th', 'Status')
  })

  it('should render the table with 11 rows', () => {
    cy.get('table')
      .find('tr')
      .then(row => {
        expect(row.length).equal(11)
      })
  })

  it('should switch view between view modes', () => {
    cy.get('#view-switch').click()
    cy.location('pathname').should('eq', '/map')
    cy.get('h6').contains('Map View')

    cy.get('#view-switch').click()
    cy.location('pathname').should('eq', '/')
    cy.get('h6').contains('Helsinki Places')
  })

  it('should open filter dialog in map view', () => {
    cy.get('#view-switch').click()
    cy.get('#menu-icon').click()
    cy.get('#filter-menu-item').contains('Filter')
    cy.get('#filter-menu-item').click()
    cy.contains('How many places you want to see?')
  })
})
