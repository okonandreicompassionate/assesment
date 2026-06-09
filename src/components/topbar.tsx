export default function Topbar() {
  return (
    <div>
     <header className="bg-white shadow px-6 py-4">
          <h2 className="text-lg font-semibold">
            Dashboard Overview
          </h2>
            <div className="ml-[600px] -mt-[30px]  ">

              <input
              type="text"
              placeholder="Search products..."
              className="border rounded-lg px-4 py-2 outline-none"
              />

        </div>
        </header>
       
        </div>
  );
}