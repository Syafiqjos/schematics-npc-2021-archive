JUDGEHOST_NAME=sebuah-judgehost
DOMSERVER_BASEURL=http://13.92.4.246/
JUDGEDAEMON_USERNAME=judgehost
JUDGEDAEMON_PASSWORD=oJRGQAkPpx4baBvZ

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

sudo apt-get install docker-compose -y

git clone https://github.com/zydhanlinnar11/sch-npc-senior-judgehost
cd sch-npc-senior-judgehost

sed -i "s/wsl-zydhan/$JUDGEHOST_NAME/g" docker-compose.yml

echo "DOMSERVER_BASEURL=$DOMSERVER_BASEURL" > env/judgehost.env
echo "JUDGEDAEMON_USERNAME=$JUDGEDAEMON_USERNAME" >> env/judgehost.env
echo "JUDGEDAEMON_PASSWORD=$JUDGEDAEMON_PASSWORD" >> env/judgehost.env

sudo docker-compose up -d