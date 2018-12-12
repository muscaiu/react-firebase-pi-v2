# Raspberry Pi test project aiming to control lights
# Uses React, MaterialUI on the Fe and Express on the BE

# First thigs to do after installing Pi
  
1. Assign static ip to the Pi  
vim /etc/dhcpcd.conf  
interface eth0  
static ip_address=192.168.1.10/24  
static routers=192.168.1.1  
static domain_name_servers=192.168.1.1  
  
2. Enable ssh from Pi config and change default pass (raspberry)  
passwd
  
3. Enable Remote desktop  
enable VNC in Pi config  
sudo apt-get install xrdp  
connect via the first option (Xorg)  
  
4. Install ftp server to be able to code remotely with VSCode  
  a. in Windows:  
	install ftp-simple VSCode extension  
	press F1 and go to fpt-simple connection file  
	[{ "name": "192.168.1.10",  https://github.com/muscaiu/react-light.git
			"host": "192.168.1.10",  
			"port": 21,  
			"type": "ftp",  
			"username": "pi",  
			"password": "xxx",  
			"path": "/",  
			"autosave": true,  
			"confirm": false,  
			"ignore": [  
				"/**/node_modules",  
				"/**/*.class"  
			]  
	}]  
  b. in Pi:  
	sudo apt-get install pure-ftpd  
	sudo service pure-ftpd restart  
  
5. Removing old node version and install new  
sudo apt-get remove nodejs  
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -  
sudo apt-get install -y nodejs  

6. Install and run pm2  
sudo npm install -g pm2   
-before eject- sudo pm2 start node_modules/react-scripts/scripts/start.js --name "react-light"  
-after eject- sudo pm2 start scr ipts/start.js --name "react-light"  
sudo pm2 start api --name "api"  
sudo pm2 startup  
sudo pm2 save  

7. Install MongoDB
sod apt-get install mongodb
