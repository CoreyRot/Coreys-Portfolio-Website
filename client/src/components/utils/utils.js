export const lerp = (a, b, n) => (1 - n) * a + n * b;


// Gets the mouse position
export const getMousePos = e => {
    return { 
        x : e.clientX, 
        y : e.clientY 
    };
};
