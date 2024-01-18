import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListFoodsPages from "../pages/ListFoodsPages";
import AddFoodPages from "../pages/AddFoodPages";
import FoodsPages from "../pages/FoodsPages";
function RoutePages() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListFoodsPages />} />
        <Route path="/addfood" element={<AddFoodPages />} />
        <Route path="/foods" element={<FoodsPages />} />
      </Routes>
    </Router>
  );
}

export default RoutePages;
