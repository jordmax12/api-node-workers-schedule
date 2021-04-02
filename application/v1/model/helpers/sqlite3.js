exports.convert_obj_to_set_statement = obj => {
    let result = '';

    for (const [key, value] of Object.entries(obj)) {
        result += `${key} = ${value}, `;
    }
    // A bit hacky, but to save time, this is to remove the additional extra space + commma.
    return result.slice(0, -2);
}