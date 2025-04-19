export function formatCurrency(pricePaisa){
    return (Math.round(pricePaisa)/10).toFixed(2);
};

export default formatCurrency;