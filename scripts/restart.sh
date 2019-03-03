cd /home/ec2-user/hhnsweb-react
source ~/.bash_profile

forever stop keystone.js
forever start keystone.js
