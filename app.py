from flask import Flask, render_template

app = Flask(__name__)

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