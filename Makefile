
######################
#    TRAVIS ROUTE    #
######################

# Master Branch
ifneq (,$(findstring master, $(TRAVIS_BRANCH)))
$(info This is a Master Build)
.PHONY: all
all: master deploy-local check-deploy

# Develop Branch
else ifneq (,$(findstring develop, $(TRAVIS_BRANCH)))
$(info This is a Develop Build)
.PHONY: all
all: develop deploy-local check-deploy

# Pull Request
else ifneq ($(TRAVIS_PULL_REQUEST_BRANCH),)
$(info This is a Pull Request Build)
.PHONY: all
all: pull-request deploy-local check-deploy

# Regular Branch
else
$(info This is a push build, branch: $(TRAVIS_BRANCH))
.PHONY: all
all: branch deploy-local check-deploy
endif


#########################
#    BRANCH CONTROL     #
#########################

.PHONY: master
master:
	echo 'This is Master'
	
.PHONY: develop
develop:
	echo 'This is Develop'

.PHONY: pull-request
pull-request:
	echo 'This is a Pull-Request'

.PHONY: branch
branch:
	echo 'This is a regular branch'



######################
#    DEPLOY          #
######################

.PHONY: deploy-local
deploy-local:
	ls -la
	bash scripts/deployServer.sh -n ${SERVER_FILE}

.PHONY: check-deploy
check-deploy:
	echo "Checking deploy status" && curl -i localhost:${SERVER_PORT}