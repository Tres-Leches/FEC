# Project Catwalk
Tres Leches is a mock E-Commerce web application that modernizes the experience of browsing a clothing catalogue. Working in a team of 3 engineers, we were tasked with creating a retail portal that fulfills the business requirements document set out by our client. This front end application was to be built from scratch in under 3 weeks. The sections include an overview, related products, review, and Q&A.

## Table of Contents
* [Technologies](#technologies "Goto technologies")
* [Getting started](#getting-started "Goto getting-started")

## Technologies
* ReactJS@V16
* Webpack@V5
* Babel@V7
* Express
* NodeJS
* AWS EC2
* Axios
* jQuery
* Bootstrap
* Semantic UI
* FortAwesome
* Mocha
* Chai
* Jest
* Enzyme
* ESLint


## Getting Started
1. Install the dependencies. 
  ```
  npm install 
  ```
2. Fill out the access key in the config file. 
   * Locate config.example.js in the server folder
   * Make a copy and title it config.js
   
   ```cp server/config.example.js server/config.js```   
   * Change API_KEY to your generated github personal access token
   
   * To create a personal access token: https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token
5. Build the application. 
  ```
  npm run build
  ```
6. Start the application.
  ```
  npm run start
  ```
7. Navigate to ```localhost:8000```

<!------
GIT SET-UP INSTRUCTIONS

1. Start with the master branch
'git checkout main'
'git fetch origin'
'git reset --hard origin/main'

Switches repo to the 'main' branch, and pulls the latest commits, resetting the repo's local copy of 'main' to match the latest version.

2. Create a new branch
'git checkout -b new-feature'

Checkout a new branch called 'new-feature' based on 'main'. Switches to branch and creates branch if didn't already exist

3. Update, add, commit, and push changes
'git status'
'git add <some-file>'
'git commit'

Edit, stage and commit changes in the usual fashion. Work on the feature and make regular commits at set intervals or between accomplishments.

4. Push feature branch to remote
'git push -u origin new-feature'

Push new-feature to the central repo (origin) and '-u' to add it as a remote tracking branch. After setting up the tracking branch, git push can be invoke without any parameters to automatically push new-feature branch to the central repo.

Create a pull request on GitHub and add reviewers

5. Resolve feedback
Teammates can comment and approve pushed commits. Resolve commits locally, commit, and push suggested changes. Updates will appear in the pull request.

6. Merge your pull request
'git checkout main'
'git pull'
'git checkout new-feature'
'git merge main'
Fix conflicts
'git checkout new-feature'
'git add' 'git commit'
'git push origin new-feature'

Alternatively, you can Rebase
'git checkout new-feature'
'git rebase main'
Fix conflicts
'git add .'
'git rebase --continue'



Before you merge, resolve merge conflicts if you have made changes to the repo. When your pull requst is approved and conflict-free, add code to the 'main' branch. Merge from the pull request in GitHub.

https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow
----->
