import DonorManagement from "@/components/DonorManagement";
export const dynamic = "force-dynamic";
async function page({ searchParams }) {
  const params = await searchParams;
  const query = {
    verified: params.verified || "pending",
    search: params.search || "",
    page: params.page || "1",
    limit: params.limit || "10",
  };
  const queryString = new URLSearchParams(query).toString();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/admin/donors?${queryString}`, { 
      cache: "no-store" 
    });

    if (!res.ok) {
      throw new Error("Failed to fetch donors");
    }

    const { donors, pagination } = await res.json();

    

    return (
      <DonorManagement
        initialData={donors || []} 
        pagination={pagination || { total: 0, page: 1, totalPages: 1 }} 
      />
    );
  } catch (error) {
    console.error("Donor Fetch Error:", error);
    return (
      <div className="p-10 text-center">
        <h2 className="text-red-500 font-bold">Failed to load donor data.</h2>
        <p className="text-slate-500">Please check if your API server is running.</p>
      </div>
    );
  }
}

export default page;