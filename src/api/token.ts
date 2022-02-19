export const isSpawned = async (tokenID: string | number) => {
  const res = await fetch(
    `https://apeharmony.com/api/check.php?tokenID=${tokenID}`
  );
  if (!res.ok) {
    throw new Error("Token not found");
  }
  const data = await res.json();
  return Boolean(data.isSpawned);
};

export const spawn = async (tokenID: string | number) => {
  const res = await fetch(`/api/check.php?tokenID=${tokenID}`, {
    method: "POST",
  });
  if (!res.ok) {
    throw new Error("Token not found");
  }
  const data = await res.json();
  return data;
};

export const sign = async (sign: string) => {
  const res = await fetch("https://apeharmony.com/signed.php", {
    method: "POST",
    body: JSON.stringify(sign),
  });
  if (!res.ok) throw new Error("Something goes wrong");
};

export const getMetadata = async (tokenID: string | number) => {
  const url = `https://apeharmony.com/api/metadata.php?tokenID=${tokenID}`;
  console.log(url)
  const res = await fetch(url);
  
  if (!res.ok) throw new Error("Something goes wrong");
  return await res.json();
};
