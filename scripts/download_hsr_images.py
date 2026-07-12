import requests
import os

API = "https://houkai-star-rail.fandom.com/api.php"

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SAVE_DIR = os.path.join(BASE_DIR, "assets", "hsr_images")

os.makedirs(SAVE_DIR, exist_ok=True)
def get_characters():
    r = requests.get(API, params={
        "action": "query",
        "list": "categorymembers",
        "cmtitle": "Category:Playable_Characters",
        "cmlimit": 500,
        "format": "json"
    })
    return r.json()["query"]["categorymembers"]

def get_icon_url(name):
    # Character image naming pattern used by the Genshin Fandom API
    filename = f"Character_{name}_Icon.png"

    r = requests.get(API, params={
        "action": "query",
        "format": "json",
        "titles": f"File:{filename}",
        "prop": "imageinfo",
        "iiprop": "url"
    })

    pages = r.json()["query"]["pages"]
    page = next(iter(pages.values()))

    try:
        return page["imageinfo"][0]["url"]
    except Exception as e:
        print(f"Couldn't find icon for {name}")
        return None

def download(url, name):
    r = requests.get(url)
    if r.status_code == 200:
        with open(os.path.join(SAVE_DIR, name), "wb") as f:
            f.write(r.content)

def main():
    chars = get_characters()
    print("Characters found:", len(chars))

    for c in chars:
        name = c["title"]

        url = get_icon_url(name)

        if url:
            print("Downloading:", name)
            download(url, name + ".webp")
            print(name + ".webp")
        else:   
            print("Missing:", name)

if __name__ == "__main__":
    main()