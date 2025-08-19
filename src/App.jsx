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
  const [newRecipe, setNewRecipe] = useState({ title:'', dietary:'', ingredients:'', servings:1 });

  const filteredRecipes = recipes.filter(r => 
    r.title.toLowerCase().includes(searchText.toLowerCase()) &&
    (filterDietary === 'all' || r.dietary.includes(filterDietary))
  );

  const deleteRecipe = id => setRecipes(prev => prev.filter(r => r.id !== id));

  const addRecipe = () => {
    if (!newRecipe.title) return alert('Please enter recipe title');
    const recipe = {
      id: Date.now().toString(),
      title: newRecipe.title,
      dietary: newRecipe.dietary.split(',').map(s=>s.trim()),
      ingredients: newRecipe.ingredients.split(',').map(s=>s.trim()),
      servings: Number(newRecipe.servings)
    };
    setRecipes(prev => [recipe, ...prev]);
    setNewRecipe({ title:'', dietary:'', ingredients:'', servings:1 });
  };

  const scaleRecipe = (recipe, factor) => {
    alert(\AI scaling for "\" by factor \ (mocked)\);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Smart Baking â€” Web Prototype</h1>

      <input placeholder='Search recipes...' value={searchText} onChange={e=>setSearchText(e.target.value)} />
      
      <div style={{ margin:'10px 0' }}>
        <button onClick={()=>setFilterDietary('all')}>All</button>
        <button onClick={()=>setFilterDietary('vegetarian')}>Vegetarian</button>
        <button onClick={()=>setFilterDietary('gluten-free')}>Gluten-Free</button>
        <button onClick={()=>setFilterDietary('diabetic')}>Diabetic</button>
      </div>

      <h2>Add Recipe</h2>
      <input placeholder='Title' value={newRecipe.title} onChange={e=>setNewRecipe({...newRecipe,title:e.target.value})} />
      <input placeholder='Dietary (comma)' value={newRecipe.dietary} onChange={e=>setNewRecipe({...newRecipe,dietary:e.target.value})} />
      <input placeholder='Ingredients (comma)' value={newRecipe.ingredients} onChange={e=>setNewRecipe({...newRecipe,ingredients:e.target.value})} />
      <input type='number' placeholder='Servings' value={newRecipe.servings} onChange={e=>setNewRecipe({...newRecipe,servings:e.target.value})} />
      <button onClick={addRecipe}>Add Recipe</button>

      <h2>Recipes</h2>
      {filteredRecipes.map(r=>(
        <div key={r.id} style={{ border:'1px solid #ddd', margin:'10px 0', padding:'10px' }}>
          <h3>{r.title}</h3>
          <div>Dietary: {r.dietary.join(', ')}</div>
          <div>Ingredients: {r.ingredients.join(', ')}</div>
          <div>Servings: {r.servings}</div>
          <button onClick={()=>deleteRecipe(r.id)}>Delete</button>
          <button onClick={()=>scaleRecipe(r, 2)}>Scale x2</button>
        </div>
      ))}
    </div>
  );
}
