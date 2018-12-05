
######################
#    TRAVIS ROUTE    #
######################

# Master Branch
ifneq (,$(findstring master, $(TRAVIS_BRANCH)))
$(info This is a Master Build)
.PHONY: all
all: deploy-local

# Develop Branch
else ifneq (,$(findstring develop, $(TRAVIS_BRANCH)))
$(info This is a Develop Build)
.PHONY: all
all: deploy-local

# Pull Request
else ifneq ($(TRAVIS_PULL_REQUEST_BRANCH),)
$(info This is a Pull Request Build)
.PHONY: all
all: deploy-local

# Regular Branch
else
$(info This is a push build, branch: $(TRAVIS_BRANCH))
.PHONY: all
all: deploy-local
endif



######################
#    DEPLOY          #
######################

.PHONY: deploy-local
deploy-local:
	bash scripts/deployServer.sh -n ${SERVER_FILE}