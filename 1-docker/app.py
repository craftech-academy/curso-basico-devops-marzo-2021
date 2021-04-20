from flask import Flask, render_template
import redis

app = Flask(__name__)
cache = redis.Redis(host='redis', port=6379)

def get_hit_count_windows():
    retries = 5
    while True:
        try:
            return cache.incr('hitsWindows')
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)

@app.route("/windows")
def windowsWeb():
    countWindows = get_hit_count_windows()
    return render_template("windows.html", countWindows=countWindows)

##  

def get_hit_count_linux():
    retries = 5
    while True:
        try:
            return cache.incr('hitsLinux')
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)

@app.route("/linux")
def linuxWeb():
    countLinux = get_hit_count_linux()
    return render_template("linux.html", countLinux=countLinux)

##

def get_hit_count_mac():
    retries = 5
    while True:
        try:
            return cache.incr('hitsMac')
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)

@app.route("/mac")
def macWeb():
    countMac = get_hit_count_mac()
    return render_template("mac.html", countMac=countMac)

##

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/other")
def other():
    return render_template("other.html")



@app.errorhandler(404)

# inbuilt function which takes error as parameter
def not_found(e):
  return render_template("404.html")

if __name__ == "__app__":
    app.run(debug=True)

# Run Flask Application
app.run(host="0.0.0.0", port=5000)