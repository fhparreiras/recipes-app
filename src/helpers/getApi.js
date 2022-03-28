const getApi = async () => {
  const response = await fetch('');
  const result = await response.json();
  return result;
};

export default getApi;
