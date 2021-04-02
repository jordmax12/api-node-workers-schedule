exports.convert_obj_to_set_statement = obj => {
    let result = '';

    for (const [key, value] of Object.entries(obj)) {
        result += `${key} = '${value}', `;
    }
    // A bit hacky, but to save time, this is to remove the additional extra space + commma.
    return result.slice(0, -2);
}

exports.generate_where_with_pagination = (where_key_values, last_created, last_created_key = 'created') => {
    let result = 'WHERE ';
    where_key_values.forEach(key_value => {
        const { key, value } = key_value;
        result += `${key} = '${value}' `
    })

    if(last_created) {
        result += `AND ${last_created_key} > '${last_created}'`
    }

    return result;
}