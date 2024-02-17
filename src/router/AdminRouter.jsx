import { Route, Routes } from "react-router-dom";
import Product from "../view/Product";
import Error404 from "../Error/Error404";
import Company from "../view/Company";
import Login from "../view/Login";


const AdminRouter = () => {
    return ( 
    <>
     <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/product" element={<Product />} />
        <Route exact path="/company" element={<Company />} />
        <Route exact path="*" element={<Error404 />} />
      </Routes>
    </> 
    );
}

export default AdminRouter;