
describe('Blog App', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3000/api/testing/reset')
		cy.visit('http://localhost:3000')
	})

	it('App can be opened', function() {
		cy.contains('Blog App')
		cy.get('.loginForm').should('contain', 'Username')
	})

	it('login form is displayed by default', function() {
		cy.get('.loginForm').should('contain', 'Username')
		cy.get('.loginForm').should('contain', 'Password')
	})

	describe('login', function() {
		beforeEach(function() {
			cy.request('POST', 'http://localhost:3003/api/users', {
				name: 'Cloud Var',
				username: 'cloudtruck',
				password: 'mypassword'
		    })
		})

		it('fails with wrong credentials', function() {
			cy.get('[name="Username"]').type('cloudtruck')
			cy.get('[name="Password"]').type('wrong')
			cy.get('[name="loginSubmit"]').click()

			cy.get('.error')
				.should('contain', 'Invalid username or password')
				.and('have.css', 'border', '2px solid rgb(255, 0, 0)')
		})

		it('is successful with right credentials', function() {
			cy.get('[name="Username"]').type('cloudtruck')
			cy.get('[name="Password"]').type('mypassword')
			cy.get('[name="loginSubmit"]').click()

			cy.contains('Logged in as Cloud Var')
		})

		describe('Logged-in user', function() {
			beforeEach(function() {
				cy.login({ username: 'cloudtruck', password: 'mypassword' })
			})

			it('can add note', function() {
				cy.createBlog({ title: 'First Cypress Blog', author: 'Danny Ric', url: 'www.bbc.com' })


				cy.get('.confirmed')
					.should('contain', 'Cloud Var added a new blog')
					.and('have.css', 'color', 'rgb(0, 0, 0)')

				cy.contains('First Cypress Blog')
			})

			describe('when there are blogs', function() {
				beforeEach(function() {
					cy.createBlog({ title: 'First Cypress Blog', author: 'Danny Ric', url: 'www.bbc.com' })
					cy.createBlog({ title: 'Second Cypress Blog', author: 'Max Ver', url: 'www.bbc.com' })
					cy.createBlog({ title: 'Third Cypress Blog', author: 'Kimi Rai', url: 'www.bbc.com' })
				})

				it('can view and like blogs', function() {
					cy.contains('Second Cypress Blog').as('theBlog')
					cy.get('@theBlog').find('button').as('viewButton')
					cy.get('@viewButton').click()
					cy.get('@theBlog').parent().find('[name="likeButton"]').click()
					cy.get('@theBlog').parent().find('[name="likeButton"]').click()
					cy.get('@theBlog').parent().find('[name="likeButton"]').click()

					cy.contains('Likes: 3')
				})

				it('User can delete blogs', function() {
					cy.contains('Second Cypress Blog').as('theBlog')
					cy.get('@theBlog').find('button').as('viewButton')
					cy.get('@viewButton').click()

					cy.get('@theBlog').parent().find('[name="deleteBlog"]').click()

					cy.contains('@theBlog').should('not.exist')
				})

				it('App displays blogs with most likes first', function() {
					cy.contains('Second Cypress Blog').as('theBlog')
					cy.get('@theBlog').find('button').as('viewButton')
					cy.get('@viewButton').click()
					cy.get('@theBlog').parent().find('[name="likeButton"]').click()
					cy.get('@theBlog').parent().find('[name="likeButton"]').click()
					cy.get('@theBlog').parent().find('[name="likeButton"]').click()

					cy.reload()

					cy.contains('Third Cypress Blog').as('theOtherBlog')
					cy.get('@theOtherBlog').find('button').as('viewOtherButton')
					cy.get('@viewOtherButton').click()
					cy.get('@theOtherBlog').parent().find('[name="likeButton"]').click()


					cy.reload()

					cy.get('.blogOnList').first().should('contain', 'Second Cypress Blog')
					cy.get('.blogOnList').last().should('contain', 'First Cypress Blog')

				})

			})
		})
	})

})