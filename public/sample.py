import webbrowser

f = open('helloworld.html', 'a')


htmlStart = """<html>
<head></head>
<body>"""
htmlMain = ''
htmlEnd = """</body>
</html>"""

for x in range (1, 1000):
    var = "<h1>" + str(x) + "</h1>"
    htmlMain = htmlMain + var

code = htmlStart + htmlMain + htmlEnd
f.write(code)
f.close()


webbrowser.open_new_tab('helloworld.html')
