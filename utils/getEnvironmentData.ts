const getEnvironmentData = (variable: string) => process.env[variable] || '';

export default getEnvironmentData;
