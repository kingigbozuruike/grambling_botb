### Project Structure

1. **Create a folder named `metrics`**.
2. **Inside the `metrics` folder, create the following files**:
   - `index.html`
   - `styles.css`
   - `script.js`

### Step 1: HTML (index.html)

This file will contain the structure of your webpage.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hashmap Filter Visualization</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Hashmap Filter Visualization</h1>
        <div class="input-section">
            <label for="filter">Filter Key:</label>
            <input type="text" id="filter" placeholder="Enter key to filter">
            <button id="filterButton">Filter</button>
        </div>
        <div class="hashmap-section">
            <h2>Original Hashmap</h2>
            <pre id="originalHashmap"></pre>
            <h2>Filtered Hashmap</h2>
            <pre id="filteredHashmap"></pre>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

### Step 2: CSS (styles.css)

This file will style your webpage.

```css
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 20px;
}

.container {
    max-width: 600px;
    margin: auto;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1, h2 {
    color: #333;
}

.input-section {
    margin-bottom: 20px;
}

input[type="text"] {
    padding: 10px;
    width: calc(100% - 22px);
    margin-right: 10px;
}

button {
    padding: 10px 15px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

pre {
    background: #eaeaea;
    padding: 10px;
    border-radius: 5px;
    overflow: auto;
}
```

### Step 3: JavaScript (script.js)

This file will contain the logic to handle the filtering of the hashmap.

```javascript
// Sample hashmap
const originalHashmap = {
    "apple": 1,
    "banana": 2,
    "cherry": 3,
    "date": 4,
    "elderberry": 5
};

// Function to display the hashmap
function displayHashmap(hashmap, elementId) {
    const element = document.getElementById(elementId);
    element.textContent = JSON.stringify(hashmap, null, 2);
}

// Function to filter the hashmap
function filterHashmap() {
    const filterKey = document.getElementById('filter').value;
    const filteredHashmap = {};

    for (const key in originalHashmap) {
        if (key.includes(filterKey)) {
            filteredHashmap[key] = originalHashmap[key];
        }
    }

    displayHashmap(filteredHashmap, 'filteredHashmap');
}

// Initial display of the original hashmap
displayHashmap(originalHashmap, 'originalHashmap');

// Event listener for the filter button
document.getElementById('filterButton').addEventListener('click', filterHashmap);
```

### Step 4: Running the Project

1. Open the `index.html` file in your web browser.
2. You will see the original hashmap displayed.
3. Enter a key in the input box and click the "Filter" button to see the filtered hashmap.

### Conclusion

This simple project allows you to visualize the differences in hashmaps before and after filtering. You can expand this project by adding more features, such as different filtering criteria, or even visualizing the data in a more graphical way using libraries like D3.js or Chart.js.