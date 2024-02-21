import productsList from "./admin/productsList"
const homePage = () => {
  return `
  ${productsList()}
  `
}

export default homePage;