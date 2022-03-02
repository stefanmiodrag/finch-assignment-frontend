export async function loadBuildData(buildingData) {
  const response = await fetch(
    `https://cchvf3mkzi.execute-api.eu-west-1.amazonaws.com/dev/build`,
    {
      method: "POST",
      body: JSON.stringify(buildingData),
      headers: {
        Accept: "application/json",
      },
    }
  );

  const result = await response.json();
  return result;
}
