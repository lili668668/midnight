import sqlite3
import json
import requests as RS
import os
import shutil

db_file_name = 'slack-archv-test.sqlite'
db = sqlite3.connect(db_file_name)
path_file_name='img_paths.json'
path = './picture/'
head = {
		"Host":"files.slack.com",
		"User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64; rv:45.0) Gecko/20100101 Firefox/45.0",
		"Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
		"Accept-Language":"zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
		"Accept-Encoding":"gzip, deflate, br",
		"DNT":"1",
		"Cookie":"",
		"Connection":"keep-alive"
	}
ses = RS.session()

file_ids = db.execute("select file_id, updated from message where channel_id='C045B1Y37' and subtype='file_share'")

os.makedirs(path, exist_ok=True)
img_paths = []

for (file_id, updated) in file_ids:
    thumbs = db.execute("select thumb_data from file where id= '%s'" % file_id)

    for thumb in thumbs:
        jsn = json.loads(thumb[0])
        thumb_360 = jsn['thumb_360']
        filename = updated.replace(':','') + '.' + thumb_360.split('.')[-1]
        print(filename)
        img_paths.append(filename)
        if not os.path.exists(path+filename):
            pic = ses.get(thumb_360, headers=head, stream=True)
            if pic.status_code == 200:
                picture = open(path + filename, "wb")
                shutil.copyfileobj(pic.raw,picture)
                print("loading...")
                picture.close()
            else :
                print(filename + "連線失敗")
        ses.close()

obj = {'paths':img_paths}

img_paths_file = open(path_file_name, 'w')
img_paths_file.write(json.dumps(obj))
