describe('Standard User', () => {
  it("Open the Home Page and verify the URL and Title", () => {
    //Open the Swag Lab Home Page
    cy.visit('https://www.saucedemo.com/')
    //assert the URL
    cy.url().should('include','saucedemo')
    //assert the title
    cy.title().should('eq','Swag Labs')
  })

  it("Login as standard_user and verify an end to end transaction",()=>{
    //Login as standard_user
    cy.get('[data-test="username"]').type("standard_user")
    cy.get('[data-test="password"]').type("secret_sauce")
    cy.get('[data-test="login-button"]').click()

    //Adding an item to the cart
    cy.get('.inventory_item').should('have.length',6)
    cy.get('.inventory_list').find('.inventory_item').each(($el) =>{
      const itemText= $el.find('.inventory_item_name').text()
      if(itemText.includes('Sauce Labs Bolt T-Shirt')){
      cy.wrap($el).find('button').click()
      }
    })

    //View the cart
    cy.get('.shopping_cart_badge').click()

    //assert the added item name and price
    cy.get('.cart_item_label').find('.inventory_item_name').should('have.text', 'Sauce Labs Bolt T-Shirt')
    cy.get('.cart_item_label').find('.inventory_item_price').should('have.text', '$15.99')

    //Add another item to the cart
    cy.get('[data-test="continue-shopping"]').click()
    cy.get('.inventory_list').find('.inventory_item').each(($el) =>{
      const itemText= $el.find('.inventory_item_name').text()
      if(itemText.includes('Sauce Labs Fleece Jacket')){
      cy.wrap($el).find('button').click()
      }
    })

    //Check out process
    cy.get('.shopping_cart_badge').click()
    cy.get('[data-test="checkout"]').click()
    cy.get('[data-test="firstName"]').type('Nitigya')
    cy.get('[data-test="lastName"]').type('Gurung')
    cy.get('[data-test="postalCode"]').type('E126SS')
    cy.get('[data-test="continue"]').click()

    //assert the total price
    cy.get('.summary_total_label').should('have.text', 'Total: $71.26')
  })

    it('Log out and login as log_out_user and validate the error message',()=>{
    //Log out
    cy.get('.bm-burger-button').click()
    cy.get('#logout_sidebar_link').click()

    //Login with locked_out_user
    cy.get('[data-test="username"]').type("locked_out_user")
    cy.get('[data-test="password"]').type("secret_sauce")
    cy.get('[data-test="login-button"]').click()

    //assert the error message
    cy.get('[data-test="error"]').should('have.text','Access Denied')
  })
})