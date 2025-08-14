export default async function CitiesPage() {
  const res = await fetch("http://127.0.0.1:8000/cities", { cache: "no-store" });
  const cities = await res.json();

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">🗺 Cities</h1>
      <ul className="space-y-2">
        {cities.map((city: any) => (
          <li key={city.name}>
            <a
              href={`/cities/${city.name.toLowerCase()}`}
              className="text-blue-600 hover:underline"
            >
              {city.name} — {city.description}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
