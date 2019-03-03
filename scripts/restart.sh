source /home/ec2-user/.bash_profile
cd /home/ec2-user/hhnsweb-react

forever stop keystone.js
forever start keystone.js
