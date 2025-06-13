export const formatDateToObject = (date: Date) => {
    //adicionando '0' à esquerda se necessário (ex: 5 -> '05')
    const day = String(date.getDate()).padStart(2, '0');

    const month = String(date.getMonth() + 1).padStart(2, '0');

    //pega o ano com 4 dígitos (ex: 2025)
    const year = date.getFullYear();

    // 'label': data formatada no padrão 'dd/mm/yyyy'
    // 'value': data formatada no padrão 'yyyy-mm-dd', usada no backend
    return {
        label: `${day}/${month}/${year}`,
        value: `${year}-${month}-${day}`,
    };
};