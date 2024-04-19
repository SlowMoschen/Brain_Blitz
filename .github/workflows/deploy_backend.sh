echo "Change to App directory"
cd ~/Brain_Blitz/

echo "bring repo up to date"
git pull

echo "change to backend directory"
cd ./server

echo "install dependencies"
npm install

echo "build the app"
npm run build

echo 'kill all pm2 processes'
pm2 kill

echo 'start the app'
pm2 start npm --name "BB" -- start

echo "App Deployed"