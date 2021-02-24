# FEC
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
'git checkout master'
'git pull'
'git pull origin new-feature'
'git push'

Before you merge, resolve merge conflicts if you have made changes to the repo. When your pull requst is approved and conflict-free, add code to the 'main' branch. Merge from the pull request in GitHub.
