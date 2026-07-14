import requests
import os

API = "https://zenless-zone-zero.fandom.com/api.php"


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SAVE_DIR = os.path.join(
    BASE_DIR,
    "assets",
    "zzz_splash"
)

os.makedirs(SAVE_DIR, exist_ok=True)



def get_agents():

    r = requests.get(API, params={
        "action":"query",
        "list":"categorymembers",
        "cmtitle":"Category:Agents",
        "cmlimit":500,
        "format":"json"
    })

    return r.json()["query"]["categorymembers"]



def get_portrait_url(name):

    filename = f"Agent_{name}_Portrait.png"


    r = requests.get(API, params={
        "action":"query",
        "format":"json",
        "titles":f"File:{filename}",
        "prop":"imageinfo",
        "iiprop":"url"
    })


    pages = r.json()["query"]["pages"]

    page = next(iter(pages.values()))


    try:
        return page["imageinfo"][0]["url"]

    except:
        return None



def download(url,name):

    r=requests.get(url)

    if r.status_code == 200:

        with open(
            os.path.join(SAVE_DIR,name),
            "wb"
        ) as f:
            f.write(r.content)



def main():

    agents=get_agents()


    for a in agents:

        name=a["title"]

        url=get_portrait_url(name)


        if url:

            filename=name.replace(" ","_")+".webp"

            print("Downloading:",filename)

            download(url,filename)

        else:

            print("Missing:",name)



if __name__=="__main__":
    main()