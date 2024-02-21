const app = document.querySelector('#app');
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"
import { render, router } from "./utilities";
import homePage from "./pages/home";
import productAdd from "./pages/admin/product-add";
import productsEdit from "./pages/admin/product-edit";



router.on('/', () => render(homePage, app));
router.on('/admin/add', () => render(productAdd, app));
router.on('/admin/products/:id/edit', ({ data }) => render(() => productsEdit(data), app));

router.resolve();



