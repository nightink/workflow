install:
	@npm install

lint:
	@./node_modules/.bin/gulp lint

default: install
	@DEBUG=gulp:charset ./node_modules/.bin/gulp -e gbk

push:
	@git push

.PHONY: gulp