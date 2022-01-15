# Install Docker Domserver Domjudge

# Please baca pelan - pelan biar enggak keliru

# 1. Installing

sudo apt-get update

sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release -y

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io -y

apt-cache madison docker-ce

sudo docker run hello-world

# 2. Post Install

sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker
docker run hello-world

# 4. Setelah itu ganti namanya.

docker run --detach=true -it --name dj-mariadb -e MYSQL_ROOT_PASSWORD=harutmarutvs3n3r9ydr1nql0l1pl34s31707 -e MYSQL_USER=domjudge -e MYSQL_PASSWORD=m3ngh4rd1k4n4ky4tym1tuproh1b1tt1ed -e MYSQL_DATABASE=domjudge -p 13306:3306 mariadb --max-connections=1000

docker run --detach=true --link dj-mariadb:mariadb -it -e MYSQL_HOST=mariadb -e MYSQL_USER=domjudge -e MYSQL_DATABASE=domjudge -e MYSQL_PASSWORD=m3ngh4rd1k4n4ky4tym1tuproh1b1tt1ed -e MYSQL_ROOT_PASSWORD=harutmarutvs3n3r9ydr1nql0l1pl34s31707 -p 80:80 --name domserver domjudge/domserver:7.3.3

docker exec -it domserver cat /opt/domjudge/domserver/etc/initial_admin_password.secret
docker exec -it domserver cat /opt/domjudge/domserver/etc/restapi.secret