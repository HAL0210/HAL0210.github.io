from flask import Flask, render_template, request
import scraping_yahoonews as sc_YN

app = Flask(__name__)

# categories = [
#     ('main', '主要'),
#     ('domestic', '国内'),
#     ('world', '国際'),
#     ('business', '経済'),
#     ('entertainment', 'エンタメ'),
#     ('sports', 'スポーツ'),
#     ('it', 'IT'),
#     ('science', '科学'),
#     ('local', '地域')
# ]

categories = {
    'main': '主要',
    'domestic': '国内',
    'world': '国際',
    'business': '経済',
    'entertainment': 'エンタメ',
    'sports': 'スポーツ',
    'it': 'IT',
    'science': '科学',
    'local': '地域'
}

@app.route('/')
def index():
    res = {}
    res['categories'] = categories

    return render_template('index.html', res=res)

@app.route('/topics', methods=['GET', 'POST'])
def topics():
    res = {}
    if request.method == 'POST':
        category = request.form.get('category', 'error')
        if category == 'error':
            res['error'] = 'カテゴリを選択してください'
            return render_template('error.html', res=res)
        res['category'] = categories[category]
        news = sc_YN.scraping(category)
        res['titles'] = news['titles']
        res['links'] = news['links']
        res['len'] = len(res['titles'])
        return render_template('topics.html', res=res)
    else:
        res['error'] = 'フォーム送信に失敗しました'
        return render_template('error.html', res=res)

@app.errorhandler(404)
def page_not_found(error):
    res = {}
    res['error'] = 'ページが見つかりません'
    return render_template('error.html', res=res)

if __name__ == '__main__':
    print('Server Activated!')
    app.run(debug=True)