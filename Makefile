build:
	docker build -t willjcksn/tlfront .

stop:
	docker kill tlfront 2> /dev/null; true
	docker rm tlfront 2> /dev/null; true

run:
	make stop
	docker run --net=dbnetwork -d --name tlfront -p 8080:80 willjcksn/tlfront

rundev:
	make stop
	docker run --net=dbnetwork -d --name tlfront -p 8080:80 -v `pwd`/dist:/usr/share/nginx/html willjcksn/tlfront
