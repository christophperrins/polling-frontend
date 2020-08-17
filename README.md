# Poller Project
The polling project is a project used to poll other servers to find the performance of them. It uses a Poller to send the requests, a poller orchestrator to tell the pollers who has responsibility over which endpoint monitoring. Finally a frontend to visually see the data

## Other repos in this project:
- [Poller](https://github.com/christophperrins/polling-poller)
- [Poller Orchestrator](https://github.com/christophperrins/polling-orchestrator)
- [Frontend](https://github.com/christophperrins/polling-frontend)

## Frontend

### Installation
The project is built using nodejs and npm.

To install run the following steps
```sh
sudo apt update
sudo apt install -y nodejs npm
sudo npm install -g npm
hash -r
sudo npm install -g n
sudo n stable
```

To start the server in development mode run:
```sh
git clone https://github.com/christophperrins/polling-frontend.git
cd polling-frontend
npm start
```

To run the server in a production environment
```sh
sudo apt install apache2
git clone https://github.com/christophperrins/polling-frontend.git
cd polling-frontend
npm run-script build
sudo cp -rf build/* /var/www/html/
```

