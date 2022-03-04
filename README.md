# projecttwo
 ### JOE Java of everyone APP

https://ericapp1.herokuapp.com/coffees

The "java of everyone" app is deployed on Heroku and built using Mongoose, Express and a MongoDB Atlas database.

The app was designed for users to keep track of coffees they have tried -- either store bought or at the cafe -- and share them. 

Any one can view the website. Only logged-in users can add to the site. Entries can be edited only by the creator. 

## Unsolved
When seeing the index of all coffees, anyone can filter by favorites, price and rating(grade). However this is not available when a user looks at their list of coffees. This is due to the how the info is retrieved from the database.

For the user coffees, a query is made for the user's schema which holds an array of coffees. 
For the full coffee index, a search is made for all coffees in the coffee collection.
One thought on how the filter could work on the user page is to apply the filter to all coffees and then if the coffee is in the user's array, return that.

## Future functionality
I'd like to make the new/edit pages more graphical for the whole bean/ground selection.
I'd also like to create proper "user must be logged in" pages.
If user doesn't upload a photo, there should be a placeholder photo.

## User stories

These were the user stories I wrote at the outset: 

* A user should be able to add a coffee.

* Coffees should be sorted, brewed at home (if at home, did they buy beans or ground) or brewed at a cafe. Specialty?

 * If coffee was at cafe, user can add location.

* User should add tasting notes as tags.

* User should be able to add additional note/description.

* User should add image. 

* User should rate this coffee on  A+ down to F.

* User can set price as $, $$, $$$, $$$$.

* User can mark entries as favorite

* A user should be able to edit their entry.

## Additional technology
As seen in the footer. The site uses icons from flaticon
