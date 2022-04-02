function unique_from_array(arr) {
  let result = [];
  let brands = [];
  arr.map((item, index) => {
    let brandName = item.name.match(/(\w+)/)[0];
    if (!result.includes(brandName)) {
      result.push(brandName);
      brands.push({ dep: result.length, brand: brandName });
    }
  });
  return brands;
}

module.exports = unique_from_array;
