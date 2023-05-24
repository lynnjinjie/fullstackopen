describe('Blog app', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'testUser',
      username: 'testUser',
      password: '1234'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('successeds with correct credentials', function() {
      cy.contains('login')

      cy.get('#username').type('testUser')
      cy.get('#password').type('1234')
      cy.get('#login-button').click()

      cy.contains('testUser logged in')

    })
    it('fails with wrong credentials', function() {
      cy.contains('login')

      cy.get('#username').type('testUser2')
      cy.get('#password').type('1234')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain','wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html')
        .should('not.contain', 'testUser2 logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testUser', password: '1234' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()

      cy.get('input[name="Title"]').type('a cypress title')
      cy.get('input[name="Author"]').type('a cypress Author')
      cy.get('input[name="Url"]').type('https://bloglist.me/testUser')
      cy.get('input[name="Like"]').type('12')

      cy.get('#create-btn').click()

      cy.contains('a cypress title')

    })

    describe('A blog list of actions', function() {
      beforeEach(function() {
        cy.createNewBlog({ title: 'test1 title', author: 'test1', url: 'https://blog.me/test1', likes: 1 })
        cy.createNewBlog({ title: 'test2 title', author: 'test2', url: 'https://blog.me/test2', likes: 2 })
        cy.createNewBlog({ title: 'test3 title', author: 'test3', url: 'https://blog.me/test3', likes: 3 })
      })

      it('A blog can be liked', function() {

        cy.contains('test2 title').parent().find('.toggleBlog').click()
        cy.contains('likes 2').parent().find('button').contains('like').as('likeBtn')
        cy.get('@likeBtn').click()

        cy.contains('test2 title').parent().parent().contains('likes 3')

      })

      it('A blog can be removed', function() {

        cy.contains('test2 title').parent().find('.toggleBlog').click()
        cy.contains('likes 2').parent().find('button').contains('remove').as('removeBtn')
        cy.get('@removeBtn').click()

        cy.get('html')
          .should('not.contain', 'test2 title')
      })

      it('A blog sort by likes number', function() {

        cy.contains('test2 title').parent().find('.toggleBlog').click()
        cy.contains('likes 2').parent().find('button').contains('like').as('likeBtn')
        cy.get('@likeBtn').click()
        cy.get('@likeBtn').click()

        cy.get('.blog').eq(0).should('contain', 'test2 title')
        cy.get('.blog').eq(1).should('contain', 'test3 title')
        cy.get('.blog').eq(2).should('contain', 'test1 title')

      })


    })

  })

})
