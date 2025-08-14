interface LandmarkPageProps {
  params: Promise<{ landmark: string }>;
}

export default async function LandmarkPage({ params }: LandmarkPageProps) {
  const { landmark } = await params;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold capitalize">
        {landmark.replace("-", " ")}
      </h1>
      <p className="mt-2">
        Information and reviews for this landmark will go here.
      </p>
    </main>
  );
}
