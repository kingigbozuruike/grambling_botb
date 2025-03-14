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