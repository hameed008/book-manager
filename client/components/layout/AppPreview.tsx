import Image from "next/image";

export function AppPreview() {
  return (
    <div className="relative mx-auto mt-16 w-full max-w-5xl px-4 sm:mt-24 sm:px-6 lg:px-8">
      
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-blue-400 via-indigo-500 to-sky-400 opacity-20 blur-2xl"></div>

      <div className="relative rounded-2xl bg-white/40 ring-1 ring-gray-900/5 backdrop-blur-sm sm:rounded-3xl lg:rounded-[2rem]">
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl shadow-blue-900/10 ring-1 ring-gray-900/10 sm:rounded-3xl lg:rounded-[2rem]">
          
          <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50/50 px-4 py-3">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-amber-400"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400"></div>
          </div>

       <div className="relative w-full bg-gray-100 flex justify-center">
            <Image
              src="/dashboard-preview.png"
              alt="The Personal Book Manager Dashboard"
             
              width={1920} 
              height={1080}
              priority
             
              className="w-full h-auto object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
