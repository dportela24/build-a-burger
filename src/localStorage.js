export const saveBurgerState = (state) => {
    try {
        const toSave = JSON.stringify(state);
        localStorage.setItem('burgerState', toSave);
    } catch (e) {
      // well...
    }
};

export const loadBurgerState = () => {
    try {
        const state = localStorage.getItem('burgerState');
        if (state === null) {
        return undefined;
        }
        return JSON.parse(state);
    } catch (err) {
        return undefined;
    }
}; 