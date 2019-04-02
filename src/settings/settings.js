export function getSetting(variableName) {
    // Necessary prefix for custom environment variables in React
    const variablePrefix = 'REACT_APP_';

    return process.env[variablePrefix + variableName];
}