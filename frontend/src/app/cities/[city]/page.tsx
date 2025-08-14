interface CityPageProps {
  params: Promise<{ city: string }>;
}

export default async function CityPage({ params }: CityPageProps) {
  const { city } = await params;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold capitalize">{city}</h1>
      <p className="mt-2">Details and landmarks for {city} will go here.</p>
    </main>
  );
}
