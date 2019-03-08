rm -Rf /home/ec2-user/hhnsweb-react
mkdir /home/ec2-user/hhnsweb-react

var=$( cat /opt/codedeploy-agent/deployment-root/deployment-instructions/e72dd4e5-3dc1-42df-8138-bee1732d5ca7_last_successful_install )

cp -R $var/deployment-archive/* /home/ec2-user/hhnsweb-react

cd /home/ec2-user/hhnsweb-react

npm install

npm run build
