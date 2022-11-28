# project_2_GM

Welcome to General Manager, your all-in-one tools for managing your baseball franchise. 

If you're looking to rebuild your roster for the upcoming season, General Manager features the latest free agents for you to choose from. Using the handy search bar located at the top of the page, you can search by position in order to see who is available. Check out your roster on the home page - there seems to be a hole in your infield defense! Try typing "SS" (without the quotes) into the search bar and check out which free agents are available for you to sign! Once you've made your choice, set the terms of the contract by clicking on the player's name, then clicking the "edit" button on the following page. There, you can decide the contract length (in years) and yearly salary (in dollars) for that player. Make sure you check the "Contract" checkbox first!

If you're looking to fill out your bench and bullpen with free agents, you follow the same process, but don't click the checkbox labeled "starter". Once given a contract, but not a starting position, this player will appear on your bench. When the season rolls around, you'll be able to pinch hit, pinch run, upgrade your defense, or spell one of your regulars whenever you like.

Baseball is a business, and players some times do not deliver on their end of the bargain. If you wish to release a player from their contract, you can click the "release" button. This will uncheck the Contract and Starter checkboxes, while also setting their contract years and salary to 0. They will appear as a free agent and be available to sign again, should the opportunity arise. Once you've release a player, make sure you fill their spot in the roster up. Who knows, maybe there's someone even better waiting for a contract on the Free Agents page!

Each season, some players reach a point where it's time to hang up the cleats. If a player does indeed wish to retire, simply click their name in the table and click the "retire" button. This will remove them from your roster and they will not appear as a free agent. Be careful - this step cannot be undone.

This app uses express and ejs to build the site itself, and the databse is connected through MongoDB. The seed.js file included is only the beginning - users can remove all the players and refill the database to their heart's content using General Manager.

The styling is done through CSS, and some of the site.

General Manager is a basic express CRUD app that allows the user to manipulate a database of fictional baseball players. The scale is pretty small - the user can release players from their roster, remove them from a starting role and bench them, retire (delete) them, or update any of the information provided by the database.

My long term goal for this would be to expand it to a full league - each team would have names, logos, and a full roster - both a 25 and 40 man roster like in Major League Baseball. This way, the user could make trades with other teams to acquire players or shed large contracts. 

Along with that, the user would have a budget to work with, so they would be restricted with the moves they make. Free agents would also have contract demands - some can only be signed to starting roles, others require certain years and salaries before signing. This way, they can't just sign whoever they want for $1.