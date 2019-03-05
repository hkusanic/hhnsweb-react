rm -Rf /home/ec2-user/hhnsweb-react
mkdir /home/ec2-user/hhnsweb-react

var=$( cat /opt/codedeploy-agent/deployment-root/deployment-instructions/11f43529-db97-477f-88ee-e31d7b8b0add_last_successful_install )

cp -R $var/deployment-archive/* /home/ec2-user/hhnsweb-react

cd /home/ec2-user/hhnsweb-react

npm install

npm run build
