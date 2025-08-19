import React, { useState } from 'react';

const INITIAL_RECIPES = [
  { id: '1', title: 'Classic Chocolate Cake', dietary: ['vegetarian'], ingredients: ['flour', 'sugar', 'cocoa'], servings: 8, images: [] },
  { id: '2', title: 'Gluten-Free Bread', dietary: ['gluten-free'], ingredients: ['gluten-free flour', 'yeast', 'water'], servings: 4, images: [] },
  { id: '3', title: 'Diabetic-Friendly Lemon Tart', dietary: ['diabetic'], ingredients: ['almond flour', 'erythritol', 'lemon'], servings: 6, images: [] }
];

export default function App() {
  const [recipes, setRecipes] = useState(INITIAL_RECIPES);
  const [searchText, setSearchText] = useState('');
  const [filterDietary, setFilterDietary] = useState('all');
  const [newRecipeTitle, setNewRecipeTitle] = useState('');

  const filteredRecipes = recipes.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesDietary = filterDietary === 'all' || r.dietary.includes(filterDietary);
    return matchesSearch && matchesDietary;
  });

  const deleteRecipe = id => {
    if (window.confirm('Delete this recipe?')) {
      setRecipes(prev => prev.filter(r => r.id !== id));
    }
  };

  const addRecipe = () => {
    if (!newRecipeTitle.trim()) return;
    const newRecipe = { id: Date.now().toString(), title: newRecipeTitle, dietary: [], ingredients: [], servings: 1, images: [] };
    setRecipes([newRecipe, ...recipes]);
    setNewRecipeTitle('');
  };

// Placeholder for AI scaling/unit conversion
const scaleRecipe = (recipe, factor) => {
  alert(`AI scaling for '${recipe.title}' by factor ${factor} (mocked)`);
};

// Placeholder for image/video upload
const uploadImage = recipe => {
  alert(`Image/video upload for '${recipe.title}' (mocked)`);
};

  return (
    <div style={{ padding: 20 }}>
      <h1>Smart Baking — Full Web Prototype</h1>

      <input
        style={{ padding: 8, width: '100%', marginBottom: 12, borderRadius: 4, border: '1px solid #ddd' }}
        placeholder='Search recipes...'
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
      />

      <div style={{ marginBottom: 12 }}>
        {['all', 'vegetarian', 'gluten-free', 'diabetic'].map(d => (
          <button
            key={d}
            onClick={() => setFilterDietary(d)}
            style={{ marginRight: 6, padding: 6, borderRadius: 4, backgroundColor: filterDietary===d?'#ddd':'#eee' }}
          >
            {d.charAt(0).toUpperCase() + d.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: 12 }}>
        <input
          style={{ padding: 6, width: '70%', marginRight: 6, borderRadius: 4, border: '1px solid #ddd' }}
          placeholder='New recipe title'
          value={newRecipeTitle}
          onChange={e => setNewRecipeTitle(e.target.value)}
        />
        <button style={{ padding: 6, borderRadius: 4 }} onClick={addRecipe}>Add Recipe</button>
      </div>

      {filteredRecipes.map(r => (
        <div key={r.id} style={{ border: '1px solid #eee', padding: 12, borderRadius: 6, marginBottom: 10, backgroundColor: '#fff' }}>
          <h3>{r.title}</h3>
          <div><b>Dietary:</b> {r.dietary.join(', ')}</div>
          <div><b>Ingredients:</b> {r.ingredients.join(', ')}</div>
          <div><b>Servings:</b> {r.servings}</div>
          <div style={{ marginTop: 6 }}>
            <button style={{ marginRight: 6 }} onClick={() => scaleRecipe(r, 1.5)}>AI Scale</button>
            <button style={{ marginRight: 6 }} onClick={() => uploadImage(r)}>Upload Image/Video</button>
            <button style={{ backgroundColor:'#cc0000', color:'#fff', padding:6, border:'none', borderRadius:4 }} onClick={() => deleteRecipe(r.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
