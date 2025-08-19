import React, { useState } from "react";

export default function App() {
  const [recipes, setRecipes] = useState([
    { id: 1, title: "Chocolate Cake", dietary: ["vegetarian"], servings: 8 },
    { id: 2, title: "Gluten-Free Bread", dietary: ["gluten-free"], servings: 4 }
  ]);

  const [newRecipe, setNewRecipe] = useState("");

  const addRecipe = () => {
    if (!newRecipe) return;
    const id = recipes.length + 1;
    setRecipes([...recipes, { id, title: newRecipe, dietary: [], servings: 1 }]);
    setNewRecipe("");
  };

  const deleteRecipe = (id) => setRecipes(recipes.filter(r => r.id !== id));

  const scaleRecipe = (recipe, factor) => alert(`AI scaling for '${recipe.title}' by factor ${factor} (mocked)`);

  return (
    <div style={{ padding: 20 }}>
      <h1>Smart Baking Recipe App (Web)</h1>

      <input
        value={newRecipe}
        onChange={e => setNewRecipe(e.target.value)}
        placeholder="New recipe title"
      />
      <button onClick={addRecipe}>Add Recipe</button>

      <ul>
        {recipes.map(r => (
          <li key={r.id}>
            {r.title} (Servings: {r.servings}){" "}
            <button onClick={() => deleteRecipe(r.id)}>Delete</button>{" "}
            <button onClick={() => scaleRecipe(r, 2)}>Scale x2</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
