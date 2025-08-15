import { Product } from "./index.js";

class ElectronicProduct extends Product {
  constructor(name, description, price, tags, images, manufacturer) {
    super(name, description, price, tags, images);
    this._manufacturer = manufacturer; // 제조업자
  }

  favorite() {
    super.favorite();
  }

  get manufacturer() {
    return this._manufacturer;
  }
  set manufacturer(value) {
    this._manufacturer = value;
  }
}

export default ElectronicProduct;
