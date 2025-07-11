const possibleItems = [
    'T-shirt',
    'Jeans',
    'Jacket',
    'Shoes',
    'Dress',
    'Sweater',
    'Hoodie',
    'Shorts',
    'Skirt',
    'Blazer',
    'Coat',
    'Tank Top',
    'Scarf',
    'Hat',
    'Gloves',
    'Socks',
    'Sneakers',
    'Boots',
    'Leggings',
    'Tracksuit',
];

function mockClassifier(imageBuffer) {
    // Randomly return 4 or 5 items
    const count = Math.floor(Math.random() * 2) + 4;
    const shuffled = [...possibleItems].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

module.exports = mockClassifier;
