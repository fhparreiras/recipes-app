export default async function genericGetApi(api) {
  const result = await fetch(api);
  const resultJson = await result.json();
  return resultJson;
}
