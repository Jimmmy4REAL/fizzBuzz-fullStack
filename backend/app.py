from flask import Flask, jsonify

app = Flask(__name__)

# FizzBuzz endpoint to generate a JSON list of numbers from 1 to 100,
@app.route('/fizzbuzz', methods=['GET'])
# logic based on description
def fizzbuzz():
    result = []
    for num in range(1, 101):
        if num % 3 == 0 and num % 5 == 0:
            result.append('FizzBuzz')
        elif num % 3 == 0:
            result.append('Fizz')
        elif num % 5 == 0:
            result.append('Buzz')
        else:
            result.append(num)
    return jsonify(result) # json format required for frontend

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
