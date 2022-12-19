/**
 * Function that converts an array to a string
 * notice that here we use generics since the function 
 * does not care about the type of content of the array
 * 
 * @param array the array to convert to string (comma separated)
 * @returns the string with the array values separated by comma and a space
 */
function arrToString<T>(array : T[]) : string {
    return array.join(', ');
}

export {
    arrToString
};