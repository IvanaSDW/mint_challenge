function solution(matrix) {
    let n = matrix.length;
    let borders = [];
    let layers = Math.ceil(n/2);
    console.log(layers);
    console.log(n);
    for (let layer = 0; layer < layers; layer++) {
        console.log(layer);
        let m = n-layer * 2;
        console.log(m)
        if (m <= 0) return matrix;
        borders[layer] = [...matrix[layer].slice(layer, m+1)];
        console.log(borders[layer])
        for (let i = 1; i < m - 1; i++) {
            borders[layer].push(matrix[layer+i][m - 1])
        }
        console.log(borders[layer])
        for (let i = m - 1; i >= 0; i--) {
            borders[layer].push(matrix[m+layer - 1][layer+i])
        }
        console.log(borders[layer])
        for (let i = m - 2; i > 0; i--) {
            borders[layer].push(matrix[layer+i][0])
        }
        console.log(borders[layer])
        borders[layer] = borders[layer].sort((a, b) => a - b);
        console.log(borders[layer])
        matrix[0] = borders[layer].slice(0, 4);
        console.log(matrix[0])
    }

    return matrix;
}

console.table(solution([
    [9, 7, 4, 5],
    [1, 6, 2, -6],
    [12, 20, 2, 0],
    [-5, -6, 7, -2],
]))
