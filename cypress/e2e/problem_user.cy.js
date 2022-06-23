describe('Problem User', () => {
  beforeEach("Visit Home Pgae and Login as standard user",() => {
    //Open the Swag Lab Home Page
    cy.visit('https://www.saucedemo.com/')
    //Login as problem_user
    cy.get('[data-test="username"]').type("problem_user")
    cy.get('[data-test="password"]').type("secret_sauce")
    cy.get('[data-test="login-button"]').click()
  })
  afterEach("Logout",() => {
    cy.get('.bm-burger-button').click()
    cy.get('#logout_sidebar_link').click()
  })

  it('Verify if all items can be added to the cart', () => {
    //Add all items to the cart
    cy.get('.pricebar').find('button').should('be.visible').and('have.length',6).click({ multiple: true })
    //View the cart
    cy.get('.shopping_cart_badge').click()
    //Assert the added items
    cy.get('.cart_list').find('.cart_item').should('have.length',6)
    })

  it('Verify if input values can be entered in the checkout form',()=>{
    //Adding an item to the cart
    cy.get('.inventory_list').find('.inventory_item').each(($el) =>{
      const itemText= $el.find('.inventory_item_name').text()
      if(itemText.includes('Sauce Labs Backpack')){
      cy.wrap($el).find('button').click()
      }
    })
    //View the cart
    cy.get('.shopping_cart_link').click()
    //Check out process
    cy.get('[data-test="checkout"]').click()
    cy.get('[data-test="firstName"]').type('Nitigya').should('have.value','Nitigya')
    cy.get('[data-test="lastName"]').type('Gurung').should('have.value','Gurung')
    cy.get('[data-test="postalCode"]').type('E126SS').should('have.value','E126SS')
    cy.get('[data-test="continue"]').click()
  })

  it('Verify if correct item is displayed when viewed',()=>{
    cy.get('.inventory_list').find('.inventory_item').each(($el) =>{
      const itemText1=$el.find('.inventory_item_name').text()
      if(itemText1.includes('Backpack')){
        cy.wrap($el).find('.inventory_item_name').click()
      }
    })
    cy.get('.inventory_details_name').should('include.text','Backpack')
  })

})