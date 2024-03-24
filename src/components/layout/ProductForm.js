'use client';
import { useEffect, useState } from "react";
import EditableImage from "@/components/layout/EditableImage";
import Trash from "@/components/icons/Trash";

export default function ProductForm({handleFormSubmit, product}) {
  const [image, setImage] = useState(product?.image || '');
  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [basePrice, setBasePrice] = useState(product?.basePrice || '');
  const [sizes, setSizes] = useState(product?.sizes || []);
  const [category, setCategory] = useState(product?.category || '');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/api/categories').then(res => {
      res.json().then(categories => {
        setCategories(categories);
      });
    });
  }, []);

  function addSize(){
    setSizes(prevSizes => {
      return [... prevSizes, {name: '', price: 0}]
    });
  }

  function editSize(ev, index, property){
    const newValue = ev.target.value;
    setSizes(prevSizes => {
      const newSizes = [...prevSizes];
      newSizes[index][property] = newValue;
      return newSizes;
    });
  }

  return (
    <form className="mt-8 max-w-md mx-auto" 
      onSubmit={ev => handleFormSubmit(ev, {image,name,description,basePrice, sizes, category})}
    >
      <div className="grid items-start gap-4"
        style={{gridTemplateColumns: '.3fr .7fr'}}
      >
        <div className="max-w-[200px]">
          <EditableImage link={image} setLink={setImage}/>
        </div>
        <div className="grow">
          <label>Product name</label>
          <input type="text" 
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <label>Product description</label>
          <input type="text" 
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <label>Category</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {categories?.length > 0 && categories.map((category, index) => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
          <label>Base price</label>
          <input type="text" 
            value={basePrice}
            onChange={e => setBasePrice(e.target.value)}
          />
          <div className="bg-gray-200 p-2 rounded-md mb-2">
            <label>Sizes</label>
            {sizes?.length > 0 &&  sizes.map((size, index) => (
              <div key={index} className="flex items-end gap-2">
                <div>
                  <label>Size name</label>
                  <input 
                    type='text' 
                    placeholder="Size" 
                    value={size.name}
                    onChange={ev => editSize(ev, index, 'name')}
                  />
                </div>
                <div>
                  <label>Extra price</label>
                  <input 
                    type='text' 
                    placeholder="Extra price" 
                    value={size.price}
                    onChange={ev => editSize(ev, index, 'price')}
                  />
                </div>
                <div>
                  <button 
                    type='button'
                    onClick={() => setSizes(prevSizes => {
                      const newSizes = [...prevSizes];
                      newSizes.splice(index, 1);
                      return newSizes;
                    })}
                    className="bg-white mb-2 px-2"
                  >
                    <Trash />
                  </button>
                </div>                
              </div>
            ))
            }
            <button 
              className="bg-white"
              type = "button"
              onClick = {addSize}
            >
              Add product size
            </button>
          </div>
          <button type="submit">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}