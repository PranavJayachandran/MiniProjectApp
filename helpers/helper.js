export const getLayout = () => {
    let grid = [7, 6, 5, 4, 3, 2, 1];
    let layout = [];
    let size = 0;
    for (let i = 0; i < grid.length; i++) {
        layout.push(Array(grid[i]).fill(0));
        size = Math.max(size, grid[i]);
    }
    return { layout, size };
}
export const getBoxData = (row, col) => {
    return { cropType: "Onion", sprinklerName: "Sprinkler 1", row, col, sprinklerState: false }
}
export const updateSprinklerState = (row, col, sprinklerState) => {
    return
}
export const updateLayoutData = (row, col, sprinklerName, cropType) => {
    return
}