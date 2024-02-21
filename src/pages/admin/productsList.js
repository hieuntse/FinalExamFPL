import { useEffect, useState } from "../../utilities";
import { deleteProducts, getProducts } from "../../api/products"
import axios from "axios"

const productsList = () => {
  //lấy dữ liệu 
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/products").then(({ data }) => setProducts(data));
  }, []);
  //xóa 
  useEffect(() => {
    const btns = document.querySelectorAll('.btn-remove');
    for (let btn of btns) {
      btn.addEventListener("click", async function () {
        const id = this.dataset.id;
        const confirm = window.confirm("bạn có chắc chắn muốn xóa hay không ?");
        if (confirm) {
          try {
            await deleteProducts(id);
            const newProducts = products.filter((product) => product.id !== +id);
            setProducts(newProducts);
          } catch (error) {
            console.log(error);
          }
        }
      });
    }
  });


  return `
    <div class="container">
        <table class="table table-borded table-danger">
            <thead>
                <th>STT</th>
                <th>Tên sản phẩm</th>
                <th>Thương hiệu</th>
                <th>Hình ảnh</th>
                <th>Chức năng</th>

            </thead>
            ${products.map((product, index) =>
    `
      <tbody>
      <tr>
        <td>${index + 1}</td>
        <td>${product.productName}</td>
        <td>${product.brand}</td>
        <td><img src="${product.image}"alt="" width="200"></td>
        <td>
        <button data-id="${product.id}" class="btn btn-danger btn-remove" >Xóa</button> 
        <button class="btn btn-warning" ><a href="/admin/products/${product.id}/edit" style="color: white" >sửa</a></button> 
        </td>
      </tr>
    
      `
  ).join("")}
    </tbody >
   </table >
   <tr>
   <button class="btn btn-primary"><a href="/admin/add"  style="color:white"> Thêm sản phẩm</>
   </button>
   </tr>
  </div >
    `
}
export default productsList;
