export const formatDateToObject = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return {
        label: `${day}/${month}/${year}`,
        value: `${year}-${month}-${day}`,
    };
};