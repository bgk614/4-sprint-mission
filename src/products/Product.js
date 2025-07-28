class Product {
  constructor(name, description, price, tags, images) {
    this._name = name;
    this._description = description;
    this._price = price;
    this._tags = tags;
    this._images = images;
    this._favoriteCount = 0;
  }

  get name() {
    return this._name;
  }
  set name(value) {
    if (value.length === 0) {
      throw new Error("이름이 비어있습니다.");
    }
    this._name = value;
  }

  get description() {
    return this._description;
  }
  set description(value) {
    this._description = value;
  }

  get price() {
    return this._price;
  }
  set price(value) {
    if (value < 0) {
      throw new Error("0 이상의 숫자를 넣어주세요.");
    }
    this._price = value;
  }

  get tags() {
    return this._tags;
  }
  set tags(value) {
    this._tags = value;
  }

  get images() {
    return this._images;
  }
  set images(value) {
    this._images = value;
  }

  get favoriteCount() {
    return this._favoriteCount;
  }
  favorite() {
    this._favoriteCount++;
  }
}

export default Product;
