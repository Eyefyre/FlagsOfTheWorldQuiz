import requests
import json
import re
import subprocess
import sys
import os
import html

ScriptPath = os.path.dirname(os.path.dirname(
    os.path.abspath(__file__)))
BaseURL = "https://restcountries.com/v3.1/all"

response = requests.get(BaseURL, timeout=5)

#print(response.json())
data = response.json()

countryData = []
for d in data:
    CountryName = d["name"]["common"]
    CountryFlag = CountryName + ".png"
    CountryContinent = d["continents"][0]
    countryData.append({"name": CountryName,"flag" : CountryFlag, "continent": CountryContinent})
    # CountryFlagPNG = d["flags"]["png"]
    # response2 = requests.get(CountryFlagPNG)

    # file = open("./FlagData/" + CountryName + ".png", "wb")
    # file.write(response2.content)
    # file.close()
dat = json.dumps(countryData)

with open('./FlagData/countryData.json', 'w') as outfile:
    outfile.write(dat)