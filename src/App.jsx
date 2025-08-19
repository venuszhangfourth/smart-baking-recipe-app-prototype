import React, { useState } from 'react';

const MOCKED_RECIPES = [
  { id: '1', title: 'Classic Chocolate Cake', dietary: ['vegetarian'], ingredients: ['flour', 'sugar', 'cocoa'], servings: 8 },
  { id: '2', title: 'Gluten-Free Bread', dietary: ['gluten-free'], ingredients: ['gluten-free flour', 'yeast', 'water'], servings: 4 },
  { id: '3', title: 'Diabetic-Friendly Lemon Tart', dietary: ['diabetic'], ingredients: ['almond flour', 'erythritol', 'lemon'], servings: 6 }
];

export default function App() {
  const [recipes, setRecipes] = useState(MOCKED_RECIPES);
  const [searchText, setSearchText] = useState('');
  const [filterDietary, setFilterDietary] = useState('all');

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesDietary = filterDietary === 'all' || recipe.dietary.includes(filterDietary);
    return matchesSearch && matchesDietary;
  });

  const deleteRecipe = (id) => setRecipes(prev => prev.filter(r => r.id !== id));
  const addRecipe = () => {
    const newRecipe = { id: Date.now().toString(), title: 'New Recipe', dietary: [], ingredients: [], servings: 1 };
    setRecipes(prev => [...prev, newRecipe]);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>Smart Baking Web Prototype</h1>
      <input 
        placeholder='Search recipes...' 
        value={searchText} 
        onChange={(e) => setSearchText(e.target.value)} 
        style={{ padding: 6, marginRight: 10 }}
      />
      <button onClick={() => setFilterDietary('all')}>All</button>
      <button onClick={() => setFilterDietary('vegetarian')}>Vegetarian</button>
      <button onClick={() => setFilterDietary('gluten-free')}>Gluten-Free</button>
      <button onClick={() => setFilterDietary('diabetic')}>Diabetic</button>
      <button onClick={addRecipe} style={{ marginLeft: 10 }}>Add Recipe</button>

      <ul>
        {filteredRecipes.map(r => (
          <li key={r.id} style={{ margin: 10, border: '1px solid #ccc', padding: 10 }}>
            <b>{r.title}</b><br/>
            Dietary: {r.dietary.join(', ')}<br/>
            Ingredients: {r.ingredients.join(', ')}<br/>
            Servings: {r.servings}<br/>
            <button onClick={() => deleteRecipe(r.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
