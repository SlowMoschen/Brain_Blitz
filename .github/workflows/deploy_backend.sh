echo "Change to App directory"
cd ~/Brain_Blitz/

echo 'kill all pm2 processes'
sudo pm2 kill

echo "bring repo up to date"
sudo git pull

echo "change to backend directory"
cd ./server

echo "install dependencies"
sudo npm install

echo "build the app"
sudo npm run build

echo 'start the app'
sudo pm2 start npm --name "BB" -- start

echo "App Deployed"