var tipuesearch = {"pages": [{'title': '簡介', 'text': '四設計一甲-40823108-高宇哲 \n 個人網頁: \n https://40823108.github.io/wcm2020/content/index.html \n 個人倉儲: \n https://github.com/40823108/wcm2020 \n 個人Youtube: \n https://www.youtube.com/channel/UCd3WMYoS7LQ5-Yh1u7gXbpA/featured \n \n', 'tags': '', 'url': '簡介.html'}, {'title': 'Grouping', 'text': '亂數分組: \n evenGrouping.dart: \n import \'dart:html\';\n  \n  InputElement studListUrl = querySelector("#studListUrl");\n  String studUrl;\n  // 將 Label 改為 Textarea, 避免產生過程結果嵌入所在頁面\n  TextAreaElement output = querySelector("#output");\n  \nmain() {\n  querySelector("#submit").onClick.listen((e) => grouping());\n}\n  \ngrouping() {\n  output.innerHtml = "";\n  \n  if (studListUrl.value != "") {\n    studUrl = studListUrl.value;\n  } else {\n    studUrl = \'https://mde.tw/group/downloads/2019fall_cp_1a_list.txt\';\n  }\n  \n  // 組序由 1 開始\n  int gth = 1;\n  // 迴圈序號變數\n  int i;\n  int j;\n  int total;\n  int inc;\n  // 每組學員暫存數列\n  var gpList = [];\n  // 全班分組數列\n  var group = [];\n  // 各組人數數列\n  var numList = [];\n  var courseTitle = \'wcm2020\';\n  \n  HttpRequest.getString(studUrl).then((String resp) {\n    // 利用 trim() 去除字串最後的跳行符號, 之後再利用 split() 根據 \\n 轉為數列\n    var studList = resp.trim().split("\\n");\n    // 數列利用 shuffle() 方法以隨機方法弄亂順序\n    studList.shuffle();\n    total = studList.length;\n    output.text += "全班總計" + total.toString() + " 人\\n";\n    numList = getNumList(studList.length);\n    inc = 0;\n    for (i in numList){\n      // 列印區隔符號\n      output.text += \'=\' * 20 + "\\n";\n      output.text += "group $gth 有 " + i.toString() + " 人: \\n";\n      gpList = [];\n      for (j = 0; j < i; j++){\n        output.text += studList[j+inc] + "\\n";\n        // 在各分組數列中加入將對應的學員學號\n        gpList.add(studList[j+inc]);\n      }\n      gth = gth + 1;\n      inc = inc + j;\n        //output.text += studList[j] + "\\n";\n        // 逐步將各組暫存的分組數列加入全班分組數列中\n      gpList.sort();\n      group.add(gpList);\n    }\n    // 列出全班分組數列\n    output.text += group.toString() + "\\n";\n    // 列出已經排序後的分組名單\n    output.text += \'=\' * 25 + "\\n";\n    output.text += \'以下為排序後的各組成員名單: \\n\';\n    gth = 1;\n    /*\n    404231\n    s4052\n    4062\n    s4072\n    4082\n    5072\n    5083\n    */\n    // 先列出純文字以 \\n 跳行組員資料\n    for (i=0; i < group.length; i++){\n      // 列印區隔符號\n      output.text += \'=\' * 20 + "\\n";\n      output.text += "group $gth \\n";\n      gpList = [];\n      for (j=0; j < group[i].length; j++){\n        output.text += group[i][j] + "\\n";\n      }\n      gth = gth + 1;\n    }\n     \n    gth = 1;\n    // 最後列出超文件以 <br\\> 跳行組員資料, 包含倉儲與網站\n    for (i=0; i < group.length; i++){\n      // 列印區隔符號\n      output.text += \'\\n\' + \'=\' * 30 + " ";\n      output.text += "group $gth  ";\n      gpList = [];\n      for (j=0; j < group[i].length; j++){\n          if (group[i][j].startsWith(\'4052\') || group[i][j].startsWith(\'4072\')) {\n              output.text += "Repository:  " + group[i][j] + \n                                      " " + " | Site:  " + group[i][j] + \n                                      " ";\n          }\n          else {\n              output.text += "Repository:  " + group[i][j] + \n                                      " " + " | Site:  " + group[i][j] + \n                                      " ";\n          }\n      }\n      gth = gth + 1;\n    }\n  });\n}\n  \nList getNumList(int total){\n  // total student number\n  // int total = 65;\n  // initial each group expect to be "eachGrp" number of people\n  int eachGrp = 10;\n  // may divide into "grpNum" number of group\n  int grpNum = total ~/ eachGrp;\n  // vacant list\n  var splits = [];\n  // find remainder when total number divid into "grpNum" number of group\n  int remainder = total % grpNum;\n  // number of people in one group by calculation\n  int calGrp = total ~/ grpNum;\n  \n  for (int i = 0; i < grpNum; i++) {\n    splits.add(calGrp);\n  }\n  //print(splits);\n  \n  for (int i = 0; i < remainder; i++) {\n    splits[i] += 1;\n  }\n  //print(splits);\n  return splits;\n } \n index.html: \n URL:  \n \n \n style.css: \n body {\n  color: white;\n  font-size: 20px;\n}\n \ninput, select, textarea {\nfont-size: 100%;\n} \n get_student.py: \n from flask import Flask, request \nfrom flask_cors import CORS\n \nimport requests\nimport bs4\nimport ssl\n \n\'\'\'\nhttps://s1.mde.nfu.edu.tw:7443/?semester=1082&courseno=0767\ncd\n2a 1082/0767\n2b 1082/0780\n \n2a 1072/0777\n2b 1072/0790\n2a 1062/0788\n2a 1062/0802\n \nwcm\n1082/0744\n \n1072/0754\n1062/0765\n \nwcmj\n1082/2418\n\'\'\'\n \napp = Flask(__name__)\nCORS(app)\n \n@app.route(\'/studlist\')\n@app.route(\'/\')\ndef studlist():\n    semester = request.args.get(\'semester\')\n    courseno = request.args.get(\'courseno\')\n    if semester == None:\n        semester = \'1082\'\n    if courseno == None:\n        courseno = \'0744\'\n     \n    url = \'https://osa.nfu.edu.tw/query/studlist_ajax.php\'\n    post_var = {\'pselyr\': semester, \'pseqno\': courseno}\n \n    result = requests.post(url, data = post_var)\n \n    soup = bs4.BeautifulSoup(result.content, \'lxml\')\n    table = soup.find(\'table\', {\'class\': \'tbcls\'})\n    data = []\n    rows = table.find_all(\'tr\')\n    for row in rows:\n        cols = row.find_all(\'td\')\n        cols = [ele.text.strip() for ele in cols]\n        data.append([ele for ele in cols if ele]) # Get rid of empty values\n    output = ""\n    for i in data[2:]:\n        #print(i[0])\n        output +=i[0] + "\\n"\n    return output\n    #return  str(pselyr) + " + " +str(pseqno)\n \n# 即使在近端仍希望以 https 模式下執行\ncontext = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)\ncontext.load_cert_chain(\'localhost.crt\', \'localhost.key\')\n \n# 取 flaskapp.py 中的 uwsgi 變數設定\nuwsgi = False\nif uwsgi:\n    # 表示程式在雲端執行\n    application = app\nelse:\n    # 表示在近端執行, 以 python3 wsgi.py 執行\n    app.run(host=\'127.0.0.1\', port=5443, debug=True, ssl_context=context) \n nginx sites-available/default settings: \n server {\n    listen 8000;\n    server_name s1.mde.nfu.edu.tw;\n    charset utf-8;\n     \n    listen 7443 ssl;\n  \n    location /static {\n        alias /home/kmol2019/course_studlist/static/;\n    }\n  \n    location / {\n        include uwsgi_params;\n        uwsgi_pass  127.0.0.1:8087;\n    }\n     \n    ssl_certificate /etc/stunnel/localhost.crt;\n    ssl_certificate_key /etc/stunnel/localhost.key;\n    ssl_session_timeout 5m;\n    ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;\n    ssl_ciphers "HIGH:!aNULL:!MD5 or HIGH:!aNULL:!MD5:!3DES";\n    ssl_prefer_server_ciphers on;\n    try_files $uri $uri/ =404;\n} \n uwsgi7.ini: \n [uwsgi]\nsocket = 127.0.0.1:8087\nuid = kmol2019\ngid = kmol2019\nplugins-dir = /usr/lib/uwsgi/plugins/\nplugin = python3\nmaster = true\nlogto = /var/log/uwsgi/emperor.log\nlogfile-chown = kmol2019:kmol2019\nprocesses = 4\nthreads = 2\nchdir = /home/kmol2019/course_studlist\nwsgi-file = /home/kmol2019/course_studlist/get_student.py \n /etc/systemd/system/cmsimfly.service: \n [Unit]\nDescription=uWSGI to serve CMSimfly\nAfter=network.target\n \n[Service]\nUser=kmol2019\nGroup=kmol2019\nWorkingDirectory=/home/kmol2019/uwsgi_ini\nExecStart=/usr/local/bin/uwsgi --emperor /home/kmol2019/uwsgi_ini\n \n[Install]\nWantedBy=multi-user.target\n \n', 'tags': '', 'url': 'Grouping.html'}, {'title': '1a', 'text': 'wcmg1 組長: 40823131 40823126 40823123 40823124 40823128 \n wcmg2 組長: 40823112 40823108 40823109 40823111 40823145 \n wcmg3 組長: 40823125 40823129 40823137 40823136 40823151 \n wcmg4 組長:\xa040823110 40823103 40823107 40823130 40823142 \n wcmg5 組長:\xa040823143 40823144 40543118 40823127 \n', 'tags': '', 'url': '1a.html'}, {'title': '每周進度', 'text': '', 'tags': '', 'url': '每周進度.html'}, {'title': 'W10-W11', 'text': '利用 Python 程式讀取同學修課檔案, 以及從 Google Sheet 轉出的 .csv, 分別處理為 List 與 Dictionary 資料格式之後, 逐一根據同學 List 學號, 從 Dictionary 取出自評成績. \n import csv\n \n# read student list\n \nfilename = \'E:/wcm2020/data/tmp/2020_spring_score/2a/2a_list.txt\'\nwith open(filename, encoding="utf-8") as f:\n    content = f.readlines()\n#print(content)\nstudent = [x.strip() for x in content] \n#print(student)\n \n \n# Timestamp, email, 修課名稱, url, score, desp, memo\n# 0, 1, 2, 3, 4, 5, 6\n#total = 0\nall = {}\nwith open(\'y:/2020midterm.csv\', encoding="utf-8") as csv_file:\n    csv_reader = csv.reader(csv_file, delimiter=\',\')\n    #print(csv_reader)\n \n    line_count = 0\n    for row in csv_reader:\n        if line_count == 0:\n            #print(f\'Column names are {", ".join(row)}\')\n            line_count += 1\n        else:\n            student_num = row[1].split("@")[0]\n            #print(student_num)\n            student_score = row[4]\n            #print(student_score)\n            try:\n                all.update({student_num: student_score})\n            except:\n                all.update({student_num: "error"})\n            #print(f\'\\t{row[0]} works in the {row[1]} department, and was born in {row[2]}.\')\n            #print(f\'\\t{row[4]}\')\n            #total += int(row[4])\n            line_count += 1\n#print(all)\n#print(student)\n \n \nfor i in student:\n     \n    #if i in all:\n        #pass\n    #else:\n        #print(str(i))\n     \n    try:\n        print(i + "\\t" + all[i])\n    except:\n        print(i + "\\t60")\n \n    #print(f\'Processed {line_count} lines.\')\n    #print("平均=" + str(total/line_count))\n \n flask 程式一: \n from flask import Flask\n  \napp = Flask(__name__)\n  \n@app.route(\'/\') \ndef hello_world():\n    return \'Hello, From Flask!\'\n  \nif __name__== \'__main__\': \n    app.run() \n Flask 程式二: \n from flask import Flask, render_template\nimport ssl\nimport csv\n  \ncontext = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)\ncontext.load_cert_chain(\'localhost.crt\', \'localhost.key\')\n  \napp = Flask(__name__)\n  \n@app.route(\'/\') \ndef hello_world():\n    return \'Hello, From Flask!\'\n  \n@app.route(\'/ROCflag\')\ndef drawROC():\n    return render_template("ROCflag.html")\n \n@app.route("/midterm")\ndef midterm():\n    # read student list\n \n    filename = \'1a_list.txt\'\n    with open(filename, encoding="utf-8") as f:\n        content = f.readlines()\n    #print(content)\n    student = [x.strip() for x in content] \n    #print(student)\n \n \n    # Timestamp, email, 修課名稱, url, score, desp, memo\n    # 0, 1, 2, 3, 4, 5, 6\n    #total = 0\n    all = {}\n    with open(\'2020midterm.csv\', encoding="utf-8") as csv_file:\n        csv_reader = csv.reader(csv_file, delimiter=\',\')\n        #print(csv_reader)\n \n        line_count = 0\n        for row in csv_reader:\n            if line_count == 0:\n                #print(f\'Column names are {", ".join(row)}\')\n                line_count += 1\n            else:\n                student_num = row[1].split("@")[0]\n                #print(student_num)\n                student_score = row[3]\n                #print(student_score)\n                try:\n                    all.update({student_num: student_score})\n                except:\n                    all.update({student_num: "error"})\n                #print(f\'\\t{row[0]} works in the {row[1]} department, and was born in {row[2]}.\')\n                #print(f\'\\t{row[4]}\')\n                #total += int(row[4])\n                line_count += 1\n    #print(all)\n    #print(student)\n \n    output = ""\n    for i in student:\n         \n        #if i in all:\n            #pass\n        #else:\n            #print(str(i))\n         \n        try:\n            output += (str(i) + ":  "+ str(all[i]) + " ")\n        except:\n            output += (str(i) + ": no data ")\n         \n    return output\n      \nif __name__== \'__main__\': \n    app.run(ssl_context=context) \n W11-加入SSH: \n Putty.exe: \n \n key: \n \n github-key: \n \n', 'tags': '', 'url': 'W10-W11.html'}, {'title': 'W12-W15', 'text': 'W12 \n 在Windows10中安裝Ubuntu 20.04虛擬主機 \n \n W13 \n 安裝Oracle VM VirtualBox建立虛擬主機 \n \n W14 \n 編譯NGINX 在虛擬與實體主機上完成網際 PDF 檔案管理系統. \n W15 \n 利用HxD編修pip.exe \n 將Pythonw.exe修改為Python.exe \n \n 利用Pypdf2切割PDF檔案 \n Pypdf2 examples: \n # pypdf2_ex1.py\nimport os\nfrom PyPDF2 import PdfFileWriter, PdfFileReader\n \npdfReader = PdfFileReader(open("2002_Book_Real-WorldASPNETBuildingAConte.pdf", "rb"))\ninformation = [("WhatIsCMS",18,45)]\n \nfor page in range(len(information)):\n    pdf_writer = PdfFileWriter()\n    start = information[page][1]\n    end = information[page][2]\n    while start<=end:\n        pdf_writer.addPage(pdfReader.getPage(start-1))\n        start+=1\n    if not os.path.exists("./"):\n        os.makedirs(savepath)\n    output_filename = \'{}_{}_page_{}.pdf\'.format(information[page][0],information[page][1], information[page][2])\n    with open(output_filename,\'wb\') as out:\n        pdf_writer.write(out) \n # pypdf2_ex2.py\nimport os\nfrom PyPDF2 import PdfFileWriter, PdfFileReader\n \npdfReader = PdfFileReader(open("Beginning-Git-and-GitHub.pdf", "rb"))\ninformation = [("GitAndGithub",17,105),("GitAndGithub",107,194),("GitAndGithub",196,289)]\n \nfor page in range(len(information)):\n    pdf_writer = PdfFileWriter()\n    start = information[page][1]\n    end = information[page][2]\n    while start<=end:\n        pdf_writer.addPage(pdfReader.getPage(start-1))\n        start+=1\n    if not os.path.exists("./"):\n        os.makedirs(savepath)\n    output_filename = \'{}_{}_page_{}.pdf\'.format(information[page][0],information[page][1], information[page][2])\n    with open(output_filename,\'wb\') as out:\n        pdf_writer.write(out) \n # pypdf2_ex3.py\n# merge several pdf files\nimport sys\nimport PyPDF2\n \npdf_write_object = PyPDF2.PdfFileWriter()\n \n#for i in sys.argv[1:]:\nfor i in ["WhatIsCMS.pdf","InforLifeCycle.pdf","EnterpriseContentManage.pdf"]:\n    pdf_read_object = PyPDF2.PdfFileReader(i)\n    print(\'processing file : \'+ i + \'number of pages : \' +  str(pdf_read_object.numPages))\n    for page in range(pdf_read_object.numPages):\n        pdf_write_object.addPage(pdf_read_object.getPage(page))\n \nfinal_file_object = open(\'2020CMS.pdf\', \'wb\')\npdf_write_object.write(final_file_object)\nfinal_file_object.close() \n 選取要切割的PDF檔案 \n \n 切割完成的PDF檔案 \n', 'tags': '', 'url': 'W12-W15.html'}, {'title': 'W16-W17', 'text': 'W16 \n 何謂WSGI \n WSGI，全稱 Web Server Gateway Interface，或者 Python Web Server Gateway Interface ，是為 Python 語言定義的 Web 伺服器和 Web 應用程式或框架之間的一種簡單而通用的介面。自從 WSGI 被開發出來以後，許多其它語言中也出現了類似介面。 \n WSGI 的官方定義是，the Python Web Server Gateway Interface。從名字就可以看出來，這東西是一個Gateway，也就是閘道器。閘道器的作用就是在協議之間進行轉換。 \n WSGI 是作為 Web 伺服器與 Web 應用程式或應用框架之間的一種低階別的介面，以提升可移植 Web 應用開發的共同點。WSGI 是基於現存的 CGI 標準而設計的。 \n W17 \n PDF網際分割與合併程式 \n google API \n \n 合併完成 \n \n 合併完上學期所做的所有東西 \n \n', 'tags': '', 'url': 'W16-W17.html'}, {'title': 'Python程式', 'text': 'import csv\n   \n# read student list\nfilename = \'D:/1a/1alist.txt\'\nwith open(filename, encoding="utf-8") as f:\n    content = f.readlines()\n    student = [x.strip() for x in content]\n#print(content)\n#print(student)\n   \n# Timestamp, email, ????, url, score, desp, memo\n# 0, 1, 2, 3, 4, 5, 6\n#total = 0\n  \nall = {}\nwith open(\'D:/1a/1a.csv\', encoding="utf-8") as csv_file:\n    csv_reader = csv.reader(csv_file, delimiter=\',\')\n       \n    line_count = 0\n    for row in csv_reader:\n        if line_count == 0:\n            #print(f\'Column names are {", ".join(row)}\')\n            line_count += 1\n        else:\n            student_num = row[1].split("@")[0]\n            #print(student_num)\n            student_score = row[4]\n            #print(student_score)\n            try:\n                all.update({student_num: student_score})\n            except:\n                all.update({student_num: "error"})\n            #print(f\'\\t{row[0]} works in the {row[1]} department, and was born in {row[2]}.\')\n            #print(f\'\\t{row[4]}\')\n            #total += int(row[4])\n            line_count += 1\n#print(all)\n#print(student)\n  \nfor i in student:\n       \n    #if i in all:\n        #pass\n    #else:\n        #print(str(i))\n       \n    try:\n        print(i + "\\t" + all[i])\n    except:\n        print(i + "\\t60")\n  \n   \n    #print(f\'Processed {line_count} lines.\')\n    #print("??=" + str(total/line_count)) \n Flask程式: \n from flask import Flask\n   \napp = Flask(__name__)\n   \n@app.route(\'/\') \ndef hello_world():\n    return \'Hello, From Flask!\'\n   \nif __name__== \'__main__\': \n    app.run()\n \n', 'tags': '', 'url': 'Python程式.html'}, {'title': 'Ubuntu', 'text': '', 'tags': '', 'url': 'Ubuntu.html'}, {'title': '伺服管理', 'text': '常用指令: \n env - 列出 Shell 環境變數 \n history - 列出歷史指令, 可利用上下 arrow 鍵列出先前輸入的指令, 也可以使用 Ctrl + p 與 Ctrl + N 往前或往後列出歷史指令. \n Ctrl + c - 終止指令執行 \n Ctrl + z - 跳出互動指令執行模式 \n cd - change directory \n pwd - print working directory \n mkdir - make directory \n rmdir - remove directory \n ls - list files \n rm - remove files \n cp - copy files \n mv - move files \n cat - display content of a file \n tail - show just the last lines of a file \n head - display first lines of a file \n grep - grep keyword files \n 重要檔案: \n 每一用戶登入後都會執行 /etc/profile, 因此若有共用的環境變數, 可以寫進 /etc/profile 設定檔案 \n', 'tags': '', 'url': '伺服管理.html'}, {'title': 'Cmsimde建立網誌方法', 'text': '先用github建立倉儲 \n \n 再隨身系統裡裡建立一個tmp資料夾 \n \n 到github網站git clone自己倉儲的網址,clone完後git submodule add \n \n 把子模組cmsimde放到網頁資料夾後,進入up_ir資料夾 \n \n 把所有資料複製出 \n \n wcm2020-1的目錄下 \n \n 進入cmsimde目錄下,將wsgi.py檔拉入SciTE-->tools-->go \n \n 成功建立網站 \n \n', 'tags': '', 'url': 'Cmsimde建立網誌方法.html'}, {'title': 'SSH教學', 'text': '', 'tags': '', 'url': 'SSH教學.html'}, {'title': 'SSH Key產生', 'text': '開啟 \n \n 使用puttygen將private key(id_rsa)導入，並轉換為putty能夠讀懂的格式(.ppk)檔案 \n 存好(.ppk)檔後 \n \n 使用scite將public key (id_rsa.pub)打開，到工具列找到Options-->Wrap就能看建完整的檔案內容 \n \n 完整內容如下: \n \n 到倉儲-->seeting-->SSH and GPG keys,點擊New SSH key，將複製的內容貼上並儲存就可以使用了 \n \n', 'tags': '', 'url': 'SSH Key產生.html'}, {'title': 'SSH Putty設定', 'text': 'SSH Putty設定 \n \n 畫線處請選擇.ppk檔案 \n \n 回到Session目錄中按下save存檔 \n \n 進入你要Push的資料夾,再進入\\tmp\\wcm2020\\.git目錄下,修改config檔案, \n 將字串url=https:\\\\github.com:40823108/wcm2020.git修改 \n \n 修改為:url=git@ github.com:40823108/wcm2020.git \n \n', 'tags': '', 'url': 'SSH Putty設定.html'}, {'title': '@gm帳號建立blogger', 'text': '使用google搜尋blogger \n \n 選擇學校@gm帳號 \n \n 建立網址 \n \n 給予網址 \n \n 給予名稱 \n \n 新增草稿 \n \n 加入所要發布的標題與文章 \n \n 成功建立網誌 \n \n', 'tags': '', 'url': '@gm帳號建立blogger.html'}, {'title': 'VirtualBOX虛擬主機', 'text': '進入虛擬主機 \n 進入開機畫面,輸入密碼 \n \n 進入程式集 \n \n 進入Terminl \n \n 建立github資料夾,進入github資料夾後,git clone \n \n \n 完成後進入程式集,點選FILE Manger PCManFM \n \n 進入github資料夾 \n \n 進入WCM2020資料夾 \n \n 成功建立 \n \n', 'tags': '', 'url': 'VirtualBOX虛擬主機.html'}]};