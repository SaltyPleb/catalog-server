function unique_from_array(arr) {
  try {
    let result = [];
    let brands = [];
    arr.map((item, index) => {
      let brandName = item.name.match(/(\w+)/)[0];
      if (!result.includes(brandName)) {
        result.push(brandName);
        brands.push({ dep: result.length, brand: brandName });
      }
    });
    console.log(brands);
    return brands;
  } catch (error) {
    console.error(error);
  }
}

module.exports = unique_from_array;
