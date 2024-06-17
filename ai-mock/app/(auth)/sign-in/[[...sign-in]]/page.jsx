import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main>
      <div className="flex flex-col justify-center items-center pt-40">
      <div>
          <SignIn />
        </div>
        <div className="mt-4">
          <h1 className="text-black p-2 font-bold text-xl">
            For testing purposes a dummy account has already been created for
            you
          </h1>
          <h1 className="text-black p-2 font-bold text-xl">
            Email: aimockinterviewer@gmail.com
          </h1>
          <h1 className="text-black p-2 font-bold text-xl">
            Password: zcbmnvx12345@
          </h1>
        </div>
        
      </div>
    </main>
  );
}
