# データ入力用
from bs4 import BeautifulSoup as bs
import requests
import urllib


# Yahooニュース一覧より
categories = ['main', 'domestic', 'world', 'business', 'entertainment', 'sports', 'it', 'science', 'local']


# カテゴリ別のURL入手
def make_url(category):
    main_url = 'https://news.yahoo.co.jp/'
    if category == 'main':
        return main_url
    else:
        return main_url + 'categories/' + category

def scraping(category):
    url = make_url(category)
    html = requests.get(url)
    soup = bs(html.content, 'html.parser')

    titles = []
    links = []
    news = {}

    topics = soup.find(id='uamods-topics')

    for element in topics.find_all('a'):

        if element.text == 'もっと見る':
            break
            
        titles.append(element.text)
        
        href = element.get('href')
        link = urllib.parse.urljoin(url, href)
        links.append(link)

    if category == '':
        category = 'main'
    news['titles'] = titles
    news['links'] = links
    return news
