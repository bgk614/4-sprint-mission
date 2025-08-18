class Article {
  constructor(title, content, writer) {
    this._title = title;
    this._content = content;
    this._writer = writer;
    this._createdAt = new Date();
    this._likeCount = 0;
  }

  set title(value) {
    if (value.length === 0) {
      throw new Error('제목이 비어있습니다.');
    }
    this._title = value;
  }
  get title() {
    return this._title;
  }

  set content(value) {
    if (value.length === 0) {
      throw new Error('내용이 비어있습니다.');
    }
    this._content = value;
  }
  get content() {
    return this._content;
  }

  set writer(value) {
    if (value.length === 0) {
      throw new Error('작성자가 비어있습니다.');
    }
    this._writer = value;
  }
  get writer() {
    return this._writer;
  }

  get createdAt() {
    return this._createdAt;
  }

  like() {
    this._likeCount++;
  }
  get likeCount() {
    return this._likeCount;
  }
}

export default Article;
