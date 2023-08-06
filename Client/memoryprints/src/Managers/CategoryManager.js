import React, { useState, createContext } from "react";

const baseUrl = "/api/Category";

export const CategoryContext = createContext();

export const CategoryManager = (props) => {
  const [categories, setCategories] = useState([]);

  const getAllCategories = () => {
    return fetch(`${baseUrl}`)
      .then((res) => res.json())
      .then(setCategories);
  };

   const GetCategoryById = (id) => {
    return fetch(`${baseUrl}/${id}`).then((res) => res.json());
  };

  //
   const AddCategory = (singleCategory) => {
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


