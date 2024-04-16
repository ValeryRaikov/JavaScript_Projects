JS weather application using the OpenWeatherMap API. The purpose of the app is to show general weather information about the current weather conditions 
of a precise location that the user chose. 

When the app is opened for the first time it consists only of a searchbox and a button with which the user sends information about the chosen city:
![image](https://github.com/ValeryRaikov/JavaScript_Projects/assets/124359973/4f387d86-f33f-4f43-af5a-ed1c5a3f23c4)

When a city is passed to the searchbox and the search button is clicked, a GET request is sent to the API to fetch information that is visualised in our app.
Depending on the current weather conditions the weather icon changes as well as the background theme of the application. Let's see some examples:
1.Sunny weather (warm background):
![image](https://github.com/ValeryRaikov/JavaScript_Projects/assets/124359973/177fa3cb-4c55-49b7-8057-126a251186ba)
2.Drizzy weather:
![image](https://github.com/ValeryRaikov/JavaScript_Projects/assets/124359973/d657a2e1-11ed-491c-ad39-2e291881bb81)
3.Rainy weather (cold background):
![image](https://github.com/ValeryRaikov/JavaScript_Projects/assets/124359973/1e0cbc55-b534-42e5-b105-8cdca7dd0261)
4.Night conditions:
![image](https://github.com/ValeryRaikov/JavaScript_Projects/assets/124359973/a9e23224-edc1-4874-a52a-23a8eaa8ad09)

Some more specifics: for example if the temperature is too high, the color becomes red, whereas if it is beyond 0 degrees it becomes blue! If the wind speed
is greater than 50 km/h, text is also made red and bigger.

Error handling:
If invalid city is passed and a status of 404 is returned from the API, 'Invalid city name' text is visualised and there is no mathcing weather:
![image](https://github.com/ValeryRaikov/JavaScript_Projects/assets/124359973/9f59f1e9-fcdb-4126-904d-65d763599a55)

These are the basics of the app. Hope you like it!
