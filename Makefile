
######################
#    TRAVIS ROUTE    #
######################

# Master Branch
ifneq (,$(findstring master, $(TRAVIS_BRANCH)))
$(info This is a Master Build)
.PHONY: all
all: master

# Develop Branch
else ifneq (,$(findstring develop, $(TRAVIS_BRANCH)))
$(info This is a Develop Build)
.PHONY: all
all: develop

# Pull Request
else ifneq ($(TRAVIS_PULL_REQUEST_BRANCH),)
$(info This is a Pull Request Build)
.PHONY: all
all: pull-request

# Regular Branch
else
$(info This is a push build, branch: $(TRAVIS_BRANCH))
.PHONY: all
all: branch
endif


#########################
#    BRANCH CONTROL     #
#########################

.PHONY: master deploy-local
master:
	echo 'This is Master'
	
.PHONY: develop deploy-local
develop:
	echo 'This is Develop'

.PHONY: pull-request deploy-local
pull-request:
	echo 'This is a Pull-Request'

.PHONY: branch deploy-local
branch:
	echo 'This is a regular branch'



######################
#    DEPLOY          #
######################

.PHONY: deploy-local
deploy-local:
	ls -la
	bash scripts/deployServer.sh -n ${SERVER_FILE}