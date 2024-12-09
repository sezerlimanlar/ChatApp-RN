export default function parseRoomsData(data) {
  if (!data) return;
  return Object.keys(data)
    .map(key => {
      return {
        id: key,
        ...data[key],
      };
    })
    .sort((a, b) => {
      return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
    });
}
