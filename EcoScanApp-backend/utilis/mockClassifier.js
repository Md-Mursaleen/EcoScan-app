const possibleItems = ['T-shirt', 'Jeans', 'Jacket', 'Shoes', 'Dress'];

function mockClassifier(imageBuffer) {
    // In a real app, you'd use image recognition here
    // For now, randomly return 2-3 items
    const count = Math.floor(Math.random() * 2) + 2;
    const shuffled = [...possibleItems].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

module.exports = mockClassifier;
