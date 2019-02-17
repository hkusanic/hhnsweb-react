rm -Rf /home/ec2-user/hhnsweb-react
mkdir /home/ec2-user/hhnsweb-react

cp -R /opt/codedeploy-agent/deployment-root/577d3d03-ef22-4d20-8a82-c68a17c74c69/d-6GVAM57BY/deployment-archive/* /home/ec2-user/hhnsweb-react

cd /home/ec2-user/hhnsweb-react

npm install

npm run build
