import { useEffect, router, useState } from "../../utilities";
import { getProduct, updateProducts } from "../../api/products";
import { string, object } from "yup";

const projectSchema = object({
  productName: string().required("Tên không được để trống"),
  brand: string().required("Thương hiệu không được để trống")
})



const productsEdit = ({ id }) => {
  const [products, setProducts] = useState({});

  useEffect(() => {
    (() => {
      try {
        getProduct(id).then(({ data }) => setProducts(data));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);


  useEffect(() => {
    const form = document.getElementById('form-edit');
    const productName = document.getElementById('product-name');
    const productBrand = document.getElementById('product-brand');
    const productImage = document.getElementById('product-img');
    // thêm sp
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = {
        id: id,
        productName: productName.value,
        brand: productBrand.value,
        image: productImage.value,
      };
      projectSchema
        .validate(formData, { abortEarly: false })
        .then(() => {
          window.confirm("Cập nhật thành công");
          updateProducts(formData).then(() => router.navigate("/"));
        }).catch((error) => {
          const formErrorEl = document.querySelectorAll(".form-error");
          formErrorEl.forEach((element, index) => {
            element.innerHTML = error.errors[index];
          });
        });
    });
  });;



  return `
    <div class="container">
  <h1>Cập nhật sản phẩm</h1>
  <form action="" id="form-edit">
    <div class="form-group mb-3">
      <label for="">Tên sản phẩm</label>
      <input type="text" id="product-name" class="form-control" value="${products.productName}">
      <div class="form-error text-danger" ></div>
    </div>
    <div class="form-group">
      <label for="">Thương hiệu</label>
      <input type="text" id="product-brand" class="form-control" value="${products.brand}">
      <div class="form-error text-danger" ></div>
    </div>
    <div class="form-group">
      <label for="">Hình ảnh</label>
      <input type="text" id="product-img" class="form-control"  value="${products.image}">
    </div>

    <br>
    <div>
    <button class="btn btn-primary"> Cập nhật
   </button>
    </div>
  </form>
  </div> 
  
    `

}
export default productsEdit;
