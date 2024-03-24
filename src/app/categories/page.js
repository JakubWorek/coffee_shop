"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import EditIcon from "@/components/icons/EditIcon";
import Trash from "@/components/icons/Trash";


export default function CategoriesPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryCreated, setCategoryCreated] = useState(false);
  const [categoryDeleted, setCategoryDeleted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    fetch('/api/profile')
      .then(response => response.json())
      .then(data => 
        setIsAdmin(data.admin)
      )
  }, []);

  function fetchCategories() {
    fetch('/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  async function handleCategorySubmit(e) {
    e.preventDefault();
    const data = { name: categoryName };
    if (editedCategory) {
      data._id = editedCategory._id;
    }

    const response = await fetch('/api/categories', {
      method: editedCategory ? 'PUT' : 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    setCategoryName('');
    fetchCategories();
    setEditedCategory(null);
    if (response.ok) {
      setCategoryCreated(true);
      setTimeout(() => setCategoryCreated(false), 2000);
    }
  }

  async function deleteCategory(_id) {
    const response = await fetch('/api/categories', {
      method: 'DELETE',
      body: JSON.stringify({ _id }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      setCategoryDeleted(true);
      setTimeout(() => setCategoryDeleted(false), 2000);
    }
    fetchCategories();
  }

  if (!isAdmin) {
    return (
      <section className="mt-8 max-w-lg mx-auto">
        <h1 className="text-center text-emerald-600 text-4xl mb-4">
          You are not admin!!!
        </h1>
      </section>
    )
  }

  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={isAdmin}/>
      <h1 className="text-center text-emerald-600 text-4xl mb-4">
        Categories
      </h1>
      <form onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label className="text-sm text-gray-500">
              {editedCategory ? 'Update category name:' : 'New category name:'}
              {editedCategory && (
                <>: <b>{editedCategory.name}</b></>
              )}
            </label>
            <input type="text"
              value={categoryName}
              onChange={event => setCategoryName(event.target.value)}
            />
          </div>
          <div className="pb-2">
            <button type="submit" className="border border-emerald-400">
              {editedCategory ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </form>
      <div>
        {categoryCreated && (
          <div className="text-center bg-green-100 p-4 rounded-lg border-green-300">
            Category created/updated successfully!
          </div>
        )}
        {categoryDeleted && (
          <div className="text-center bg-red-100 p-4 rounded-lg border-red-300">
            Category deleted successfully!
          </div>
        )}
      </div>
      <div>
        <h2 className=" mt-8 mb-2 text-sm text-gray-500">Existing categories:</h2>
        {categories?.length > 0 && categories.map(category => (
          <div 
            className="bg-gray-300 rounded-xl p-2 px-4 flex flex-row gap-1 mb-1"
          > 
            <span className="mt-2 grow">{category.name}</span>
            <div className="flex flex-row gap-2">
              <button 
                onClick={() => {
                  setEditedCategory(category);
                  setCategoryName(category.name);
                }}
                className="bg-emerald-300"
              >
                <EditIcon />
              </button>
              <button
                onClick={() => deleteCategory(category._id)}
                className=" bg-red-400"
              >
                <Trash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}