import React, { useState, createContext } from "react";

const baseUrl = "/api/Category";

//create a context
export const CategoryContext = createContext();

//create a provider for the context...better name CategoryProvider vs CategoryManager
 const CategoryManager = (props) => {
  const [categories, setCategories] = useState([]);

  const getAllCategories = () => {
    return fetch(`${baseUrl}`)
      .then((res) => res.json())
      .then(setCategories);
  };

   const getCategoryById = (id) => {
    return fetch(`${baseUrl}/${id}`).then((res) => res.json());
  };

  //
   const addCategory = (singleCategory) => {
    return fetch(`${baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(singleCategory),
    }).then(getAllCategories);
  };

  const deleteCategory = (categoryId) => {
    return fetch(`${baseUrl}/${categoryId}`, {
      method: "DELETE",
    }).then(getAllCategories);
  };

  const updateCategory = (category) => {
    return fetch(`${baseUrl}/${category.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    }).then(getAllCategories);
  };

  return (
    //values that will be shared with children components
    <CategoryContext.Provider 
    value={{ 
      categories, 
      getAllCategories, 
      addCategory, 
      deleteCategory, 
      updateCategory, 
      getCategoryById 
      }}>
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryManager;
